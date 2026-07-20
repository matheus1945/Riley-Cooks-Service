import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { QuoteCta, CallButton } from "@/components/ui/TrackedLinks";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="on-dark relative flex min-h-[92svh] items-center overflow-hidden bg-navy-900"
    >
      {/* Real job photo: freshly cleaned glass facade (LCP element) */}
      <Image
        src="/images/hero-window-cleaning-victoria.jpg"
        alt="Freshly cleaned floor-to-ceiling windows on a modern building in Greater Victoria, BC"
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/40"
      />

      <Container className="relative py-28 md:py-36">
        <p className="text-[0.8125rem] font-medium tracking-[0.16em] text-cyan-400 uppercase">
          Victoria, BC · Licensed &amp; Insured
        </p>
        <h1
          id="hero-heading"
          className="font-display mt-4 max-w-2xl text-[clamp(2.5rem,1.8rem+3.5vw,4rem)] leading-none font-extrabold tracking-tight text-white"
        >
          Make your property shine.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-100 md:text-xl">
          Professional window cleaning, gutter cleaning, pressure washing, soft
          washing, and exterior property care across Greater Victoria.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <QuoteCta location="hero" size="lg" />
          <CallButton location="hero" size="lg" onDark />
        </div>
      </Container>
    </section>
  );
}
