export type Faq = {
  question: string;
  answer: string;
};

/**
 * Answers use confirmed business information only. Anything that depends on
 * an unconfirmed policy is phrased around the free quote instead of invented.
 */
export const faqs: Faq[] = [
  {
    question: "Are quotes really free?",
    answer:
      "Yes. Every quote is free and comes with no obligation. Send the quote form or call, and you'll get a fast response within 24 hours.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Window cleaning (interior, exterior, or both), screen cleaning, interior and exterior gutter cleaning, gutter guard installation, pressure washing, soft washing, moss removal, painting, and graffiti removal, for both residential and commercial properties.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Greater Victoria and Vancouver Island, including Victoria, Saanich, Sidney, Oak Bay, Langford, Colwood, View Royal, Sooke, Esquimalt, Duncan, Salt Spring Island, Nanaimo, and the Malahat. Not sure if we cover your area? Call us and we may be able to help.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Cooks Property Services is licensed and carries CAD $2 million in liability insurance, so your property is protected while we work.",
  },
  {
    question: "Who will actually do the work?",
    answer:
      "Cooks Property Services is owner-operated. You deal directly with Riley Cook, the owner, who personally oversees the work. No call centres and no subcontracted crews you've never met.",
  },
  {
    question: "How does the quote process work?",
    answer:
      "Fill in the short quote form with your name, phone number, and the service you need, or simply call. You'll hear back within 24 hours with the next steps. There's no cost and no pressure.",
  },
  {
    question: "How often should windows and gutters be cleaned here?",
    answer:
      "It depends on your property. Nearby trees, moss exposure, and how close you are to the coast all play a role in how quickly buildup returns. As part of your free quote, we'll look at your property and recommend a schedule that makes sense for it.",
  },
  {
    question: "Do you work on commercial properties?",
    answer:
      "Yes. Alongside residential work, we serve commercial clients and property managers across Greater Victoria, with the same careful, insured service, scaled to the property.",
  },
];
