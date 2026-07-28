export type GalleryPair = {
  id: string;
  service: string;
  label: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export type JobPhoto = {
  src: string;
  alt: string;
  label: string;
};

/**
 * Only confirmed same-location before/after pairs from the real job photo
 * set. Never pair unrelated before/after shots here — that would imply a
 * transformation that wasn't actually documented together. Add more pairs
 * as real matched photos come in; the gallery picker scales automatically.
 */
export const galleryPairs: GalleryPair[] = [
  {
    id: "paver-driveway",
    service: "Pressure Washing",
    label: "Paver Driveway",
    before: {
      src: "/images/before-after/paver-before.jpg",
      alt: "Paver driveway covered in leaves, moss, and grime before pressure washing",
    },
    after: {
      src: "/images/before-after/paver-after.jpg",
      alt: "The same paver driveway uniform and clean after pressure washing",
    },
  },
  {
    id: "deck",
    service: "Pressure Washing",
    label: "Composite Deck",
    before: {
      src: "/images/before-after/deck-before.jpg",
      alt: "Composite deck stained with dirt and marks before washing",
    },
    after: {
      src: "/images/before-after/deck-after.jpg",
      alt: "Same composite deck clean and evenly toned after washing",
    },
  },
  {
    id: "deck-hottub",
    service: "Pressure Washing",
    label: "Composite Deck",
    before: {
      src: "/images/before-after/deck-hottub-before.jpg",
      alt: "Composite deck boards around a hot tub covered in dirt and grime before washing",
    },
    after: {
      src: "/images/before-after/deck-hottub-after.jpg",
      alt: "The same deck boards around the hot tub clean and evenly toned after washing",
    },
  },
  {
    id: "gutter",
    service: "Gutter Cleaning",
    label: "Gutter Debris",
    before: {
      src: "/images/before-after/gutter-before.jpg",
      alt: "Roof gutter packed with pine needles and debris before cleaning",
    },
    after: {
      src: "/images/before-after/gutter-after.jpg",
      alt: "The same roof gutter clear of debris after cleaning",
    },
  },
  {
    id: "skylight",
    service: "Window Cleaning",
    label: "Skylight Glass",
    before: {
      src: "/images/before-after/skylight-before.jpg",
      alt: "Skylight glass hazy with dirt and residue before cleaning",
    },
    after: {
      src: "/images/before-after/skylight-after.jpg",
      alt: "The same skylight glass clear and streak-free after cleaning",
    },
  },
];

/**
 * Additional real job photos without a confirmed before/after counterpart —
 * shown as single proof shots only, never implied as a transformation pair.
 */
export const jobPhotos: JobPhoto[] = [
  {
    src: "/images/gallery/residential-window-cleaning-result.jpg",
    alt: "Clean window facade on a residential home in Greater Victoria",
    label: "Window Cleaning Result",
  },
  {
    src: "/images/gallery/high-window-pole-cleaning.jpg",
    alt: "Cleaning tall exterior windows with a water-fed pole",
    label: "Pure Water Window Cleaning",
  },
  {
    src: "/images/gallery/washed-concrete-driveway.jpg",
    alt: "Freshly washed exposed-aggregate driveway in front of a garage",
    label: "Pressure-Washed Driveway",
  },
];
