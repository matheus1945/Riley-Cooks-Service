"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { QuoteCta, PhoneTextLink } from "@/components/ui/TrackedLinks";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  // Gallery link is rendered because the before/after section ships with
  // confirmed real job photos (see components/sections/BeforeAfter.tsx).
  { label: "Gallery", href: "/#gallery" },
  { label: "Areas", href: "/#areas" },
  { label: "Reviews", href: "/#reviews" },
];

/**
 * Hash links jump to a homepage section (rendered as plain <a> so they work
 * from any page); real page routes use <Link> to satisfy Next's internal-link
 * rule and get client-side navigation.
 */
function isHashLink(href: string) {
  return href.includes("#");
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clicking the logo always returns to the hero. On the homepage that means a
  // scroll to the top (no wasted navigation); on any other page the Link
  // navigates to "/", which lands at the top.
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (pathname === "/") {
      event.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300",
        scrolled || menuOpen
          ? "bg-navy-900/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex shrink-0 items-center"
          aria-label={`${siteConfig.name} home`}
        >
          {/* White logo treatment: the header always sits on navy. */}
          <Image
            src="/images/logo-white.png"
            alt={siteConfig.name}
            width={175}
            height={121}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            isHashLink(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mist-100 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mist-100 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <PhoneTextLink location="header" className="text-white" />
          <QuoteCta location="header" size="sm" />
        </div>

        {/* Mobile: tap-to-call + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${siteConfig.phoneE164}`}
            onClick={() => track("phone_click", { location: "header_mobile" })}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-(--radius-btn) bg-blue-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-(--radius-btn) text-white transition-colors hover:bg-white/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-white/10 bg-navy-900/95 backdrop-blur-sm lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
          {navLinks.map((link) =>
            isHashLink(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-(--radius-btn) px-2 py-3 text-base font-medium text-mist-100 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-(--radius-btn) px-2 py-3 text-base font-medium text-mist-100 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            href="/service-areas"
            onClick={() => setMenuOpen(false)}
            className="rounded-(--radius-btn) px-2 py-3 text-base font-medium text-mist-100 hover:bg-white/10 hover:text-white"
          >
            All Service Areas
          </Link>
          <div className="mt-3 border-t border-white/10 pt-4">
            <QuoteCta location="header_mobile_menu" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
