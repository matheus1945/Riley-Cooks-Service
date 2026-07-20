import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/ui/TrackedLinks";

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[70svh] items-center bg-navy-900 pt-20">
      <Container className="py-20 text-center">
        <p className="text-[0.8125rem] font-medium tracking-[0.16em] text-cyan-400 uppercase">
          404: Page not found
        </p>
        <h1 className="font-display mt-4 text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-none font-extrabold tracking-tight text-white">
          That page washed away.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-mist-100">
          The page you&apos;re looking for doesn&apos;t exist, but a free
          quote is only a click away.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Back to home
          </Link>
          <CallButton location="not_found" onDark />
        </div>
      </Container>
    </section>
  );
}
