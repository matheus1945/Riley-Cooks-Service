import Image from "next/image";
import Link from "next/link";
import { Clock, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/content/service-areas";
import { PhoneTextLink } from "@/components/ui/TrackedLinks";

const quickNav = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Get a Free Quote", href: "/#quote" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="on-dark bg-navy-900 text-mist-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* Business + trust */}
        <div>
          <Image
            src="/images/logo-white.png"
            alt={siteConfig.name}
            width={175}
            height={121}
            className="h-16 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-mist-200">
            Professional window, gutter, and exterior cleaning across Greater
            Victoria. Owner-operated, and built on the promise that{" "}
            {siteConfig.tagline.toLowerCase().replace(/\.$/, "")}.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <PhoneTextLink location="footer" className="text-white" />
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 break-all hover:text-white hover:underline"
              >
                <Mail className="size-4 shrink-0 text-cyan-400" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-cyan-400" aria-hidden="true" />
              {siteConfig.businessHours[0].label}
            </li>
          </ul>
        </div>

        {/* Service areas (local SEO internal links) */}
        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
            Service Areas
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="text-mist-200 hover:text-white hover:underline"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick nav */}
        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-mist-200 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-mist-200 md:flex-row md:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <Link href="/privacy" className="hover:text-white hover:underline">
            Privacy &amp; Analytics Disclosure
          </Link>
        </div>
      </div>
    </footer>
  );
}
