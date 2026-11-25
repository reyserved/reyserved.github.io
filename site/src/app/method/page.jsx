export const metadata = {
  title: "Method — Reymart",
  description: "The six-stage SEO and GEO operating model used across the case studies.",
};

const STAGES = [
  {
    label: "//01",
    title: "Intent and question discovery",
    body: "Map search intent, AI Overview exposure, and URL ownership before writing so every page targets clear questions without cannibalizing existing URLs.",
    output: "Query and question map",
  },
  {
    label: "//02",
    title: "Brand and entity intelligence",
    body: "Document brand positioning, target audiences, and voice guidelines so every page sounds like the client and sends clear entity signals to search and AI engines.",
    output: "Entity and voice brief",
  },
  {
    label: "//03",
    title: "Answer-first content architecture",
    body: "Lead with a direct answer in the opening paragraph, follow up with question-led H2s and H3s, cite primary sources, and structure FAQs for easy extraction.",
    output: "Answer-first page architecture",
  },
  {
    label: "//04",
    title: "Technical extractability",
    body: "Implement validated JSON-LD schema, clean semantic HTML, strategic internal links, and fast-loading layouts. Great content won't rank or get cited if crawlers can't parse it.",
    output: "Schema and technical spec",
  },
  {
    label: "//05",
    title: "AI-assisted production with human QA",
    body: "Use AI to speed up content calendars, briefs, and first drafts, then run human QA on every claim, citation, and brand-voice detail before publishing.",
    output: "Reviewed content batch",
  },
  {
    label: "//06",
    title: "Measurement and reporting",
    body: "Track rankings, citations, and leads across Semrush AI Visibility, GSC Generative AI Features, GA4, and client CRMs with clear date ranges and channel attribution.",
    output: "Monthly performance report",
  },
];

export default function MethodPage() {
  return (
    <>
      <section className="work-hero">
        <div className="container">
          <span className="eyebrow">Method</span>
          <h1 className="case-title">How the work gets done</h1>
          <p className="case-lede">My six-stage process for SEO, AEO, and GEO programs, from intent research through page builds and performance tracking.</p>
        </div>
      </section>

      <div className="container">
        <div className="method-list">
          {STAGES.map((stage) => (
            <article className="method-step" key={stage.label}>
              <div className="method-step__num">{stage.label}</div>
              <h2 className="method-step__title">{stage.title}</h2>
              <p className="method-step__body">{stage.body}</p>
              <div className="method-step__output">
                <span>Output</span>
                <strong>{stage.output}</strong>
              </div>
            </article>
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
