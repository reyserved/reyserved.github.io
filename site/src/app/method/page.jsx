export const metadata = {
  title: "Method — Reymart",
  description: "The six-stage SEO and GEO operating model used across the case studies.",
};

const PHASES = [
  {
    name: "Discover",
    range: "01–02",
    stages: [
      {
        label: "//01",
        title: "Intent and question discovery",
        body: "Map queries, AI Overview exposure, and page ownership before writing. Know which questions the page must answer and which surface should quote it.",
        output: "Query and question map",
      },
      {
        label: "//02",
        title: "Brand and entity intelligence",
        body: "Positioning, audiences, personas, and voice inputs that keep content consistent with the business and recognizable to answer engines.",
        output: "Entity and voice brief",
      },
    ],
  },
  {
    name: "Build",
    range: "03–05",
    stages: [
      {
        label: "//03",
        title: "Answer-first content architecture",
        body: "Definitional intros, question-led sections, sourced claims, and FAQ structure. The opening paragraph answers the query before the page expands.",
        output: "Answer-first page architecture",
      },
      {
        label: "//04",
        title: "Technical extractability",
        body: "Schema, semantic HTML, internal links, indexation, and fast pages. Content cannot be cited if it cannot be parsed and reached.",
        output: "Schema and technical spec",
      },
      {
        label: "//05",
        title: "AI-assisted production with human QA",
        body: "Content calendars, briefs, and prompt libraries, with claim-level human review of sources, tone, and accuracy before publication.",
        output: "Reviewed content batch",
      },
    ],
  },
  {
    name: "Measure",
    range: "06",
    stages: [
      {
        label: "//06",
        title: "Measurement and reporting",
        body: "Semrush AI Visibility, GSC Generative AI Features, citation logs, GA4, and CRM context, reported with dates and attribution.",
        output: "Monthly performance report",
      },
    ],
  },
];

export default function MethodPage() {
  return (
    <>
      <section className="work-hero">
        <div className="container">
          <span className="eyebrow">Method</span>
          <h1 className="case-title">How the work gets done</h1>
          <p className="case-lede">A six-stage operating model for SEO, AEO, and GEO programs, from intent discovery to measurement and reporting.</p>
        </div>
      </section>

      <div className="container">
        {PHASES.map((phase) => (
          <section className="method-phase" key={phase.name}>
            <h2 className="work-group-label method-phase__label">
              {phase.name}
              <span>{phase.range}</span>
            </h2>
            {phase.stages.map((stage) => (
              <article className="method-step" key={stage.label}>
                <div className="method-step__num">{stage.label}</div>
                <h3 className="method-step__title">{stage.title}</h3>
                <p className="method-step__body">{stage.body}</p>
                <div className="method-step__output">
                  <span>Output</span>
                  <strong>{stage.output}</strong>
                </div>
              </article>
            ))}
          </section>
        ))}
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
