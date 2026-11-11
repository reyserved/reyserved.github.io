export default function BenefitsBento() {
  return (
    <section className="benefits" aria-labelledby="benefits-title">
      <div className="container container--full">
        <div className="proof__header reveal">
          <div>
            <span className="eyebrow">Benefits</span>
            <h2 className="proof__title" id="benefits-title">What I actually do</h2>
            <p className="proof__subtitle">Three systems behind every case study: answer-first content, evidence with limits, and technical extractability.</p>
          </div>
        </div>

        <div className="benefits__grid reveal-group">
          <article className="benefit-card">
            <div className="benefit-card__visual" aria-hidden="true">
              <div className="answer-demo">
                <span className="answer-demo__query">Query: “what is indemnity insurance?”</span>
                <span className="answer-demo__answer">Indemnity insurance is a contract that compensates you for specified losses or damages.</span>
                <span className="answer-demo__followups">
                  <span>What does it cover?</span>
                  <span>How does it work?</span>
                  <span>Who needs it?</span>
                </span>
              </div>
            </div>
            <h3>Answer-first content systems</h3>
            <p>Definitional intros, question-led sections, sourced claims, and FAQ structure built for featured snippets and LLM extraction.</p>
          </article>

          <article className="benefit-card">
            <div className="benefit-card__visual" aria-hidden="true">
              <div className="metric-demo">
                <span className="metric-demo__label">AI Overview coverage</span>
                <span className="metric-demo__value">4 → 65</span>
                <span className="metric-demo__source">Semrush SERP Features Trend · Jul 2025 – Mar 2026</span>
                <svg viewBox="0 0 200 60" className="metric-demo__spark">
                  <path d="M0 55 L30 50 L60 52 L90 45 L120 40 L150 20 L180 5" fill="none" stroke="#e5a93c" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <h3>Measurement with claim limits</h3>
            <p>Page-level AI visibility, citations, and GSC/GA4 evidence with the source and limits stated for every result.</p>
          </article>

          <article className="benefit-card">
            <div className="benefit-card__visual" aria-hidden="true">
              <div className="schema-demo">
                <span>{'{'}</span>
                <span className="schema-demo__line">  "@type": "FAQPage",</span>
                <span className="schema-demo__line">  "mainEntity": [{'{'}</span>
                <span className="schema-demo__line">    "@type": "Question",</span>
                <span className="schema-demo__line">    "name": "What is indemnity insurance?",</span>
                <span className="schema-demo__line">    "acceptedAnswer": {'{'}</span>
                <span className="schema-demo__line">      "@type": "Answer",</span>
                <span className="schema-demo__line">      "text": "Indemnity insurance is a contract that..."</span>
                <span className="schema-demo__line">    {'}'}</span>
                <span className="schema-demo__line">  ]</span>
                <span>{'}'}</span>
              </div>
            </div>
            <h3>Technical extractability</h3>
            <p>Schema graphs, internal links, indexation, and clean page structure so content can be parsed and reached.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
