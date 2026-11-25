import StackGrid from "../../components/StackGrid";
import AboutPageCarousel from "../../components/AboutPageCarousel";
import AboutAutomationStrip from "../../components/AboutAutomationStrip";

export const metadata = {
  title: "About — Reymart",
  description: "Background, experience, page builds, tools, and contact details for Reymart Sarigumba.",
};

const ROLES = [
  {
    role: "Senior SEO & GEO Specialist",
    company: "Rocket Clicks",
    period: "Dec 2024 – Nov 2026",
    detail: "Partner with SEO leads, directors, and account managers on client SEO strategy, AEO/GEO content systems, technical audits, local SEO, and AI visibility tracking.",
  },
  {
    role: "SEO & GEO Specialist",
    company: "Dream Assurance Group",
    period: "2023 – 2025 · Part-time, project-to-project",
    detail: "Led end-to-end in-house SEO alongside the CEO, covering site migration, technical SEO, content, JSON-LD schema, internal linking, local SEO, GTM/GA4 tracking, and AI-assisted content workflows.",
  },
  {
    role: "SEO & SGE Specialist",
    company: "First Page",
    period: "2022 – 2023",
    detail: "Ran technical SEO audits, keyword research, content optimization, schema markup, and SERP-feature updates for client sites across APAC.",
  },
  {
    role: "SEO Specialist / Media Buyer",
    company: "INITIA Group",
    period: "2020 – 2022",
    detail: "Managed local, on-page, and off-page SEO alongside paid media campaigns for ecommerce and local service brands.",
  },
  {
    role: "Content Strategist / Senior SEO Content Writer",
    company: "iPrice Group",
    period: "2017 – 2020",
    detail: "Wrote and optimized short- and long-form SEO content across product landing pages and editorial blogs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__content">
            <span className="eyebrow">About</span>
            <h1 className="case-title">SEO and GEO, tied to business outcomes</h1>
            <p className="case-lede">
              I'm an SEO and GEO specialist with 6+ years in SEO (9+ years in search and digital content) across agency and in-house roles in the US and APAC. I focus on answer-first content, technical SEO, local search, and reporting that ties organic visibility to calls, leads, and pipeline.
            </p>
            <div className="hero__ctas" style={{ marginTop: "28px", justifyContent: "flex-start" }}>
              <a className="btn btn--dark" href="/Reymart-Sarigumba-Resume.pdf?v=2026-11-26">Download CV <span className="arrow" aria-hidden="true">→</span></a>
              <a className="btn btn--light" href="#contact">Contact</a>
            </div>
          </div>
          <div className="about-hero__photo">
            <img src="/images/reymart.jpg" alt="Reymart Sarigumba" />
            <span>Reymart Sarigumba · SEO &amp; GEO</span>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="work-group-label">Experience</h2>
        <div className="win-grid">
          {ROLES.map((item) => (
            <div className="win-card" key={item.company}>
              <div className="win-card__client">{item.role}</div>
              <div className="win-card__meta" style={{ marginTop: "8px" }}>{item.company} · {item.period}</div>
              <div className="win-card__desc" style={{ marginTop: "12px" }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <AboutAutomationStrip />

        <section className="about-pages">
          <div className="about-pages__copy">
            <h2 className="work-group-label">Page builds</h2>
            <p className="about-pages__statement">I build the pages, not just the brief</p>
            <p className="about-pages__lede">
              Ten client builds across legal, finance, manufacturing, home services, and B2B. I write the page, build
              the responsive layout, and hand it off in the client's CMS.
            </p>
            <a className="about-pages__link" href="/work/landing-pages/">
              Browse the landing page gallery <span aria-hidden="true">→</span>
            </a>
          </div>
          <AboutPageCarousel />
        </section>

        <h2 className="work-group-label">Tools</h2>
        <p className="win-card__desc" style={{ marginBottom: "18px" }}>The same stack I use across the case studies. Tap a card to see how I use each one.</p>
        <StackGrid />

        <h2 className="work-group-label" id="contact">Contact</h2>
        <div className="win-grid">
          <div className="win-card">
            <div className="win-card__client">Email</div>
            <div className="win-card__desc" style={{ marginTop: "12px" }}>
              <a href="mailto:reymartjan.sarigumba@gmail.com">reymartjan.sarigumba@gmail.com</a>
            </div>
          </div>
          <div className="win-card">
            <div className="win-card__client">LinkedIn</div>
            <div className="win-card__desc" style={{ marginTop: "12px" }}>
              <a href="https://www.linkedin.com/in/reymartjsarigumba" rel="noreferrer">linkedin.com/in/reymartjsarigumba</a>
            </div>
          </div>
          <div className="win-card">
            <div className="win-card__client">GitHub</div>
            <div className="win-card__desc" style={{ marginTop: "12px" }}>
              <a href="https://github.com/reyserved" rel="noreferrer">github.com/reyserved</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container case-nav">
        <a className="case-nav__link" href="/method/">
          <span className="case-nav__label">← Method</span>
          <span className="case-nav__sub">How I approach the work</span>
        </a>
        <a className="case-nav__link" href="/work/">
          <span className="case-nav__label">Case studies →</span>
          <span className="case-nav__sub">Selected client work</span>
        </a>
      </div>
    </>
  );
}
