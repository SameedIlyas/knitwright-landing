/**
 * Every word on the page. Source of truth: landing-page-content.md.
 * Rules carried over from the brief: no invented customers, results, prices,
 * minimums, lead times or launch dates. Illustrative figures are labelled as such.
 */

export const SITE = {
  name: "Knitwright",
  tagline: "From sketch to shipped. Sportswear designed, made and delivered.",
  lockup: "Spec. Make. Ship.",
  title: "Knitwright | Sportswear from design to delivery",
  description:
    "Bring a sketch or an idea. Get a factory-ready tech pack in minutes, then have it sampled, made in Sialkot and shipped. From 50 pieces. Early access open.",
  ogTitle: "From sketch to shipped. Sportswear designed, made and delivered.",
  ogDescription:
    "Knitwright drafts your tech pack and patterns in minutes, then samples, makes and ships your sportswear from Sialkot.",
} as const;

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#verification", label: "The spec" },
  { href: "#production", label: "Production" },
  { href: "#faq", label: "FAQ" },
] as const;

export const HERO = {
  badge: "Production OS · Sportswear",
  headline: ["From idea to made.", "Without ever managing a factory."],
  sub: "Knitwright turns your design into a verified, factory-ready specification, then manufactures it and ships it to you. A named technician signs off every spec. You never source, vet, or chase a factory.",
  primary: "Join the waitlist",
  secondary: "See how it works",
  microcopy: "Early access · No spam · Unsubscribe anytime",
} as const;

export const BUILT_FOR = {
  label: "Built for",
  statement:
    "Built for brands that are good at everything except the factory. You have the designs, the audience, and the orders. Knitwright is the production team you haven't hired yet.",
  marquee: ["Spec", "Make", "Ship", "Signed", "Measured", "Released by you"],
  segments: [
    {
      name: "First-time sportswear founders",
      makes: "Training tees, run tops, first collections",
      why: "You bring the idea. We handle the spec, the sample and a first run from 50 pieces.",
    },
    {
      name: "Designers and product teams",
      makes: "Tech packs, graded patterns, DXF export",
      why: "Skip a week of pattern work per style. Export it, or send it straight to our line.",
    },
    {
      name: "Clubs, gyms and academies",
      makes: "Club kit, polos, training tops",
      why: "Small runs, a full size range from XS to 3XL, and easy reorders every season.",
    },
    {
      name: "Creators and coaches",
      makes: "Tees, raglans, base layers",
      why: "Launch a drop without learning manufacturing. Restock in 3 to 4 weeks when it sells.",
    },
  ],
  productPerson: {
    title: "For the person who reads the measurement table.",
    body: "Every point of measurement, grade and tolerance is in the spec, editable, and moves the pattern, the flat and the 3D garment with it.",
  },
  notFor: {
    title: "And for the person who has never seen one.",
    body: "You don't need to know what a grade rule is. Describe what you want, approve the sample, and we handle the rest.",
  },
} as const;

export const STATUS_QUO = {
  label: "The status quo",
  title: "Small brands can design. They can't produce.",
  sub: "The hard part was never the design. It's the engineering of the spec, and the execution behind it.",
  items: [
    {
      word: "Months",
      body: "To find a factory that answers, samples honestly, and doesn't disappear once you're past the deposit.",
    },
    {
      word: "Rounds",
      body: "Weeks per sample round, and the spec drifts a little every time someone re-types it into a new spreadsheet.",
    },
    {
      word: "Last",
      body: "You find out about quality when the boxes land, after the money has gone.",
    },
  ],
  quotesLabel: "Sound familiar?",
  quotes: [
    "I sent the same tech pack to four factories and got four different garments.",
    "I don't know what a correct seam allowance is, so I can't tell when it's wrong.",
    "The sample was perfect. The bulk wasn't.",
    "I paid 50% up front and then they stopped replying.",
    "Reordering means explaining the whole thing again to someone new.",
  ],
  slices: {
    title: "Everyone owns one slice. The handoffs are where brands lose months.",
    rows: [
      { use: "An AI tech-pack generator", get: "A drafted spec in minutes", but: "Nobody checks it, and it stops at the document" },
      { use: "A tech-pack or PLM tool", get: "Good documentation and collaboration", but: "You still have to find, vet and manage a factory yourself" },
      { use: "A sourcing marketplace", get: "An introduction to a factory", but: "You manage the relationship and carry the quality risk" },
      { use: "An agent or freelancer", get: "Someone who knows factories", but: "Opaque pricing, one person's bandwidth, no system" },
      { use: "Enterprise PLM / ERP", get: "Everything", but: "Built for 200-person brands, priced and staffed for them" },
    ],
  },
} as const;

export const WHAT_WE_DO = {
  label: "What Knitwright does",
  title: "One product, from the first sketch to the last carton.",
  cards: [
    {
      title: "We draft the spec.",
      body: "Upload a photo, sketch, competitor product or moodboard. Knitwright drafts the complete technical specification: annotated flats, a graded measurement table with tolerances, construction notes, fabric and trims.",
      points: ["Annotated technical flats", "Graded size run with tolerances", "Construction, fabric and trims"],
    },
    {
      title: "A named technician verifies it.",
      body: "A technician in our studio checks what software can't be trusted to — seam allowances, grading logic, buildability — and signs it by name, with a date.",
    },
    {
      title: "We make it.",
      body: "Production runs on lines we own and manage. You see Knitwright Verified Production: one quality tier, a price, a lead time, and a guarantee.",
    },
    {
      title: "We ship it — and you release the money.",
      body: "Instant costing, sample or straight to bulk, inline QC, milestone escrow you release on QC pass, and shipping to your door.",
    },
  ],
} as const;

export type Actor = "YOU" | "KNITWRIGHT";

export const FLOW = {
  label: "How it works",
  title: "Four steps. You do two of them.",
  sub: "The path is short on purpose. You bring the idea and the approvals. We carry everything in between.",
  steps: [
    {
      title: "Upload what you have",
      who: "YOU" as Actor,
      body: "A photo, a sketch, a competitor's product, a moodboard. Two answers change the spec — category and quantity. Everything else starts correct by default.",
    },
    {
      title: "Get a drafted spec",
      who: "KNITWRIGHT" as Actor,
      body: "Technical flats with measurement callouts, a graded size run with tolerances, construction notes, fabric and trims. Change anything by just saying it.",
    },
    {
      title: "A technician verifies it",
      who: "KNITWRIGHT" as Actor,
      body: "Named, in our studio. They check seam allowances, grading and buildability, then sign it.",
    },
    {
      title: "Approve, and we make it",
      who: "YOU" as Actor,
      body: "Sample first or straight to bulk. Inline QC, escrow, shipped to your door.",
    },
  ],
  route: [
    { stage: "Idea", who: "you" },
    { stage: "Intake", who: "you" },
    { stage: "Draft spec", who: "us" },
    { stage: "Studio sign-off", who: "us" },
    { stage: "Sample", who: "us + you" },
    { stage: "Quote & order", who: "you" },
    { stage: "Production & QC", who: "us" },
    { stage: "Shipped", who: "us" },
    { stage: "Reorder", who: "you · 1 click" },
  ],
} as const;

export const SPEC_LIVE = {
  label: "One source of truth",
  title: "Change the sleeve, and every number moves with it.",
  body: "The flat, the 3D garment, the graded measurement table and the pattern pieces are four views of one spec. There's no second copy to drift out of sync between your designer, your agent and the cutting room.",
  prompt: "raglan, long sleeves, cobalt body",
  refusal:
    "Ask for a polo with cap sleeves and it explains that polos come in short and three-quarter sleeves — from the same style rules production uses.",
  styles: ["crew", "raglan", "polo"] as const,
  styleLabels: { crew: "Crew · short", raglan: "Raglan · long", polo: "Polo · short" },
} as const;

export const VERIFICATION = {
  label: "Verification",
  title: "A spec a factory can build from.",
  body: "A freelance tech pack and graded pattern take one to two weeks per style. Knitwright drafts yours in under 10 minutes: flats, measurements, grading, construction, fabric and trims. Nothing goes to bulk until you have held the sample.",
  verified: { state: "Ready for sampling", line: "Spec v3 · saved 2 minutes ago" },
  unverified: { state: "Unverified draft", line: "Spec changed since sign-off · re-verification queued" },
  caption:
    "Factories don't quote a moodboard. They quote a spec. Most new brands stall right here, and most designers lose a week per style.",
  nameNote: "Reviewer name is illustrative.",
} as const;

export const PRODUCTION = {
  label: "Production",
  title: "There is no factory to find.",
  body: "You never source, vet, brief or chase a factory. Your order runs on lines we manage in Sialkot, from 50 pieces per style. You see one price, one lead time and one team accountable for the QC and the guarantee.",
  why: "Marketplaces introduce you to a factory and step away, so the quality risk becomes yours. We make the order ourselves, so we stay accountable until you release the balance.",
  costing: {
    title: "Instant costing that shows its arithmetic.",
    body: "Materials and trims, make, finishing and pack, QA and spec, platform fee. The lines always add up to the price you pay. Move the quantity and every line re-derives.",
    tiers: [100, 300, 500, 1000],
    // Illustrative only — a shape, not a price list. Weights sum to 1.
    lines: [
      { name: "Materials & trims", weight: 0.41 },
      { name: "Make", weight: 0.27 },
      { name: "Finishing & pack", weight: 0.12 },
      { name: "QA & spec", weight: 0.09 },
      { name: "Platform fee", weight: 0.11 },
    ],
  },
  escrow: {
    title: "Money released by you, not by us.",
    body: "Pay 50% to start. The other 50% sits in escrow until final QC passes and you release it. Verified defects are remade or refunded.",
    milestones: [
      { label: "Deposit", state: "50% paid" },
      { label: "Bulk", state: "In production" },
      { label: "Final QC", state: "Measured to ±1 cm" },
      { label: "Balance", state: "50% held · you release" },
    ],
  },
  stages: ["Sample", "Sample approved", "Bulk", "Final QC", "Shipped"],
} as const;

export const STUDIO = {
  label: "Behind the curtain",
  title: "The part you never see.",
  body: "Underneath your calm, quiet dashboard is a dense, keyboard-driven console in Sialkot, where our technicians clear specs, verify measurements against tolerance, and allocate your order across our lines. You never see it, and you never need to. That's the point.",
  place:
    "Our studio and production lines are in Sialkot, Pakistan, one of the world's established centres for sportswear manufacturing. The people who build your spec are close to the people who cut and sew it.",
  queue: [
    { id: "SP-2291", style: "Crew · training tee", brand: "Brand 07", stage: "Sampling", sla: "02:14" },
    { id: "SP-2290", style: "Raglan · long sleeve", brand: "Brand 12", stage: "Cutting", sla: "03:40" },
    { id: "SP-2288", style: "Polo · club kit", brand: "Brand 03", stage: "Sewing", sla: "05:02" },
    { id: "SP-2285", style: "Henley · base layer", brand: "Brand 19", stage: "Final QC", sla: "07:31" },
    { id: "SP-2283", style: "V-neck · run top", brand: "Brand 07", stage: "Packing", sla: "09:12" },
  ],
  lines: [
    { name: "Line A", load: 0.72 },
    { name: "Line B", load: 0.48 },
    { name: "Line C", load: 0.86 },
  ],
} as const;

export const WHY = {
  label: "Why Knitwright",
  title: "Other tools hand you a document. We hand you a finished product.",
  reasons: [
    {
      title: "No tech pack? Start with an idea",
      body: "Factories won't quote a moodboard. We turn yours into a spec they can build from, in under 10 minutes.",
    },
    {
      title: "There is no factory to manage",
      body: "No vetting ten vendors or paying for three sample rounds. We make it ourselves and own the QC and the guarantee.",
    },
    {
      title: "Patterns in minutes, not weeks",
      body: "Drafted and graded from XS to 3XL at once. Change a sleeve or a fit and every piece updates with it.",
    },
    {
      title: "Your money waits for you",
      body: "Pay 50% to start. The rest sits in escrow until QC passes and you release it. Verified defects are remade or refunded.",
    },
    {
      title: "Start at 50 pieces, not 500",
      body: "Test a design before you bet on it. Sample in 10 working days, bulk in 4 to 5 weeks.",
    },
    {
      title: "Your designs stay yours",
      body: "Specs are never shown to another brand. Export the full tech pack and DXF pattern pieces at any time.",
    },
  ],
  landscape: {
    label: "The landscape",
    title: "Everyone owns one slice. We own the whole path.",
    columns: ["Knitwright", "AI spec generators", "Tech-pack tools", "Sourcing marketplaces", "Enterprise PLM"],
    // 2 = yes, 1 = partly, 0 = no
    rows: [
      { cap: "Drafts the spec for you", v: [2, 2, 0, 0, 1] },
      { cap: "Human technical sign-off", v: [2, 0, 0, 1, 0] },
      { cap: "Graded measurements and tolerances", v: [2, 1, 2, 1, 2] },
      { cap: "Pattern pieces (DXF)", v: [2, 0, 1, 0, 1] },
      { cap: "Instant, itemised quote", v: [2, 0, 1, 2, 2] },
      { cap: "Production and QC managed for you", v: [2, 0, 0, 1, 1] },
      { cap: "Escrow released by you on QC pass", v: [2, 0, 0, 1, 0] },
      { cap: "You never deal with a factory", v: [2, 0, 0, 0, 0] },
      { cap: "Built for sportswear", v: [2, 0, 0, 0, 0] },
    ],
  },
} as const;

export const PROTECTION = {
  label: "What protects you",
  title: "You don't have to take our word for it.",
  sub: "The process is built so you don't have to.",
  items: [
    { title: "Named sign-off", body: "A real technician's name and date on every verified spec." },
    { title: "Version-true badge", body: "Change the spec after sign-off and the badge says so until it's re-verified." },
    { title: "Sample first", body: "See and measure the garment before you commit to bulk." },
    { title: "Measured, not eyeballed", body: "Samples and QC are checked against your spec's own tolerances." },
    { title: "Escrow", body: "Your balance is held until QC passes and you release it." },
    { title: "Money back on verified defects", body: "If the goods are wrong, you don't pay for them." },
    { title: "You own your specs", body: "Export the tech pack and pattern at any time. No lock-in." },
  ],
} as const;

export const REORDER = {
  title: "The second order is one click.",
  sub: "Same spec, same line, same price band. No re-briefing, no re-sourcing.",
} as const;

export const EARLY_ACCESS = {
  label: "Early access",
  title: "We're onboarding a first group of brands.",
  sub: "Tell us what you want to make, even if it's still an idea. We're taking a small number of brands through their first production cycles, from 50 pieces per style.",
  path: [
    { step: "Request early access", happens: "Fill in the short form.", you: "60 seconds: email, brand, what you make, volume." },
    { step: "We get in touch", happens: "We reply when a slot opens in your category.", you: "Reply with a reference photo to move up the list." },
    { step: "Your first style", happens: "You get access and start a project.", you: "Upload a reference, answer category and quantity." },
    { step: "Spec, signed", happens: "Draft spec, then a technician verifies it.", you: "Review it, comment, approve." },
    { step: "Sample, then bulk", happens: "We sample, measure, quote and produce.", you: "Approve the sample, pick a quantity, pay the deposit." },
    { step: "Delivered", happens: "QC, release, ship.", you: "Release the balance when QC passes." },
  ]
} as const;

export const CATEGORIES = ["Performance", "Activewear", "Team kit & uniforms", "Streetwear", "Other"] as const;
export const VOLUMES = [
  "Not producing yet",
  "Under 1,000 units",
  "1,000–5,000",
  "5,000–20,000",
  "20,000+",
] as const;

export const FAQ = {
  label: "FAQ",
  title: "Common questions.",
  groups: [
    {
      name: "The product",
      items: [
        {
          q: "What is Knitwright, in one sentence?",
          a: "It turns a sportswear idea into a factory-ready tech pack in minutes, then samples, makes and ships it from Sialkot.",
        },
        {
          q: "What do I need to start?",
          a: "A sketch, a photo, a reference product or a description. No tech pack, pattern or factory needed.",
        },
        {
          q: "What can you make today?",
          a: "Athletic tops: crew, V-neck, raglan, polo, henley, training tees, club kit, base layers and run tops, in XS to 3XL. More categories are coming.",
        },
        {
          q: "Is the spec generated by AI?",
          a: "Yes. AI drafts the flats, measurements, grading and construction notes. You can edit all of it, and nothing goes to bulk until you approve a physical sample.",
        },
        {
          q: "Can I change the spec myself?",
          a: "Yes. Describe the change in plain language or edit any measurement. The flat, the graded table and the pattern pieces update together.",
        },
      ],
    },
    {
      name: "Production",
      items: [
        {
          q: "What is the minimum order?",
          a: "50 pieces per style, split across sizes, in up to 2 colourways.",
        },
        {
          q: "How long does it take?",
          a: "Sample in 10 working days, bulk in 4 to 5 weeks after you approve it, shipping in 5 to 8 days. A first run takes about 8 to 10 weeks. Reorders take 3 to 4.",
        },
        {
          q: "Where is it made?",
          a: "On production lines we manage in Sialkot, Pakistan. You never deal with a factory.",
        },
        {
          q: "How do you check quality?",
          a: "Every order is measured against your spec, to ±1 cm on key measurements, and inspected to AQL 2.5 before it ships.",
        },
        {
          q: "Where do you ship?",
          a: "By air express to the US, UK, EU and Australia. Import duties are paid by you on arrival.",
        },
      ],
    },
    {
      name: "Money and risk",
      items: [
        {
          q: "What does it cost?",
          a: "Drafting a spec is free during early access. Production is quoted per style with the full breakdown: materials, make, finishing, QA and platform fee.",
        },
        {
          q: "How does payment work?",
          a: "You pay 50% to start. The other 50% sits in escrow until final QC passes and you release it.",
        },
        {
          q: "What if there is a defect?",
          a: "Report it within 14 days of delivery. Verified defects are remade or refunded.",
        },
      ],
    },
    {
      name: "Your designs",
      items: [
        {
          q: "Who owns my designs?",
          a: "You do, including the spec and the pattern pieces.",
        },
        {
          q: "Will other brands see my spec?",
          a: "No. Specs are never shown to another brand.",
        },
        {
          q: "Can I export my tech pack and patterns?",
          a: "Yes. Export the full tech pack and DXF pattern pieces at any time.",
        },
      ],
    },
  ],
} as const;

/* ── Home layout copy ─────────────────────────────────────────────────────
   Short labels for the gallery and benefit rows. Every line is derived from
   the sections above; nothing here introduces a new claim. */

export const HOME_HERO = {
  headline: ["From sketch to shipped.", "Designed, made and delivered."],
  sub: "Bring a sketch or an idea. Get a factory-ready tech pack in minutes. We make it and ship it.",
  card: {
    title: "Verified for production",
    body: "Every spec is checked for seam allowances, grading and buildability, then signed by name with a date.",
    who: "Adeel R.",
    role: "Studio technician, Sialkot",
    note: "Reviewer name is illustrative.",
  },
  marquee: ["Crew", "V-neck", "Raglan", "Polo", "Henley", "Training tees", "Club kit", "Base layers", "Run tops"],
} as const;

export const GALLERY = {
  title: "One team, from the first sketch to the last carton.",
  sub: "From 50 pieces per style. Sample in 10 working days. At your door in about 8 weeks.",
  panels: [
    { key: "spec", title: "Spec", points: ["Annotated technical flats", "Graded size run, XS to 3XL", "Construction, fabric and trims"] },
    { key: "signoff", title: "Patterns", points: ["DXF pattern pieces", "Seam allowances", "Grading rules", "Tolerances"] },
    { key: "costing", title: "Costing", points: ["Materials and trims", "Make", "Finishing and pack", "QA and spec"] },
    { key: "make", title: "Make", points: ["Sample in 10 days", "Bulk in 4 to 5 weeks", "Final QC"] },
    { key: "escrow", title: "Escrow", points: ["50% deposit", "50% held", "You release it"] },
    { key: "reorder", title: "Reorder", points: ["Same spec", "Same line", "3 to 4 weeks"] },
  ],
} as const;

export const BENEFITS = {
  rows: [
    {
      key: "spec",
      title: "We draft the spec.",
      body: "Upload a photo, sketch, reference product or moodboard, or just describe it. In under 10 minutes you get annotated flats, a graded size table, construction notes, fabric and trims.",
    },
    {
      key: "signoff",
      title: "We sample it.",
      body: "We cut and sew a sample from your spec and express it to you in 10 working days. Ask for changes in plain language and the spec updates with them.",
    },
    {
      key: "make",
      title: "We make it and ship it.",
      body: "Bulk runs on lines we manage in Sialkot, from 50 pieces per style, in 4 to 5 weeks. Then 5 to 8 days by air express to your door.",
    },
    {
      key: "escrow",
      title: "You release the money.",
      body: "Pay 50% to start. The other 50% sits in escrow until final QC passes and you release it. Verified defects are remade or refunded.",
    },
    {
      key: "reorder",
      title: "Reorder in one click.",
      body: "Same spec, same line, same price band. No sampling, so it lands in 3 to 4 weeks.",
    },
  ],
} as const;

export const ASSISTANT = {
  greeting: "What are we making?",
  hint: "Describe a change in plain language.",
  input: "raglan, long sleeves, cobalt body",
  /** Each suggestion chip and the reply it produces, shown in turn. */
  turns: [
    {
      chip: "Make it a raglan",
      reply: "Switched to a raglan sleeve. The flat, the pattern pieces and the graded table all moved with it.",
    },
    {
      chip: "Long sleeves",
      reply: "Sleeves are now long. Sleeve length is re-graded across the size run, with a tolerance on every point.",
    },
    {
      chip: "Cobalt body",
      reply: "Body panels set to cobalt. The spec is marked unverified until a technician re-checks it.",
    },
    {
      chip: "Cap sleeves on the polo",
      reply: "Polos come in short and three-quarter sleeves, from the same style rules production uses.",
    },
  ],
} as const;

export const FOOTER = {
  cta: "One team from sketch to carton.",
  ctaAccent: "Made in Sialkot.",
  line: "Sportswear, from design to delivery.",
  links: [
    { href: "#privacy", label: "Privacy" },
    { href: "#terms", label: "Terms" },
    { href: "mailto:hello@knitwright.com", label: "Contact" },
  ],
} as const;
