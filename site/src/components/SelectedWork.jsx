import { CASE_LIST } from "../data/cases";

export default function SelectedWork() {
  return (
    <section className="selected-work" aria-labelledby="selected-work-title">
      <div className="container container--full">
        <div className="proof__header reveal">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="proof__title" id="selected-work-title">Case studies with evidence</h2>
            <p className="proof__subtitle">Three programs with the objective, strategy, execution, role, results, and claim limits documented.</p>
          </div>
          <a className="proof__link" href="/work/">All case studies →</a>
        </div>

        <div className="selected-work__grid reveal-group">
          {CASE_LIST.map((item) => (
            <a className="work-card" href={`/work/${item.slug}/`} key={item.slug} style={{ "--row-tint": item.tint }}>
              <div className="work-card__image" style={{ backgroundImage: `url(${item.heroImage})` }}>
                <div className="work-card__overlay" />
                <div className="work-card__content">
                  <span className="case-pill">{item.pill}</span>
                  <h3>{item.title}</h3>
                  <span className="work-card__client">{item.client} <span aria-hidden="true">↗</span></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
