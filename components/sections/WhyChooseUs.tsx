import Image from "next/image";
import { MapPin, ShieldCheck, Star, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const valueProps = [
  {
    icon: UserCheck,
    title: "You deal directly with the owner",
    text: `${siteConfig.owner.name.split(" ")[0]} personally oversees the work. No call centres, no anonymous crews.`,
  },
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    text: `Your property is protected by ${siteConfig.trust.insuranceCoverage} in liability coverage.`,
  },
  {
    icon: MapPin,
    title: "Local to Vancouver Island",
    text: "Familiar with the coastal climate: the moss, moisture, and buildup that come with living here.",
  },
  {
    icon: Star,
    title: "5.0-star rated",
    text: "Trusted by local residential and commercial clients across Greater Victoria.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="bg-mist-100 py-16 md:py-24"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-(--radius-card) shadow-(--shadow-card)">
              <Image
                src="/images/gallery/window-cleaning-crew-at-work.jpg"
                alt="Cleaning second-storey windows with a water-fed pole at a Greater Victoria home"
                fill
                sizes="(min-width: 1024px) 448px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading
                id="why-us-heading"
                eyebrow="Why choose us"
                title="An owner-operated difference"
                supporting="When the owner is on the job, the details get done right. That's the whole point."
                align="left"
              />
            </Reveal>
            <ul className="mt-8 space-y-6">
              {valueProps.map((prop) => (
                <li key={prop.title}>
                  <Reveal className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                      <prop.icon className="size-5 text-blue-600" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-navy-900">
                        {prop.title}
                      </h3>
                      <p className="mt-1 leading-relaxed text-ink-700">{prop.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
