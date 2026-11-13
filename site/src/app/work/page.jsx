import CaseAccordion from "../../components/CaseAccordion";
import WinCard from "../../components/WinCard";
import { ROCKET_WINS, EARLIER_WINS, BUSINESS_IMPACT } from "../../data/wins";

export const metadata = {
  title: "Case studies and SEO wins — Reymart",
  description: "Three detailed SEO and GEO case studies plus source-labeled client wins.",
};

function WinCards({ items }) {
  return (
    <div className="win-grid">
      {items.map((item) => (
        <WinCard item={item} key={item.client} />
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
          <p className="case-lede">Three detailed case studies, plus a wider set of documented client results. Every entry is dated and attributed.</p>
        </div>
      </section>

      <div className="container container--full work-index__body">
        <CaseAccordion />

        <h2 className="work-group-label">Rocket Clicks wins</h2>
        <WinCards items={ROCKET_WINS} />

        <h2 className="work-group-label">Earlier-role wins</h2>
        <WinCards items={EARLIER_WINS} />

        <h2 className="work-group-label">Business outcomes</h2>
        <p className="work-group-note">Pipeline and conversion results, shown separately from the SEO wins above.</p>
        <WinCards items={BUSINESS_IMPACT} />
      </div>

      <div className="container case-nav">
        <a className="case-nav__link" href="/">
          <span className="case-nav__label">← Home</span>
          <span className="case-nav__sub">Back to start</span>
        </a>
        <a className="case-nav__link" href="/method/">
          <span className="case-nav__label">My method →</span>
          <span className="case-nav__sub">How I approach the work</span>
        </a>
      </div>
    </>
  );
}
