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
  portrait: "assets/photos/portrait-cutout.png",   // cut-out headshot on the homepage
  // Hero headline. Wrap words in <em>…</em> for elegant italics.
  heroTitle: "How AI is <em>reshaping</em> healthcare.",
  heroIntro: "I'm Nithila. I study where artificial intelligence meets healthcare, and I write " +
             "independent reviews of the products shaping it, each with a clear point of view on " +
             "how they could serve more people, better.",
  // About section
  aboutLead: "I want to build products that make good healthcare reach further.",
  about: [
    "My work here is a running body of analysis: I take a real company in a corner of " +
    "healthcare, review what it does well and where it falls short, and lay out my own " +
    "product thinking for how AI could push it further, always as independent commentary, " +
    "always crediting the source.",
    "It's how I sharpen the instincts a product manager lives on: reading a market, judging a " +
    "product honestly, and turning a critique into a concrete direction.",
    "A thread runs through the rest of what I do, too. I love getting kids excited about movement with " +
    "Girls on the Run and about science with UF Teach, and staying active and outdoors myself, " +
    "usually with my little sister. Curiosity and energy are the throughline.",
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
  // Origin story — the Museum of the Future, Dubai
  origin: {
    photo: "assets/photos/museum-future-dubai.jpg",
    title: "Where it started",
    text: "My love for this field grew at the Museum of the Future in Dubai. Standing up close to " +
          "innovations from every field (health, mobility, energy, space). I stopped wanting to " +
          "just watch the future arrive and decided I wanted to help build it, starting with healthcare.",
  },
  education: [
    { school: "University of Florida", note: "Undergraduate" },
    { school: "Creekside High School", note: "Recipient of the Benacquisto Scholarship",
      photo: "assets/photos/grad-creekside.jpg" },
  ],
};

/* --------------------------------------------------------------------------
   ONSET — your own venture. Gets a dedicated section.
   Fill the [bracketed] placeholders with the real story and it renders fully.
   -------------------------------------------------------------------------- */
const ONSET = {
  founded: "",                        // ← e.g. "2024"
  oneLiner: "Onset is an independent media brand that decodes AI in healthcare for students and " +
            "newcomers: one idea, one company, and one career at a time, in plain English.",
  why: "AI is transforming medicine faster than anyone can explain it, and most coverage is either " +
       "too technical or too hyped to be useful to someone just getting curious. I built Onset to " +
       "close that gap: no jargon, no hype, no medical degree required.",
  who: "College students, pre-meds, and early-career people who want to understand where medicine is " +
       "heading before it becomes mainstream.",
  how: "A recurring weekly system on Instagram: a 'Word of the Week' explainer, a 'Company Spotlight,' " +
       "and a 'Role Spotlight' on careers in the field, plus deep dives and timely breaking-news posts. " +
       "Each is a designed carousel with a searchable, editorial caption, backed by a newsletter and LinkedIn.",
  impact: "I built the whole brand: naming and positioning, a warm editorial voice that reports rather " +
          "than lectures, a minimalist cream-and-blood-red visual system, a repeatable weekly content " +
          "calendar, and light automation that drafts upcoming posts and scans for breaking news.",
  ig: { handle: "@onset.ai.health", url: "https://instagram.com/onset.ai.health" },
  // Drop screenshots of ONSET posts into assets/photos/ with these names:
  posts: [
    "assets/photos/onset-1.jpg",
    "assets/photos/onset-2.jpg",
    "assets/photos/onset-3.jpg",
  ],
};

/* --------------------------------------------------------------------------
   PROJECTS — things you've built. (e.g. the Nirmaa website.)
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    name: "nirmaa.com",
    role: "Designed & built the website",
    url: "https://nirmaa.com",
    blurb: "Nirmaa is a textile manufacturing company. I designed its services and built the website end to end.",
    photo: "assets/photos/nirmaa.jpg",
  },
];

/* --------------------------------------------------------------------------
   MARKETING — clubs/orgs you run marketing for. Each gets an Instagram
   carousel so people can see your work. Drop post screenshots into
   assets/photos/ with the listed names, and add the Instagram handle/URL.
   -------------------------------------------------------------------------- */
const MARKETING = [
  {
    name: "UF Pawsthetics",
    role: "Marketing Director",
    ig: { handle: "@ufpawsthetics", url: "https://instagram.com/ufpawsthetics" },
    posts: [
      "assets/photos/pawsthetics-1.jpg",
      "assets/photos/pawsthetics-2.jpg",
      "assets/photos/pawsthetics-3.jpg",
    ],
  },
  {
    name: "180 Degrees Consulting",
    role: "Marketing Director",
    headshot: "assets/photos/headshot-180dc.jpg",
    ig: { handle: "@180dcuflorida", url: "https://instagram.com/180dcuflorida" },
    posts: [
      "assets/photos/180dc-1.jpg",
      "assets/photos/180dc-2.jpg",
      "assets/photos/180dc-3.jpg",
    ],
  },
];

/* --------------------------------------------------------------------------
   INVOLVEMENT — leadership, competitions, teaching, volunteering (with photos).
   -------------------------------------------------------------------------- */
const INVOLVEMENT = [
  {
    title: "One Health Center of Excellence — Case Competition",
    role: "2nd place → Communications Chair",
    text: "I placed 2nd in the One Health Center of Excellence case competition, then came back " +
          "to lead communications as Communications Chair for the next one.",
    photo: "assets/photos/onehealth-team.jpg",
  },
  {
    title: "UF Teach",
    role: "STEM Camp Instructor",
    text: "Through UF's Teach program I taught STEM camp to elementary schoolers every week — " +
          "making science hands-on and fun for the youngest learners.",
    photo: "assets/photos/uf-teach-stem.jpg",
  },
  {
    title: "Girls on the Run",
    role: "Volunteer Coach",
    text: "I volunteered with Girls on the Run to share my love of being active with young girls, " +
          "building their confidence through movement.",
    photo: "assets/photos/girls-on-the-run.jpg",
  },
  {
    title: "Norman Fixel Institute for Neurological Diseases",
    role: "Volunteer",
    text: "I volunteered at UF Health's Norman Fixel Institute for Neurological Diseases — pictured " +
          "here with Congressman Gus Bilirakis and Dr. Michael Okun, neurologist and best-selling " +
          "author of The Parkinson's Plan.",
    photo: "assets/photos/fixel-institute.jpg",
    links: [
      { url: "https://fixel.ufhealth.org/", label: "Fixel Institute ↗" },
      { url: "https://www.google.com/search?q=The+Parkinson%27s+Plan+Michael+Okun+book", label: "The Parkinson's Plan ↗" },
    ],
  },
  {
    title: "Stop Children's Cancer",
    role: "Intern",
    text: "I interned with Stop Children's Cancer, supporting their mission to fund research and " +
          "brighter outcomes for children facing cancer.",
    photo: "assets/photos/stop-childrens-cancer.jpg",
  },
];

/* --------------------------------------------------------------------------
   RESEARCH — lab work. Three photos side by side + a description.
   Drop research-1.jpg / research-2.jpg / research-3.jpg into assets/photos/.
   -------------------------------------------------------------------------- */
const RESEARCH = {
  lab: "Urs Lab · University of Florida",
  field: "Neuroscience research",
  text: "I do neuroscience research in the Urs Lab at the University of Florida, studying how the " +
        "brain's signaling systems work — hands-on bench science that grounds my interest in where " +
        "medicine and technology meet.",
  url: "https://pharmacology.med.ufl.edu/research-2/the-urs-lab-2/",
  photos: [
    "assets/photos/research-1.jpg",
    "assets/photos/research-2.jpg",
    "assets/photos/research-3.jpg",
  ],
};

/* --------------------------------------------------------------------------
   FUN FACTS — personal, photo-led moments.
   annotations place a small arrow + label over a photo (x/y are % positions).
   -------------------------------------------------------------------------- */
const FUNFACTS = [
  {
    label: "Fun fact",
    text: "I was at UF the year we won the 2025 national basketball championship. 🏀",
    photo: "assets/photos/basketball-2025.jpg",
    annotations: [
      { x: "72%", y: "34%", label: "me" },
      { x: "30%", y: "34%", label: "college roommate" },
    ],
  },
  {
    label: "About me",
    text: "I love staying active and being out in nature — especially exploring with my little sister.",
    photos: [
      "assets/photos/nature-road.jpg",
      "assets/photos/nature-hike.jpg",
    ],
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
      { id: "radiology",    name: "Radiology" },
      { id: "pathology",    name: "Pathology" },
      { id: "dermatology",  name: "Dermatology" },
      { id: "ophthalmology",name: "Ophthalmology" },
      { id: "at-home",      name: "At-Home Testing" },
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
  {
    id: "chronic",
    name: "Chronic Disease Management",
    icon: "heart",
    blurb: "Helping people manage lifelong conditions day to day.",
    subIndustries: [
      { id: "diabetes", name: "Diabetes" },
    ],
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: "heart",
    blurb: "Expanding access to support, safely.",
    subIndustries: [
      { id: "digital-therapy", name: "Digital Therapy & Support" },
    ],
  },
  {
    id: "womens-health",
    name: "Women's & Maternal Health",
    icon: "heart",
    blurb: "Care for pregnancy, postpartum, and beyond.",
    subIndustries: [
      { id: "maternal-postpartum", name: "Maternal & Postpartum" },
    ],
  },
  {
    id: "care-ops",
    name: "Care Delivery & Operations",
    icon: "scan",
    blurb: "The workflows and paperwork that run medicine.",
    subIndustries: [
      { id: "clinical-documentation", name: "Clinical Documentation" },
    ],
  },
  {
    id: "wellness",
    name: "Sleep & Everyday Health",
    icon: "heart",
    blurb: "The daily habits that keep people well.",
    subIndustries: [
      { id: "sleep", name: "Sleep & Recovery" },
    ],
  },
  {
    id: "elder-care",
    name: "Elder & Home Care",
    icon: "heart",
    blurb: "Helping older adults stay safe and independent at home.",
    subIndustries: [
      { id: "aging-in-place", name: "Aging in Place" },
    ],
  },
];

/* --------------------------------------------------------------------------
   GLOSSARY — plain-English definitions. Any term here that appears in an
   article gets a hover/tap tooltip automatically. Add terms freely.
   -------------------------------------------------------------------------- */
const GLOSSARY = {
  "atrial fibrillation": "An irregular, often rapid heart rhythm that raises the risk of stroke.",
  "AFib": "Short for atrial fibrillation — an irregular heart rhythm that raises stroke risk.",
  "ECG": "Electrocardiogram — a recording of the heart's electrical activity, used to spot rhythm problems.",
  "electrocardiogram": "A recording of the heart's electrical activity, used to spot rhythm problems.",
  "ambient AI scribe": "AI that listens to a clinical visit and drafts the medical note automatically.",
  "diabetic retinopathy": "Diabetes-related damage to the blood vessels of the retina; a leading cause of blindness.",
  "autonomous AI": "AI cleared to make a screening decision on its own, without a specialist reviewing every case.",
  "autonomous screening": "Screening where the AI itself returns the result, without a specialist reading each image.",
  "continuous glucose monitor": "A wearable sensor that tracks blood-sugar levels in real time.",
  "CGM": "Continuous glucose monitor — a wearable sensor that tracks blood sugar in real time.",
  "time-in-range": "The share of the day a person's blood sugar stays within a healthy target band.",
  "PHQ-9": "A standard 9-question questionnaire that measures the severity of depression symptoms.",
  "measurement-based care": "Adjusting treatment using repeated, standardized symptom scores over time.",
  "teledermatology": "Diagnosing skin conditions remotely from photos or video instead of an in-person visit.",
  "n-of-1": "An experiment run on a single person to learn what works specifically for them.",
  "pulmonary embolism": "A sudden blockage in an artery of the lungs — a medical emergency.",
  "triage": "Sorting cases by urgency so the most critical are handled first.",
  "alert fatigue": "When too many alerts cause people to start ignoring them — including important ones.",
  "automation bias": "The tendency to over-trust an automated system's output.",
  "postpartum": "The period after childbirth, when the body is recovering.",
  "false positive": "When a test flags a problem that isn't actually there.",
  "false negative": "When a test misses a problem that is actually there.",
  "sensitivity": "How well a test catches the true cases it is meant to find.",
  "aging in place": "Staying safely in one's own home while getting older, instead of moving to a facility.",
  "readmission": "Returning to the hospital soon after being discharged.",
  "FDA clearance": "U.S. Food and Drug Administration sign-off that a medical device is safe to market.",
  "De Novo": "An FDA pathway that authorizes a novel, lower-risk device type for the first time.",
};

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
    name: "Hinge Health · AI physiotherapy",
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
      { heading: "Recommendation — how I'd push it further", body: [
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
      ],
        image: { src: "assets/physio-coach.png",
          caption: "Concept: an AI coach that already knows your plan — it adapts tomorrow's session from today's feedback and escalates to a human PT when something sounds wrong." } },
      { heading: "Why it matters", body: [
        "This is the difference between an app that stores your program and one that runs your " +
        "session. Better form means faster, safer recovery; instant feedback means people stay " +
        "engaged instead of quietly giving up; and adaptive plans plus smart escalation let a " +
        "small clinical team safely support far more people. That combination — better outcomes " +
        "and better economics — is exactly what a payer or employer is buying.",
      ],
        image: { src: "assets/physio-progress.png",
          caption: "Concept: a progress view that turns adherence, pain, and range-of-motion into something a member — and a payer — can actually see." } },
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
    name: "Isomorphic Labs · AI drug design",
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
    id: "pulseguard",
    name: "AliveCor · Continuous heart monitoring",
    industry: "cardiology", subIndustry: "wearables", status: "has-ai",
    tagline: "AliveCor proved a personal ECG can fit in your pocket. Here's how I'd turn spot-checks into real risk monitoring.",
    hero: { img: "assets/protos/pulseguard.png", caption: "Concept prototype: turning at-home ECG readings into a continuous AFib-burden trend with escalation." },
    article: [
      { body: ["KardiaMobile put a medical-grade ECG in people's hands and taught them to catch atrial fibrillation at home. The next leap isn't a better single reading — it's understanding the rhythm over time."] },
      { heading: "Where it stands", body: ["Today most personal ECG use is reactive: you feel a flutter, you take a reading, you get a snapshot. That's valuable, but AFib is a moving target — its burden rises and falls, and isolated readings miss the trend that actually predicts stroke risk."] },
      { heading: "Recommendation — from spot-checks to a trend line", body: ["I'd model AFib burden continuously and turn it into a single trend a patient and cardiologist can watch together. Pair each reading with context — sleep, caffeine, stress — so the app surfaces personal triggers, and set clear thresholds that escalate to a clinician automatically instead of leaving people to interpret squiggles alone."] },
      { heading: "Why it matters", body: ["Stroke prevention depends on catching rising AFib burden early. A tool that trends risk and escalates at the right moment turns a clever gadget into genuine preventive care."] },
    ],
    capabilities: ["Continuous AFib-burden trending from at-home ECGs","Personal trigger detection (sleep, caffeine, stress)","Automatic escalation to a cardiologist at set thresholds","Plain-language explanations of every reading"],
    strengths: ["Builds on a trusted, FDA-cleared ECG","Turns raw readings into decisions","Runs on hardware patients already own"],
    watchOuts: ["Consumer ECG can miss or misread some arrhythmias","Trend claims need clinical validation, not just demos"],
    quote: "AliveCor won the hardware. The next win is the story the data tells over months — and who acts on it.",
    glance: { company: "AliveCor (KardiaMobile)", founded: "2011", headquarters: "Mountain View, CA", regulatory: "FDA-cleared personal ECG", pricing: "Device + optional subscription", website: "" },
    explore: ["AliveCor / KardiaMobile","Atrial fibrillation","ECG (electrocardiogram)","AFib burden","Stroke prevention"],
  },

  {
    id: "mindbridge",
    name: "Wysa · AI mental-health support",
    industry: "mental-health", subIndustry: "digital-therapy", status: "has-ai",
    tagline: "Wysa made supportive AI available 24/7. Here's how I'd make it safe enough to sit next to real therapy.",
    hero: { img: "assets/protos/mindbridge.png", caption: "Concept prototype: daily check-ins with crisis-safe triage, human handoff, and symptom tracking." },
    article: [
      { body: ["Wysa showed that millions will open up to a supportive AI at 2am when no human is available. The hard part isn't conversation — it's knowing its limits and handling the moments that are genuinely dangerous."] },
      { heading: "Where it stands", body: ["General wellness chatbots risk two failure modes: missing a crisis, and drifting into advice they shouldn't give. Trust in mental health is fragile, and one mishandled crisis erodes it for everyone."] },
      { heading: "Recommendation — build for the edges", body: ["I'd put a crisis-safe triage layer first: detect risk language, respond with vetted protocols, and warm-hand-off to a human or hotline immediately. Then add measurement-based care — track PHQ-9 and anxiety scores over time — so the tool complements a therapist with data, rather than pretending to replace one."] },
      { heading: "Why it matters", body: ["Done right, AI support extends scarce clinicians into the in-between moments. Done carelessly, it's a liability. The difference is entirely in how it handles the edges."] },
    ],
    capabilities: ["Crisis detection with human/hotline handoff","Measurement-based care (PHQ-9, anxiety tracking)","Between-session check-ins","Clear scope limits, no clinical overreach"],
    strengths: ["Meets people where and when they are","Complements therapists with longitudinal data","Lowers the barrier to a first step"],
    watchOuts: ["Crisis handling must be clinically validated","Privacy of sensitive conversations is paramount"],
    quote: "In mental health, the product IS the safety design. Everything else is table stakes.",
    glance: { company: "Wysa", founded: "2015", headquarters: "Boston / London / Bangalore", regulatory: "Wellness tool; some breakthrough-device work", pricing: "Freemium + employer / health-plan", website: "" },
    explore: ["Wysa","Measurement-based care","PHQ-9 depression screening","Crisis triage in digital health","988 Suicide & Crisis Lifeline"],
  },

  {
    id: "glucopilot",
    name: "Dexcom · Predictive glucose coaching",
    industry: "chronic", subIndustry: "diabetes", status: "has-ai",
    tagline: "Dexcom made glucose visible in real time. Here's how I'd turn that stream into a single next step.",
    hero: { img: "assets/protos/glucopilot.png", caption: "Concept prototype: forecasting a low 45 minutes out and giving one specific action." },
    article: [
      { body: ["Continuous glucose monitors gave people a live view of their blood sugar. But a wall of numbers is not the same as knowing what to do — and most users still learn by trial and error."] },
      { heading: "Where it stands", body: ["A CGM shows where you are now; it rarely tells you where you're heading or what to do about it. That insight-to-action gap is where adherence and outcomes are won or lost."] },
      { heading: "Recommendation — forecast, then one action", body: ["I'd forecast highs and lows 30–60 minutes out from food, activity, and personal patterns, and collapse that into a single, specific instruction — 'have 15g of carbs now.' Over time the model learns each person, so the guidance gets sharper and the alerts get quieter."] },
      { heading: "Why it matters", body: ["Fewer dangerous lows, less mental load, better time-in-range. Turning data into one clear move is the difference between a monitor and a coach."] },
    ],
    capabilities: ["30–60 minute glucose forecasting","One specific recommended action","Personalized pattern learning","Quieter, smarter alerts"],
    strengths: ["Builds on a proven, FDA-cleared CGM","Reduces the daily cognitive load of diabetes","Gets more accurate per person over time"],
    watchOuts: ["Predictive advice must fail safe","Over-alerting causes people to tune it out"],
    quote: "A CGM tells you the weather. A coach tells you to bring an umbrella — now.",
    glance: { company: "Dexcom", founded: "1999", headquarters: "San Diego, CA", regulatory: "FDA-cleared continuous glucose monitor", pricing: "Device + sensors (often insured)", website: "" },
    explore: ["Dexcom","Continuous glucose monitor (CGM)","Time in range","Glucose forecasting","Type 2 diabetes management"],
  },

  {
    id: "readrank",
    name: "Aidoc · Explainable radiology triage",
    industry: "diagnostics", subIndustry: "radiology", status: "has-ai",
    tagline: "Aidoc flags urgent findings on scans. Here's how I'd turn many detectors into one trusted worklist.",
    hero: { img: "assets/protos/readrank.png", caption: "Concept prototype: one urgency-ranked worklist with region highlights and confidence." },
    article: [
      { body: ["Aidoc showed AI can catch time-critical findings — a bleed, a clot — and nudge them up the queue. As these detectors multiply, the risk shifts from missing disease to overwhelming radiologists with disconnected alerts."] },
      { heading: "Where it stands", body: ["Each condition tends to get its own model and its own alert. Radiologists end up juggling separate flags with little sense of relative priority — or why the AI spoke up at all."] },
      { heading: "Recommendation — one list, with the 'why'", body: ["I'd merge the detectors into a single, urgency-ranked worklist, each item carrying a highlighted region and a confidence so a radiologist can accept or dismiss in seconds. Then close the loop: learn from which flags get accepted to keep the ranking honest and fight alert fatigue."] },
      { heading: "Why it matters", body: ["The bottleneck in radiology isn't detection anymore — it's attention. A tool that ranks and explains protects the scarcest resource in the department, while guarding against automation bias."] },
    ],
    capabilities: ["Unified, urgency-ranked worklist","Region highlight + confidence per finding","Feedback loop from radiologist accept/dismiss","Triage across multiple conditions"],
    strengths: ["Extends an FDA-cleared triage platform","Designed around radiologist attention","Explainability builds trust"],
    watchOuts: ["Ranking errors could deprioritize real disease","Needs guardrails against automation bias"],
    quote: "When every finding shouts, nothing gets heard. The product job is prioritization, not just detection.",
    glance: { company: "Aidoc", founded: "2016", headquarters: "Tel Aviv, Israel", regulatory: "FDA-cleared radiology triage", pricing: "Enterprise / hospital license", website: "" },
    explore: ["Aidoc","Radiology triage AI","Pulmonary embolism","Alert fatigue","Explainable AI in medicine"],
  },

  {
    id: "nuramom",
    name: "Elvie · AI postpartum companion",
    industry: "womens-health", subIndustry: "maternal-postpartum", status: "adds-ai",
    tagline: "Elvie built beloved devices for new mothers. Here's how I'd add AI that catches warning signs early.",
    hero: { img: "assets/protos/nuramom.png", caption: "Concept prototype: reading recovery data to flag postpartum warning signs and route to care." },
    article: [
      { body: ["Elvie earned trust with products designed around real postpartum life. The unmet need around them is intelligence: postpartum is when serious problems hide, and where follow-up is thinnest."] },
      { heading: "Where it stands", body: ["New parents are sent home with devices and pamphlets, then largely left alone. Postpartum warning signs — mood, bleeding, supply — often go unnoticed until they're urgent."] },
      { heading: "Recommendation — quiet monitoring that routes to care", body: ["I'd read the data mothers already generate to surface early signals — a drop in supply, a mood-screen red flag — and route them to their care team with one tap. Not another dashboard to manage; a companion that watches so an exhausted parent doesn't have to."] },
      { heading: "Why it matters", body: ["Maternal outcomes hinge on catching problems in the weeks after birth. Software that closes the postpartum follow-up gap can be genuinely life-saving."] },
    ],
    capabilities: ["Postpartum warning-sign detection","Supply & recovery insights","Mood screening with escalation","One-tap route to a care team"],
    strengths: ["Builds on trusted, loved hardware","Targets a dangerous care gap","Low-effort for exhausted users"],
    watchOuts: ["Must avoid alarming without cause","Clinical claims require validation and consent"],
    quote: "The postpartum period is where the system goes quiet. That silence is the product opportunity — and the responsibility.",
    glance: { company: "Elvie", founded: "2013", headquarters: "London, UK", regulatory: "Consumer health devices", pricing: "Consumer purchase", website: "" },
    explore: ["Elvie","Postpartum care","Maternal mortality","Postpartum depression screening","Remote patient monitoring"],
  },

  {
    id: "dermacheck",
    name: "SkinVision · Trustworthy skin checks",
    industry: "diagnostics", subIndustry: "dermatology", status: "has-ai",
    tagline: "SkinVision assesses skin-cancer risk from a photo. Here's how I'd make it fair and finish the loop.",
    hero: { img: "assets/protos/dermacheck.png", caption: "Concept prototype: photo risk validated across skin tones, ending in a teledermatology booking." },
    article: [
      { body: ["SkinVision showed a phone photo can flag concerning skin lesions and prompt people to act. The credibility of any such tool rests on two things: does it work across skin tones, and what happens after a scary result?"] },
      { heading: "Where it stands", body: ["Many dermatology AIs are trained mostly on lighter skin, and a high-risk result can leave a user anxious with no clear next step — the two failure modes that break trust fastest."] },
      { heading: "Recommendation — validate fairly, then book the visit", body: ["I'd hold the model to validated performance across skin tones and show confidence honestly, including 'unsure.' Then connect a high-risk result straight to a teledermatology appointment, so the product ends in care, not in a worried search."] },
      { heading: "Why it matters", body: ["Early detection saves lives only if people trust the result and can act on it. Fairness and follow-through are the whole game — a false negative here is dangerous."] },
    ],
    capabilities: ["Skin-lesion risk from a photo","Validated across skin tones","Honest confidence, including 'unsure'","Teledermatology booking for high risk"],
    strengths: ["Extends a CE-marked medical device","Directly addresses equity concerns","Ends in a next step, not anxiety"],
    watchOuts: ["False negatives are dangerous in cancer screening","Requires transparent, tone-stratified validation"],
    quote: "A skin-cancer screener is only as good as the darkest skin it works on — and the appointment it books next.",
    glance: { company: "SkinVision", founded: "2012", headquarters: "Amsterdam, Netherlands", regulatory: "CE-marked medical device", pricing: "Subscription", website: "" },
    explore: ["SkinVision","Melanoma / skin cancer","Teledermatology","Algorithmic bias in dermatology","Sensitivity vs specificity"],
  },

  {
    id: "visitcopilot",
    name: "Abridge · Clinical visit co-pilot",
    industry: "care-ops", subIndustry: "clinical-documentation", status: "has-ai",
    tagline: "Abridge turns a conversation into a note. Here's how I'd make it help during the visit, not just after.",
    hero: { img: "assets/protos/visitcopilot.png", caption: "Concept prototype: an ambient note plus live reminders and a plain-language patient summary." },
    article: [
      { body: ["Abridge attacked one of medicine's biggest time sinks: documentation. An ambient AI scribe that writes the note frees clinicians to look at patients again. The next step is helping while the visit is still happening."] },
      { heading: "Where it stands", body: ["Most ambient scribes are after-the-fact stenographers — they summarize what happened. The richer opportunity is real-time support that improves the visit itself."] },
      { heading: "Recommendation — a co-pilot in the room", body: ["I'd surface guideline reminders and missing questions live ('you haven't discussed medications'), then auto-draft the patient's after-visit summary in plain language. The scribe becomes a quiet second brain, not just a transcriptionist."] },
      { heading: "Why it matters", body: ["Documentation burden drives burnout; missed steps drive errors. A tool that lightens the first and reduces the second earns its place in the room."] },
    ],
    capabilities: ["Ambient note drafted in seconds","Live guideline & gap reminders","Plain-language after-visit summary","Structured data back to the record"],
    strengths: ["Builds on a proven documentation product","Attacks clinician burnout directly","Improves the visit, not just the paperwork"],
    watchOuts: ["Live prompts must not distract or overstep","Accuracy and consent are non-negotiable"],
    quote: "Writing the note was step one. Making the visit better while it happens is where the value compounds.",
    glance: { company: "Abridge", founded: "2018", headquarters: "Pittsburgh / San Francisco", regulatory: "Clinical documentation tool", pricing: "Enterprise / health-system license", website: "" },
    explore: ["Abridge","Ambient AI scribe","Clinician burnout","Clinical decision support","After-visit summary"],
  },

  {
    id: "retinascreen",
    name: "Digital Diagnostics · Autonomous eye screening",
    industry: "diagnostics", subIndustry: "ophthalmology", status: "has-ai",
    tagline: "Digital Diagnostics built the first autonomous AI to diagnose diabetic retinopathy. Here's how I'd finish the job.",
    hero: { img: "assets/protos/retinascreen.png", caption: "Concept prototype: autonomous screening in a pharmacy that helps the patient navigate the referral and its cost." },
    article: [
      { body: ["Digital Diagnostics' IDx-DR made history as an autonomous AI that can screen for diabetic retinopathy without a specialist reading every image. Detection is solved. What isn't solved is what happens next."] },
      { heading: "Where it stands", body: ["Most people with diabetes who should be screened never get to an ophthalmologist. And even when screening flags a problem, the referral often falls through the cracks — frequently because of cost, coverage, and access, not just logistics."] },
      { heading: "Recommendation — screen everywhere, then help people actually get care", body: ["I'd push autonomous screening into pharmacies and primary care where patients already are. But 'auto-booking' an appointment is naive: a positive result means nothing if the patient can't afford the follow-up. So the real product is navigation — schedule the referral, check what their insurance covers, and surface low-cost, sliding-scale, or free-clinic options, with a human care navigator for the hardest cases. The bottleneck isn't detection; it's follow-through, and follow-through is mostly an affordability and access problem."] },
      { heading: "Why it matters", body: ["Diabetic retinopathy is a leading cause of preventable blindness — preventable precisely when it's caught and treated in time. The people most likely to go unscreened are also the least able to absorb a surprise specialist bill, so a screening tool that ignores cost mostly helps the people who were already fine. Closing the gap means designing for access, not just detection."] },
    ],
    capabilities: ["Autonomous diabetic-retinopathy screening","Deployable in pharmacy / primary care","Referral scheduling + insurance & cost navigation","Low-cost / free-clinic options surfaced for positives"],
    strengths: ["Extends a landmark FDA-authorized autonomous AI","Meets patients where they already are","Designs for the real barrier: affordability and access"],
    watchOuts: ["Follow-up must account for cost, coverage, and access — not assume everyone can pay","Image quality varies outside eye clinics; a positive still needs a human ophthalmologist"],
    quote: "Autonomous detection was the breakthrough. Autonomous follow-through is what saves eyesight.",
    glance: { company: "Digital Diagnostics (IDx-DR)", founded: "2010", headquarters: "Coralville, Iowa", regulatory: "FDA De Novo authorized autonomous AI", pricing: "Per-exam / enterprise", website: "" },
    explore: ["Digital Diagnostics (IDx-DR)","Autonomous AI screening","Diabetic retinopathy","FDA De Novo authorization","Care follow-through gap"],
  },

  {
    id: "sleeplab",
    name: "Oura · Actionable sleep coaching",
    industry: "wellness", subIndustry: "sleep", status: "has-ai",
    tagline: "Oura made sleep measurable. Here's how I'd make it actionable.",
    hero: { img: "assets/protos/sleeplab.png", caption: "Concept prototype: running n-of-1 experiments and showing what actually moved your sleep." },
    article: [
      { body: ["Oura turned sleep and recovery into a daily score people actually check. But a score you can't change is just a mood ring — the value is in knowing what to do differently."] },
      { heading: "Where it stands", body: ["Trackers are great at telling you that you slept badly and not so great at telling you why, or what to try. Generic tips ignore how personal sleep really is."] },
      { heading: "Recommendation — run tiny experiments", body: ["I'd use the data to run n-of-1 experiments — 'no caffeine after 2pm this week' — and show what actually moved your sleep. Coaching grounded in your own results beats generic advice, and it turns a passive tracker into a behavior-change engine."] },
      { heading: "Why it matters", body: ["Sleep underlies mood, metabolism, and heart health. A tracker that produces real behavior change is worth far more than one that just produces numbers."] },
    ],
    capabilities: ["Personalized n-of-1 experiments","Driver analysis (what moves your sleep)","Actionable weekly coaching","Recovery-aware recommendations"],
    strengths: ["Builds on a loved consumer wearable","Turns tracking into behavior change","Personal, not generic, advice"],
    watchOuts: ["Wellness claims should avoid medical overreach","Correlation isn't causation without careful design"],
    quote: "A score you can't act on is a number. A score that runs experiments on your behalf is a coach.",
    glance: { company: "Oura", founded: "2013", headquarters: "Oulu, Finland / San Francisco", regulatory: "Consumer wellness device", pricing: "Ring + membership", website: "" },
    explore: ["Oura Ring","Sleep hygiene","n-of-1 experiments","Heart-rate variability (HRV)","Behavior change design"],
  },

  {
    id: "homewatch",
    name: "Cherish · Predictive aging-in-place",
    industry: "elder-care", subIndustry: "aging-in-place", status: "adds-ai",
    tagline: "Cherish built contactless in-home sensing. Here's how I'd make it predict decline, not just detect falls.",
    hero: { img: "assets/protos/homewatch.png", caption: "Concept prototype: learning a senior's baseline and flagging decline before a fall." },
    article: [
      { body: ["Cherish showed you can sense what's happening in a home without cameras or wearables. The next step is meaning: not just 'someone fell,' but 'something is changing.'"] },
      { heading: "Where it stands", body: ["Most home-safety tech is reactive — it raises an alarm after a fall. By then, the decline that led there has often been building for weeks, invisibly."] },
      { heading: "Recommendation — learn the baseline, flag the drift", body: ["I'd learn each person's normal — gait speed, activity, night-time bathroom trips — and flag decline before it becomes a fall or a hospital stay. Alerts should carry context for family and clinicians, not just noise, so a subtle slowdown becomes an early, actionable heads-up."] },
      { heading: "Why it matters", body: ["Falls and avoidable readmissions are enormous costs, human and financial. Catching decline early keeps older adults home, safe, and independent longer — true aging in place."] },
    ],
    capabilities: ["Passive, camera-free monitoring","Personal baseline learning","Decline detection before a fall","Context-rich alerts to family & clinicians"],
    strengths: ["Builds on privacy-conscious sensing","Predictive, not just reactive","Supports aging in place with dignity"],
    watchOuts: ["Privacy and consent for continuous sensing","False alarms erode family trust"],
    quote: "A fall alarm reacts to a tragedy. The real product predicts the decline that precedes it.",
    glance: { company: "Cherish Health", founded: "2019", headquarters: "Boston, MA", regulatory: "Home monitoring; verify clearances", pricing: "Device + subscription", website: "" },
    explore: ["Cherish Health","Aging in place","Fall detection vs. prediction","Hospital readmissions","Remote patient monitoring"],
  },

];

/* --------------------------------------------------------------------------
   CATALOG — the searchable database. Every company I've reviewed or am
   tracking, across every field. `rating` is my editorial score (out of 5).
   `full` links to a deep-dive review page (product.html?id=...).
   status: "has-ai" (established), "adds-ai" (my concept), "watch" (emerging).
   -------------------------------------------------------------------------- */
const CATALOG = [
  // Cardiology
  { name: "KardiaMobile", company: "AliveCor", field: "Cardiology", rating: 4.4, status: "has-ai", tags: ["ECG","wearable","AFib"], take: "Reliable pocket ECG that catches AFib; the opportunity is trending risk over time.", full: "pulseguard" },
  { name: "Cleerly", company: "Cleerly", field: "Cardiology", rating: 4.3, status: "has-ai", tags: ["cardiac CT","prevention"], take: "AI plaque analysis on cardiac CT that shifts heart disease from reactive to preventive." },
  { name: "Viz.ai", company: "Viz.ai", field: "Cardiology", rating: 4.5, status: "has-ai", tags: ["stroke","workflow"], take: "Care-coordination AI that genuinely saves minutes — a model for AI embedded in workflow." },
  { name: "Eko Health", company: "Eko", field: "Cardiology", rating: 4.1, status: "has-ai", tags: ["stethoscope","devices"], take: "AI stethoscope surfacing murmurs and AFib at the point of care." },
  // Diabetes & Endocrine
  { name: "Dexcom G-series", company: "Dexcom", field: "Diabetes & Endocrine", rating: 4.5, status: "has-ai", tags: ["CGM"], take: "Best-in-class continuous glucose monitor; needs to close the data-to-action gap.", full: "glucopilot" },
  { name: "FreeStyle Libre", company: "Abbott", field: "Diabetes & Endocrine", rating: 4.4, status: "has-ai", tags: ["CGM","access"], take: "Affordable CGM scaling access worldwide; the software layer is still catching up." },
  { name: "Virta Health", company: "Virta", field: "Diabetes & Endocrine", rating: 4.0, status: "has-ai", tags: ["reversal","coaching"], take: "Evidence-based diabetes reversal through nutrition and coaching." },
  { name: "January AI", company: "January", field: "Diabetes & Endocrine", rating: 3.6, status: "watch", tags: ["prediction"], take: "Predicts glucose response from food without a CGM; promising, still validating." },
  // Radiology & Imaging
  { name: "Aidoc", company: "Aidoc", field: "Radiology & Imaging", rating: 4.4, status: "has-ai", tags: ["triage","acute"], take: "Strong urgent-finding triage; unify the detectors and add explainability.", full: "readrank" },
  { name: "Lunit INSIGHT", company: "Lunit", field: "Radiology & Imaging", rating: 4.2, status: "has-ai", tags: ["oncology","mammography"], take: "Cancer detection on mammography and chest imaging with a strong evidence base." },
  { name: "Gleamer BoneView", company: "Gleamer", field: "Radiology & Imaging", rating: 4.1, status: "has-ai", tags: ["x-ray","fractures"], take: "Fracture detection that cuts misses in the emergency department." },
  { name: "RapidAI", company: "RapidAI", field: "Radiology & Imaging", rating: 4.2, status: "has-ai", tags: ["stroke","triage"], take: "Stroke and vascular imaging triage that speeds the ED pathway." },
  // Pathology
  { name: "Paige Prostate", company: "Paige.AI", field: "Pathology", rating: 4.2, status: "has-ai", tags: ["oncology","digital path"], take: "FDA-cleared digital pathology for cancer detection." },
  { name: "PathAI", company: "PathAI", field: "Pathology", rating: 4.0, status: "has-ai", tags: ["research","diagnostics"], take: "AI pathology spanning drug research and diagnostics." },
  // Dermatology
  { name: "SkinVision", company: "SkinVision", field: "Dermatology", rating: 3.8, status: "has-ai", tags: ["skin cancer","consumer"], take: "Photo-based risk triage; fairness across skin tones and follow-through are the test.", full: "dermacheck" },
  { name: "VisualDx", company: "VisualDx", field: "Dermatology", rating: 4.0, status: "has-ai", tags: ["decision support"], take: "Clinical decision support across skin conditions and diverse skin tones." },
  // Ophthalmology
  { name: "IDx-DR", company: "Digital Diagnostics", field: "Ophthalmology", rating: 4.3, status: "has-ai", tags: ["autonomous","screening"], take: "Landmark autonomous screening; the win now is access and follow-through, not detection.", full: "retinascreen" },
  { name: "EyeArt", company: "Eyenuk", field: "Ophthalmology", rating: 4.1, status: "has-ai", tags: ["autonomous","screening"], take: "Autonomous diabetic-retinopathy screening scaling into primary care." },
  // Oncology & Early Detection
  { name: "Tempus", company: "Tempus", field: "Oncology & Early Detection", rating: 4.3, status: "has-ai", tags: ["genomics","data"], take: "Molecular and clinical data platform powering precision oncology." },
  { name: "Galleri", company: "GRAIL", field: "Oncology & Early Detection", rating: 3.9, status: "watch", tags: ["MCED","screening"], take: "Multi-cancer early-detection blood test; large upside, evidence still maturing." },
  { name: "Freenome", company: "Freenome", field: "Oncology & Early Detection", rating: 3.7, status: "watch", tags: ["blood test","screening"], take: "Blood-based early cancer detection; promising, unproven at population scale." },
  // Drug Discovery
  { name: "Isomorphic Labs", company: "Isomorphic Labs (Alphabet)", field: "Drug Discovery", rating: 4.6, status: "has-ai", tags: ["AI design","AlphaFold"], take: "The scientific flagship of AI drug design; the clinical proof is still ahead of it.", full: "isomorphic-labs" },
  { name: "Recursion OS", company: "Recursion", field: "Drug Discovery", rating: 4.0, status: "has-ai", tags: ["platform","imaging"], take: "Industrialized, image-based drug discovery run at massive scale." },
  { name: "Insilico Medicine", company: "Insilico", field: "Drug Discovery", rating: 4.0, status: "has-ai", tags: ["generative"], take: "Generative chemistry with AI-designed candidates now in trials." },
  { name: "Insitro", company: "Insitro", field: "Drug Discovery", rating: 3.9, status: "has-ai", tags: ["genetics","ML"], take: "Machine learning plus human genetics to choose better drug targets." },
  // Mental Health
  { name: "Wysa", company: "Wysa", field: "Mental Health", rating: 3.9, status: "has-ai", tags: ["chatbot","CBT"], take: "Accessible round-the-clock support; the safety design is the real product.", full: "mindbridge" },
  { name: "Woebot", company: "Woebot Health", field: "Mental Health", rating: 3.6, status: "has-ai", tags: ["chatbot","CBT"], take: "CBT chatbot with mixed evidence; safety-first handling matters most." },
  { name: "Spring Health", company: "Spring Health", field: "Mental Health", rating: 4.2, status: "has-ai", tags: ["navigation","benefits"], take: "Precision mental-health benefits that route people to the right level of care." },
  { name: "Lyra Health", company: "Lyra", field: "Mental Health", rating: 4.2, status: "has-ai", tags: ["platform","MBC"], take: "Employer mental-health platform grounded in measurement-based care." },
  // Women's & Maternal Health
  { name: "Elvie", company: "Elvie", field: "Women's & Maternal Health", rating: 4.0, status: "adds-ai", tags: ["devices","postpartum"], take: "Loved hardware for new mothers; add intelligence for postpartum safety.", full: "nuramom" },
  { name: "Maven Clinic", company: "Maven", field: "Women's & Maternal Health", rating: 4.4, status: "has-ai", tags: ["virtual care","navigation"], take: "Virtual women's and family health with strong care navigation." },
  { name: "Bloomlife", company: "Bloomlife", field: "Women's & Maternal Health", rating: 3.7, status: "watch", tags: ["pregnancy","monitoring"], take: "Pregnancy monitoring with useful signal; clinical role still emerging." },
  // Rehabilitation & MSK
  { name: "Hinge Health", company: "Hinge Health", field: "Rehabilitation & MSK", rating: 4.2, status: "has-ai", tags: ["MSK","digital PT"], take: "Won distribution for home PT; the next win is making the session itself intelligent.", full: "hinge-health-ai-pt" },
  { name: "Sword Health", company: "Sword", field: "Rehabilitation & MSK", rating: 4.3, status: "has-ai", tags: ["MSK","clinician"], take: "AI plus clinicians for MSK care, with strong outcomes data." },
  { name: "Kaia Health", company: "Kaia", field: "Rehabilitation & MSK", rating: 4.0, status: "has-ai", tags: ["MSK","motion"], take: "Motion-tracking musculoskeletal therapy from a phone camera." },
  // Care Delivery & Documentation
  { name: "Abridge", company: "Abridge", field: "Clinical Documentation", rating: 4.5, status: "has-ai", tags: ["scribe","ambient"], take: "Best-in-class ambient scribe; move it from note-taker to in-visit co-pilot.", full: "visitcopilot" },
  { name: "DAX Copilot", company: "Nuance (Microsoft)", field: "Clinical Documentation", rating: 4.3, status: "has-ai", tags: ["scribe","enterprise"], take: "Enterprise-grade ambient documentation deployed at scale." },
  { name: "Nabla", company: "Nabla", field: "Clinical Documentation", rating: 4.0, status: "has-ai", tags: ["scribe"], take: "Lightweight ambient scribe that clinicians actually adopt." },
  { name: "Suki", company: "Suki", field: "Clinical Documentation", rating: 4.0, status: "has-ai", tags: ["voice"], take: "Voice assistant for clinical documentation and orders." },
  // Sleep & Everyday Health
  { name: "Oura Ring", company: "Oura", field: "Sleep & Everyday Health", rating: 4.2, status: "has-ai", tags: ["wearable","sleep"], take: "Beloved sleep tracker; the leap is making the score change behavior.", full: "sleeplab" },
  { name: "Whoop", company: "Whoop", field: "Sleep & Everyday Health", rating: 4.0, status: "has-ai", tags: ["wearable","recovery"], take: "Recovery-focused wearable with heavy coaching; polarizing but effective." },
  { name: "Eight Sleep", company: "Eight Sleep", field: "Sleep & Everyday Health", rating: 3.8, status: "has-ai", tags: ["hardware","temperature"], take: "Active temperature-control sleep hardware; the data is underused." },
  // Elder & Home Care
  { name: "Cherish Serenity", company: "Cherish Health", field: "Elder & Home Care", rating: 3.9, status: "adds-ai", tags: ["sensing","falls"], take: "Contactless in-home sensing; predict decline, and design for cost.", full: "homewatch" },
  { name: "CarePredict", company: "CarePredict", field: "Elder & Home Care", rating: 3.8, status: "has-ai", tags: ["wearable","seniors"], take: "Wearable plus AI detecting changes in seniors' daily patterns." },
  // Primary Care & Triage
  { name: "Ada Health", company: "Ada", field: "Primary Care & Triage", rating: 4.0, status: "has-ai", tags: ["symptom checker"], take: "Symptom assessment with one of the better evidence bases in the category." },
  { name: "K Health", company: "K Health", field: "Primary Care & Triage", rating: 3.8, status: "has-ai", tags: ["primary care","chat"], take: "AI-first primary care chat backed by clinicians." },
  { name: "Buoy Health", company: "Buoy", field: "Primary Care & Triage", rating: 3.6, status: "has-ai", tags: ["triage","navigation"], take: "Symptom checker and care navigation for the front door." },
  // Nutrition
  { name: "ZOE", company: "ZOE", field: "Nutrition", rating: 3.9, status: "has-ai", tags: ["personalized","testing"], take: "Personalized nutrition from at-home testing and real science." },
  { name: "Nutrisense", company: "Nutrisense", field: "Nutrition", rating: 3.6, status: "has-ai", tags: ["CGM","coaching"], take: "CGM-based nutrition coaching for people without diabetes." },
  // Remote Monitoring & Hospital-at-Home
  { name: "Biofourmis", company: "Biofourmis", field: "Remote Monitoring", rating: 4.0, status: "has-ai", tags: ["RPM","virtual care"], take: "AI-powered remote monitoring and virtual care for complex patients." },
  { name: "Current Health", company: "Current Health (Best Buy)", field: "Remote Monitoring", rating: 3.9, status: "has-ai", tags: ["RPM","hospital-at-home"], take: "Hospital-at-home monitoring platform with a real device story." },
  // Hospital Operations
  { name: "Qventus", company: "Qventus", field: "Hospital Operations", rating: 4.0, status: "has-ai", tags: ["ops","patient flow"], take: "AI for hospital operations and patient flow — unglamorous, high-leverage." },
  // Surgery
  { name: "Activ Surgical", company: "Activ Surgical", field: "Surgery", rating: 3.8, status: "watch", tags: ["OR","visualization"], take: "Surgical AI and visualization augmenting what the surgeon can see." },
  { name: "Proprio", company: "Proprio", field: "Surgery", rating: 3.7, status: "watch", tags: ["imaging","OR"], take: "Light-field imaging plus AI to guide surgery in real time." },
  // Genomics
  { name: "Nucleus", company: "Nucleus Genomics", field: "Genomics", rating: 3.5, status: "watch", tags: ["consumer","genomics"], take: "Consumer genomics with interpretation; early, and worth watching carefully." },
];
