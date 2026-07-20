"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type SliderImage = {
  src: string;
  alt: string;
};

type BeforeAfterSliderProps = {
  before: SliderImage;
  after: SliderImage;
  /** Short caption naming the job, e.g. "Paver driveway — pressure washing". */
  caption: string;
};

/**
 * Dependency-free draggable before/after comparison. Mouse drag, touch drag
 * (vertical page scroll preserved via touch-action: pan-y), and keyboard on
 * the focusable handle. Both images share identical dimensions, so the
 * pre-hydration fallback (divider parked at 50%) causes no layout shift.
 */
export function BeforeAfterSlider({
  before,
  after,
  caption,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const positionFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    positionFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) positionFromClientX(event.clientX);
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = 5;
    let next: number | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = Math.max(0, position - step);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = Math.min(100, position + step);
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = 100;
    }
    if (next !== null) {
      event.preventDefault();
      setPosition(next);
    }
  };

  return (
    <figure className="w-full">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[3/4] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-(--radius-card) select-none"
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
          draggable={false}
        />
        {/* After image occupies the region right of the divider */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Divider + handle */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90"
          style={{ left: `${position}%` }}
        />
        <button
          type="button"
          role="slider"
          aria-label={`Compare before and after: ${caption}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(100 - position)}% of the after photo revealed`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-navy-900/80 text-white shadow-(--shadow-card)"
          style={{ left: `${position}%` }}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 8-4 4 4 4" />
            <path d="m15 8 4 4-4 4" />
          </svg>
        </button>

        {/* Labels */}
        <span className="absolute top-3 left-3 rounded-full bg-navy-900/70 px-2.5 py-1 text-xs font-medium text-mist-200">
          Before
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-cyan-500 px-2.5 py-1 text-xs font-semibold text-navy-900">
          After
        </span>
      </div>
      <figcaption className="mt-3 text-center text-sm text-mist-200">
        {caption}
      </figcaption>
    </figure>
  );
}
