export default function CaseStudy({ data }) {
  return (
    <>
      <section className={`case-hero case-hero--${data.slug}`}>
        <div className="case-hero__bg" style={{ backgroundImage: `url(${data.heroImage})` }} />
        <div className="case-hero__overlay" aria-hidden="true" />
        <div className="case-hero__dots" aria-hidden="true" />
        <div className="container case-hero__inner">
          <img className="case-hero__logo" src={data.logo} alt={`${data.clientName} logo`} />
          <span className="case-hero__eyebrow">{data.pill}</span>
          <h1 className="case-hero__title">{data.title}</h1>
          <p className="case-hero__lede">{data.lede}</p>
        </div>
        <div className="container container--full case-hero__meta-wrap">
          <div className="case-hero__meta">
            {data.meta.map(([key, value]) => (
              <div className="case-hero__meta-cell" key={key}>
                <span className="case-hero__meta-label">{key}</span>
                <div className="case-hero__meta-value" dangerouslySetInnerHTML={{ __html: value }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.sections.map((section) => (
        <section className="case-section" key={section.label}>
          <div className="container case-section__grid">
            <div>
              <span className="case-section__label">{section.label}</span>
              <h2>{section.heading}</h2>
            </div>
            <div className="case-section__body" dangerouslySetInnerHTML={{ __html: section.body }} />
          </div>
        </section>
      ))}

      <section className="case-section case-results">
        <div className="container">
          <span className="case-section__label">Results</span>
          <h2>Measured outcomes</h2>
          <div className="metric-grid">
            {data.metricCards.map(([value, label, source]) => (
              <div className="metric-card" key={label}>
                <div className="metric-card__value">{value}</div>
                <div className="metric-card__label">{label}</div>
                <div className="metric-card__source">{source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <div className="container case-nav">
        <a className="case-nav__link" href="/work/">
          <span className="case-nav__label">← All case studies</span>
          <span className="case-nav__sub">Work index</span>
        </a>
        <a className="case-nav__link" href={`/work/${data.next}/`}>
          <span className="case-nav__label">{data.nextTitle} →</span>
          <span className="case-nav__sub">Next case study</span>
        </a>
      </div>
    </>
  );
}
