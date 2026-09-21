/**
 * Every word on the page. Source of truth: landing-page-content.md.
 * Rules carried over from the brief: no invented customers, results, prices,
 * minimums, lead times or launch dates. Illustrative figures are labelled as such.
 */

export const SITE = {
  name: "Knitwright",
  tagline: "From idea to made — without ever managing a factory.",
  lockup: "Spec. Make. Ship.",
  title: "Knitwright — sportswear production, specced and made",
  description:
    "Upload a design. Get a factory-ready spec signed by a named technician, then have it made and shipped. No factory to manage. Early access open.",
  ogTitle: "From idea to made — without ever managing a factory.",
  ogDescription:
    "Knitwright drafts your spec, a named technician signs it, and we make and ship it. Built for sportswear brands.",
} as const;

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#verification", label: "Verification" },
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
      name: "Performance and training brands",
      makes: "Training tees, running tops, base layers",
      why: "Technical fabrics and tolerances matter. The spec engineering is the hard part.",
    },
    {
      name: "Activewear labels",
      makes: "Everyday athletic tops, lifestyle-athletic",
      why: "Small first runs, fast iteration, clean reorders.",
    },
    {
      name: "Team kit and club uniforms",
      makes: "Club tees, warm-up tops, polos, sublimated kit",
      why: "Repeat orders every season. Logos and panel colours, the same spec every time.",
    },
    {
      name: "Creator and community brands",
      makes: "Merch that has to feel like real product",
      why: "No production knowledge, a high quality bar, and someone accountable.",
    },
  ],
  productPerson: {
    title: "For the person who reads the measurement table.",
    body: "Every point of measurement, grade and tolerance is in the spec, editable, and moves the pattern, the flat and the 3D garment with it.",
  },
  notFor: {
    title: "Not a marketplace. Not a directory. Not print-on-demand.",
    body: "If you want to pick and manage your own factory, we're not the right fit — and you can still take your tech pack with you.",
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
  sub: "The path is short on purpose. You bring the idea and the approval. We carry everything in between.",
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
  title: "A named human signs every spec.",
  body: "AI drafting a tech pack is becoming cheap — and a confidently wrong seam allowance is something a founder can't catch. Every Knitwright spec is verified by a technician in our studio, by name, with a date. That sign-off is what you're buying.",
  verified: { state: "Verified for production", line: "Adeel R. · Studio · 2 days ago" },
  unverified: { state: "Unverified draft", line: "Spec changed since sign-off · re-verification queued" },
  caption:
    "The badge degrades the moment the spec moves away from what was signed. Trust is a fact about a specific version, not a sticker.",
  nameNote: "Reviewer name is illustrative.",
} as const;

export const PRODUCTION = {
  label: "Production",
  title: "There is no factory to choose.",
  body: "You never source, vet, brief, chase or switch a factory. You see one production tier — Knitwright Verified Production — with a quality summary, a price and a lead time. We own the routing, the QC and the guarantee.",
  why: "Marketplaces introduce you to a factory, you go direct, and from then on the quality risk is yours. We don't run a directory, so we stay accountable for the result.",
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
    body: "Deposit into escrow at order. The balance is held until QC passes and you release it. Verified defects are money back.",
    milestones: [
      { label: "Deposit", state: "Paid" },
      { label: "Bulk", state: "In production" },
      { label: "Final QC", state: "Measured" },
      { label: "Balance", state: "Held · you release" },
    ],
  },
  stages: ["Sample", "Sample approved", "Bulk", "Final QC", "Shipped"],
} as const;

export const STUDIO = {
  label: "Behind the curtain",
  title: "The part you never see.",
  body: "Underneath your calm, quiet dashboard is a dense, keyboard-driven console in Sialkot, where our technicians clear specs, verify measurements against tolerance, and allocate your order across our lines. You never see it, and you never need to. That's the point.",
  place:
    "Our studio and production lines are in Sialkot, Pakistan — one of the world's established centres for sportswear and technical apparel manufacturing. The person who signs your spec is close to the people who cut and sew it.",
  queue: [
    { id: "SP-2291", style: "Crew · training tee", brand: "Brand 07", reviewer: "A. R.", sla: "02:14" },
    { id: "SP-2290", style: "Raglan · long sleeve", brand: "Brand 12", reviewer: "S. K.", sla: "03:40" },
    { id: "SP-2288", style: "Polo · club kit", brand: "Brand 03", reviewer: "A. R.", sla: "05:02" },
    { id: "SP-2285", style: "Henley · base layer", brand: "Brand 19", reviewer: "M. I.", sla: "07:31" },
    { id: "SP-2283", style: "V-neck · run top", brand: "Brand 07", reviewer: "S. K.", sla: "09:12" },
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
      title: "A named human signs every spec",
      body: "Every spec is verified by a technician in our studio, by name, with a date. That sign-off is what you're buying.",
    },
    {
      title: "There is no factory to manage",
      body: "One production tier with a quality summary, a price and a lead time. We own the routing, the QC and the guarantee.",
    },
    {
      title: "The spec is one source of truth",
      body: "The flat, the 3D garment, the graded table and the pattern pieces are four views of one spec. Nothing drifts.",
    },
    {
      title: "Your money waits for you",
      body: "Deposit into escrow at order. The balance is held until QC passes and you release it. Verified defects are money back.",
    },
    {
      title: "Built for sportswear, not all of fashion",
      body: "Style rules, fit, grading and tolerances tuned to athletic tops: crew, V-neck, raglan, polo, henley.",
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
  sub: "Tell us what you make. We're taking a small number of brands through their first production cycles so we can get the spec engineering right before we scale.",
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
          a: "A production operating system for sportswear brands: we turn your design into a verified, factory-ready spec, then make it and ship it.",
        },
        {
          q: "What do I need to start?",
          a: "A reference — a photo, sketch, or a garment you like — plus the category and a rough quantity. No tech pack or production experience needed.",
        },
        {
          q: "What can you make today?",
          a: "Knit tops: crew, V-neck, raglan, polo and henley, in cap, short, three-quarter or long sleeves, cropped to long body lengths, athletic or relaxed fit. More categories follow.",
        },
        {
          q: "Is the spec generated by AI?",
          a: "The first draft is. Then a technician in our studio checks it and signs it by name. AI is how we're fast; the sign-off is why you can trust it.",
        },
        {
          q: "Can I change the spec myself?",
          a: "Yes. Describe the change in plain language, or edit the measurement table directly. Every change after sign-off marks the spec as unverified until a technician re-checks it.",
        },
      ],
    },
    {
      name: "Production",
      items: [
        {
          q: "Who makes my garments?",
          a: "Knitwright Verified Production — lines we own and manage in Sialkot, Pakistan. You never deal with a factory directly.",
        },
        {
          q: "Do I get to pick the factory?",
          a: "No, and that's deliberate. You get one production tier with a quality guarantee behind it. We handle the routing and we're accountable for the result.",
        },
        {
          q: "Can I order a sample first?",
          a: "Yes. Sample first or straight to bulk is your choice on every order.",
        },
        {
          q: "How is quality checked?",
          a: "Samples and bulk are measured against your spec's own tolerances, and bulk goes through inline QC against an AQL standard, with photos.",
        },
        {
          q: "What's the minimum order, and what are the lead times?",
          a: "We'll confirm minimums and lead-time ranges per category when we open your slot. Every style gets a quote with the lead time at each quantity tier.",
          placeholder: true,
        },
      ],
    },
    {
      name: "Money and risk",
      items: [
        {
          q: "How does payment work?",
          a: "A deposit into escrow when you order. The balance is held until QC passes and you release it.",
        },
        {
          q: "What if the goods are wrong?",
          a: "Your balance stays in escrow until you release it, and verified defects are money back.",
        },
        {
          q: "What does it cost?",
          a: "Pricing is being finalised with our first group of brands. In the product, every style gets an itemised per-unit quote with the lines shown.",
          placeholder: true,
        },
      ],
    },
    {
      name: "Your designs",
      items: [
        {
          q: "Who owns my designs?",
          a: "You do, entirely. Your specs are never shown to another brand.",
        },
        {
          q: "Can I take my tech pack to another factory?",
          a: "Yes. Export the tech pack document and the DXF pattern pieces any time. We'd rather earn the production than lock it.",
        },
        {
          q: "When can I start?",
          a: "We're onboarding a first group of brands now. Request early access and we'll be in touch when a slot opens in your category.",
        },
      ],
    },
  ],
} as const;

/* ── Home layout copy ─────────────────────────────────────────────────────
   Short labels for the gallery and benefit rows. Every line is derived from
   the sections above; nothing here introduces a new claim. */

export const HOME_HERO = {
  headline: ["From idea to made.", "Without managing a factory."],
  sub: "Upload a design. A named technician signs the spec. We make it and ship it to you.",
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
  title: "One product, from the first sketch to the last carton.",
  sub: "The hard part was never the design. It's the engineering of the spec, and the execution behind it.",
  panels: [
    { key: "spec", title: "Spec", points: ["Annotated technical flats", "Graded size run", "Construction, fabric and trims"] },
    { key: "signoff", title: "Sign-off", points: ["Seam allowances", "Grading logic", "Buildability", "Tolerances"] },
    { key: "costing", title: "Costing", points: ["Materials and trims", "Make", "Finishing and pack", "QA and spec"] },
    { key: "make", title: "Make", points: ["Sample", "Bulk", "Final QC"] },
    { key: "escrow", title: "Escrow", points: ["Deposit at order", "Balance held", "You release it"] },
    { key: "reorder", title: "Reorder", points: ["Same spec", "Same line", "Same price band"] },
  ],
} as const;

export const BENEFITS = {
  rows: [
    {
      key: "spec",
      title: "We draft the spec.",
      body: "Upload a photo, sketch, competitor product or moodboard. Knitwright drafts annotated flats, a graded measurement table with tolerances, construction notes, fabric and trims.",
    },
    {
      key: "signoff",
      title: "A technician signs it.",
      body: "A technician in our studio checks what software can't be trusted to — seam allowances, grading logic, buildability — and signs it by name, with a date.",
    },
    {
      key: "make",
      title: "We make it.",
      body: "Production runs on lines we own and manage. You see one quality tier, a price, a lead time, and a guarantee. No factory to choose.",
    },
    {
      key: "escrow",
      title: "You release the money.",
      body: "Deposit into escrow at order. The balance is held until QC passes and you release it. Verified defects are money back.",
    },
    {
      key: "reorder",
      title: "Reorder in one click.",
      body: "Same spec, same line, same price band. No re-briefing, no re-sourcing.",
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
  cta: "You will never talk to a factory.",
  ctaAccent: "That's the feature.",
  line: "A production operating system for sportswear brands.",
  links: [
    { href: "#privacy", label: "Privacy" },
    { href: "#terms", label: "Terms" },
    { href: "mailto:hello@knitwright.com", label: "Contact" },
  ],
} as const;
