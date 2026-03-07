import "server-only";
import { z } from "zod";
import { SITE_CONFIG } from "@/lib/site-config";

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "Brak RESEND_API_KEY"),
  RESEND_FROM: z.string().min(1).default(`${SITE_CONFIG.name} <onboarding@resend.dev>`),
  CONTACT_TO: z.string().email().default(SITE_CONFIG.email)
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = serverEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    CONTACT_TO: process.env.CONTACT_TO
  });

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`Nieprawidłowa konfiguracja zmiennych środowiskowych: ${details}`);
  }

  cachedEnv = parsed.data;
  return parsed.data;
}

