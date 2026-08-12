/* ==========================================================================
   YOUR CONTENT LIVES HERE.
   --------------------------------------------------------------------------
   This is the main file you edit. The site reads it and builds every page.
   No coding needed — copy a block, change the text, save, refresh.

   THREE LISTS:
     SITE       → brand + the headline numbers shown on the homepage
     INDUSTRIES → healthcare industries and their sub-industries
     PRODUCTS   → one block per AI product/company you review
   ========================================================================== */

const SITE = {
  brand: "Nithila Notes",
  heroEyebrow: "The map of AI across healthcare",
  heroTitle: "Understand how AI is changing",
  heroTitleHighlight: "your corner",       // rendered in teal
  heroTitleTail: "of healthcare.",
  heroLede: "Every healthcare industry and sub-industry, how AI is transforming " +
            "each one, and the products — available and upcoming — reviewed for the " +
            "people who work there.",
  // Homepage stat tiles. Edit the numbers to match your growing collection.
  stats: [
    { icon: "compass", num: "12",  label: "Healthcare industries" },
    { icon: "layers",  num: "39",  label: "Sub-industries analyzed" },
    { icon: "package", num: "216", label: "AI products reviewed" },
    { icon: "sprout",  num: "95",  label: "Emerging companies to watch" },
  ],
};

/* --------------------------------------------------------------------------
   INDUSTRIES — the browsing structure.
   -------------------------------------------------------------------------- */
const INDUSTRIES = [
  {
    id: "drug-discovery",
    name: "Drug Discovery & Development",
    icon: "flask",
    blurb: "From target identification to molecule design and trials — where AI is compressing timelines.",
    subIndustries: [
      { id: "target-discovery", name: "Target Discovery" },
      { id: "molecule-design",  name: "Molecule Design" },
      { id: "clinical-trials",  name: "Clinical Trials" },
    ],
  },
  {
    id: "diagnostics",
    name: "Diagnostics & Imaging",
    icon: "scan",
    blurb: "Reading scans and samples with expert-level accuracy, available anywhere.",
    subIndustries: [
      { id: "radiology",  name: "Radiology" },
      { id: "pathology",  name: "Pathology" },
      { id: "at-home",    name: "At-Home Testing" },
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition & Prevention",
    icon: "heart",
    blurb: "Keeping people healthy before they become patients.",
    subIndustries: [
      { id: "micronutrients", name: "Micronutrient Tracking" },
      { id: "diet",           name: "Personalized Diet" },
    ],
  },
];

/* --------------------------------------------------------------------------
   PRODUCTS — one block = one review page.

   Fields:
     id            short slug for the URL (lowercase-with-dashes)
     name          product / company name
     industry      must match an INDUSTRIES id
     subIndustry   must match a subIndustry id
     status        "has-ai"  → already an AI product
                   "adds-ai" → your idea for adding AI to a non-AI company
     tagline       one line under the title / on the card
     capabilities  [ "...", ... ]  → the "Key capabilities" cards
     strengths     [ "...", ... ]  → green STRENGTHS card
     watchOuts     [ "...", ... ]  → yellow WATCH-OUTS card
     quote         your editorial verdict pull-quote
     glance        { company, founded, headquarters, regulatory, pricing, website }
   -------------------------------------------------------------------------- */
const PRODUCTS = [

  {
    id: "isomorphic-labs",
    name: "Isomorphic Labs",
    industry: "drug-discovery",
    subIndustry: "molecule-design",
    status: "has-ai",
    tagline: "AlphaFold's science, aimed squarely at designing new medicines.",
    capabilities: [
      "AlphaFold 3-class structure prediction of biomolecular complexes",
      "Generative small-molecule design against hard targets",
      "Partnership programs with top-10 pharma (multi-billion potential value)",
      "Rational design workflows replacing brute-force screening",
    ],
    strengths: [
      "Deepest scientific pedigree in the field (Nobel-lineage models)",
      "Alphabet-scale compute and talent moat",
      "Validation via the largest AI-pharma partnerships signed",
    ],
    watchOuts: [
      "No clinical-stage readouts yet — the proof remains ahead",
      "Access limited to major partnerships; not a buyable product",
    ],
    quote: "The field's scientific flagship. Not something you license off the shelf " +
           "— but every discovery organization must have a thesis about what it means for them.",
    glance: {
      company: "Isomorphic Labs (Alphabet)",
      founded: "2021",
      headquarters: "London, UK",
      regulatory: "Discovery-stage platform (no marketed drugs yet)",
      pricing: "Pharma partnerships/co-development",
      website: "",
    },
  },

  {
    id: "example-imaging",
    name: "[Example imaging product]",
    industry: "diagnostics",
    subIndustry: "radiology",
    status: "has-ai",
    tagline: "A placeholder review — replace with a real product you're analyzing.",
    capabilities: [
      "Automated detection of findings on chest imaging",
      "Worklist prioritization by clinical urgency",
    ],
    strengths: [
      "Fits into existing radiology workflow",
      "Strong published sensitivity on target findings",
    ],
    watchOuts: [
      "Performance varies across scanner types and populations",
    ],
    quote: "Promising where it's validated — read the fine print on which findings and which patients.",
    glance: {
      company: "[Company name]",
      founded: "—",
      headquarters: "—",
      regulatory: "[e.g. FDA-cleared / CE-marked]",
      pricing: "[e.g. per-study / enterprise license]",
      website: "",
    },
  },

];
