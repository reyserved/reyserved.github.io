import LandingGallery from "../../../components/LandingGallery";
import { LANDING_PAGES } from "../../../data/landingPages";

export const metadata = {
  title: "Landing page gallery | Reymart",
  description:
    "Explore ten responsive landing pages, service pages, and project galleries built for Rocket Clicks clients across paid search and organic SEO.",
  robots: { index: false, follow: false, nocache: true },
};

export default function LandingPagesIndex() {
  const count = String(LANDING_PAGES.length).padStart(2, "0");

  return (
    <div className="lp-index">
      <section className="lp-hero">
        <div className="container">
          <div className="lp-hero__top">
            <span className="eyebrow">Landing page gallery</span>
            <span className="lp-hero__count">
              {count} builds <span aria-hidden="true">/</span> {count} clients
            </span>
          </div>
          <h1 className="lp-hero__title">
            Landing pages, <em>from brief to build</em>
          </h1>
          <p className="lp-hero__lede">
            I wrote, designed, and built these responsive pages for Rocket Clicks clients. Each build started with the target
            audience, their search intent, and the exact action the page needed to drive. Open any project to see how SEO
            intent and CRO shaped the layout.
          </p>
          <div className="lp-hero__meta" aria-label="Page types in this gallery">
            <span>Paid search</span>
            <span>Organic landing pages</span>
            <span>Project galleries</span>
            <span>Conversion design</span>
          </div>
        </div>
      </section>

      <div className="container">
        <LandingGallery />
        <p className="lp-disclaimer">
          Screenshots include both live client builds and dev-ready mockups delivered for CMS handoff.
        </p>
      </div>

      <div className="container case-nav">
        <a className="case-nav__link" href="/work/">
          <span className="case-nav__label">← Case studies</span>
          <span className="case-nav__sub">SEO programs and results</span>
        </a>
        <a className="case-nav__link" href="/method/">
          <span className="case-nav__label">My method →</span>
          <span className="case-nav__sub">How I approach the work</span>
        </a>
      </div>
    </div>
  );
}
