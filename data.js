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
  brand: "Nithila Neminathan",
  publication: "Nithila Notes",
};

/* --------------------------------------------------------------------------
   PROFILE — this is YOUR portfolio. Edit these to change the homepage.
   -------------------------------------------------------------------------- */
const PROFILE = {
  name: "Nithila Neminathan",
  role: "Aspiring Product Manager · AI in Healthcare",
  // Hero headline. Wrap words in <em>…</em> for elegant italics.
  heroTitle: "Product thinking for the <em>future</em> of healthcare.",
  heroIntro: "I'm Nithila — I study where artificial intelligence meets healthcare, and I " +
             "write independent reviews of the products shaping it, each with a clear point of " +
             "view on how they could serve more people, better.",
  // About section
  aboutLead: "I want to build products that make good healthcare reach further.",
  about: [
    "My work here is a running body of analysis: I take a real company in a corner of " +
    "healthcare, review what it does well and where it falls short, and lay out my own " +
    "product thinking for how AI could push it further — always as independent commentary, " +
    "always crediting the source.",
    "It's how I sharpen the instincts a product manager lives on: reading a market, judging a " +
    "product honestly, and turning a critique into a concrete direction.",
  ],
  skills: [
    "Product strategy", "AI / ML literacy", "Healthcare markets",
    "User research", "Prototyping", "Competitive analysis",
  ],
  contact: {
    email: "nithilajax@gmail.com",   // ← edit if you want a different contact address
    linkedin: "",                    // ← paste your LinkedIn URL
    other: "",                       // ← anything else (portfolio, X, etc.)
  },
};

/* --------------------------------------------------------------------------
   EXPERIENCE — case competitions, programs, and other portfolio items.
   Copy a block to add more. type is just a small label.
   -------------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    type: "Program",
    title: "ONSET",
    org: "",                          // ← organization / host, if any
    year: "",                         // ← e.g. "2025"
    detail: "Add a sentence on what ONSET was and your role or takeaway. " +
            "(Placeholder — edit in data.js under EXPERIENCE.)",
  },
  {
    type: "Case competition",
    title: "[Case competition name]",
    org: "",
    year: "",
    detail: "What the challenge was, what you proposed, and how you placed. " +
            "Copy this block to add each competition you've attended.",
  },
];

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
  {
    id: "rehab",
    name: "Rehabilitation & Physical Therapy",
    icon: "heart",
    blurb: "Recovering movement and managing pain — increasingly from home.",
    subIndustries: [
      { id: "physiotherapy", name: "Digital Physiotherapy" },
      { id: "remote-rehab",  name: "Remote Rehab & Monitoring" },
    ],
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "scan",
    blurb: "Watching the heart continuously, and catching risk earlier.",
    subIndustries: [
      { id: "wearables",       name: "Wearable Heart Monitoring" },
      { id: "ecg-imaging",     name: "ECG & Imaging AI" },
      { id: "risk-prediction", name: "Risk Prediction" },
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
    id: "hinge-health-ai-pt",
    name: "AI-native physiotherapy, built on the Hinge Health model",
    industry: "rehab",
    subIndustry: "physiotherapy",
    status: "adds-ai",
    tagline: "Hinge Health proved people will do physical therapy from home. Here's how I'd " +
             "make the session itself intelligent.",
    // Prototype screenshot shown at the top of the article.
    hero: {
      img: "assets/physio-hinge-ai.png",
      caption: "Concept prototype: a physiotherapy app that scores your form from the camera in real time and coaches each rep.",
    },
    // Blog-style body. Each block: { heading (optional), body: [paragraphs] }.
    article: [
      { body: [
        "Digital physical therapy has already won its first argument: people will do their " +
        "exercises at home if the experience is good enough. Hinge Health built a large " +
        "business proving exactly that. The open question now isn't whether care can move " +
        "into the living room — it's whether the living-room session can become as sharp as " +
        "the one you'd get standing in front of a therapist. That's an AI problem.",
      ]},
      { heading: "The company I'm crediting", body: [
        "Hinge Health is a digital clinic for muscle, joint, and back pain. Members get a " +
        "personalized exercise-therapy program in an app, guided sessions with motion " +
        "tracking, and access to human physical therapists and health coaches — largely " +
        "offered through employers and health plans. Their core insight is sound: most " +
        "musculoskeletal recovery is about doing the right movements consistently, and a " +
        "phone can carry a lot of that program.",
      ]},
      { heading: "Where the experience still falls short", body: [
        "Guided video and periodic check-ins are a big step up from a paper handout, but the " +
        "moment-to-moment session is still mostly one-directional. The app shows you an " +
        "exercise; you do your best; a human reviews things later. Two things are missing in " +
        "the loop: instant feedback on whether you're doing the movement correctly, and a plan " +
        "that reacts to how today actually felt rather than to a preset schedule.",
        "For recovery, form is not a detail — a squat done with the knee collapsing inward can " +
        "reinforce the exact pattern that caused the pain. Catching that in the second it " +
        "happens is worth more than catching it a week later.",
      ]},
      { heading: "My take — how I'd push it further", body: [
        "I'd make the camera the therapist's eyes. Modern on-device pose estimation can track " +
        "joint positions from an ordinary phone camera, which means the app can score your " +
        "form rep-by-rep and speak up the instant something drifts — 'keep your knee over your " +
        "toes' — the way a therapist would.",
        "On top of that, a language-model coach turns raw signals into plain, encouraging " +
        "guidance and answers the questions people actually ask mid-session: 'this pinches a " +
        "little, should I stop?' Finally, the plan itself becomes adaptive: if pain scores rise " +
        "or reps get sloppy, tomorrow's program dials back automatically and flags a human PT " +
        "when the trend looks wrong. The human clinicians don't disappear — their attention " +
        "gets routed to the members who actually need it.",
      ]},
      { heading: "Why it matters", body: [
        "This is the difference between an app that stores your program and one that runs your " +
        "session. Better form means faster, safer recovery; instant feedback means people stay " +
        "engaged instead of quietly giving up; and adaptive plans plus smart escalation let a " +
        "small clinical team safely support far more people. That combination — better outcomes " +
        "and better economics — is exactly what a payer or employer is buying.",
      ]},
    ],
    capabilities: [
      "Real-time form scoring from the phone camera (on-device pose estimation)",
      "An AI coach that explains each correction in plain language",
      "Plans that adapt automatically to pain and progress",
      "Smart escalation that routes at-risk members to human physical therapists",
    ],
    strengths: [
      "Closes the feedback loop that home PT is missing today",
      "Makes human clinicians more leveraged, not redundant",
      "Runs on hardware members already own — a phone",
    ],
    watchOuts: [
      "Camera pose tracking must be validated for clinical safety, not just demoed",
      "Privacy: live camera analysis needs on-device processing and clear consent",
    ],
    quote: "Hinge Health won the distribution argument. The next winner wins the session itself " +
           "— and that prize goes to whoever makes the at-home rep as smart as the in-clinic one.",
    glance: {
      company: "Concept — credits Hinge Health",
      founded: "Hinge Health founded 2014",
      headquarters: "San Francisco, CA",
      regulatory: "Digital MSK care; AI form-tracking would need clinical validation",
      pricing: "Typically employer / health-plan sponsored",
      website: "",
    },
  },

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

];
