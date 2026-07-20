"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * Mobile-only fixed bottom call bar — the fastest conversion path is always
 * one thumb-tap away. The matching page spacer lives in the root layout so
 * the bar never covers content.
 */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-navy-900/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <a
        href={`tel:${siteConfig.phoneE164}`}
        onClick={() => track("phone_click", { location: "sticky_mobile_bar" })}
        className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-(--radius-btn) bg-blue-500 text-lg font-semibold text-white transition-colors active:bg-blue-600"
      >
        <Phone className="size-5" aria-hidden="true" />
        Call Now · {siteConfig.phone}
      </a>
    </div>
  );
}
