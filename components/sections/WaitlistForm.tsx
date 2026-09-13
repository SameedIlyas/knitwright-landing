"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type FormEvent } from "react";
import { CATEGORIES, HERO, VOLUMES } from "@/lib/content";
import { fieldErrors, waitlistSchema, type FieldErrors } from "@/lib/waitlist";
import { ArrowIcon } from "@/components/ui/primitives";

type Status = "idle" | "sending" | "done" | "error";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WaitlistForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = waitlistSchema.safeParse(raw);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setMessage("Check the highlighted fields.");
      return;
    }
    setErrors({});
    setMessage("");
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
      if (!res.ok || !json.ok) {
        setErrors(json.fields ?? {});
        setMessage(json.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setCategory(parsed.data.category);
      setStatus("done");
    } catch {
      setMessage("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const id = (k: string) => `${uid}-${k}`;
  const invalid = (k: keyof FieldErrors) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": id(`${k}-err`) } : {};
  const input =
    "w-full rounded-2xl border border-hairline bg-surface px-4 py-3.5 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faint focus:border-ink focus:shadow-[0_0_0_4px_rgba(15,16,18,0.06)] aria-[invalid=true]:border-[#c2362b]";
  const label = "eyebrow mb-2 block text-muted";
  const select = "select-arrow pr-10";

  return (
    <div className="relative">
      <p className="sr-only" aria-live="polite">
        {status === "done" ? "You're on the list." : message}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex min-h-[28rem] flex-col items-start justify-center gap-4 rounded-[1.75rem] bg-ok-wash p-8 sm:p-10"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-ok text-white">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="text-3xl font-medium tracking-tight">You&apos;re on the list.</h3>
            <p className="max-w-[40ch] leading-relaxed text-ink-2">
              We&apos;ll be in touch when a slot opens for {category.toLowerCase()}. Want to move up? Reply to the confirmation
              email with a reference photo of what you want made.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -8 }} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id("email")} className={label}>Email</label>
                <input id={id("email")} name="email" type="email" autoComplete="email" required className={input} placeholder="you@brand.com" {...invalid("email")} />
                <FieldError id={id("email-err")} msg={errors.email} />
              </div>
              <div>
                <label htmlFor={id("brand")} className={label}>Brand name</label>
                <input id={id("brand")} name="brand" type="text" autoComplete="organization" required className={input} {...invalid("brand")} />
                <FieldError id={id("brand-err")} msg={errors.brand} />
              </div>
              <div>
                <label htmlFor={id("category")} className={label}>What do you make?</label>
                <select id={id("category")} name="category" required defaultValue="" className={`${input} ${select}`} {...invalid("category")}>
                  <option value="" disabled>Choose one</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <FieldError id={id("category-err")} msg={errors.category} />
              </div>
              <div>
                <label htmlFor={id("volume")} className={label}>Annual production volume</label>
                <select id={id("volume")} name="volume" required defaultValue="" className={`${input} ${select}`} {...invalid("volume")}>
                  <option value="" disabled>Choose one</option>
                  {VOLUMES.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <FieldError id={id("volume-err")} msg={errors.volume} />
              </div>
            </div>
            <div>
              <label htmlFor={id("details")} className={label}>
                What are you trying to get made? <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <textarea id={id("details")} name="details" rows={2} className={`${input} resize-none`} {...invalid("details")} />
              <FieldError id={id("details-err")} msg={errors.details} />
            </div>
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={id("website")}>Website</label>
              <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="thread-ring group inline-flex h-13 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-ink pl-6 pr-2 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Request early access"}
                <span className="grid size-9 place-items-center rounded-full bg-white/12">
                  <ArrowIcon />
                </span>
              </button>
              <p className="eyebrow text-muted">{HERO.microcopy}</p>
            </div>
            {status === "error" && message ? <p className="text-sm text-[#c2362b]">{message}</p> : null}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 border-t border-[#c2362b]/40 pt-1.5 text-sm text-[#c2362b]">
      {msg}
    </p>
  );
}
