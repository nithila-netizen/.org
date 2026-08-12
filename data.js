/* ==========================================================================
   YOUR CONTENT LIVES HERE.
   --------------------------------------------------------------------------
   This is the only file you normally edit. The website reads it and builds
   every page automatically. You do NOT need to know how to code — just follow
   the patterns below.

   THERE ARE TWO LISTS:
     1) SECTIONS      → the healthcare areas + their subsections (the structure)
     2) IDEAS         → one entry per idea/article

   TO ADD A NEW IDEA: copy one whole { ... } block inside IDEAS, paste it,
   and change the text. Keep the commas between blocks.
   ========================================================================== */

const SITE = {
  // --- Shown at the top of the homepage ------------------------------------
  author: "Nithila",
  title: "AI, applied to healthcare",
  lede: "A growing collection of ideas for where artificial intelligence can " +
        "make healthcare better — more effective, more efficient, and reachable " +
        "by more people. Each entry credits a real company and lays out how I'd " +
        "build on their work with AI.",
};

/* --------------------------------------------------------------------------
   SECTIONS — the browsing structure.
   Each section has an id, a title, a short blurb, and a list of subsections.
   Ideas attach themselves to a section + subsection using these ids.
   -------------------------------------------------------------------------- */
const SECTIONS = [
  {
    id: "diagnostics",
    title: "Diagnostics & Early Detection",
    blurb: "Catching problems sooner, and making expert-level reading available anywhere.",
    subsections: [
      { id: "imaging",   title: "Medical Imaging" },
      { id: "at-home",   title: "At-Home & Point-of-Care Testing" },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition & Prevention",
    blurb: "Keeping people healthy before they ever become patients.",
    subsections: [
      { id: "micronutrients", title: "Micronutrient Tracking" },
      { id: "diet",           title: "Personalized Diet" },
    ],
  },
  {
    id: "care-delivery",
    title: "Care Delivery & Access",
    blurb: "Getting the right care to the right person, faster and with less friction.",
    subsections: [
      { id: "telehealth",  title: "Telehealth & Triage" },
      { id: "chronic",     title: "Chronic Disease Management" },
    ],
  },
];

/* --------------------------------------------------------------------------
   IDEAS — one block = one article.

   Fields:
     id           short unique slug, lowercase-with-dashes (used in the page URL)
     title        the headline of the idea
     section      must match a section id above
     subsection   must match a subsection id above
     hasAI        true  = company already uses AI (I'm extending it)
                  false = company has no AI yet (I'm adding it)
     company      { name, url }  — always credit the source
     summary      one sentence shown on the card
     problem      [ "paragraph", "paragraph", ... ]  — what's broken today
     opportunity  [ ... ]  — where AI fits
     approach     [ ... ]  — how I'd actually build it
     impact       [ ... ]  — who it helps and why it matters
     mockups      [ { src: "assets/xyz.png", caption: "..." } ]
                  Leave src as "" to show a placeholder frame until you add a real image.
   -------------------------------------------------------------------------- */
const IDEAS = [

  {
    id: "micronutrient-ai",
    title: "Turning a micronutrient tracker into a personal nutrition coach",
    section: "nutrition",
    subsection: "micronutrients",
    hasAI: false,
    company: { name: "[Company name]", url: "" }, // ← replace with the real company + link
    summary: "A tool that measures your micronutrients today — and how AI could " +
             "turn those numbers into a plan you'll actually follow.",
    problem: [
      "Knowing you're low in iron or vitamin D is useful, but a number on a " +
      "dashboard doesn't change anyone's behavior. People are left to Google " +
      "what to eat, guess at portions, and give up within a week.",
      "The gap isn't measurement — it's the translation from data to daily action.",
    ],
    opportunity: [
      "AI is unusually good at exactly this translation step: taking a messy set " +
      "of readings, someone's food preferences, budget, and schedule, and turning " +
      "it into concrete, personalized suggestions that adapt over time.",
    ],
    approach: [
      "Layer a nutrition assistant on top of the existing measurements. When new " +
      "readings come in, it explains what changed in plain language and proposes " +
      "specific, affordable foods to close each gap.",
      "Let the user chat with it — 'I'm vegetarian and hate cooking' — and have " +
      "the plan reshape itself around real constraints instead of a generic chart.",
      "Close the loop: track which suggestions were followed, re-check at the next " +
      "reading, and adjust — so the tool visibly learns the person.",
    ],
    impact: [
      "Moves the product from 'here are your numbers' to 'here's what to do about " +
      "them,' which is where retention and real health outcomes actually live.",
    ],
    mockups: [
      { src: "", caption: "Home screen: current micronutrient levels with an AI-written summary." },
      { src: "", caption: "Chat view: adjusting the plan around dietary constraints." },
    ],
  },

  {
    id: "imaging-second-read",
    title: "An always-on second reader for medical imaging",
    section: "diagnostics",
    subsection: "imaging",
    hasAI: true,
    company: { name: "[Company name]", url: "" }, // ← replace with the real company + link
    summary: "Extending an existing AI imaging tool into a workflow that catches " +
             "the misses radiologists worry about most.",
    problem: [
      "Radiologists read enormous volumes under time pressure. Even excellent ones " +
      "have off moments, and subtle findings can slip through late in a shift.",
    ],
    opportunity: [
      "The company already detects findings well. The unmet need is fitting that " +
      "capability into the human workflow so it reduces misses without adding noise.",
    ],
    approach: [
      "Run the model as a silent second reader that only speaks up on high-confidence " +
      "discrepancies, ranked by clinical urgency, so it earns trust instead of alarm fatigue.",
      "Show the 'why' — highlight the exact region and comparable prior cases — so the " +
      "radiologist can accept or dismiss in seconds.",
    ],
    impact: [
      "Fewer missed findings, faster turnaround on urgent cases, and a tool clinicians " +
      "keep on because it respects their attention.",
    ],
    mockups: [
      { src: "", caption: "Reader view with a flagged region and confidence indicator." },
    ],
  },

];
