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

type FieldName = "name" | "phone" | "services" | "address" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const MIN_FILL_TIME_MS = 3000;

const WINDOW_CLEANING_SLUG = "window-cleaning";

/** Checkbox options for the multi-select services field. */
const serviceOptions = [
  ...services.map(({ slug, name }) => ({ slug, name })),
  { slug: "other", name: "Other" },
];

/** Residential properties rarely run past a few storeys, so this stays short. */
const storiesOptions = ["1", "2", "3", "4+"];

/** Riley's requested bucket shape for window count on the quote form. */
const windowCountOptions = ["0–10", "11–20", "21–30", "31–40", "41+"];

const inputClasses = cn(
  "w-full min-h-11 rounded-(--radius-btn) border border-mist-200 bg-white px-3.5 py-2.5 text-base text-ink-900",
  "placeholder:text-ink-500 focus:border-blue-500",
  "aria-[invalid=true]:border-red-600",
);

const chipClasses = cn(
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium select-none",
  "border-mist-200 bg-white text-ink-700 transition-colors hover:border-blue-300",
  "has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700",
  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-500",
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
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number | null>(null);
  const started = useRef(false);

  const showWindowCleaningFields = selectedServices.includes(WINDOW_CLEANING_SLUG);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleStart = () => {
    if (!started.current) {
      started.current = true;
      track("form_start", { location });
    }
  };

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug],
    );
    setErrors((prev) => (prev.services ? { ...prev, services: undefined } : prev));
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
    const serviceNames = selectedServices.map(
      (slug) => serviceOptions.find((option) => option.slug === slug)?.name ?? slug,
    );
    const values = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      address: String(data.get("address") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      stories: String(data.get("stories") ?? ""),
      windowCount: String(data.get("windowCount") ?? ""),
    };

    const nextErrors: Errors = {};
    (["name", "phone", "address", "email", "message"] as const).forEach((field) => {
      const message = validateField(field, values[field]);
      if (message) nextErrors[field] = message;
    });
    if (selectedServices.length === 0) {
      nextErrors.services = "Please choose at least one service.";
    }
    setErrors(nextErrors);
    const fieldOrder: FieldName[] = ["name", "phone", "services", "address", "email", "message"];
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      if (firstInvalid === "services") {
        form.querySelector<HTMLInputElement>('input[name="services"]')?.focus();
      } else {
        (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      }
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
          // Comma-joined so it drops straight into the n8n email template
          // like every other field, instead of arriving as a raw array.
          services: serviceNames.join(", "),
          source: "cookspropertysvcs.com",
          submittedFrom: location,
        }),
      });
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      setStatus("success");
      // Primary conversion — fires only after a confirmed successful submit.
      track("generate_lead", { location, services: serviceNames.join(", ") });
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
      id="quote-form"
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

        <div className="md:col-span-2">
          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-ink-900">
              Services <span aria-hidden="true" className="text-red-700">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((option) => (
                <label key={option.slug} className={chipClasses}>
                  <input
                    type="checkbox"
                    name="services"
                    value={option.slug}
                    checked={selectedServices.includes(option.slug)}
                    onChange={() => toggleService(option.slug)}
                    aria-describedby={errors.services ? "quote-services-error" : undefined}
                    className="sr-only"
                  />
                  {option.name}
                </label>
              ))}
            </div>
            {errors.services && (
              <p id="quote-services-error" className="mt-1.5 text-sm text-red-700">
                {errors.services}
              </p>
            )}
          </fieldset>
        </div>

        {showWindowCleaningFields && (
          <div className="grid gap-5 sm:grid-cols-2 md:col-span-2">
            <div>
              <label htmlFor="quote-stories" className="mb-1.5 block text-sm font-medium text-ink-900">
                Stories <span className="font-normal text-ink-500">(optional)</span>
              </label>
              <select id="quote-stories" name="stories" defaultValue="" className={inputClasses}>
                <option value="" disabled>
                  Select…
                </option>
                {storiesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quote-window-count" className="mb-1.5 block text-sm font-medium text-ink-900">
                Number of windows <span className="font-normal text-ink-500">(optional)</span>
              </label>
              <select id="quote-window-count" name="windowCount" defaultValue="" className={inputClasses}>
                <option value="" disabled>
                  Select…
                </option>
                {windowCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="quote-address" className="mb-1.5 block text-sm font-medium text-ink-900">
            Address
          </label>
          <input
            id="quote-address"
            name="address"
            type="text"
            autoComplete="street-address"
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
