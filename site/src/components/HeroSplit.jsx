"use client";

import { useEffect, useState } from "react";

const WORDS = ["quote.", "cite.", "recommend."];

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
      <div className="hero-split__wordmark" aria-hidden="true">Reymart</div>
      <div className="container hero-split__grid">
        <div className="hero-split__content">
          <span className="hero-split__pill reveal">SEO &amp; GEO Specialist</span>
          <h1 className="hero-split__title reveal" id="hero-split-title">
            I build search content answer engines can <span className="hero-split__dynamic">{text}<span className="hero-split__cursor" aria-hidden="true">|</span></span>
          </h1>
          <p className="hero-split__bio reveal">
            <strong>Reymart Sarigumba</strong> is an SEO &amp; GEO specialist who builds answer-first content systems and measures whether AI surfaces actually cite them. This portfolio documents three programs: AI-answer visibility for a credit union, an answer-first content system for a family law firm, and an in-house SEO and GEO operating system for an insurance agency.
          </p>
          <div className="hero-split__ctas reveal">
            <a className="btn btn--dark" href="/work/">View case studies <span className="arrow" aria-hidden="true">→</span></a>
            <a className="btn btn--light" href="/Reymart-Sarigumba-Resume.pdf">Download CV</a>
          </div>
        </div>

        <div className="hero-split__side reveal">
          <div className="hero-split__card hero-split__card--photo">
            <img src="/images/reymart.jpg" alt="Reymart Sarigumba" className="hero-split__photo" />
            <span className="hero-split__card-caption">SEO · AEO · GEO</span>
          </div>
          <div className="hero-split__kpi" aria-label="Portfolio at a glance">
            <div><strong>6+</strong><span>years in SEO</span></div>
            <div><strong>3</strong><span>deep case studies</span></div>
            <div><strong>654</strong><span>AI Overview queries mapped · 3 clients only</span></div>
          </div>
        </div>
      </div>

      <div className="hero-split__marquee" aria-label="Specialties">
        <div className="hero-split__marquee-track">
          {["AEO", "GEO", "Technical SEO", "Local SEO", "Content Strategy", "Schema", "GA4", "GSC", "Semrush", "AEO", "GEO", "Technical SEO", "Local SEO", "Content Strategy", "Schema", "GA4", "GSC", "Semrush"].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
