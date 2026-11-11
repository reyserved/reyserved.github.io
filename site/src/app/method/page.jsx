export const metadata = {
  title: "Method — Reymart",
  description: "The six-stage SEO and GEO operating model used across the case studies.",
};

const STAGES = [
  {
    label: "//01",
    title: "Intent and question discovery",
    body: "Map queries, AI Overview exposure, and page ownership before writing. Know which questions the page must answer and which surface should quote it.",
  },
  {
    label: "//02",
    title: "Brand and entity intelligence",
    body: "Positioning, audiences, personas, and voice inputs that keep content consistent with the business and recognizable to answer engines.",
  },
  {
    label: "//03",
    title: "Answer-first content architecture",
    body: "Definitional intros, question-led sections, sourced claims, and FAQ structure. The opening paragraph answers the query before the page expands.",
  },
  {
    label: "//04",
    title: "Technical extractability",
    body: "Schema, semantic HTML, internal links, indexation, and fast pages. Content cannot be cited if it cannot be parsed and reached.",
  },
  {
    label: "//05",
    title: "AI-assisted production with human QA",
    body: "Content calendars, briefs, and prompt libraries, with claim-level human review of sources, tone, and accuracy before publication.",
  },
  {
    label: "//06",
    title: "Measurement and reporting",
    body: "Semrush AI Visibility, GSC Generative AI Features, citation logs, GA4, and CRM context, reported with dates and attribution.",
  },
];

export default function MethodPage() {
  return (
    <>
      <section className="method-hero">
        <div className="method-hero__dots" aria-hidden="true" />
        <div className="container method-hero__inner">
          <span className="method-hero__eyebrow">Method</span>
          <h1 className="method-hero__title">How the work gets done</h1>
          <p className="method-hero__lede">A six-stage operating model for SEO, AEO, and GEO programs, from intent discovery to measurement and reporting.</p>
          <div className="method-hero__nodes">
            {STAGES.map((stage) => (
              <div className="method-hero__node" key={stage.label}>
                <span>{stage.label}</span>
                <strong>{stage.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="win-grid">
          {STAGES.map((stage) => (
            <div className="win-card" key={stage.label}>
              <div className="win-card__meta">{stage.label}</div>
              <div className="win-card__client" style={{ marginTop: "10px" }}>{stage.title}</div>
              <div className="win-card__desc" style={{ marginTop: "12px" }}>{stage.body}</div>
            </div>
          ))}
        </div>

      </div>

      <div className="container case-nav">
        <a className="case-nav__link" href="/work/">
          <span className="case-nav__label">← Case studies</span>
          <span className="case-nav__sub">Selected client work</span>
        </a>
        <a className="case-nav__link" href="/about/">
          <span className="case-nav__label">About Reymart →</span>
          <span className="case-nav__sub">Background and contact</span>
        </a>
      </div>
    </>
  );
}
