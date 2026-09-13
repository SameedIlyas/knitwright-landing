import { z } from "zod";
import { CATEGORIES, VOLUMES } from "@/lib/content";

/** Shared by the form (client-side validation) and the route handler (the real gate). */
export const waitlistSchema = z.object({
  email: z.string().trim().min(1, "Enter your email.").max(254).email("Enter a valid email address."),
  brand: z.string().trim().min(1, "Enter your brand name.").max(120, "Keep it under 120 characters."),
  category: z.enum(CATEGORIES, { message: "Choose what you make." }),
  volume: z.enum(VOLUMES, { message: "Choose your annual volume." }),
  details: z.string().trim().max(1000, "Keep it under 1,000 characters.").optional().default(""),
  // Honeypot: real people never see or fill this. Accepted here so the route can
  // answer a bot with a quiet success instead of telling it which field gave it away.
  website: z.string().max(500).optional().default(""),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type FieldErrors = Partial<Record<keyof WaitlistInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof WaitlistInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
