import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Emit a static robots.txt during `output: export`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
