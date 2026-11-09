"""Generate case-study pages and the work index from approved evidence."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def shell(title, description, body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/case-study.css">
</head>
<body>
  <header class="site-nav" aria-label="Primary">
    <a class="site-nav__brand" href="/">Reymart</a>
    <nav class="site-nav__links" id="site-links" aria-label="Sections">
      <a href="/work/">Case studies</a>
      <a href="/method/">Method</a>
      <a href="/about/">About</a>
    </nav>
    <button class="site-nav__menu" type="button" aria-expanded="false" aria-controls="site-links">Menu</button>
    <a class="btn btn--dark btn--sm site-nav__cta" href="/about/#contact">Contact <span class="arrow" aria-hidden="true">→</span></a>
  </header>
  <main>
{body}
  </main>
  <script src="/assets/js/main.js"></script>
</body>
</html>
"""


def case_page(slug, pill, title, lede, meta, sections, metric_cards, proves, limits, next_slug, next_title):
    meta_html = "".join(f"<div><dt>{key}</dt><dd>{value}</dd></div>" for key, value in meta)
    sections_html = ""
    for label, heading, body in sections:
        sections_html += f"""
    <section class="case-section">
      <div class="container case-section__grid">
        <div><span class="case-section__label">{label}</span><h2>{heading}</h2></div>
        <div class="case-section__body">{body}</div>
      </div>
    </section>"""

    cards_html = "".join(
        f"""<div class="metric-card"><div class="metric-card__value">{value}</div><div class="metric-card__label">{label}</div><div class="metric-card__source">{source}</div></div>"""
        for value, label, source in metric_cards
    )
    proves_html = "".join(f"<li>{item}</li>" for item in proves)
    limits_html = "".join(f"<li>{item}</li>" for item in limits)

    body = f"""
    <section class="case-hero">
      <div class="container">
        <span class="case-pill">{pill}</span>
        <h1 class="case-title">{title}</h1>
        <p class="case-lede">{lede}</p>
        <dl class="case-meta">{meta_html}</dl>
      </div>
    </section>
{sections_html}
    <section class="case-section case-results">
      <div class="container">
        <span class="case-section__label">Results</span>
        <h2>Measured outcomes</h2>
        <div class="metric-grid">{cards_html}</div>
      </div>
    </section>
    <section class="case-section">
      <div class="container">
        <span class="case-section__label">Claim ledger</span>
        <h2>What this proves, and what it does not</h2>
        <div class="claim-ledger">
          <div class="claim-box"><h3>What the evidence supports</h3><ul>{proves_html}</ul></div>
          <div class="claim-box claim-box--limits"><h3>What it does not support</h3><ul>{limits_html}</ul></div>
        </div>
      </div>
    </section>
    <div class="container case-nav">
      <a href="/work/">← All case studies<span>Work index</span></a>
      <a href="/work/{next_slug}/">{next_title} →<span>Next case study</span></a>
    </div>"""
    return shell(f"{title} — Reymart", lede, body)


scu = case_page(
    slug="service-credit-union",
    pill="Credit union · Financial services",
    title="Building and measuring an AI-answer visibility program",
    lede="How Service Credit Union's product and membership pages earned citations in AI Overviews and LLM answers, and what the data still cannot prove.",
    meta=[
        ("Client", "Service Credit Union<br>servicecu.org · New Hampshire"),
        ("My role", "Led strategy and page audits"),
        ("Period", "Jul 12 – Sep 7, 2026 (Semrush)<br>August 2026 (GSC)"),
        ("Sources", "Semrush AI Visibility<br>GSC Generative AI Features"),
    ],
    sections=[
        ("01 · Objective", "Make credit union content citable in AI answers",
         "<p>The goal was to turn Service Credit Union's product, membership, and educational pages into sources that AI Overviews and conversational engines would actually cite, while continuing to improve traditional click-through performance on high-intent pages.</p><p>That required two things at once: content that is easy for an answer engine to extract, and a measurement model that separates <strong>being cited</strong> from simply <strong>ranking</strong>.</p>"),
        ("02 · Insight", "AI Overview was the strongest surface, but the program was behind target",
         "<p>In the July to August Semrush snapshot, AI Overview scored <strong>39/100</strong>, well ahead of ChatGPT, Gemini, and AI Mode. Overall AI Visibility was <strong>17/100 against a 44 target</strong>. Treating this as a finished GEO win would have been wrong.</p><p>The useful signal was at page level: citations moved from <strong>888 to 892</strong> and cited pages from <strong>363 to 382</strong> between the two rolling windows, with gains concentrated in definitional, membership, and product content.</p>"),
        ("03 · Strategy", "Answer-first, question-led, source-backed content",
         "<p>The strategy was to make each priority page extractable before trying to make it more visible:</p><ul><li>Define the query in the opening paragraph rather than easing into it.</li><li>Use question-led H2 and H3 sections that mirror real follow-up questions.</li><li>Keep fact-dense copy with named, authoritative sources.</li><li>Use FAQ blocks and appropriate structured data where they help extraction.</li><li>Measure page-level citations instead of relying on brand-level mentions.</li></ul>"),
        ("04 · Execution", "Page audits plus a two-source measurement model",
         "<p>I led the strategy and audited eight pages with at least good evidence, reviewing metadata, H1 to H4 structure, body copy, tables, FAQ content, JSON-LD, canonicals, robots, and llms.txt. Recommendations covered definitional intros, question headings, source citations, and FAQPage markup gaps.</p><p>Measurement paired <strong>Semrush Cited Pages</strong> with <strong>GSC Generative AI Features</strong>, so a page had to show citation evidence in one system and AI feature visibility in the other before it counted as a strong asset.</p>"),
    ],
    metric_cards=[
        ("180,938", "Google Generative AI feature impressions", "GSC · August 2026"),
        ("888 → 892", "Citations across AI platforms", "Semrush · Jul 12–Aug 11 vs Aug 8–Sep 7"),
        ("363 → 382", "Pages cited in AI answers", "Semrush · same windows"),
        ("8 → 26", "Cited prompts for the auto-loans page", "Semrush Cited Pages"),
        ("40 → 63", "Cited prompts for become-a-member", "Semrush Cited Pages"),
        ("17 → 28", "Preapproval guide clicks, CTR 2.92% → 4.61%", "GSC · Feb 18–Mar 10 vs Jan 28–Feb 17"),
    ],
    proves=[
        "Page-level citation breadth increased for several product and membership pages.",
        "AI Overview was Service Credit Union's strongest AI surface in the measured windows.",
        "The auto-loan hub showed both AI feature visibility and high citation counts in two independent sources.",
        "A high-intent preapproval guide earned more clicks on nearly flat impressions.",
    ],
    limits=[
        "Overall AI Visibility stayed at 17/100 against a 44 target; this is not a completed GEO win.",
        "No clicks, calls, or leads are attributed to AI surfaces in the source data.",
        "The vehicle-loans hub declined from 65 to 49 cited prompts, so gains were not uniform.",
        "The two Semrush windows overlap by three days; changes are directional, not exact.",
        "Page-level GSC AI-feature impression shares are withheld pending reconciliation of the source export.",
    ],
    next_slug="tde-family-law",
    next_title="TDE Family Law",
)

tde = case_page(
    slug="tde-family-law",
    pill="Family law · Legal services",
    title="An answer-first content system for a family law firm",
    lede="Mapping 151 family-law queries to AI Overview exposure, then rebuilding content so each page answers the query in its first paragraph.",
    meta=[
        ("Client", "TDE Family Law<br>tdefamilylaw.com · Georgia"),
        ("My role", "Led content and local strategy"),
        ("Period", "Mar 7 – Apr 3, 2026<br>vs Feb 7 – Mar 6, 2026"),
        ("Sources", "GSC, GA4, CallRail, GBP<br>AI Overview content map"),
    ],
    sections=[
        ("01 · Objective", "Grow commercially relevant search demand, not vanity traffic",
         "<p>TDE Family Law needed content that would attract people actively researching divorce, custody, support, and prenuptial questions in Georgia, and turn that visibility into phone demand.</p><p>The measurement problem came first: raw sitewide totals were distorted by celebrity and news traffic, so the program had to be judged on <strong>business-relevant queries</strong>, not headline numbers.</p>"),
        ("02 · Insight", "Two-thirds of the tracked query set already triggered AI Overviews",
         "<p>The content map flagged <strong>67 of 151 tracked terms</strong> as AI Overview queries. That made answer extraction a first-order requirement, not an experiment.</p><p>After filtering out celebrity and news noise, query impressions rose <strong>19.5%</strong> and query clicks <strong>14.5%</strong>, while the homepage's average position improved from <strong>18.05 to 13.68</strong>.</p>"),
        ("03 · Strategy", "Answer-first briefs, question-led pages, and local demand capture",
         "<p>The strategy combined AEO content structure with local SEO:</p><ul><li>Map each priority query to the page that should own the answer.</li><li>Open with a direct definition or answer before expanding into detail.</li><li>Structure follow-ups as question headings with concise, citable answers.</li><li>Cite authoritative sources for legal statements rather than asserting them.</li><li>Strengthen Google Business Profile and location signals to convert demand into calls.</li></ul>"),
        ("04 · Execution", "Content map, briefs, page optimization, and GBP work",
         "<p>I led the content and local strategy: building the AI Overview content map, shaping briefs around answer-first structure, and optimizing pages for snippet and intent match.</p><p>The prenup guide is the clearest example. Clicks went from <strong>4 to 14</strong> and CTR from <strong>0.39% to 1.04%</strong> while average position slipped from 11.91 to 13.0. That is a <strong>snippet and intent-match gain</strong>, not a ranking jump.</p>"),
    ],
    metric_cards=[
        ("+19.5%", "Filtered query impressions, 19,783 → 23,637", "GSC · Mar 7–Apr 3 vs Feb 7–Mar 6"),
        ("+14.5%", "Filtered query clicks, 166 → 190", "GSC · same periods"),
        ("+45.0%", "Homepage impressions, 10,433 → 15,129", "GSC page export"),
        ("4 → 14", "Prenup guide clicks, CTR 0.39% → 1.04%", "GSC page export"),
        ("+51.5%", "GBP calls, 130 → 197", "CallRail"),
        ("+28.9%", "Website Pool first-time callers, 45 → 58", "CallRail"),
    ],
    proves=[
        "Business-relevant search exposure grew after removing celebrity and news distortion.",
        "A single content page earned substantially more clicks through better snippet performance.",
        "Local search demand produced more calls and more first-time callers.",
        "The query set has significant AI Overview exposure, making answer-first structure commercially relevant.",
    ],
    limits=[
        "Branded search carried most of the click growth; this is not proof of non-brand click growth.",
        "Qualified Website Pool calls stayed flat at 2 and qualified GBP calls fell from 24 to 16.",
        "The prenup result is a small base of 14 clicks and should not be generalized to the whole blog.",
        "Homepage CTR fell from 2.26% to 1.69% as impressions broadened.",
        "GA4 engagement figures are all-users, not organic-only.",
    ],
    next_slug="dream-assurance",
    next_title="Dream Assurance",
)

da = case_page(
    slug="dream-assurance",
    pill="Insurance · Independent agency",
    title="An in-house SEO and GEO operating system",
    lede="Building the technical, content, and measurement system behind an independent insurance agency's search visibility, and mapping where AI Overviews already shape the SERP.",
    meta=[
        ("Client", "Dream Assurance Group<br>dreamassurancegroup.com · Kansas"),
        ("My role", "End-to-end ownership"),
        ("Period", "February 2026 keyword snapshot<br>Program work through November 2026"),
        ("Sources", "Semrush keyword export<br>GSC, GA4, GTM, schema validators"),
    ],
    sections=[
        ("01 · Objective", "Build a repeatable system, not a one-off campaign",
         "<p>Dream Assurance is an independent insurance agency in Overland Park, Kansas. My responsibility was the whole search program: technical audits, content strategy, schema, internal linking, local SEO, conversion tracking, and reporting.</p><p>The GEO question was practical: <strong>where are AI Overviews already present in the agency's query set, and which pages are closest to being citable?</strong></p>"),
        ("02 · Insight", "AI Overviews touched most of the tracked query set",
         "<p>In the February 2026 Semrush snapshot, <strong>561 of 685 tracked queries (81.9%)</strong> triggered AI Overviews. Only <strong>107</strong> of those AI Overview terms also ranked in the top 10.</p><p>Coverage was concentrated in definitional and cost-content pages: indemnity-insurance with 99 AI Overview queries, average-semi-insurance-cost with 79, professional-indemnity-insurance with 43, employment-practices-liability-insurance with 32, and media-liability-insurance with 23.</p>"),
        ("03 · Strategy", "Prioritize by business value and AI citation potential",
         "<p>The operating model joined four layers:</p><ul><li><strong>Intent and question discovery:</strong> map queries, AI Overview exposure, and page ownership.</li><li><strong>Answer-first content:</strong> define the query in the opening paragraph, then answer follow-ups in question-led sections with sources.</li><li><strong>Technical extractability:</strong> schema, internal linking, indexation, and clean page structure.</li><li><strong>AI-assisted production with human QA:</strong> content calendars and briefs grounded in brand intelligence and audience personas.</li></ul>"),
        ("04 · Execution", "Technical, content, and measurement work in one system",
         "<p>Execution included technical audits, JSON-LD schema graphs and validation, FAQ and schema parity checks, internal-link and jump-link audits, a contractor hub with 18 child pages, and GTM/GA4 conversion tracking.</p><p>On the content operations side, I built AI supporting content calendars and briefs using brand-intelligence and persona inputs, with human review of claims and sources before publication.</p>"),
    ],
    metric_cards=[
        ("685", "Tracked queries in the Semrush snapshot", "Semrush · February 2026"),
        ("561", "Queries triggering AI Overviews", "81.9% of the tracked set"),
        ("107", "AI Overview queries also ranking top 10", "Semrush · February 2026"),
        ("99", "AI Overview queries mapped to indemnity-insurance", "Highest-coverage page"),
        ("18", "Contractor child pages in the cluster", "Program implementation"),
        ("3 of 3", "Clients covered by AI Overview mapping", "Dream Assurance, TDE, Omnipress — not the full roster"),
    ],
    proves=[
        "AI Overview exposure is extensive in this insurance query set, so GEO is a planning requirement.",
        "A prioritized page list exists, based on AI Overview coverage and current ranking proximity.",
        "The program combines technical, content, local, and measurement work under one owner.",
        "AI-assisted content production is governed by brand, persona, and source checks.",
    ],
    limits=[
        "This is an operating-system and opportunity-mapping case, not a traffic-growth case.",
        "The February 2026 snapshot is a point-in-time export and is not presented as improvement.",
        "No clean before-and-after AI citation trend is available for Dream Assurance.",
        "The three-client AI Overview mapping is not full coverage of the Rocket Clicks client roster.",
    ],
    next_slug="service-credit-union",
    next_title="Service Credit Union",
)

def work_index():
    cases = [
        ("Credit union · Financial services", "Service Credit Union", "//2026", "Building and measuring an AI-answer visibility program", "180,938 AI feature impressions; page-level citation gains across product and membership pages.", "service-credit-union"),
        ("Family law · Legal services", "TDE Family Law", "//2026", "An answer-first content system for a family law firm", "Filtered impressions +19.5%; prenup guide clicks 4 → 14; GBP calls +51.5%.", "tde-family-law"),
        ("Insurance · Independent agency", "Dream Assurance Group", "//2026", "An in-house SEO and GEO operating system", "685 tracked queries; 561 with AI Overviews; 107 top-10 AI Overview terms.", "dream-assurance"),
    ]
    rows = ""
    for pill, client, year, title, desc, slug in cases:
        rows += f"""
      <a class="work-row" href="/work/{slug}/">
        <div class="work-row__client"><span class="case-pill">{pill}</span><br>{client}</div>
        <div class="work-row__year">{year}</div>
        <div class="work-row__title">{title}</div>
        <div class="work-row__desc">{desc}</div>
        <span class="work-row__arrow" aria-hidden="true">»</span>
      </a>"""

    rocket_wins = [
        ("NeuroEndoMKE", "5 → 10", "Top-3 terms; 13 → 18 top-10. Local visibility +19.7%; #1 for neurosurgeon.", "Semrush Position Tracking · Nov 2023 – Nov 2026", ["Local SEO"]),
        ("Aurit Mediation", "0 → 3", "Top-3 terms; 9 keywords gained. #1 Chandler and Scottsdale divorce mediation.", "Semrush Position Tracking · May 2024 – Nov 2026", ["Local SEO"]),
        ("Kalish", "37", "Top-3 terms and 44 top-10 terms at the latest snapshot; 32.98% visibility.", "Semrush Position Tracking · Apr – Nov 2026", ["Maintained, not growth"]),
        ("Fanash Family Law", "0 → 2", "Top-10 terms; #4 for annulment attorney.", "Semrush Position Tracking · Jul 2025 – Nov 2026", ["Early traction"]),
        ("Michael Ireland Law", "+378.7%", "San Antonio divorce page new users 47 → 225; engaged sessions 24 → 93.", "GA4 landing pages · Dec 15, 2025 – Mar 15, 2026 vs prior", ["All traffic", "Key events flat"]),
        ("Omnipress", "+163.6%", "Publication-printing page clicks 11 → 29; impressions +52.5%.", "GSC and GA4 · Nov 16, 2025 – Feb 15, 2026 YoY", ["Page-level only", "Sitewide declined"]),
        ("LJP Zero-Landfill", "4 → 8", "Contact forms doubled; session key-event rate 0.58% → 1.42%.", "GA4 key-event ledger · Apr 5 – May 5 vs Mar 5 – Apr 4, 2026", ["Small base", "Sessions -17.5%"]),
    ]
    earlier_wins = [
        ("Walking On Sunshine", "+17.59%", "Organic traffic in 2 months; +13.35% new users; +7.18% bounce-rate improvement.", "Landing-page content, metadata, and Google Business Profile optimization", ["SEO + local"]),
        ("RELX APAC", "+105%", "Non-branded organic traffic after service and blog optimization.", "First Page case study", ["Team work"]),
        ("Tuttee", "+273%", "Organic traffic after content strategy implementation.", "First Page case study", ["Team work"]),
        ("ThreeIC", "+21", "First-page keywords and +1.6K monthly organic traffic within six months.", "First Page case study", ["Team work"]),
        ("The Wee Bean", "+89%", "More target keywords on page 1 after resolving on-page issues.", "First Page case study", ["Team work"]),
        ("New Concept Mandarin", "+70%", "More target keywords on page 1 after content strategy.", "First Page case study", ["Team work"]),
        ("Lendela SG", "+71%", "Organic traffic after reducing keyword cannibalization.", "First Page case study", ["Team work"]),
        ("iPrice Group", "+2", "Average positions gained across product landing pages after H1 optimization.", "iPrice Group", ["On-page SEO"]),
    ]
    business = [
        ("Johnson Law Group", "+76.9%", "Hires 13 → 23; leads +27.1%; hired-to-lead rate 7.18% → 10.00%.", "Clio and CallRail · September vs August 2026", ["Conversion quality", "GSC clicks -15.8%"]),
    ]

    def win_cards(items):
        html = ""
        for client, metric, desc, source, tags in items:
            tag_html = "".join(f'<span class="win-card__tag">{tag}</span>' for tag in tags)
            html += f"""<div class="win-card"><div class="win-card__client">{client}</div><div class="win-card__metric">{metric}</div><div class="win-card__desc">{desc}</div><div class="win-card__meta">{source}</div>{tag_html}</div>"""
        return html

    body = f"""
    <section class="work-hero">
      <div class="container">
        <span class="eyebrow">Case studies</span>
        <h1 class="case-title">Client work and SEO wins</h1>
        <p class="case-lede">Three detailed case studies, plus a wider set of source-labeled results. Every entry includes its period and its claim limits.</p>
      </div>
    </section>
    <div class="container">
      <div class="work-list">{rows}</div>
      <h2 class="work-group-label">Rocket Clicks wins</h2>
      <div class="win-grid">{win_cards(rocket_wins)}</div>
      <h2 class="work-group-label">Earlier-role wins</h2>
      <div class="win-grid">{win_cards(earlier_wins)}</div>
      <h2 class="work-group-label">Business impact, labeled separately</h2>
      <div class="win-grid">{win_cards(business)}</div>
    </div>
    <div class="container case-nav"><a href="/">← Home</a><a href="/method/">My method →<span>How the work is done</span></a></div>"""
    return shell("Case studies and SEO wins — Reymart", "Three detailed SEO and GEO case studies plus source-labeled client wins.", body)


(ROOT / "work/index.html").write_text(work_index())
print("Wrote work index")

(ROOT / "work/service-credit-union").mkdir(parents=True, exist_ok=True)
(ROOT / "work/tde-family-law").mkdir(parents=True, exist_ok=True)
(ROOT / "work/dream-assurance").mkdir(parents=True, exist_ok=True)
(ROOT / "work/service-credit-union/index.html").write_text(scu)
(ROOT / "work/tde-family-law/index.html").write_text(tde)
(ROOT / "work/dream-assurance/index.html").write_text(da)
print("Wrote three case-study pages")
