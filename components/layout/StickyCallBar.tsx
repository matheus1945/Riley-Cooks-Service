"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Mobile-only fixed bottom call bar — the fastest conversion path is always
 * one thumb-tap away. The matching page spacer lives in the root layout so
 * the bar never covers content. Hidden while the quote form is in view: the
 * form has its own Call Now button right next to Submit, so showing both at
 * once is one too many buttons.
 */
export function StickyCallBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const quoteForm = document.getElementById("quote-form");
    if (!quoteForm) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(quoteForm);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 bg-navy-900/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 md:hidden",
        hidden && "translate-y-full",
      )}
    >
      <a
        href={`tel:${siteConfig.phoneE164}`}
        onClick={() => track("phone_click", { location: "sticky_mobile_bar" })}
        tabIndex={hidden ? -1 : undefined}
        className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-(--radius-btn) bg-blue-500 text-lg font-semibold text-white transition-colors active:bg-blue-600"
      >
        <Phone className="size-5" aria-hidden="true" />
        Call Now · {siteConfig.phone}
      </a>
    </div>
  );
}
