export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__wordmark" aria-hidden="true">Reymart</div>

      <svg className="clay clay--pyramid" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="pyrA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd08a" /><stop offset="100%" stopColor="#e5a93c" />
          </linearGradient>
          <linearGradient id="pyrB" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e5a93c" /><stop offset="100%" stopColor="#b97f1f" />
          </linearGradient>
        </defs>
        <polygon points="60,10 112,96 8,96" fill="url(#pyrA)" />
        <polygon points="60,10 60,96 8,96" fill="url(#pyrB)" opacity="0.85" />
        <polygon points="60,10 74,96 60,96" fill="#ffffff" opacity="0.18" />
      </svg>

      <svg className="clay clay--star" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <radialGradient id="starA" cx="35%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#a7f3d0" /><stop offset="100%" stopColor="#1f9d8f" />
          </radialGradient>
        </defs>
        <path d="M60 10 L74 44 L112 46 L82 70 L92 108 L60 86 L28 108 L38 70 L8 46 L46 44 Z" fill="url(#starA)" />
      </svg>

      <svg className="clay clay--sphere" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <radialGradient id="sphA" cx="32%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#e9d5ff" /><stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="48" fill="url(#sphA)" />
      </svg>

      <svg className="clay clay--cube" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="cubeA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" /><stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
        <polygon points="60,14 104,38 60,62 16,38" fill="#fde68a" />
        <polygon points="16,38 60,62 60,106 16,82" fill="url(#cubeA)" />
        <polygon points="60,62 104,38 104,82 60,106" fill="#eab308" />
      </svg>

      <svg className="clay clay--cylinder" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="cylA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#93c5fd" /><stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path d="M20 32 L20 88 C20 99 38 108 60 108 C82 108 100 99 100 88 L100 32 Z" fill="url(#cylA)" />
        <ellipse cx="60" cy="32" rx="40" ry="16" fill="#bfdbfe" />
        <ellipse cx="60" cy="32" rx="40" ry="16" fill="#3b82f6" opacity="0.25" />
      </svg>

      <svg className="clay clay--rounded" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="rndA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d9f99d" /><stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="84" height="84" rx="26" fill="url(#rndA)" transform="rotate(12 60 60)" />
        <rect x="30" y="26" width="34" height="12" rx="6" fill="#ffffff" opacity="0.35" transform="rotate(12 60 60)" />
      </svg>

      <div className="container hero__inner">
        <p className="hero__proof reveal">6+ years in SEO · US &amp; APAC client work</p>
        <h1 className="hero__title reveal" id="hero-title">Hi, I'm <span className="serif-italic">Reymart!</span></h1>
        <div className="hero__ticker reveal" aria-label="Specialties">
          <span>Specializing in</span>
          <span className="hero__ticker-window">
            <span className="hero__ticker-track">
              <span>Answer Engine Optimization</span>
              <span>Generative Engine Optimization</span>
              <span>Technical SEO</span>
              <span>Local SEO</span>
              <span>Content Strategy</span>
            </span>
          </span>
        </div>

        <div className="hero__card reveal" role="img" aria-label="Reymart monogram card">
          <span className="hero__card-letter" aria-hidden="true">R</span>
          <span className="hero__card-caption">SEO · AEO · GEO</span>
        </div>

        <div className="hero__ctas reveal">
          <a className="btn btn--dark" href="/work/">View case studies <span className="arrow" aria-hidden="true">→</span></a>
          <a className="btn btn--light" href="/Reymart-Sarigumba-Resume.pdf">Download CV</a>
        </div>
      </div>

      <div className="container hero__bottom" id="intro">
        <p className="answer-first reveal">
          <strong>Reymart Sarigumba</strong> is an SEO &amp; GEO specialist who builds answer-first content systems and measures whether AI surfaces actually cite them. This portfolio documents three programs: AI-answer visibility for a credit union, an answer-first content system for a family law firm, and an in-house SEO and GEO operating system for an insurance agency.
        </p>
        <aside className="hero__note reveal" aria-label="Current focus">
          <span className="hero__note-label">Current focus</span>
          <p>Open to SEO Specialist roles where AEO, SGE/GEO, and measurable search performance matter. Every case study here includes its sources and its claim limits.</p>
        </aside>
      </div>
    </section>
  );
}
