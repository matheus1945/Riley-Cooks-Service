"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { track } from "@/lib/analytics";
import { cn, isValidCanadianPhone } from "@/lib/utils";
import { CallButton } from "@/components/ui/TrackedLinks";

type QuoteFormProps = {
  /** Meaningful placement identifier for tracking, e.g. "home_final_cta". */
  location: string;
};

type FieldName = "name" | "phone" | "service" | "area" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const MIN_FILL_TIME_MS = 3000;

const inputClasses = cn(
  "w-full min-h-11 rounded-(--radius-btn) border border-mist-200 bg-white px-3.5 py-2.5 text-base text-ink-900",
  "placeholder:text-ink-500 focus:border-blue-500",
  "aria-[invalid=true]:border-red-600",
);

function validateField(name: FieldName, value: string): string | undefined {
  switch (name) {
    case "name":
      return value.trim() ? undefined : "Please enter your name.";
    case "phone":
      if (!value.trim()) return "Please enter your phone number.";
      return isValidCanadianPhone(value)
        ? undefined
        : "That doesn't look like a valid Canadian phone number.";
    case "service":
      return value ? undefined : "Please choose a service.";
    case "email":
      if (!value.trim()) return undefined; // optional
      return /^\S+@\S+\.\S+$/.test(value)
        ? undefined
        : "That doesn't look like a valid email address.";
    default:
      return undefined;
  }
}

export function QuoteForm({ location }: QuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleStart = () => {
    if (!started.current) {
      started.current = true;
      track("form_start", { location });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name as FieldName;
    if (!name || target.type === "hidden") return;
    const message = validateField(name, target.value);
    setErrors((prev) => {
      if (prev[name] === message) return prev;
      return { ...prev, [name]: message };
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      area: String(data.get("area") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors: Errors = {};
    (Object.keys(values) as FieldName[]).forEach((field) => {
      const message = validateField(field, values[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Spam protection: honeypot + minimum fill time. Bots see a normal
    // "success"; nothing is sent and no conversion event fires.
    const honeypot = String(data.get("company") ?? "");
    const tooFast =
      mountedAt.current === null ||
      Date.now() - mountedAt.current < MIN_FILL_TIME_MS;
    if (honeypot || tooFast) {
      setStatus("success");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      // TODO: set NEXT_PUBLIC_FORM_ENDPOINT (Formspree / Web3Forms / n8n webhook)
      console.warn("NEXT_PUBLIC_FORM_ENDPOINT is not configured.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...values,
          source: "cookspropertysvcs.com",
          submittedFrom: location,
        }),
      });
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      setStatus("success");
      // Primary conversion — fires only after a confirmed successful submit.
      track("generate_lead", { location, service: values.service });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-(--radius-card) border border-mist-200 bg-white p-8 text-center shadow-(--shadow-card)"
      >
        <CheckCircle2
          className="mx-auto size-12 text-(--color-success)"
          aria-hidden="true"
        />
        <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">
          Thanks! Your request is in.
        </h3>
        <p className="mt-2 leading-relaxed text-ink-700">
          {siteConfig.responsePromise}. If it&apos;s urgent, call{" "}
          {siteConfig.owner.name.split(" ")[0]} directly.
        </p>
        <div className="mt-6 flex justify-center">
          <CallButton location={`${location}_success`} variant="secondary" />
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={handleStart}
      noValidate
      className="rounded-(--radius-card) bg-white p-6 shadow-(--shadow-card) md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="mb-1.5 block text-sm font-medium text-ink-900">
            Name <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            onBlur={handleBlur}
            className={inputClasses}
          />
          {errors.name && (
            <p id="quote-name-error" className="mt-1.5 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-medium text-ink-900">
            Phone <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            onBlur={handleBlur}
            className={inputClasses}
          />
          {errors.phone && (
            <p id="quote-phone-error" className="mt-1.5 text-sm text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-service" className="mb-1.5 block text-sm font-medium text-ink-900">
            Service <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <select
            id="quote-service"
            name="service"
            required
            aria-required="true"
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "quote-service-error" : undefined}
            onBlur={handleBlur}
            className={inputClasses}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.service && (
            <p id="quote-service-error" className="mt-1.5 text-sm text-red-700">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-area" className="mb-1.5 block text-sm font-medium text-ink-900">
            Area / Neighbourhood
          </label>
          <input
            id="quote-area"
            name="area"
            type="text"
            autoComplete="address-level2"
            onBlur={handleBlur}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="quote-email" className="mb-1.5 block text-sm font-medium text-ink-900">
            Email <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            onBlur={handleBlur}
            className={inputClasses}
          />
          {errors.email && (
            <p id="quote-email-error" className="mt-1.5 text-sm text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="quote-message" className="mb-1.5 block text-sm font-medium text-ink-900">
            Message <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <textarea
            id="quote-message"
            name="message"
            rows={3}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="quote-company">Company</label>
        <input
          id="quote-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <div className="mt-5 rounded-(--radius-btn) border border-red-700/30 bg-red-700/5 p-4 text-sm leading-relaxed text-ink-900">
            <p className="font-semibold text-red-700">
              Sorry, your request didn&apos;t go through.
            </p>
            <p className="mt-1">
              Your details are still filled in below, so you can try again, or
              skip the form and call us right away.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-(--radius-btn) bg-blue-500 px-6 text-base font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-default disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            siteConfig.primaryCta
          )}
        </button>
        <CallButton location={`${location}_form`} variant="secondary" className="flex-1" />
      </div>
      <p className="mt-3 text-center text-sm text-ink-500">
        {siteConfig.responsePromise}. No obligation.
      </p>
    </form>
  );
}
