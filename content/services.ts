export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceBenefit = {
  title: string;
  text: string;
};

export type ServiceImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Service = {
  slug: string;
  name: string;
  /** One-line summary used on the homepage and cross-link cards. */
  short: string;
  /** Two-sentence summary used for schema.org descriptions. */
  description: string;
  /** lucide-react icon name (see components/ui/ServiceIcon). */
  icon: string;
  /** Short feature bullets for the homepage and service-area cards. */
  bullets: string[];

  // --- Dedicated service page (app/services/[service]) ---
  /** <title> without the brand suffix; the layout template appends it. */
  metaTitle: string;
  metaDescription: string;
  /** Lead paragraph shown under the H1. */
  heroTagline: string;
  /** Body paragraphs for the overview section. */
  overview: string[];
  /** Fuller "what's included" list for the detail page. */
  includes: string[];
  /** Localized "why it matters" cards. */
  benefits: ServiceBenefit[];
  /** Service-specific FAQ (also emitted as FAQPage JSON-LD). */
  faqs: ServiceFaq[];
  /** Slugs of related services to cross-link. */
  related: string[];
  /**
   * A real Cooks Property Services photo shown on the detail page. Only set
   * where a genuine photo honestly matches the service. Services without a
   * confirmed matching photo intentionally omit this rather than borrow an
   * unrelated image.
   */
  heroImage?: ServiceImage;
};

export const services: Service[] = [
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    short: "Crystal-clear windows, inside and out.",
    description:
      "Professional interior, exterior, and full window cleaning for residential and commercial properties. " +
      "We remove dirt, pollen, water spots, mineral buildup, and coastal residue for a clean, streak-free finish.",
    icon: "Sparkles",
    bullets: [
      "Interior & exterior options",
      "Pure-water cleaning system",
      "Residential & commercial",
    ],
    metaTitle: "Window Cleaning in Victoria, BC",
    metaDescription:
      "Professional interior and exterior window cleaning across Greater Victoria. Streak-free results with a pure-water system. Licensed, insured, free quotes.",
    heroTagline:
      "Streak-free windows, inside and out, for homes and businesses across Greater Victoria.",
    overview: [
      "Windows take the full force of Victoria's coastal weather. Rain spotting, salt air, pollen, and mineral buildup all leave glass looking dull long before it needs replacing. Our window cleaning brings back the clarity, whether it is a single-storey home, a multi-level building, or a commercial storefront.",
      "You can book interior glass, exterior glass, or both. For higher and hard-to-reach windows we use a pure-water pole system, so there is no ladder damage to your landscaping and no streaks left behind.",
    ],
    includes: [
      "Interior, exterior, or full window cleaning",
      "Pure-water pole system for high and awkward windows",
      "Frames, sills, and tracks wiped down as part of the job",
      "Screens removed and refitted where needed",
      "Residential homes and commercial storefronts",
    ],
    benefits: [
      {
        title: "Clarity that lasts",
        text: "Removing salt, pollen, and mineral spotting leaves glass genuinely clear, not just wet and wiped.",
      },
      {
        title: "No streaks, no residue",
        text: "The pure-water system rinses clean and dries spot-free, even on large panes.",
      },
      {
        title: "Safer than DIY",
        text: "We reach second and third-storey windows from the ground, so nobody is balancing on a ladder.",
      },
    ],
    faqs: [
      {
        question: "Do you clean both the inside and outside?",
        answer:
          "Yes. You can book interior only, exterior only, or both. Most people book both for a full refresh, especially in spring and fall.",
      },
      {
        question: "How often should windows be cleaned in Victoria?",
        answer:
          "For most homes here, twice a year works well: once in spring after the pollen settles and once in fall after the leaves come down. Coastal and tree-shaded properties sometimes benefit from more frequent visits.",
      },
      {
        question: "Will the pure-water system reach very high windows?",
        answer:
          "Yes. The water-fed pole reaches several storeys from the ground, which is safer for your property and gives a cleaner rinse than traditional methods.",
      },
    ],
    related: ["screen-cleaning", "gutter-cleaning", "pressure-washing"],
    heroImage: {
      src: "/images/gallery/residential-window-cleaning-result.jpg",
      alt: "Clean windows on a residential home in Greater Victoria after a professional wash",
      caption: "A residential window cleaning result in Greater Victoria.",
    },
  },
  {
    slug: "screen-cleaning",
    name: "Screen Cleaning",
    short: "Cleaner screens for clearer views and fresher airflow.",
    description:
      "Detailed screen cleaning removes dust, pollen, debris, and other buildup that can collect over time. " +
      "It complements window cleaning and helps leave the entire window area looking properly finished.",
    icon: "PanelsTopLeft",
    bullets: [
      "Removes dust & pollen",
      "Improves the finished appearance",
      "Available with window cleaning",
    ],
    metaTitle: "Window Screen Cleaning in Victoria, BC",
    metaDescription:
      "Detailed window screen cleaning in Greater Victoria. Remove dust, pollen, and debris for clearer views and better airflow. Free quotes, insured service.",
    heroTagline:
      "Clean screens for clearer views, better airflow, and windows that actually look finished.",
    overview: [
      "Screens quietly collect a season's worth of dust, pollen, cobwebs, and coastal grime, and it shows the moment the glass behind them is clean. Screen cleaning is the finishing touch that makes a window cleaning look genuinely complete.",
      "We carefully remove each screen, clean the frame and mesh, and refit it, so you get clearer views, fresher airflow, and less dust making its way indoors.",
    ],
    includes: [
      "Careful removal and refitting of each screen",
      "Dust, pollen, and cobweb removal",
      "Frames and mesh cleaned",
      "Pairs naturally with a window cleaning visit",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "A properly finished look",
        text: "Clean glass behind a dusty screen never looks right. Screens complete the job.",
      },
      {
        title: "Better airflow",
        text: "Clearing the mesh lets more fresh air through when the windows are open.",
      },
      {
        title: "Less indoor dust",
        text: "Removing pollen and grime from screens means less of it blowing inside.",
      },
    ],
    faqs: [
      {
        question: "Can I add screen cleaning to a window cleaning booking?",
        answer:
          "Yes, that is the most common way to book it. Cleaning the screens at the same time as the glass gives the whole window a finished look.",
      },
      {
        question: "Will cleaning damage older screens?",
        answer:
          "We handle screens carefully by hand. If a screen is already brittle or damaged, we will point it out rather than risk making it worse.",
      },
    ],
    related: ["window-cleaning", "gutter-cleaning", "soft-washing"],
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    short: "Keep water flowing and protect your property.",
    description:
      "Interior and exterior gutter cleaning removes leaves, moss, dirt, and accumulated debris. " +
      "Keeping gutters clear helps prevent overflow, drainage problems, leaks, and avoidable water damage.",
    icon: "Waves",
    bullets: [
      "Interior debris removal",
      "Exterior gutter cleaning",
      "Helps prevent water damage",
    ],
    metaTitle: "Gutter Cleaning in Victoria, BC",
    metaDescription:
      "Interior and exterior gutter cleaning across Greater Victoria. Clear leaves, moss, and debris to prevent overflow and water damage. Licensed, insured, free quotes.",
    heroTagline:
      "Clear gutters that move water away from your property, before overflow turns into damage.",
    overview: [
      "In Greater Victoria, gutters fill fast. Fir needles, leaves, and moss build up through fall and winter, and once water cannot flow it backs up, overflows, and finds its way into fascia, soffits, and foundations. Regular gutter cleaning is one of the cheapest ways to protect a property here.",
      "We clear debris from inside the gutters by hand, flush the downspouts so water runs freely, and clean the exterior faces so the whole system looks and works the way it should.",
    ],
    includes: [
      "Interior gutter debris removal by hand",
      "Downspouts checked and flushed for flow",
      "Exterior gutter faces cleaned",
      "Debris bagged and removed from site",
      "Residential and commercial buildings",
    ],
    benefits: [
      {
        title: "Prevents water damage",
        text: "Free-flowing gutters keep water off your fascia, soffits, and foundation.",
      },
      {
        title: "Fewer surprises in winter",
        text: "Clearing debris before the heavy rain means no overflow when you need the gutters most.",
      },
      {
        title: "Protects your investment",
        text: "Regular clearing extends the life of the whole gutter system.",
      },
    ],
    faqs: [
      {
        question: "How often should gutters be cleaned here?",
        answer:
          "For most Victoria properties, twice a year: once in late fall after the leaves drop and once in spring. Homes under heavy tree cover often need more frequent clearing.",
      },
      {
        question: "Do you clean the inside and outside of the gutters?",
        answer:
          "Yes. We clear the debris inside, flush the downspouts, and clean the exterior faces so the system both works and looks right.",
      },
      {
        question: "What do you do with the debris?",
        answer:
          "We bag it and take it away. You will not be left with a pile of wet leaves on the lawn.",
      },
    ],
    related: ["gutter-guard-installation", "moss-removal", "window-cleaning"],
    heroImage: {
      src: "/images/before-after/gutter-after.jpg",
      alt: "A roof gutter cleared of debris and flowing freely after cleaning",
      caption: "A gutter cleared and flushed in Greater Victoria.",
    },
  },
  {
    slug: "gutter-guard-installation",
    name: "Gutter Guard Installation",
    short: "Reduce debris buildup and simplify maintenance.",
    description:
      "Professionally installed gutter guards help limit leaves and debris from entering the gutter system. " +
      "They support consistent water flow and can reduce the frequency of recurring gutter maintenance.",
    icon: "ShieldCheck",
    bullets: [
      "Reduces debris buildup",
      "Supports proper drainage",
      "Less frequent maintenance",
    ],
    metaTitle: "Gutter Guard Installation in Victoria, BC",
    metaDescription:
      "Professional gutter guard installation in Greater Victoria. Reduce leaves and debris buildup and cut down on gutter maintenance. Free quotes, insured service.",
    heroTagline:
      "Keep leaves and debris out of your gutters and cut down on how often they need clearing.",
    overview: [
      "If you are tired of clearing gutters two or three times a year, guards are worth a look. Professionally fitted gutter guards keep the bulk of leaves, needles, and debris out of the system while still letting water through, which means fewer blockages and less climbing around on ladders.",
      "We assess your existing gutters, clear them first, and install guards that sit correctly and do their job. We will also tell you honestly whether guards make sense for your property before recommending them.",
    ],
    includes: [
      "Assessment of your existing gutters",
      "Gutters cleared before guards go on",
      "Guards fitted to your gutter system",
      "Honest advice on what suits your property",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "Less frequent maintenance",
        text: "Guards keep most debris out, so gutters need clearing far less often.",
      },
      {
        title: "Better year-round flow",
        text: "Water keeps moving even through the heaviest leaf-fall.",
      },
      {
        title: "Fewer ladders, less risk",
        text: "Cutting down on cleaning visits means less time spent up a ladder.",
      },
    ],
    faqs: [
      {
        question: "Do gutter guards mean I never have to clean the gutters again?",
        answer:
          "They dramatically reduce buildup, but no guard is fully maintenance-free. Think of them as far less frequent cleaning rather than never again.",
      },
      {
        question: "Will guards work with my existing gutters?",
        answer:
          "In most cases, yes. We assess your gutters first and will tell you honestly if guards are a good fit before recommending them.",
      },
    ],
    related: ["gutter-cleaning", "moss-removal", "window-cleaning"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    short: "Restore hard surfaces and boost curb appeal.",
    description:
      "Controlled pressure washing removes built-up dirt, grime, algae, and staining from durable exterior surfaces. " +
      "It is ideal for refreshing driveways, patios, walkways, and other hard surfaces around the property.",
    icon: "Droplets",
    bullets: [
      "Driveways, patios & walkways",
      "Removes stubborn buildup",
      "Residential & commercial",
    ],
    metaTitle: "Pressure Washing in Victoria, BC",
    metaDescription:
      "Driveway, patio, and walkway pressure washing across Greater Victoria. Remove dirt, algae, and stains from hard surfaces. Licensed, insured, free quotes.",
    heroTagline:
      "Bring hard surfaces back to life: driveways, patios, walkways, and more.",
    overview: [
      "Victoria's damp climate is hard on hard surfaces. Concrete, pavers, and stone pick up algae, moss, and ingrained grime that a garden hose will not touch. Pressure washing lifts years of buildup and restores the original surface underneath, which is often a bigger difference than people expect.",
      "We match the pressure to the surface so it comes clean without damage, and we are careful around edges, planting, and anything that needs protecting.",
    ],
    includes: [
      "Driveways, patios, and walkways",
      "Concrete, pavers, and stone",
      "Algae, moss, and ingrained grime removal",
      "Pressure matched to the surface",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "Instant curb appeal",
        text: "Few things refresh a property's look faster than a clean driveway and paths.",
      },
      {
        title: "Safer footing",
        text: "Removing algae and moss takes the slip risk off walkways and steps.",
      },
      {
        title: "Protects the surface",
        text: "Clearing buildup helps concrete and pavers last longer.",
      },
    ],
    faqs: [
      {
        question: "Which surfaces can you pressure wash?",
        answer:
          "Durable hard surfaces like concrete driveways, paver patios, stone walkways, and similar. For siding and more delicate surfaces we use soft washing instead.",
      },
      {
        question: "Will pressure washing damage my pavers or concrete?",
        answer:
          "Not when it is done right. We match the pressure to the surface, which cleans thoroughly without etching or damage.",
      },
      {
        question: "Can you get rid of moss between pavers?",
        answer:
          "Yes. Pressure washing lifts moss and the grime around it. For heavier moss we can combine it with our moss removal service.",
      },
    ],
    related: ["soft-washing", "moss-removal", "gutter-cleaning"],
    heroImage: {
      src: "/images/gallery/washed-concrete-driveway.jpg",
      alt: "A freshly pressure-washed exposed-aggregate driveway in front of a garage",
      caption: "A freshly pressure-washed driveway in Greater Victoria.",
    },
  },
  {
    slug: "soft-washing",
    name: "Soft Washing",
    short: "A gentle deep clean for delicate exterior surfaces.",
    description:
      "Low-pressure soft washing removes algae, organic buildup, and surface grime without relying on aggressive pressure. " +
      "It is suited to siding and other exterior materials that require a gentler cleaning method.",
    icon: "ShowerHead",
    bullets: [
      "Low-pressure cleaning",
      "Suitable for delicate surfaces",
      "Removes organic buildup",
    ],
    metaTitle: "Soft Washing in Victoria, BC",
    metaDescription:
      "Gentle soft washing for siding and delicate exterior surfaces in Greater Victoria. Remove algae and organic buildup without high pressure. Free quotes, insured.",
    heroTagline:
      "A gentle, low-pressure clean for the surfaces that should not be blasted.",
    overview: [
      "Not every surface can take a pressure washer. Siding, painted surfaces, and other delicate materials need a gentler approach, and that is where soft washing comes in. It uses low pressure to lift algae, mildew, and organic buildup without forcing water behind panels or into places it should not go.",
      "It is the right method for the parts of your property where high pressure would do more harm than good.",
    ],
    includes: [
      "Low-pressure cleaning for delicate surfaces",
      "Siding and painted exteriors",
      "Algae, mildew, and organic buildup removal",
      "A safer alternative to high pressure",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "Gentle where it matters",
        text: "Low pressure cleans delicate surfaces without forcing water behind them.",
      },
      {
        title: "Tackles organic growth",
        text: "Soft washing is well suited to the algae and mildew our damp climate encourages.",
      },
      {
        title: "Protects your finish",
        text: "The right method means a clean surface without stripping paint or denting siding.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between soft washing and pressure washing?",
        answer:
          "Pressure washing uses high pressure for durable surfaces like concrete. Soft washing uses low pressure for delicate surfaces like siding, so they get clean without damage.",
      },
      {
        question: "Which one does my house need?",
        answer:
          "It depends on the surface. Driveways and patios usually suit pressure washing; siding and painted surfaces usually suit soft washing. We will advise as part of the quote.",
      },
    ],
    related: ["pressure-washing", "moss-removal", "window-cleaning"],
  },
  {
    slug: "moss-removal",
    name: "Moss Removal",
    short: "Remove moss before it causes lasting damage.",
    description:
      "Careful moss removal helps protect exterior surfaces from retained moisture, deterioration, and premature wear. " +
      "The service improves the property's appearance while reducing the risks associated with continued moss buildup.",
    icon: "Leaf",
    bullets: [
      "Careful moss removal",
      "Helps protect surfaces",
      "Improves exterior appearance",
    ],
    metaTitle: "Moss Removal in Victoria, BC",
    metaDescription:
      "Careful moss removal for roofs and exterior surfaces across Greater Victoria. Protect surfaces from moisture damage. Licensed, insured, free quotes.",
    heroTagline:
      "Remove moss before it holds moisture against your roof and surfaces, and does real damage.",
    overview: [
      "Few places grow moss like the south Island. Our mild, damp, shaded conditions are close to ideal for it, and left alone it holds moisture against whatever it is growing on, whether that is a roof, a walkway, or a patio. Over time that trapped moisture leads to deterioration and premature wear.",
      "We remove moss carefully, protecting the surface underneath, so your property looks better and is protected from the damage moss quietly causes.",
    ],
    includes: [
      "Careful moss removal from surfaces",
      "Roofs, walkways, patios, and more",
      "Surface protected during the work",
      "Pairs well with gutter cleaning",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "Stops moisture damage",
        text: "Removing moss stops it trapping water against your roof and surfaces.",
      },
      {
        title: "Protects what is underneath",
        text: "Clearing moss early helps avoid deterioration and premature wear.",
      },
      {
        title: "Cleaner, brighter property",
        text: "Surfaces look dramatically better once the moss is gone.",
      },
    ],
    faqs: [
      {
        question: "Why is moss such a problem in Victoria?",
        answer:
          "Our mild, damp, shaded climate is close to perfect for moss. That is why it comes back and why staying on top of it matters here more than in drier places.",
      },
      {
        question: "Can you remove moss from my roof?",
        answer:
          "Yes. We remove roof moss carefully to protect the surface, and we can talk through what helps slow it coming back.",
      },
      {
        question: "Does moss actually cause damage?",
        answer:
          "It can. By holding moisture against a surface, moss speeds up deterioration over time, so removing it protects the surface, not just the look.",
      },
    ],
    related: ["gutter-cleaning", "pressure-washing", "soft-washing"],
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Refresh and protect your property's surfaces.",
    description:
      "Painting services help restore exterior surfaces that need a cleaner, fresher, and more professional appearance. " +
      "Each project is completed with careful preparation, attention to detail, and respect for the surrounding property.",
    icon: "PaintRoller",
    bullets: [
      "Exterior painting services",
      "Careful surface preparation",
      "Residential & commercial",
    ],
    metaTitle: "Exterior Painting in Victoria, BC",
    metaDescription:
      "Exterior painting services in Greater Victoria with careful preparation and a clean finish. Refresh and protect your property. Free quotes, insured.",
    heroTagline:
      "Refresh and protect your property's exterior with careful prep and a clean finish.",
    overview: [
      "A fresh coat does more than look good, it protects the surface underneath from Victoria's weather. Exterior painting is as much about protection as appearance, and both depend on the preparation more than anything else.",
      "We take the prep seriously, cleaning and readying surfaces properly before any paint goes on, and we treat the surrounding property with respect from start to finish.",
    ],
    includes: [
      "Exterior painting services",
      "Careful surface cleaning and preparation",
      "Tidy, respectful work around your property",
      "Attention to detail on the finish",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "Protection, not just looks",
        text: "Paint is a barrier against our damp coastal weather, so a good finish protects the surface.",
      },
      {
        title: "Prep done properly",
        text: "A lasting finish comes from proper preparation, and that is where we put the work in.",
      },
      {
        title: "Respect for your property",
        text: "We keep the site tidy and protect the areas around what we are painting.",
      },
    ],
    faqs: [
      {
        question: "Do you do interior painting too?",
        answer:
          "Our painting is focused on exterior surfaces as part of exterior property care. Tell us what you have in mind and we will let you know if it is a fit.",
      },
      {
        question: "Why does preparation matter so much?",
        answer:
          "Most finishes fail because of poor prep, not poor paint. Cleaning and readying the surface properly is what makes a paint job last, especially in a damp climate.",
      },
    ],
    related: ["pressure-washing", "soft-washing", "graffiti-removal"],
  },
  {
    slug: "graffiti-removal",
    name: "Graffiti Removal",
    short: "Restore affected surfaces quickly and carefully.",
    description:
      "Graffiti removal services help residential, commercial, and managed properties recover a clean and professional appearance. " +
      "The cleaning approach is selected according to the affected material to reduce the risk of surface damage.",
    icon: "Eraser",
    bullets: [
      "Surface-appropriate removal",
      "Residential & commercial",
      "Restores property appearance",
    ],
    metaTitle: "Graffiti Removal in Victoria, BC",
    metaDescription:
      "Fast, careful graffiti removal for homes, businesses, and managed properties in Greater Victoria. Restore surfaces without damage. Free quotes, insured.",
    heroTagline:
      "Restore tagged surfaces quickly and carefully, before graffiti has a chance to settle in.",
    overview: [
      "Graffiti is one of those things that is best dealt with fast, both because it looks better gone and because quick removal discourages it coming back. We help homes, businesses, and property managers across Greater Victoria get affected surfaces back to normal.",
      "The right removal method depends entirely on the surface, so we match the approach to the material to get the graffiti off without damaging what is underneath.",
    ],
    includes: [
      "Removal matched to the affected surface",
      "Homes, businesses, and managed properties",
      "Careful approach to avoid surface damage",
      "Fast turnaround where possible",
      "Residential and commercial",
    ],
    benefits: [
      {
        title: "Fast response",
        text: "The sooner graffiti is removed, the better the result and the less likely it returns.",
      },
      {
        title: "Surface-safe methods",
        text: "We match the removal method to the material to protect the surface underneath.",
      },
      {
        title: "For managed properties too",
        text: "We work with property managers and businesses, not just homeowners.",
      },
    ],
    faqs: [
      {
        question: "Can you remove graffiti without damaging the surface?",
        answer:
          "That is the goal, and it is why we match the method to the material. Different surfaces need different approaches to come clean safely.",
      },
      {
        question: "How quickly can graffiti be removed?",
        answer:
          "We aim for a fast turnaround, since quick removal both looks better and helps discourage repeat tagging. Get in touch and we will let you know our next availability.",
      },
    ],
    related: ["pressure-washing", "soft-washing", "painting"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
