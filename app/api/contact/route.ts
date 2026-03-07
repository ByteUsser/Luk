import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getServerEnv } from "@/lib/server-env";

const contactBodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(3000),
  website: z.string().trim().max(200).optional().default("")
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

    const { name, email, message, website } = parsed.data;

    // Honeypot field. If filled, treat as a successful no-op.
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const env = getServerEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    const { error: resendError } = await resend.emails.send({
      from: env.RESEND_FROM,
      to: [env.CONTACT_TO],
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

    if (resendError) {
      console.error("Resend API error:", resendError);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
        { status: 502 }
      );
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
