import CaseAccordion from "../../components/CaseAccordion";
import { ROCKET_WINS, EARLIER_WINS, BUSINESS_IMPACT } from "../../data/wins";

export const metadata = {
  title: "Case studies and SEO wins — Reymart",
  description: "Three detailed SEO and GEO case studies plus source-labeled client wins.",
};

function WinCards({ items }) {
  return (
    <div className="win-grid">
      {items.map((item) => (
        <div className="win-card" key={item.client}>
          <div className="win-card__client">{item.client}</div>
          <div className="win-card__metric">{item.metric}</div>
          <div className="win-card__desc">{item.desc}</div>
          <div className="win-card__meta">{item.source}</div>
          {item.tags.map((tag) => (
            <span className="win-card__tag" key={tag}>{tag}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function WorkIndex() {
  return (
    <>
      <section className="work-hero">
        <div className="container">
          <span className="eyebrow">Case studies</span>
          <h1 className="case-title">Client work and SEO wins</h1>
          <p className="case-lede">Three detailed case studies, plus a wider set of source-labeled results. Every entry includes its period and its claim limits.</p>
        </div>
      </section>

      <div className="container container--full">
        <CaseAccordion />

        <h2 className="work-group-label">Rocket Clicks wins</h2>
        <WinCards items={ROCKET_WINS} />

        <h2 className="work-group-label">Earlier-role wins</h2>
        <WinCards items={EARLIER_WINS} />

        <h2 className="work-group-label">Business impact, labeled separately</h2>
        <WinCards items={BUSINESS_IMPACT} />
      </div>

      <div className="container case-nav">
        <a href="/">← Home</a>
        <a href="/method/">My method →<span>How the work is done</span></a>
      </div>
    </>
  );
}
