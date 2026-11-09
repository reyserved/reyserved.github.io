export const metadata = {
  title: "About — Reymart",
  description: "Background, experience, tools, and contact details for Reymart Sarigumba.",
};

const ROLES = [
  {
    role: "Senior SEO & GEO Specialist",
    company: "Rocket Clicks",
    detail: "Client SEO strategy, AEO/GEO content systems, technical audits, local SEO, and AI visibility measurement.",
  },
  {
    role: "SEO & GEO Specialist",
    company: "Dream Assurance Group",
    detail: "End-to-end in-house SEO: technical, content, schema, internal linking, local, tracking, and AI content operations.",
  },
  {
    role: "SEO & SGE Specialist",
    company: "First Page",
    detail: "Technical audits, keyword research, content optimization, schema, and SERP-feature-focused content across APAC.",
  },
  {
    role: "SEO Specialist / Media Buyer",
    company: "INITIA Group",
    detail: "Local, on-page, and off-page SEO alongside paid campaign management.",
  },
  {
    role: "Content Strategist / Senior SEO Content Writer",
    company: "iPrice Group",
    detail: "SEO content, keyword research, and on-page experiments across product and editorial pages.",
  },
];

const TOOLS = [
  "Google Search Console",
  "GA4",
  "Google Tag Manager",
  "Semrush",
  "Ahrefs",
  "Screaming Frog",
  "Looker Studio",
  "Surfer",
  "WordPress",
  "Google Business Profile",
  "Claude / ChatGPT",
  "HTML / CSS",
];

export default function AboutPage() {
  return (
    <>
      <section className="work-hero">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1 className="case-title">SEO that survives a skeptical review</h1>
          <p className="case-lede">
            Reymart Sarigumba is an SEO &amp; GEO specialist with 6+ years across agency and in-house roles in the US and APAC. The focus is answer-first content, technical SEO, local search, and measurement that distinguishes real evidence from convenient numbers.
          </p>
          <div className="hero__ctas" style={{ marginTop: "28px", justifyContent: "flex-start" }}>
            <a className="btn btn--dark" href="/Reymart-Sarigumba-Resume.pdf">Download CV <span className="arrow" aria-hidden="true">→</span></a>
            <a className="btn btn--light" href="#contact">Contact</a>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="work-group-label">Experience</h2>
        <div className="win-grid">
          {ROLES.map((item) => (
            <div className="win-card" key={item.company}>
              <div className="win-card__client">{item.role}</div>
              <div className="win-card__meta" style={{ marginTop: "8px" }}>{item.company}</div>
              <div className="win-card__desc" style={{ marginTop: "12px" }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <h2 className="work-group-label">Tools</h2>
        <div>
          {TOOLS.map((tool) => (
            <span className="win-card__tag" key={tool} style={{ fontSize: "11px", padding: "8px 12px", marginBottom: "8px" }}>{tool}</span>
          ))}
        </div>

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
        <a href="/method/">← Method</a>
        <a href="/work/">Case studies →<span>See the evidence</span></a>
      </div>
    </>
  );
}
