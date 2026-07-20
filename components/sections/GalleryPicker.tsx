"use client";

import { useState } from "react";
import type { GalleryPair } from "@/content/gallery";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { SplitThumbnail } from "./SplitThumbnail";

type GalleryPickerProps = {
  items: GalleryPair[];
};

/**
 * Interactive before/after picker: choosing a thumbnail below swaps the
 * featured comparison above it. The slider is remounted per selection (via
 * `key`) so its drag position always resets to 50 for the new pair.
 */
export function GalleryPicker({ items }: GalleryPickerProps) {
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <div>
      <div className="mx-auto max-w-md">
        <BeforeAfterSlider
          key={selected.id}
          before={selected.before}
          after={selected.after}
          caption={`${selected.label}, ${selected.service}, Greater Victoria`}
        />
      </div>
      <p aria-live="polite" className="sr-only">
        Now comparing: {selected.label}, {selected.service}
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-3" role="list">
        {items.map((item) => (
          <li key={item.id} className="w-[calc(50%-0.375rem)] shrink-0 sm:w-[calc(25%-0.5625rem)]">
            <button
              type="button"
              aria-pressed={item.id === selectedId}
              onClick={() => setSelectedId(item.id)}
              className="group w-full cursor-pointer text-left"
            >
              <SplitThumbnail
                before={item.before}
                after={item.after}
                selected={item.id === selectedId}
              />
              <span className="mt-2 block text-xs font-medium text-mist-200 group-hover:text-white">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
