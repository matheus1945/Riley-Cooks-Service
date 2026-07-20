"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";
import { cn } from "@/lib/utils";

type QuoteCtaProps = {
  /** Meaningful placement identifier, e.g. "header", "hero", "service_card_window-cleaning". */
  location: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** Primary conversion CTA — always "Get a Free Quote", always tracked. */
export function QuoteCta({
  location,
  variant = "primary",
  size = "md",
  onDark,
  className,
  children,
}: QuoteCtaProps) {
  return (
    <Button
      href="/#quote"
      variant={variant}
      size={size}
      onDark={onDark}
      className={className}
      onClick={() => track("cta_click", { location })}
    >
      {children ?? siteConfig.primaryCta}
    </Button>
  );
}

type CallButtonProps = {
  location: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  className?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
};

/** "Call Now" button with a real tel: href and phone_click tracking. */
export function CallButton({
  location,
  variant = "secondary",
  size = "md",
  onDark,
  className,
  withIcon = true,
  children,
}: CallButtonProps) {
  return (
    <Button
      href={`tel:${siteConfig.phoneE164}`}
      variant={variant}
      size={size}
      onDark={onDark}
      className={className}
      onClick={() => track("phone_click", { location })}
    >
      {withIcon && <Phone className="size-4.5" aria-hidden="true" />}
      {children ?? "Call Now"}
    </Button>
  );
}

type PhoneTextLinkProps = {
  location: string;
  className?: string;
  children?: React.ReactNode;
};

/** Plain text phone link (header, footer, inline copy). */
export function PhoneTextLink({
  location,
  className,
  children,
}: PhoneTextLinkProps) {
  return (
    <a
      href={`tel:${siteConfig.phoneE164}`}
      className={cn("font-semibold underline-offset-4 hover:underline", className)}
      onClick={() => track("phone_click", { location })}
    >
      {children ?? siteConfig.phone}
    </a>
  );
}

type QuoteTextLinkProps = {
  location: string;
  className?: string;
  children?: React.ReactNode;
};

/** Subtle quote link (e.g. on service cards). */
export function QuoteTextLink({
  location,
  className,
  children,
}: QuoteTextLinkProps) {
  return (
    <Link
      href="/#quote"
      className={cn(
        "font-semibold text-blue-600 underline-offset-4 hover:underline",
        className,
      )}
      onClick={() => track("cta_click", { location })}
    >
      {children ?? siteConfig.primaryCta}
    </Link>
  );
}
