import type { Metadata } from "next";
import { faqPageSchema, serviceSchemas } from "@/lib/schema";
import { socialMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceAreaTeaser } from "@/components/sections/ServiceAreaTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Divider } from "@/components/ui/Divider";

const homeDescription =
  "Licensed, insured window & gutter cleaning, pressure washing and soft washing in Victoria, BC. 5.0-rated and owner-operated. Get your free quote today.";

export const metadata: Metadata = {
  title: {
    absolute: "Window, Gutter & Exterior Cleaning in Victoria, BC | Cooks Property Services",
  },
  description: homeDescription,
  alternates: { canonical: "/" },
  ...socialMeta({
    title: "Window, Gutter & Exterior Cleaning in Victoria, BC",
    description: homeDescription,
    path: "/",
  }),
};

export default function Home() {
  return (
    <>
      <JsonLd data={[faqPageSchema(), ...serviceSchemas()]} />
      <Hero />
      <Services />
      <BeforeAfter />
      <WhyChooseUs />
      <Divider className="bg-mist-100" />
      <Reviews />
      <ServiceAreaTeaser />
      <Divider className="bg-white" />
      <Faq />
      <FinalCta />
    </>
  );
}
