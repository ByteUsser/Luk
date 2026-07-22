import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getServerEnv } from "@/lib/server-env";
import { SITE_CONFIG } from "@/lib/site-config";

const optionalAttributionValue = z.string().trim().max(160).optional().default("");
const emptyAttribution = {
  source: "",
  landingPath: "",
  pagePath: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  referrer: ""
};

const contactBodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().max(200).refine(
    (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value),
    "Nieprawidłowy adres email."
  ),
  phone: z.string().trim().max(20),
  message: z.string().trim().min(10).max(3000),
  website: z.string().trim().max(200).optional().default(""),
  attribution: z.object({
    source: optionalAttributionValue,
    landingPath: optionalAttributionValue,
    pagePath: optionalAttributionValue,
    utmSource: optionalAttributionValue,
    utmMedium: optionalAttributionValue,
    utmCampaign: optionalAttributionValue,
    utmContent: optionalAttributionValue,
    utmTerm: optionalAttributionValue,
    referrer: optionalAttributionValue
  }).optional().default(emptyAttribution)
}).superRefine(({ email, phone }, context) => {
  if (!email && !phone) {
    context.addIssue({
      code: "custom",
      path: ["email"],
      message: "Podaj email lub numer telefonu."
    });
  }

  const digits = phone.replace(/\D/g, "");

  if (phone && !(digits.length === 9 || (digits.length === 11 && digits.startsWith("48")))) {
    context.addIssue({
      code: "custom",
      path: ["phone"],
      message: "Nieprawidłowy numer telefonu."
    });
  }

});

type RateBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const globalRateStore = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateBucket>;
};

const rateStore = globalRateStore.contactRateLimit ?? new Map<string, RateBucket>();
if (!globalRateStore.contactRateLimit) {
  globalRateStore.contactRateLimit = rateStore;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const SOURCE_LABELS: Record<string, string> = {
  "strona-glowna": "Strona główna",
  galeria: "Galeria zdjęć",
  "galeria-portrety": "Galeria — portrety",
  "galeria-sesje-dla-par": "Galeria — sesje dla par",
  "galeria-uroczystosci": "Galeria — uroczystości",
  "galeria-eventy": "Galeria — eventy",
  "galeria-event-i-reportaz": "Galeria — reportaż",
  "galeria-motoryzacja": "Galeria — motoryzacja",
  "galeria-podroze": "Galeria — podróże",
  cennik: "Cennik",
  "cennik-portret": "Cennik — sesja portretowa",
  "cennik-dowod": "Cennik — zdjęcie do dowodu",
  "cennik-odbitki": "Cennik — odbitki 10 × 15 cm",
  "cennik-para": "Cennik — sesja dla par",
  "cennik-komunia-chrzest": "Cennik — komunia lub chrzest",
  "cennik-slub": "Cennik — ślub lub wesele",
  "cennik-event": "Cennik — event",
  dojazd: "Sekcja dojazdu",
  lokalizacje: "Strona lokalizacji",
  "sticky-sitewide": "Stały przycisk „Sprawdź termin”"
};

function humanizeSource(rawSource: string): string {
  if (!rawSource) return "Formularz na stronie";

  const position = rawSource.endsWith("-gora")
    ? " — przycisk u góry"
    : rawSource.endsWith("-dol")
      ? " — przycisk na dole"
      : "";
  const normalized = rawSource.replace(/-(gora|dol)$/, "");

  return `${SOURCE_LABELS[normalized] ?? normalized.replaceAll("-", " ")}${position}`;
}

function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) return `tel:+48${digits}`;
  if (digits.length === 11 && digits.startsWith("48")) return `tel:+${digits}`;
  return `tel:${digits}`;
}

function extractClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string, now: number): boolean {
  for (const [key, value] of rateStore.entries()) {
    if (value.resetAt <= now) {
      rateStore.delete(key);
    }
  }

  const current = rateStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateStore.set(ip, current);
  return false;
}

export async function POST(request: Request) {
  try {
    const now = Date.now();
    const ip = extractClientIp(request);
    if (isRateLimited(ip, now)) {
      return NextResponse.json(
        { error: "Za dużo prób. Spróbuj ponownie za kilka minut." },
        { status: 429 }
      );
    }

    const rawBody = (await request.json()) as unknown;
    const parsed = contactBodySchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
    }

    const { name, email, phone, message, website, attribution } = parsed.data;

    // Honeypot field. If filled, treat as a successful no-op.
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    let env;
    try {
      env = getServerEnv();
    } catch (envError) {
      const details = envError instanceof Error ? envError.message : "unknown";
      console.error("Contact form configuration error:", details);
      return NextResponse.json(
        {
          error: `Formularz jest chwilowo niedostępny. Napisz bezpośrednio na ${SITE_CONFIG.email}.`
        },
        { status: 503 }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);

    const campaign = [attribution.utmSource, attribution.utmMedium, attribution.utmCampaign]
      .filter(Boolean)
      .join(" / ");
    const sourceLabel = humanizeSource(attribution.source);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error: resendError } = await resend.emails.send({
      from: env.RESEND_FROM,
      to: [env.CONTACT_TO],
      subject: `Nowe zapytanie: ${sourceLabel} — ${name}`,
      ...(email ? { replyTo: email } : {}),
      html: `
        <div style="margin:0;padding:28px 16px;background:#f5f0e9;color:#241f1b;font-family:Arial,sans-serif;line-height:1.6">
          <div style="max-width:640px;margin:0 auto;background:#fffdf9;border:1px solid #e6ddd2;border-radius:18px;overflow:hidden">
            <div style="padding:28px 30px;background:#1d1713;color:#fffaf2">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c9aa87">Janiczek Foto</p>
              <h1 style="margin:0;font-size:25px;line-height:1.25;font-weight:500">Nowe zapytanie</h1>
              <p style="margin:10px 0 0;color:#d8c9b9">${escapeHtml(sourceLabel)}</p>
            </div>

            <div style="padding:28px 30px">
              <table role="presentation" style="width:100%;border-collapse:collapse;font-size:16px">
                <tr>
                  <td style="width:92px;padding:0 12px 12px 0;color:#76685c;vertical-align:top">Imię</td>
                  <td style="padding:0 0 12px;font-weight:600">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:0 12px 12px 0;color:#76685c;vertical-align:top">Email</td>
                  <td style="padding:0 0 12px">${email ? `<a href="mailto:${safeEmail}" style="color:#7a5738">${safeEmail}</a>` : "nie podano"}</td>
                </tr>
                <tr>
                  <td style="padding:0 12px 0 0;color:#76685c;vertical-align:top">Telefon</td>
                  <td style="padding:0">${phone ? `<a href="${phoneHref(phone)}" style="color:#7a5738;font-weight:600">${safePhone}</a>` : "nie podano"}</td>
                </tr>
              </table>

              <div style="margin-top:26px;padding-top:24px;border-top:1px solid #e9e1d7">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8a796a">Wiadomość</p>
                <div style="font-size:17px;line-height:1.65">${safeMessage}</div>
              </div>

              <div style="margin-top:28px;padding:18px 20px;background:#f5f0e9;border-radius:12px;font-size:13px;color:#6f6257">
                <p style="margin:0 0 6px"><strong style="color:#3b332c">Miejsce kontaktu:</strong> ${escapeHtml(sourceLabel)}</p>
                <p style="margin:0${campaign || attribution.referrer ? " 0 6px" : ""}"><strong style="color:#3b332c">Pierwsza odwiedzona strona:</strong> ${escapeHtml(attribution.landingPath || "nieustalona")}</p>
                ${campaign ? `<p style="margin:0${attribution.referrer ? " 0 6px" : ""}"><strong style="color:#3b332c">Kampania:</strong> ${escapeHtml(campaign)}</p>` : ""}
                ${attribution.referrer ? `<p style="margin:0"><strong style="color:#3b332c">Wejście z:</strong> ${escapeHtml(attribution.referrer)}</p>` : ""}
              </div>
            </div>
          </div>
        </div>
      `
    });

    if (resendError) {
      console.error("Resend API error:", resendError);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
        { status: 502 }
      );
    }

    if (email) {
      const { error: confirmationError } = await resend.emails.send({
        from: env.RESEND_FROM,
        to: [email],
        subject: `Wiadomość dotarła — ${SITE_CONFIG.name}`,
        replyTo: env.CONTACT_TO,
        html: `
          <div style="margin:0;padding:28px 16px;background:#f5f0e9;color:#241f1b;font-family:Arial,sans-serif;line-height:1.65">
            <div style="max-width:600px;margin:0 auto;background:#fffdf9;border:1px solid #e6ddd2;border-radius:18px;padding:30px">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a7654">Janiczek Foto</p>
              <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;font-weight:500">Wiadomość dotarła</h1>
              <p>Cześć ${safeName},</p>
              <p>dziękuję za wiadomość. Odezwę się w ciągu 24 godzin — mailem lub telefonicznie.</p>
              <p style="margin-top:26px">Łukasz<br /><strong>${SITE_CONFIG.name}</strong></p>
            </div>
          </div>
        `
      });

      if (confirmationError) {
        console.error("Contact confirmation email error:", confirmationError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Nieprawidłowy format danych." }, { status: 400 });
    }

    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
