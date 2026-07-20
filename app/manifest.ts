import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Emit a static manifest.webmanifest during `output: export`.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7fafc",
    theme_color: "#062f49",
    // TODO: add 192/512 PNG icons exported from the final logo
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
