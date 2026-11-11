"use client";

import { useState } from "react";

const TOOLS = [
  {
    name: "Semrush",
    logo: "/logos/tools/semrush.svg",
    desc: "Position tracking, AI Visibility, keyword research, and backlink analysis. I use it to connect rankings, citations, and content priorities.",
  },
  {
    name: "Google Search Console",
    logo: "/logos/tools/googlesearchconsole.svg",
    desc: "My source of truth for queries, pages, CTR, and Generative AI feature impressions. I use it to separate business-relevant demand from noise.",
  },
  {
    name: "Google Analytics 4",
    logo: "/logos/tools/googleanalytics.svg",
    desc: "Where I validate engagement, landing-page performance, and key events, always checking whether the data is organic-only or all traffic.",
  },
  {
    name: "Google Tag Manager",
    logo: "/logos/tools/googletagmanager.svg",
    desc: "My conversion tracking layer. I implement and troubleshoot GA4 events, form tracking, and phone or email click tracking.",
  },
  {
    name: "Ahrefs",
    logo: "/logos/tools/ahrefs.png",
    desc: "Backlink audits, referring-domain analysis, and competitor research. Useful for off-page diagnosis and link-quality review.",
  },
  {
    name: "Screaming Frog",
    logo: "/logos/tools/screamingfrog.png",
    desc: "My crawler for technical audits: indexation, canonicals, redirects, metadata, and structured data checks at scale.",
  },
  {
    name: "Looker Studio",
    logo: "/logos/tools/lookerstudio.png",
    desc: "Dashboards that turn GSC, GA4, and Semrush exports into readable client reporting with clear periods and claim limits.",
  },
  {
    name: "Surfer SEO",
    logo: "/logos/tools/surfer.png",
    desc: "Content optimization support for coverage and on-page structure, always secondary to intent and source quality.",
  },
  {
    name: "WordPress",
    logo: "/logos/tools/wordpress.svg",
    desc: "Where I implement most client content, schema, and page-structure changes, including Divi, Elementor, Yoast, and RankMath.",
  },
  {
    name: "Google Business Profile",
    logo: "/logos/tools/googlebusinessprofile.png",
    desc: "Local visibility, categories, services, and call tracking. I connect GBP performance to landing pages and first-time callers.",
  },
  {
    name: "Claude",
    logo: "/logos/tools/claude.svg",
    desc: "My thinking partner for audits, briefs, and analysis. I use it to accelerate work, then verify claims against sources.",
  },
  {
    name: "ChatGPT",
    logo: "/logos/tools/openai.png",
    desc: "Content ideation, prompt libraries, and workflow design. I build AI-assisted systems with human QA rather than raw output.",
  },
];

export default function StackGrid() {
  const [flipped, setFlipped] = useState({});

  return (
    <div className="stack__grid reveal-group">
      {TOOLS.map((tool, index) => {
        const isFlipped = Boolean(flipped[index]);
        return (
          <button
            type="button"
            className={`stack-card${isFlipped ? " is-flipped" : ""}`}
            key={tool.name}
            onClick={() => setFlipped((state) => ({ ...state, [index]: !state[index] }))}
            aria-pressed={isFlipped}
            aria-label={`${tool.name}. ${isFlipped ? tool.desc : "Show how Reymart uses it"}`}
          >
            <span className="stack-card__inner">
              <span className="stack-card__face stack-card__front">
                <img src={tool.logo} alt="" className="stack-card__logo" />
                <span className="stack-card__name">{tool.name}</span>
                <span className="stack-card__hint">Tap to flip</span>
              </span>
              <span className="stack-card__face stack-card__back">
                <span className="stack-card__back-name">{tool.name}</span>
                <span className="stack-card__desc">{tool.desc}</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
