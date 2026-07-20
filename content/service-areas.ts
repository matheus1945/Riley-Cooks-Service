export type ServiceArea = {
  slug: string;
  name: string;
  /** Short teaser used in grids and the footer. */
  blurb: string;
  /** Longer localized paragraph for the area page. Honest geography only. */
  body: string;
};

/**
 * Kept in sync with siteConfig.serviceAreas — one entry per confirmed area,
 * no invented landmarks, travel times, or neighbourhood claims.
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "victoria",
    name: "Victoria",
    blurb: "Window, gutter, and exterior cleaning across the capital city.",
    body:
      "Victoria is our home base, and most of our work happens here, from character homes with original wood-frame windows to condo buildings and storefronts downtown. The mild, damp coastal climate keeps moss, algae, and grime coming back year after year, so regular exterior cleaning does real work protecting a Victoria property, not just making it look good.",
  },
  {
    slug: "saanich",
    name: "Saanich",
    blurb: "Exterior property care for the region's largest municipality.",
    body:
      "Saanich covers a huge range of properties, from established residential streets to semi-rural lots with big gardens and mature trees. All that greenery is exactly what fills gutters and feeds moss on roofs, decks, and driveways. We clean windows, clear gutters, and wash exterior surfaces across Saanich for homeowners who want the buildup handled before it causes damage.",
  },
  {
    slug: "sidney",
    name: "Sidney",
    blurb: "Seaside-town service at the tip of the Saanich Peninsula.",
    body:
      "Sidney sits right on the water at the north end of the Saanich Peninsula, and ocean-facing properties there collect salt spray and coastal residue on glass faster than most. We help Sidney homeowners keep windows genuinely clear and gutters flowing, with the same licensed, insured service we provide across Greater Victoria.",
  },
  {
    slug: "oak-bay",
    name: "Oak Bay",
    blurb: "Careful exterior cleaning for established Oak Bay homes.",
    body:
      "Oak Bay is known for its established, character-rich homes, and those properties deserve careful hands. Older windows, mature landscaping, and tree-lined streets mean more debris in the gutters and more attention needed around delicate surfaces. We treat every Oak Bay property with the care its owners expect, backed by CAD $2 million in liability coverage.",
  },
  {
    slug: "langford",
    name: "Langford",
    blurb: "Serving one of the fastest-growing communities on the Island.",
    body:
      "Langford has grown quickly, with newer family homes and townhome developments throughout the Westshore. Newer builds still face the same coastal reality: moss finds roofs and driveways, pollen coats glass, and gutters fill every fall. We keep Langford properties clean and protected with free, no-pressure quotes and a fast response.",
  },
  {
    slug: "colwood",
    name: "Colwood",
    blurb: "Window, gutter, and surface cleaning in the Westshore.",
    body:
      "Colwood's mix of oceanfront stretches and established residential neighbourhoods gives its homes plenty of exposure: sun, salt air, and winter rain all leave their mark on glass and hard surfaces. We provide the full range of exterior services in Colwood, from window and gutter cleaning to pressure washing and moss removal.",
  },
  {
    slug: "view-royal",
    name: "View Royal",
    blurb: "Local exterior cleaning between the city and the Westshore.",
    body:
      "View Royal sits between Victoria and the Westshore, with many homes tucked among tall trees near the water. Shade and overhanging branches are a recipe for mossy roofs and clogged gutters. We help View Royal homeowners stay ahead of it with scheduled gutter cleaning, moss removal, and window cleaning done by an insured, owner-operated local business.",
  },
  {
    slug: "sooke",
    name: "Sooke",
    blurb: "Exterior property care out the West Coast road.",
    body:
      "Sooke properties live closer to the elements: heavier rainfall, dense forest, and ocean exposure mean exterior surfaces work harder than they do in town. Regular gutter clearing and moss control matter that much more out here. We bring full exterior cleaning services to Sooke, and quotes are always free.",
  },
  {
    slug: "esquimalt",
    name: "Esquimalt",
    blurb: "Harbour-side homes and buildings, cleaned and protected.",
    body:
      "Esquimalt's harbour-side setting means salt air, sea breeze, and plenty of winter weather on windows and siding. From wartime-era character homes to newer townhouses and commercial buildings, we clean windows, gutters, and exterior surfaces across Esquimalt with the same attention we give every Greater Victoria property.",
  },
  {
    slug: "duncan",
    name: "Duncan",
    blurb: "Serving Duncan and the Cowichan Valley.",
    body:
      "Duncan and the surrounding Cowichan Valley combine town properties with acreages and farm buildings, and the valley's warm summers and wet winters keep exterior surfaces cycling through pollen, dust, and moss. We travel to Duncan for window cleaning, gutter work, pressure washing, and the rest of our services. Licensed, insured, and owner-operated.",
  },
  {
    slug: "salt-spring-island",
    name: "Salt Spring Island",
    blurb: "Island properties, reached and cared for properly.",
    body:
      "Salt Spring Island homes sit among forest and shoreline, which makes for beautiful properties, and busy gutters. Reliable trades can be harder to book on the island, so we make the trip. Cooks Property Services brings window cleaning, gutter cleaning, moss removal, and exterior washing to Salt Spring, with free quotes before any work begins.",
  },
  {
    slug: "nanaimo",
    name: "Nanaimo",
    blurb: "Full exterior cleaning services up-Island in Nanaimo.",
    body:
      "Nanaimo is the hub of the mid-Island, with everything from harbour-view homes to commercial frontages that need to look sharp. We serve Nanaimo with our full lineup: window and screen cleaning, gutter cleaning and guards, pressure and soft washing, moss removal, painting, and graffiti removal, with the response times of an owner-run business.",
  },
  {
    slug: "malahat",
    name: "Malahat",
    blurb: "Exterior property care along the Malahat.",
    body:
      "Properties along the Malahat sit high among the trees, where needles, leaf litter, and moss accumulate faster than almost anywhere else we work. Gutter cleaning and roof-adjacent moss control are the big ones here, alongside window cleaning and surface washing. We're happy to quote Malahat properties. The quote is free and there's no obligation.",
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}
