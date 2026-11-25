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
    desc: "My source of truth for queries, pages, CTR, and Generative AI feature impressions. I use it to separate high-intent commercial queries from non-relevant traffic.",
  },
  {
    name: "Google Analytics 4",
    logo: "/logos/tools/googleanalytics.svg",
    desc: "Where I check engagement, landing-page performance, and key events, isolating organic search from total traffic so reporting stays accurate.",
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
    desc: "Dashboards that turn GSC, GA4, and Semrush exports into readable client reporting with clear periods and attribution.",
  },
  {
    name: "Surfer SEO",
    logo: "/logos/tools/surfer.png",
    desc: "I use it to check topical coverage and on-page structure, while letting search intent and primary sources drive the copy.",
  },
  {
    name: "Figma",
    logo: "/logos/tools/figma.svg",
    desc: "Design and prototype pages before they get built. I use it for landing page mockups, layout systems, and design-to-build handoff.",
  },
  {
    name: "WordPress",
    logo: "/logos/tools/wordpress.svg",
    desc: "Where I implement most client content, schema, and page-structure changes, including Divi, Elementor, Yoast, and Rank Math.",
  },
  {
    name: "Shopify",
    logo: "/logos/tools/shopify.svg",
    desc: "Client CMS for ecommerce builds. I update product and collection content, metadata, and on-page SEO directly in the theme, then check templates and indexation.",
  },
  {
    name: "Wix",
    logo: "/logos/tools/wix.svg",
    logoWide: true,
    desc: "Client CMS for smaller business sites. I make page copy, metadata, and on-page SEO changes directly in Wix and verify what renders live.",
  },
  {
    name: "Elementor",
    logo: "/logos/tools/elementor.svg",
    desc: "A WordPress builder for service pages and landing page sections. I use it for responsive layouts, reusable sections, and client-friendly edits.",
  },
  {
    name: "Yoast",
    logo: "/logos/tools/yoast.svg",
    logoWide: true,
    desc: "WordPress SEO plugin I configure for titles, meta descriptions, sitemaps, canonical settings, and schema output before validating the live page.",
  },
  {
    name: "Rank Math",
    logo: "/logos/tools/rankmath.png",
    desc: "The other WordPress SEO plugin I work in. I set up titles, schema, redirects, and sitemap controls, then test the output against the rendered page.",
  },
  {
    name: "Google Business Profile",
    logo: "/logos/tools/googlebusinessprofile.png",
    desc: "Local visibility, categories, services, and call tracking. I connect GBP performance to landing pages and first-time callers.",
  },
  {
    name: "Local Brand Manager",
    logo: "/logos/tools/localbrandmanager.png",
    logoWide: true,
    desc: "Local visibility and geogrid rank tracking around service areas. I use it to spot neighborhood gaps and watch competitor movement.",
  },
  {
    name: "Claude",
    logo: "/logos/tools/claude.svg",
    desc: "My thinking partner for audits, briefs, and analysis. I use it to accelerate work, then verify claims against sources.",
  },
  {
    name: "Gemini",
    logo: "/logos/tools/gemini.svg",
    desc: "A second research and analysis assistant. I use it to pressure-test briefs, compare sources, and check work before it ships.",
  },
  {
    name: "ChatGPT",
    logo: "/logos/tools/openai.png",
    desc: "Content ideation, prompt libraries, and workflow prototypes. I pair every AI-assisted workflow with human QA instead of publishing raw output.",
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
                <img src={tool.logo} alt="" className={`stack-card__logo${tool.logoWide ? " stack-card__logo--wide" : ""}`} />
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
