import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Exterior services, done properly"
            supporting="Every service below is available across Greater Victoria for residential and commercial properties, and every quote is free."
          />
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="h-full">
              <Reveal className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-(--radius-card) border border-mist-200 border-l-4 border-l-blue-500 bg-white p-6 shadow-(--shadow-card) transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) motion-reduce:transform-none"
                >
                  <ServiceIcon name={service.icon} className="size-7 text-blue-500" />
                  <h3 className="font-display mt-4 text-xl font-semibold text-navy-900">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink-700">
                    {service.short}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-700">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-cyan-500"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-blue-600">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
