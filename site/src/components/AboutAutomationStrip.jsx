const STEPS = [
  {
    client: "Service Credit Union",
    label: "Audit",
    metric: "2,881 → 68",
    unit: "pages crawled → audit sheets",
    desc: "Crawls the full site, sorts out 3xx redirects and 403 errors, and groups every issue into a prioritized workbook ready for SEO and dev tickets.",
  },
  {
    client: "Dream Assurance",
    label: "Preflight",
    metric: "4 → 82",
    unit: "page types → QA artifacts",
    desc: "Generates page previews, checks CTAs and related-query blocks, and tests responsive layouts at 390px, 1440px, and 3840px.",
  },
  {
    client: "NeuroEndoMKE",
    label: "Schema",
    metric: "0",
    unit: "schema errors",
    desc: "Builds the JSON-LD @graph, validates it against schema.org, checks live URLs, and outputs a clean release checklist.",
  },
];

export default function AboutAutomationStrip() {
  return (
    <section className="about-auto" aria-labelledby="about-auto-title">
      <div className="about-auto__copy reveal">
        <span className="eyebrow">Workflows &amp; automation</span>
        <h2 className="about-auto__title" id="about-auto-title">
          Automate the repeatable work, keep the strategy human
        </h2>
        <p className="about-auto__lede">
          I build Python and JavaScript workflows for technical audits, content preflight, and reporting across client
          sites. Scripts handle the repetitive checks so I can focus on fact-checking, prioritizing fixes, and reviewing
          pages before they go live.
        </p>
        <a className="about-auto__cta" href="/#automation" data-automation-cta="about_strip">
          See how each one runs <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="about-auto__rail reveal-group" role="list" aria-label="Automation evidence">
        {STEPS.map((step) => (
          <div className="about-auto__step" role="listitem" key={step.label}>
            <span className="about-auto__client">{step.client}</span>
            <span className="about-auto__label">{step.label}</span>
            <strong className="about-auto__metric">{step.metric}</strong>
            <span className="about-auto__unit">{step.unit}</span>
            <p className="about-auto__desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
