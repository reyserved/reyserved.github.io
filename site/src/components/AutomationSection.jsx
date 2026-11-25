"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WORKFLOWS = [
  {
    id: "audit",
    tab: "Technical audit",
    client: "Service Credit Union",
    meta: "500+ page credit union site",
    kicker: "Technical SEO workflow",
    title: "Turn a massive site crawl into a prioritized fix list",
    goal:
      "A raw Screaming Frog export isn't an action plan. This workflow cleans up the crawl data, separates server access blocks from real tech SEO issues, and groups everything into one prioritized workbook ready for SEO and dev tickets.",
    steps: [
      ["Crawl the sitemap", "Run Screaming Frog in list mode while keeping internal URL discovery on."],
      ["Clean up and verify", "Double-check 403s, untangle 3xx redirect chains, and verify the crawl data."],
      ["Sort by priority", "Split findings into 68 issue sheets, separating access blocks, sitemaps, orphan pages, and metadata."],
      ["Hand off to the team", "Deliver a prioritized workbook and ClickUp tickets, while owners and dev implementation stay with the team."],
    ],
    manual:
      "Still human-led: deciding what gets fixed first, assigning SEO and dev owners, factoring in client context, and reviewing fixes before they go live.",
    log: [
      "sitemap fetched · 2,881 URLs",
      "403 revalidation · 152 active 3xx actions",
      "68 issue sheets built",
      "prioritized workbook ready",
    ],
    output: {
      type: "audit",
      browser: "SCU technical audit · workbook overview",
      image: "/automation/scu-overview.png",
      alt: "Service Credit Union technical SEO audit workbook showing 2,881 URLs, 152 3xx actions, 590 redirect chains, and prioritized findings.",
      caption: "68-sheet workbook · 2,881 URLs crawled",
      meta: ["152 3xx actions after 403 QA", "590 redirect chains reviewed"],
    },
  },
  {
    id: "content",
    tab: "Content preflight",
    client: "Dream Assurance",
    meta: "291-page insurance site · 2025",
    kicker: "Pre-publish workflow",
    title: "Catch layout and SEO bugs before a page ever hits the CMS",
    goal:
      "Most blog templates break in the last mile: a broken related-query block, a missing phone CTA, or a heading that wraps badly on mobile. This workflow pulls the live page, localizes assets, builds layout variants, and checks everything across three screen widths before handoff.",
    steps: [
      ["Pull the live page", "Grab the existing post, images, author details, and related-query data."],
      ["Generate page previews", "Localize the images and render the article alongside its related-content blocks."],
      ["Run preflight QA", "Generate 82 QA artifacts covering heading hierarchy, internal links, CTAs, related queries, and edge cases."],
      ["Package for sign-off", "Export 390px, 1440px, and 3840px previews so I can fact-check claims and review the copy before publishing."],
    ],
    manual:
      "Still human-led: checking sources and claims, dialing in the brand voice, and making the final call to publish.",
    log: [
      "live post fetched · assets localized",
      "related-query block rendered",
      "82 QA artifacts generated",
      "390 / 1440 / 3840 previews ready",
    ],
    output: {
      type: "content",
      browser: "Dream Assurance · generated previews",
      image: "/automation/da-related.png",
      mobileImage: "/automation/da-mobile.png",
      alt: "Generated Dream Assurance blog preview showing related articles at desktop width.",
      mobileAlt: "Generated Dream Assurance mobile preview showing article copy and sticky CTA.",
      caption: "4 page types · 82 QA artifacts · 3 viewports",
      meta: ["390 / 1440 / 3840 previews", "Responsive CTA & related-query checks"],
    },
  },
  {
    id: "schema",
    tab: "Schema gate",
    client: "NeuroEndoMKE",
    meta: "Healthcare · hip-pain page",
    kicker: "Structured data workflow",
    title: "Ship clean, release-safe schema, not copy-pasted snippets",
    goal:
      "Schema is easy to add once, but hard to keep clean across updates. This workflow builds a JSON-LD @graph from the page's actual entities, runs validation and URL checks, and hands the team a release checklist instead of a one-off snippet.",
    steps: [
      ["Map the page entities", "Pull the page topic, medical condition, audience, procedures, and related URLs."],
      ["Build the JSON-LD graph", "Assemble one clean MedicalWebPage @graph with zero duplicate script blocks."],
      ["Validate everything", "Run schema.org, structural, and URL checks with 0 errors before handoff."],
      ["Hand off a release checklist", "The client team reviews the medical facts and approves the release."],
    ],
    manual:
      "Still human-led: verifying medical and business facts, confirming entity accuracy, and approving the release.",
    log: [
      "entities mapped · 1 MedicalWebPage graph",
      "JSON-LD built · 0 duplicate scripts",
      "schema.org validation · 0 errors",
      "release checklist ready",
    ],
    output: {
      type: "schema",
      browser: "NeuroEndoMKE · final JSON-LD",
      caption: "Final JSON-LD graph · validator report · QA evidence",
      meta: ["MedicalWebPage @graph", "Human fact-check before release"],
    },
  },
];

const STATS = [
  ["2,881", "SCU URLs crawled"],
  ["68", "SCU workbook sheets"],
  ["82", "Dream Assurance QA artifacts"],
  ["0", "NeuroEndo schema errors"],
];

function SchemaOutput() {
  return (
    <div className="code-wrap">
      <pre>{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "…#webpage",
      "name": "Hip Pain: Symptoms, Causes & When to See a Doctor",
      "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
      "specialty": ["Neurologic", "Musculoskeletal"],
      "about": { "@type": "MedicalCondition", "name": "Hip pain" },
      "mentions": [ … ]
    },
    { "@type": "MedicalCondition", "name": "Lumbar Radiculopathy" },
    { "@type": "MedicalCondition", "name": "Sacroiliac Joint Pain" }
  ]
}`}</pre>
      <div className="validator">
        <i>✓</i>
        <div>
          <strong>schema.org validation</strong>
          <span>0 errors · structural + URL checks passed</span>
        </div>
      </div>
    </div>
  );
}

export default function AutomationSection() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState([]);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const timers = useRef([]);
  const workflow = WORKFLOWS[active];

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
  }, []);

  const run = useCallback(() => {
    clearTimers();
    setDone([]);
    setLogs([]);
    setRunning(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduce ? 0 : 420;
    workflow.steps.forEach((_, index) => {
      timers.current.push(
        setTimeout(() => {
          setDone((current) => [...current, index]);
        }, speed * (index + 1))
      );
    });
    workflow.log.forEach((line, index) => {
      timers.current.push(
        setTimeout(() => {
          setLogs((current) => [...current, line]);
        }, speed * (index + 1))
      );
    });
    timers.current.push(
      setTimeout(() => setRunning(false), speed * (workflow.steps.length + 1) + 180)
    );
  }, [clearTimers, workflow]);

  useEffect(() => {
    run();
    return clearTimers;
  }, [run, clearTimers]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleTabKey = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + WORKFLOWS.length) % WORKFLOWS.length;
    setActive(next);
    document.getElementById(`automation-tab-${WORKFLOWS[next].id}`)?.focus();
  };

  const output = workflow.output;

  return (
    <section className="automation" id="automation" aria-labelledby="automation-title">
      <div className="container">
        <div className="auto-head">
          <div>
            <span className="eyebrow">Workflows &amp; automation</span>
            <h2 className="auto-title" id="automation-title">
              Automating the <em>repeatable work</em>
            </h2>
            <p className="auto-sub">
              I automate the repetitive parts of SEO and GEO so I can spend more time on strategy: fact-checking
              sources, prioritizing SEO and dev fixes, and reviewing pages before they go live. Here are real outputs
              from the workflows I run for clients.
            </p>
          </div>
          <div className="auto-badge"><i aria-hidden="true" /> Human-checked before anything ships</div>
        </div>

        <div className="auto-tabs-head">
          <span>Three live workflows</span>
          <span>Pick one to see how it runs</span>
        </div>
        <div className="auto-tabs" role="tablist" aria-label="Three live workflows">
          {WORKFLOWS.map((item, index) => (
            <button
              className="auto-tab"
              key={item.id}
              id={`automation-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={active === index}
              aria-controls={`automation-panel-${item.id}`}
              aria-label={`${item.tab}, ${item.client}`}
              data-automation-tab="true"
              data-automation={item.id}
              data-client={item.client}
              data-automation-label={item.tab}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              <span className="auto-tab__label">{item.tab}</span>
              <span className="auto-tab__client">{item.client}</span>
            </button>
          ))}
        </div>

        <div
          className="auto-panel is-active"
          id={`automation-panel-${workflow.id}`}
          role="tabpanel"
          aria-labelledby={`automation-tab-${workflow.id}`}
        >
          <div className="auto-panel__left">
            <div className="auto-kicker">{workflow.kicker}</div>
            <div className="auto-client">
              {workflow.client}
              <span>{workflow.meta}</span>
            </div>
            <h3 className="auto-h3">{workflow.title}</h3>
            <p className="auto-goal"><strong>Why I built it</strong> {workflow.goal}</p>
            <ol className="flow" aria-label={`${workflow.tab} workflow`}>
              {workflow.steps.map(([title, body], index) => (
                <li className={`flow-step${done.includes(index) ? " is-done" : ""}`} key={title}>
                  <span className="flow-step__dot"><span>{index + 1}</span></span>
                  <span className="flow-step__copy">
                    <strong>{title}</strong>
                    <em>{body}</em>
                  </span>
                </li>
              ))}
            </ol>
            <p className="manual">{workflow.manual}</p>
          </div>

          <div className={`output${done.length === workflow.steps.length ? " is-ready" : ""}`}>
            <div className="output-shell">
              <div className="browser-bar"><i /><i /><i /><em>{output.browser}</em></div>
              {output.type === "audit" && (
                <button
                  className="shot shot--audit"
                  type="button"
                  onClick={() => setLightbox({ src: output.image, alt: output.alt })}
                  aria-label="Open full SCU audit screenshot"
                  data-automation-output="workbook"
                  data-automation={workflow.id}
                  data-client={workflow.client}
                >
                  <img src={output.image} alt={output.alt} />
                </button>
              )}
              {output.type === "content" && (
                <div className="device-row">
                  <div className="device">
                    <button
                      className="shot shot--desktop"
                      type="button"
                      onClick={() => setLightbox({ src: output.image, alt: output.alt })}
                      aria-label="Open full desktop content preview"
                      data-automation-output="desktop_preview"
                      data-automation={workflow.id}
                      data-client={workflow.client}
                    >
                      <img src={output.image} alt={output.alt} />
                    </button>
                  </div>
                  <div className="device device--phone">
                    <button
                      className="shot"
                      type="button"
                      onClick={() => setLightbox({ src: output.mobileImage, alt: output.mobileAlt })}
                      aria-label="Open full mobile content preview"
                      data-automation-output="mobile_preview"
                      data-automation={workflow.id}
                      data-client={workflow.client}
                    >
                      <img src={output.mobileImage} alt={output.mobileAlt} />
                    </button>
                  </div>
                </div>
              )}
              {output.type === "schema" && <SchemaOutput />}
              <div className="caption"><span>Actual output</span><b>{output.caption}</b></div>
            </div>
            <div className="output-meta">
              {output.meta.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="run-row">
              <button className="run-btn" type="button" onClick={run} disabled={running} data-automation-run="true" data-automation={workflow.id} data-client={workflow.client}>
                {running ? "Running" : "Run workflow"}
              </button>
              <span className={`run-status${!running && done.length === workflow.steps.length ? " is-live" : ""}`}>
                {running ? "Running" : done.length === workflow.steps.length ? "Done · ready for human review" : "Ready"}
              </span>
            </div>
            <div className="log" aria-live="polite">
              {logs.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
            </div>
          </div>
        </div>

        <div className="auto-stats" aria-label="Automation evidence at a glance">
          {STATS.map(([value, label]) => (
            <div className="auto-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="auto-foot">
          Real outputs from Service Credit Union, Dream Assurance Group, and NeuroEndoMKE. I use AI to speed up
          drafting and triage, while automated checks and human review make the final call.
        </p>
      </div>

      {lightbox && (
        <div
          className="auto-lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded automation output"
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightbox(null);
          }}
        >
          <button className="auto-lightbox__close" type="button" onClick={() => setLightbox(null)}>Close ×</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </section>
  );
}
