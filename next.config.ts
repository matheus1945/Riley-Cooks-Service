import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build. Every route is static/SSG (no server code, no runtime
  // request handling), so `next build` emits a plain `out/` folder that deploys
  // straight to Cloudflare Pages with no adapter or serverless runtime.
  output: "export",

  // Static export has no Next.js image-optimization server, so images are
  // served as-is. They are pre-sized/compressed in public/images for the web,
  // so this keeps them fast without an optimizer.
  images: { unoptimized: true },

  // Lets the dev server serve JS/HMR to devices on the local network
  // (e.g. testing on a phone at http://10.0.0.195:3000) instead of only
  // localhost. Dev-only, ignored by the production build.
  allowedDevOrigins: ["10.0.0.195"],
};

export default nextConfig;
