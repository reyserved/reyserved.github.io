# Reymart SEO & GEO Portfolio — Design

**Date:** 2026-11-09
**Status:** Approved direction, pending implementation
**Owner:** Reymart Sarigumba
**Target role:** SEO Specialist with demonstrated AEO, SGE/GEO, local, on-page, off-page, content, and technical SEO

---

## 1. Purpose and success criteria

Build a public portfolio that proves Reymart can plan, execute, and measure modern SEO programs, including answer-engine and generative-engine optimization. The immediate audience is recruiters and hiring managers reviewing a job application, not prospective clients.

The portfolio must satisfy the reference job's portfolio brief: two to three detailed case studies covering the business objective, strategy and rationale, execution, Reymart's specific role, measurable results, and business impact. It must also demonstrate strategic thinking, ownership, and the ability to connect content initiatives to business outcomes.

Success means:

- Three deep case studies are online, each with verifiable metrics and an explicit claim-limit block.
- A recruiter can reach any case study from a single URL and understand Reymart's role within 30 seconds.
- The site itself demonstrates answer-first writing, semantic HTML, structured data, accessible charts, and clean internal linking.
- The updated resume links to the portfolio and uses the approved AEO/GEO title and bullet language.
- No invented testimonials, no fabricated metrics, no copied text or assets from the reference sites.

## 2. Privacy model

The site is published on GitHub Pages at `https://reyserved.github.io` using the `reyserved/reyserved.github.io` repository.

GitHub Pages has no link-only or password mode. The approved approach is discovery control, not access control:

- `<meta name="robots" content="noindex, nofollow, noarchive">` on every page.
- `robots.txt` allows crawling so crawlers can read the noindex directive. Do not disallow all crawling.
- No sitemap submission and no external links to the site except the resume and direct shares.
- Anyone with the URL can technically view the site. If true access control is required later, move hosting to Cloudflare Pages with Cloudflare Access; the GitHub repo can remain the source.

## 3. Evidence rules

These rules override visual polish whenever they conflict.

1. Every metric has a source, a period, and a comparison period where relevant.
2. Every case study includes a "What this proves / does not prove" block.
3. Clients are named. Do not use client logos without permission; use typographic client marks.
4. Traditional rank data is not presented as AI-citation evidence.
5. Do not claim business outcomes from visibility metrics. Do not claim SEO causation where the source shows another driver.
6. Do not publish raw client exports. Publish only derived, rounded, chart-ready values.
7. Do not publish page-level GSC AI-feature impression shares for Service Credit Union until the 27.8% reconciliation gap in the source export is explained. Page-level citation counts from Semrush may be used with their windows labeled.
8. Team results are labeled as such. Reymart's role is stated explicitly per case.
9. The Semrush ranking workbooks are parsed from raw sheet XML because their `dimension ref="A1"` is broken. Do not rely on openpyxl's reported dimensions for these files.

## 4. Case study lineup

### Case 1 — Service Credit Union

**Working title:** Building and measuring an AI-answer visibility program
**Role:** Led strategy and page audits.
**Scope:** GEO/AEO measurement, page-level content and schema recommendations, traditional on-page CTR win.

Evidence:

- 180,938 Google Generative AI feature impressions, August 2026.
- Semrush citations 888 to 892; cited pages 363 to 382 across two rolling windows.
- Auto-loans page 8 to 26 cited prompts; what-is-a-credit-union 8 to 22; military banking 8 to 15; become-a-member 40 to 63; credit-card APR blog 54 to 62; vehicle-loans hub 65 to 49.
- AI Overview 39/100 then 37/100; overall AI Visibility 17/100 against a 44 target.
- AI Share of Voice 16.2% in August, leading five New Hampshire peers, then 13.8% in September against a 15% target.
- Auto-loan preapproval guide clicks 17 to 28 (+64.7%), CTR 2.92% to 4.61%, position 9.21 to 8.44.

Claim limits: overall AI visibility is below target; no click, call, or lead attribution from AI surfaces; the vehicle-loans hub declined; the two Semrush windows overlap by three days.

### Case 2 — TDE Family Law

**Working title:** An answer-first content system for a family law firm
**Role:** Led content and local strategy.
**Scope:** AEO content mapping, content briefs and structure, local SEO and GBP, snippet optimization.

Evidence:

- Filtered query impressions 19,783 to 23,637 (+19.5%); query clicks 166 to 190 (+14.5%); page clicks 422 to 443 (+5.0%).
- Homepage impressions 10,433 to 15,129 (+45.0%); average position 18.05 to 13.68; CTR 2.26% to 1.69%.
- Prenup guide clicks 4 to 14 (+250%), impressions 1,035 to 1,342, CTR 0.39% to 1.04%, position 11.91 to 13.0.
- Website Pool calls 64 to 86 (+34.4%); first-time callers 45 to 58 (+28.9%).
- GBP calls 130 to 197 (+51.5%); first-time callers 67 to 100 (+49.3%).
- 67 of 151 tracked terms trigger AI Overviews in the content map.

Claim limits: branded search carried most click growth; qualified Website Pool calls were flat at 2 and qualified GBP calls fell 24 to 16; the prenup base is 14 clicks; the period is March 7 to April 3, 2026 versus February 7 to March 6, 2026.

### Case 3 — Dream Assurance Group

**Working title:** An in-house SEO and GEO operating system
**Role:** End-to-end ownership.
**Scope:** Technical SEO, schema, internal linking, content clusters, local SEO, AI-assisted content operations, conversion tracking, and measurement design.

Evidence:

- February 2026 keyword snapshot: 685 tracked queries; 561 (81.9%) trigger AI Overviews; 127 top-10 terms; 107 terms are both top-10 and AI Overview.
- Highest AI Overview coverage by page: indemnity-insurance 99 queries, average-semi-insurance-cost 79, professional-indemnity-insurance 43, employment-practices-liability-insurance 32, media-liability-insurance 23.
- Implementation evidence from project artifacts: contractor hub plus 18 child pages, FAQ/schema parity checks, schema graph validation, jump-link and internal-link audits, GTM/GA4 conversion tracking, AI supporting content calendars with brand and persona inputs.

Claim limits: this is an operating-system and opportunity-mapping case, not a traffic-growth case. The keyword snapshot is not presented as improvement; no clean before/after AI-citation trend exists.

### SEO wins and earlier-role evidence

These are compact, source-labeled cards, not additional long case studies. Home shows four to six highlights; `/work/` shows the full set. Each card carries a caveat tag where needed: "page-level only," "all traffic," "small base," or "team work."

**Rocket Clicks wins**

- **NeuroEndoMKE:** top-3 terms 5 to 10, top-10 terms 13 to 18, local visibility +19.7%, #1 for neurosurgeon and arm/shoulder/neck pain. Source: Semrush Position Tracking, November 2023 to November 2026.
- **Aurit Mediation:** top-3 terms 0 to 3, nine keywords gained, #1 for Chandler and Scottsdale divorce mediation, #3 Arizona divorce mediation. Source: Semrush Position Tracking, May 2024 to November 2026.
- **Kalish:** 37 top-3 and 44 top-10 terms at the latest snapshot; 32.98% visibility. Source: Semrush Position Tracking, April to November 2026. Framed as maintained category visibility, not growth.
- **Fanash Family Law:** top-10 terms 0 to 2; #4 annulment attorney. Source: Semrush Position Tracking, July 2025 to November 2026.
- **Michael Ireland Law:** San Antonio divorce page new users 47 to 225 (+378.7%), sessions 53 to 248, engaged sessions 24 to 93. Source: GA4 landing pages, December 15, 2025 to March 15, 2026 versus the prior period. Tags: all traffic, key events flat at 3.
- **Omnipress:** publication-printing page clicks 11 to 29 (+163.6%), impressions 4,189 to 6,390 (+52.5%), engaged sessions 21 to 84. Source: GSC and GA4, November 16, 2025 to February 15, 2026 year over year. Tags: page-level only, sitewide metrics declined.
- **LJP Zero-Landfill:** contact forms 4 to 8, session key-event rate 0.58% to 1.42%. Source: GA4 key-event ledger, April 5 to May 5, 2026 versus March 5 to April 4, 2026. Tags: small base, sessions fell 17.5%.

**Earlier-role wins**

Presented as team work with honest credit unless the artifact is clearly Reymart's own strategy document.

- **First Page — RELX APAC:** +105% non-branded organic traffic after service and blog optimization.
- **First Page — Tuttee:** +273% organic traffic after content strategy implementation.
- **First Page — ThreeIC:** +21 first-page keywords and +1.6K monthly organic traffic within six months.
- **First Page — The Wee Bean:** +89% more target keywords on page 1 after on-page fixes.
- **First Page — New Concept Mandarin:** +70% more target keywords on page 1 after content strategy.
- **First Page — Lendela SG:** +71% organic traffic after reducing keyword cannibalization.
- **iPrice Group:** product landing pages improved by about two average positions after H1 optimization.

**Business impact, labeled separately**

- **Johnson Law Group:** leads +27.1%, hires +76.9%, hired-to-lead rate 7.18% to 10.00%, September versus August 2026. Source: internal Clio and CallRail dashboard. Caveat: GSC clicks fell 15.8%; this is a conversion-quality result, not an organic-growth result.

Excluded from growth claims: Bank Five Nine, Service Credit Union local rank tracking, Johnson Law Group rank tracking, Elkus & Sisson. Their tracked windows show net top-10 losses. The Service Credit Union refinance conversion lift is excluded from SEO wins because the APR offer changed in the same window.

## 5. Site architecture

```text
/                                Home / cover
/work/                           Case index, Rocket Clicks wins, and earlier-role wins
/work/service-credit-union/      Case 1
/work/tde-family-law/            Case 2
/work/dream-assurance/           Case 3
/method/                         GEO/AEO operating model
/about/                          Bio, experience, tools, resume, contact
/404.html
/robots.txt
/.nojekyll
/assets/                         CSS, JS, fonts, SVG, derived chart data
```

Naming rule: use **Reymart** for the nav brand, hero wordmark, footer watermark, and page furniture. Use **Reymart Sarigumba** only once, in the cover-page introduction.

### Home section order

1. Floating pill navigation with dual-layer roll links.
2. Hero: giant `Reymart` background wordmark, monogram profile card (headshot can replace it later), floating original clay shapes, rotating specialty ticker, proof pill, primary CTA.
3. Answer-first introduction: one paragraph that states who Reymart is, what he does, and the evidence on the site.
4. About bento: introduction, experience/education with Read My CV, working philosophy and stack.
5. Dark proof dashboard using Armory telemetry patterns with real metrics.
6. Case-study list using Armory's hairline editorial rows.
7. Tool stack: 12 flip cards.
8. Capabilities: 12 sticky-scroll cards.
9. SEO wins highlights and a View All Case Studies banner.
10. Footer with giant low-contrast `Reymart` watermark.

### Case study template

1. Snapshot: client, objective, role, timeframe, sources.
2. Business objective.
3. What the data showed.
4. Strategy and rationale, including the AEO/GEO principles applied.
5. Execution: what Reymart did, with artifacts described rather than dumped.
6. Results: metric cards and charts with source and period labels.
7. What this proves / does not prove.
8. What Reymart would do next.
9. Related cases.

### Method page

A six-stage operating model rendered as an animated node canvas:

Intent and question discovery → Brand and entity intelligence → Answer-first content architecture → Technical extractability → AI-assisted production with human QA → Measurement with claim limits.

Below the canvas: tabbed phase details and an FAQ accordion covering AEO versus GEO versus SGE, how AI citations are measured, why answer-first intros matter, and what the portfolio data cannot prove.

## 6. Design system

The synthesis is **playful shell, rigorous data core**: Cohesion supplies the personal portfolio structure; Armory supplies evidence presentation and technical texture.

### Color

- Light canvas: `#F4F3F0`
- Light surface: `#FFFFFF`
- Ink: `#111111`
- Secondary text: `#555555`
- Muted text: `#888888`
- Dark canvas: `#090A0C`
- Dark surface: `#121418`
- Dark elevated: `#2B2E33`
- Dark primary text: `#FFFFFF`
- Dark secondary text: `#C6BFAE`
- Dark muted text: `#7D828C`
- Accent amber: `#E5A93C`
- Positive delta: `#2F9E6E`
- Caveat: `#C4503C`
- AI/GEO accent: `#8B5CF6`
- Hairline light: `rgba(17,17,17,0.08)`
- Hairline dark: `rgba(255,255,255,0.08)`

### Type

- UI and body: Public Sans, 400–800.
- Eyebrows, indexes, metric labels, source notes: a technical monospace such as JetBrains Mono or Geist Mono.
- Accent italic serif for the name and emphasis phrases.
- Hero: `clamp(3rem, 7vw, 6rem)`, weight 800, line-height 1.04, letter-spacing -0.04em.
- Section heading: `clamp(2.25rem, 4.5vw, 4rem)`, weight 700, line-height 1.1.
- Body: 16–18px, line-height 1.65.

### Layout

- Max container 1360–1440px, 24px mobile and 48px desktop gutters.
- Radii: 24px cards, 32px large surfaces, pill buttons.
- Hairline grid architecture in evidence sections; dot-matrix backgrounds only inside dark data modules.
- Breakpoints: 1440px desktop, 810px tablet, 390px mobile reference.

## 7. Component and motion inventory

From Cohesion:

- Floating pill nav, dual-layer vertical roll links, custom cursor follower on fine pointers.
- Giant hero wordmark, profile card, rotating ticker, circular scroll indicator.
- Floating original SVG/CSS clay shapes with subtle parallax; no Framer assets.
- About bento, tool flip cards with keyboard support, sticky-scroll capability cards.
- Project cards and oversized footer wordmark.

From Armory:

- Telemetry bento: radial gauge, lollipop/stem chart with target line, semi-circular gauge, wide line chart over dot grid.
- Odometer counters triggered by IntersectionObserver.
- Monospace eyebrows and `//2026` style indexes.
- Hairline case-study rows and split buttons.
- Node canvas with animated SVG bezier connectors.
- Tabs and FAQ accordion.
- Low-contrast giant footer watermark.

Original components:

- Claim ledger table in every case study.
- Query → Answer → Citation diagram in the Service Credit Union case.
- Evidence tags: GSC, GA4, Semrush, Clio/CallRail, CallRail, GBP.
- Print stylesheet and per-case PDF export.

Motion rules: 600ms section reveals with 80ms stagger, 1200ms counter interpolation, subtle shape float, no layout-shifting animation, and full `prefers-reduced-motion` fallbacks. Charts must have text equivalents and must not rely on color alone.

## 8. Resume changes

Deliver an updated DOCX, PDF, and preview while preserving the ATS-safe two-page layout.

- Dream Assurance Group title: **SEO & GEO Specialist**.
- First Page title: **SEO & SGE Specialist**.
- Rocket Clicks current title remains **Senior SEO & GEO Specialist**.
- Add AEO/GEO bullets to Rocket Clicks and Dream Assurance covering answer-first content architecture, question-led sections, source citation, schema, AI Overview/LLM visibility measurement, AI content calendars, brand-intelligence and persona inputs, and AEO/GEO readiness audits.
- Add a First Page bullet on structuring content for featured snippets, People Also Ask, and other SERP features.
- Rewrite the profile around answer-first content, AI citation measurement, and full-stack SEO.
- Add AEO, SGE, topic clusters, content audits and gap analysis, AI content operations, and AI citation measurement to core expertise.
- Add verified metrics with "led" or "contributed" labels; do not import PPC results into the SEO summary.
- Add `reyserved.github.io` to the portfolio links.
- Trim older roles to keep two pages.

## 9. Build sequence

1. Write and commit this design doc.
2. Produce the implementation plan.
3. Build the derived data pack: chart-ready JSON for SCU, TDE, Dream Assurance, NeuroEndoMKE, Aurit, Kalish, JLG, Fanash, and First Page.
4. Build three hero/proof-dashboard visual directions and review them in the browser.
5. Build Home plus the Service Credit Union case as the full prototype.
6. Build the remaining pages, case studies, Method, About, and print/PDF output.
7. Run content-accuracy QA against the claim ledger, then responsive, accessibility, link, schema, and print QA.
8. Push to `reyserved/reyserved.github.io`, enable Pages, and verify the live site and noindex headers/meta.
9. Update and export the resume; verify links and page count.
10. Hand off a README with update instructions.

## 10. Open items

- Optional headshot for the hero; the monogram card is the default.
- Final contact details for the site: email and LinkedIn; no phone by default.
- Whether to include a small earlier-career PPC strip. Default: exclude from the main narrative.
- Any client whose naming should be reconsidered before publication. Default: all named, no logos.
