import { notFound } from "next/navigation";
import { LANDING_PAGES, getLandingPage } from "../../../../data/landingPages";

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getLandingPage(slug);
  if (!project) return {};
  return {
    title: `${project.client}: ${project.shortTitle} | Reymart`,
    description: project.summary,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function LandingPageDetail({ params }) {
  const { slug } = await params;
  const project = getLandingPage(slug);
  if (!project) notFound();

  const index = LANDING_PAGES.findIndex((page) => page.slug === project.slug);
  const next = LANDING_PAGES[(index + 1) % LANDING_PAGES.length];
  const total = String(LANDING_PAGES.length).padStart(2, "0");

  return (
    <article
      className="lp-detail"
      style={{
        "--lp-accent": project.accent,
        "--lp-hero-accent": project.heroAccent || project.accent,
        "--lp-from": project.heroFrom,
        "--lp-to": project.heroTo,
      }}
    >
      <header className="lp-detail__hero">
        <div className="lp-detail__hero-bg" aria-hidden="true" />
        <span className="lp-detail__ghost" aria-hidden="true">
          {project.index}
        </span>
        <div className="container lp-detail__hero-inner">
          <div className="lp-detail__topbar">
            <a className="lp-detail__back" href="/work/landing-pages/">
              ← All landing pages
            </a>
            <span className="lp-detail__index">
              {project.index} <span aria-hidden="true">/</span> {total}
            </span>
          </div>

          <div className="lp-detail__hero-grid">
            <div className="lp-detail__hero-copy">
              <span className="lp-detail__client">{project.client}</span>
              <h1 className="lp-detail__title">{project.title}</h1>
              <p className="lp-detail__summary">{project.summary}</p>
              <div className="lp-detail__tags">
                <span>{project.pageType}</span>
                <span>{project.sector}</span>
                <span>{project.builtShort}</span>
              </div>
            </div>

            <div className="lp-detail__shot">
              <div className="lp-browser">
                <div className="lp-browser__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <em>{project.shortTitle}</em>
                </div>
                <img
                  src={`/landing-pages/${project.slug}/hero.webp`}
                  alt={`${project.client} ${project.shortTitle} landing page hero`}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="lp-detail__sheet">
        <div className="container">
          <dl className="lp-detail__meta">
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt>Page type</dt>
              <dd>{project.pageType}</dd>
            </div>
            <div>
              <dt>Build</dt>
              <dd>{project.built}</dd>
            </div>
          </dl>

          <div className="lp-intro">
            <span className="lp-label">About the project</span>
            <p>{project.intro}</p>
          </div>

          <figure className="lp-figure">
            <img src={project.images[0].src} alt={project.images[0].caption} loading="eager" decoding="async" />
            <figcaption>{project.images[0].caption}</figcaption>
          </figure>

          <section className="lp-section" id="challenge">
            <div className="lp-section__head">
              <span className="lp-section__num">01</span>
              <h2>Challenge</h2>
            </div>
            <div className="lp-section__body">
              <p className="lp-section__lede">{project.challenge}</p>
              <div className="lp-brief">
                <span className="lp-label">The brief</span>
                <ul>
                  {project.brief.map(([label, text]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <p>{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="lp-section" id="execution">
            <div className="lp-section__head">
              <span className="lp-section__num">02</span>
              <h2>Execution</h2>
            </div>
            <div className="lp-section__body">
              <ol className="lp-exec">
                {project.execution.map((item, i) => (
                  <li key={item.title}>
                    <span className="lp-exec__num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <figure className="lp-figure">
            <img src={project.images[1].src} alt={project.images[1].caption} loading="eager" decoding="async" />
            <figcaption>{project.images[1].caption}</figcaption>
          </figure>

          <section className="lp-section" id="architecture">
            <div className="lp-section__head">
              <span className="lp-section__num">03</span>
              <h2>Page architecture</h2>
            </div>
            <div className="lp-section__body">
              <ul className="lp-arch">
                {project.architecture.map(([name, role]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <figure className="lp-figure">
            <img src={project.images[2].src} alt={project.images[2].caption} loading="eager" decoding="async" />
            <figcaption>{project.images[2].caption}</figcaption>
          </figure>

          <section className="lp-section" id="outcome">
            <div className="lp-section__head">
              <span className="lp-section__num">04</span>
              <h2>Outcome</h2>
            </div>
            <div className="lp-section__body">
              <ul className="lp-outcome">
                {project.outcome.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="lp-tools">
                <span className="lp-label">Build and handoff</span>
                <div>
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <a
            className="lp-next"
            href={`/work/landing-pages/${next.slug}/`}
            style={{
              "--lp-accent": next.accent,
              "--lp-hero-accent": next.heroAccent || next.accent,
              "--lp-from": next.heroFrom,
              "--lp-to": next.heroTo,
            }}
          >
            <span className="lp-next__copy">
              <span className="lp-next__label">Next project</span>
              <strong>{next.client}</strong>
              <em>{next.title}</em>
            </span>
            <span className="lp-next__media">
              <img src={`/landing-pages/${next.slug}/card.webp`} alt={`${next.client} preview`} loading="eager" />
            </span>
            <span className="lp-next__arrow" aria-hidden="true">
              →
            </span>
          </a>

          <div className="case-nav">
            <a className="case-nav__link" href="/work/landing-pages/">
              <span className="case-nav__label">← All landing pages</span>
              <span className="case-nav__sub">Back to the gallery</span>
            </a>
            <a className="case-nav__link" href="/work/">
              <span className="case-nav__label">Case studies →</span>
              <span className="case-nav__sub">SEO programs and results</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
