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
    title: "Measurement with claim limits",
    body: "Semrush AI Visibility, GSC Generative AI Features, citation logs, GA4, and CRM context. Every result carries what it proves and what it does not.",
  },
];

const FAQ = [
  {
    q: "What is the difference between AEO, GEO, and SGE?",
    a: "AEO is the practice of structuring content so search engines and assistants extract it as a concise, direct answer. GEO is the broader practice of optimizing your brand, entity, and content so generative AI tools reference, cite, and recommend you. SGE was Google's experimental AI search interface, now folded into features such as AI Overviews.",
  },
  {
    q: "How do you measure AI citations?",
    a: "Primarily page-level Semrush Cited Pages and GSC Generative AI Features, supported by prompt logs and GA4 referral segments where available. The key is measuring which URL is cited, not just whether the brand is mentioned.",
  },
  {
    q: "Why insist on answer-first introductions?",
    a: "Because extraction favors direct answers. A concise definition or answer in the opening paragraph gives search engines and AI surfaces something clean to quote, while the rest of the page supplies depth and evidence.",
  },
  {
    q: "What can your data not prove?",
    a: "AI visibility does not automatically produce leads, rankings do not equal citations, and some clients lack before-and-after measurement. Each case study lists its own limitations rather than implying causation.",
  },
  {
    q: "Why publish claim limits in a portfolio?",
    a: "Because a portfolio should survive a skeptical review. Clear boundaries make the wins more believable, not weaker.",
  },
];

export default function MethodPage() {
  return (
    <>
      <section className="work-hero">
        <div className="container">
          <span className="eyebrow">Method</span>
          <h1 className="case-title">How the work gets done</h1>
          <p className="case-lede">A six-stage operating model for SEO, AEO, and GEO programs, from intent discovery to measurement with claim limits.</p>
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

        <h2 className="work-group-label">Questions hiring teams ask</h2>
        <div>
          {FAQ.map((item) => (
            <details key={item.q} style={{ borderBottom: "1px solid var(--line)", padding: "20px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "17px" }}>{item.q}</summary>
              <p style={{ marginTop: "12px", color: "var(--ink-soft)", lineHeight: 1.75 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="container case-nav">
        <a href="/work/">← Case studies</a>
        <a href="/about/">About Reymart →<span>Background and contact</span></a>
      </div>
    </>
  );
}
