const META_ICONS = {
  Client: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 21v-5h6v5M9 10h.01M15 10h.01M9 13h.01M15 13h.01" />
    </svg>
  ),
  "My role": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Period: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  ),
  Data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </svg>
  ),
};

export default function CaseStudy({ data }) {
  return (
    <>
      <section className={`case-hero case-hero--${data.slug}`}>
        <div className="case-hero__bg" style={{ backgroundImage: `url(${data.heroImage})` }} />
        <div className="case-hero__overlay" aria-hidden="true" />
        <div className="case-hero__dots" aria-hidden="true" />
        <div className="case-hero__halftone" aria-hidden="true" />
        <div className="case-hero__grain" aria-hidden="true" />
        <div className="case-hero__columns" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className="container case-hero__inner">
          <img className="case-hero__logo reveal" src={data.logo} alt={`${data.clientName} logo`} />
          <span className="case-hero__eyebrow reveal">{data.pill}</span>
          <h1 className="case-hero__title reveal">{data.title}</h1>
          <p className="case-hero__lede reveal">{data.lede}</p>
        </div>
        <div className="container container--full case-hero__meta-wrap">
          <div className="case-hero__meta reveal-group">
            {data.meta.map(([key, value]) => (
              <div className="case-hero__meta-cell" key={key}>
                <span className="case-hero__meta-icon" aria-hidden="true">{META_ICONS[key]}</span>
                <div>
                  <span className="case-hero__meta-label">{key}</span>
                  <div className="case-hero__meta-value" dangerouslySetInnerHTML={{ __html: value }} />
                </div>
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
