import StackGrid from "../../components/StackGrid";

export const metadata = {
  title: "About — Reymart",
  description: "Background, experience, tools, and contact details for Reymart Sarigumba.",
};

const ROLES = [
  {
    role: "Senior SEO & GEO Specialist",
    company: "Rocket Clicks",
    period: "2024 – 2026",
    detail: "Client SEO strategy, AEO/GEO content systems, technical audits, local SEO, and AI visibility measurement.",
  },
  {
    role: "SEO & GEO Specialist",
    company: "Dream Assurance Group",
    period: "2023 – 2025 · Part-time, project-to-project",
    detail: "End-to-end in-house SEO: technical, content, schema, internal linking, local, tracking, and AI content operations.",
  },
  {
    role: "SEO & SGE Specialist",
    company: "First Page",
    period: "2022 – 2023",
    detail: "Technical audits, keyword research, content optimization, schema, and SERP-feature-focused content across APAC.",
  },
  {
    role: "SEO Specialist / Media Buyer",
    company: "INITIA Group",
    period: "2020 – 2022",
    detail: "Local, on-page, and off-page SEO alongside paid campaign management.",
  },
  {
    role: "Content Strategist / Senior SEO Content Writer",
    company: "iPrice Group",
    period: "2017 – 2020",
    detail: "SEO content, keyword research, and on-page experiments across product and editorial pages.",
  },
];



export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__content">
            <span className="eyebrow">About</span>
            <h1 className="case-title">Search work tied to business outcomes</h1>
            <p className="case-lede">
              Reymart Sarigumba is an SEO &amp; GEO specialist with 6+ years across agency and in-house roles in the US and APAC. The focus is answer-first content, technical SEO, local search, and measurement that connects search work to business outcomes.
            </p>
            <div className="hero__ctas" style={{ marginTop: "28px", justifyContent: "flex-start" }}>
              <a className="btn btn--dark" href="/Reymart-Sarigumba-Resume.pdf">Download CV <span className="arrow" aria-hidden="true">→</span></a>
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
          <span className="case-nav__sub">How the work is done</span>
        </a>
        <a className="case-nav__link" href="/work/">
          <span className="case-nav__label">Case studies →</span>
          <span className="case-nav__sub">Selected client work</span>
        </a>
      </div>
    </>
  );
}
