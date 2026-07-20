"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

const CONSENT_STORAGE_KEY = "cps-consent";

const hasAnyAnalytics = Boolean(
  process.env.NEXT_PUBLIC_GTM_ID ||
    process.env.NEXT_PUBLIC_GA4_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID,
);

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function applyConsent(granted: boolean) {
  const w = window as ConsentWindow;
  if (typeof w.gtag === "function") {
    const state = granted ? "granted" : "denied";
    w.gtag("consent", "update", {
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  }
  if (typeof w.fbq === "function") {
    w.fbq("consent", granted ? "grant" : "revoke");
  }
}

const subscribeNoop = () => () => {};

function readStoredConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    // Storage unavailable: leave everything denied, never show the banner.
    return "storage-unavailable";
  }
}

/**
 * Small non-blocking Accept/Decline banner, shown only when analytics or
 * advertising tags are actually configured and no choice is stored yet.
 */
export function ConsentBanner() {
  const [dismissed, setDismissed] = useState(false);
  // Hidden during SSR ("server" sentinel); visible on the client only while
  // no choice has been stored.
  const storedConsent = useSyncExternalStore(
    subscribeNoop,
    readStoredConsent,
    () => "server",
  );
  const visible = hasAnyAnalytics && !dismissed && storedConsent === null;

  if (!visible) return null;

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // Ignore storage failures; the in-page consent update still applies.
    }
    applyConsent(granted);
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-md rounded-(--radius-card) border border-mist-200 bg-white p-4 shadow-(--shadow-card-hover) md:inset-x-auto md:right-6 md:bottom-6"
    >
      <p className="text-sm leading-relaxed text-ink-700">
        We use cookies to understand how the site is used and to measure our
        ads. Analytics stay off unless you accept.{" "}
        <Link href="/privacy" className="font-medium text-blue-600 underline">
          Privacy details
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose(true)}
          className="min-h-11 flex-1 cursor-pointer rounded-(--radius-btn) bg-blue-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="min-h-11 flex-1 cursor-pointer rounded-(--radius-btn) border-2 border-navy-700 px-4 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-700/5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
