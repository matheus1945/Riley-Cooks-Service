import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type SocialMetaInput = {
  /** Page-specific title (without the brand suffix). */
  title: string;
  description: string;
  /** Canonical path, e.g. "/" or "/services/window-cleaning". */
  path: string;
};

/**
 * Builds a complete openGraph + twitter block for a page.
 *
 * Next.js shallow-merges metadata, so a page that sets its own `openGraph`
 * REPLACES the layout's, silently dropping the inherited og:image, og:type,
 * og:site_name, and og:locale. Spreading this helper into a page's metadata
 * keeps every social tag (image included) present and page-specific.
 */
export function socialMeta({
  title,
  description,
  path,
}: SocialMetaInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: siteConfig.name,
      title,
      description,
      url: path,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
