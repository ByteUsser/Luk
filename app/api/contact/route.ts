import { NextResponse } from "next/server";
import { Resend } from "resend";

type RequestBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    const body = (await request.json()) as RequestBody | null;
    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const message = body?.message?.trim();
    const website = body?.website?.trim();

    // Honeypot field. If filled, treat as a successful no-op.
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Brak wymaganych pól." }, { status: 400 });
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Imię ma nieprawidłową długość." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Podaj poprawny adres email." }, { status: 400 });
    }

    if (message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { error: "Wiadomość musi mieć od 10 do 3000 znaków." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO ?? "janiczek.office@gmail.com";
    const from = process.env.RESEND_FROM ?? "Janiczek Foto <onboarding@resend.dev>";

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Brak konfiguracji RESEND_API_KEY w zmiennych środowiskowych."
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to: [to],
      subject: `Nowa wiadomość portfolio od ${name}`,
      replyTo: email,
      html: `
        <h2>Nowa wiadomość z formularza</h2>
        <p><strong>Imię:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
