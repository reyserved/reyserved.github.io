export default function CaseStudy({ data }) {
  return (
    <>
      <section className={`case-hero case-hero--${data.slug}`} style={{ "--case-hero-image": `url(${data.heroImage})` }}>
        <div className="container">
          <span className="case-pill">{data.pill}</span>
          <h1 className="case-title">{data.title}</h1>
          <p className="case-lede">{data.lede}</p>
          <dl className="case-meta">
            {data.meta.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd dangerouslySetInnerHTML={{ __html: value }} />
              </div>
            ))}
          </dl>
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

      <section className="case-section">
        <div className="container">
          <span className="case-section__label">Claim ledger</span>
          <h2>What this proves, and what it does not</h2>
          <div className="claim-ledger">
            <div className="claim-box">
              <h3>What the evidence supports</h3>
              <ul>{data.proves.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="claim-box claim-box--limits">
              <h3>What it does not support</h3>
              <ul>{data.limits.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
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
