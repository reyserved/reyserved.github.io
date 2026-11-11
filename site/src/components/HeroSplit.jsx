"use client";

import { useEffect, useState } from "react";
import SkillsCarousel from "./SkillsCarousel";

const WORDS = ["cite.", "surface.", "recommend."];

export default function HeroSplit() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = WORDS[index];
    let timeout;
    if (phase === "typing") {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 85);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), 1800);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), 45);
      } else {
        timeout = setTimeout(() => {
          setIndex((value) => (value + 1) % WORDS.length);
          setPhase("typing");
        }, 300);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index]);

  return (
    <section className="hero-split" aria-labelledby="hero-split-title">
      <div className="container hero-split__shell">
        <div className="hero-card">
          <div className="hero-card__content">
            <div className="hero-mobile-profile">
              <img src="/images/reymart.jpg" alt="Reymart Sarigumba" className="hero-mobile-avatar" />
              <span className="hero-mobile-status"><span aria-hidden="true" /> Open to SEO roles</span>
            </div>
            <span className="hero-split__pill reveal">SEO &amp; GEO Specialist</span>
            <h1 className="hero-split__title reveal" id="hero-split-title">
              I develop <span className="hero-split__nowrap">search-optimized</span> content that AI answer engines can{" "}
              <span className="hero-split__dynamic">{text}<span className="hero-split__cursor" aria-hidden="true">|</span></span>
            </h1>
            <p className="hero-split__bio reveal">
              From research and strategy to writing and building pages in the CMS, I help businesses get discovered and recommended in AI-generated answers.
            </p>
            <div className="hero-split__ctas reveal">
              <a className="btn btn--dark" href="/work/">View case studies <span className="arrow" aria-hidden="true">→</span></a>
              <a className="btn btn--light" href="/Reymart-Sarigumba-Resume.pdf">Download CV</a>
            </div>
            <div className="hero-split__kpi reveal" aria-label="Portfolio at a glance">
              <div><strong>6</strong><span>years in SEO</span></div>
              <div><strong className="hero-split__kpi-text">Agency &amp; in-house</strong><span>experience</span></div>
              <div><strong className="hero-split__kpi-text">US &amp; APAC</strong><span>client markets</span></div>
            </div>
          </div>

          <div className="hero-card__visual">
            <img src="/images/reymart.jpg" alt="Reymart Sarigumba" className="hero-card__photo" />
            <div className="hero-card__photo-fade" aria-hidden="true" />
            <div className="hero-card__badge reveal">
              <div>
                <span className="hero-card__badge-label">Availability</span>
                <span className="hero-card__badge-title">Open to SEO roles</span>
                <span className="hero-card__badge-copy">Content strategy, AI search visibility, and hands-on page development.</span>
              </div>
              <a className="hero-card__badge-arrow" href="/about/#contact" aria-label="Contact me about SEO roles">
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <SkillsCarousel />
      </div>
    </section>
  );
}
