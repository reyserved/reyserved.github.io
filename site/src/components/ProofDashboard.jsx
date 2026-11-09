"use client";

import { useEffect, useRef } from "react";
import { DASHBOARD_DATA } from "../data/dashboard";
import { renderStemChart, renderSemiGauge, renderLineChart } from "../lib/charts";

export default function ProofDashboard() {
  const citationChart = useRef(null);
  const localGauge = useRef(null);
  const auritChart = useRef(null);

  useEffect(() => {
    const data = DASHBOARD_DATA;
    if (citationChart.current) {
      renderStemChart(citationChart.current, {
        label: "Cited prompts by Service Credit Union page",
        items: [
          { short: "Vehicle", previous: 65, current: 49 },
          { short: "Member", previous: 40, current: 63 },
          { short: "APR", previous: 54, current: 62 },
          { short: "Auto", previous: 8, current: 26 },
          { short: "CU 101", previous: 8, current: 22 },
          { short: "Military", previous: 8, current: 15 },
        ],
      });
    }
    if (localGauge.current) {
      renderSemiGauge(localGauge.current, {
        value: data.neuroendo.top3Current,
        max: data.neuroendo.trackedKeywords,
        label: "NeuroEndoMKE top-3 keywords 10 of 24 tracked",
        centerLabel: "Top-3 / 24 terms",
      });
    }
    if (auritChart.current) {
      renderLineChart(auritChart.current, {
        label: "NeuroEndoMKE weekly top-3 keyword count over three years",
        series: data.neuroendo.series,
      });
    }
  }, []);

  return (
    <section className="proof" id="proof" aria-labelledby="proof-title">
      <div className="container container--full">
        <div className="proof__header reveal">
          <div>
            <span className="eyebrow">Evidence</span>
            <h2 className="proof__title" id="proof-title">Proof, not promises.</h2>
            <p className="proof__subtitle">Selected results from client SEO and AI-visibility programs. Every figure has a source, a period, and a stated claim limit.</p>
          </div>
          <a className="proof__link" href="/work/">All case studies →</a>
        </div>

        <div className="proof__ribbon reveal-group" aria-label="Portfolio evidence scope">
          <div className="ribbon-item">
            <div className="ribbon-value" data-count="654">654</div>
            <div className="ribbon-label">AI Overview-exposed queries mapped · 3 clients only</div>
          </div>
          <div className="ribbon-item">
            <div className="ribbon-value" data-count="3">3</div>
            <div className="ribbon-label">Deep case studies · sources and claim limits</div>
          </div>
          <div className="ribbon-item">
            <div className="ribbon-value" data-count="6" data-suffix="+">6+</div>
            <div className="ribbon-label">Years in SEO · agency and in-house</div>
          </div>
        </div>

        <div className="bento">
          <article className="card reveal" aria-labelledby="card-ai">
            <div className="card__head">
              <div>
                <h3 className="card__title" id="card-ai"><span className="card__icon" aria-hidden="true">◔</span>AI feature visibility</h3>
                <p className="card__subtitle">Service Credit Union · GSC, August 2026</p>
              </div>
              <span className="card__top-metric">180,938</span>
            </div>
            <div className="metric-big"><span data-count="180938">180,938</span></div>
            <p className="metric-caption">Generative AI feature impressions</p>
            <div className="submetrics">
              <div><div className="submetric-value">363 → 382</div><div className="submetric-label">Cited pages</div></div>
              <div><div className="submetric-value">888 → 892</div><div className="submetric-label">Citations</div></div>
              <div><div className="submetric-value">39/100</div><div className="submetric-label">AI Overview score</div></div>
            </div>
          </article>

          <article className="card reveal" aria-labelledby="card-citations">
            <div className="card__head">
              <div>
                <h3 className="card__title" id="card-citations"><span className="card__icon" aria-hidden="true">≣</span>Cited prompts by page</h3>
                <p className="card__subtitle">Semrush · Aug 8 – Sep 7 vs Jul 12 – Aug 11, 2026</p>
              </div>
              <span className="card__top-metric">888 → 892 total</span>
            </div>
            <div ref={citationChart}></div>
            <p className="chart-summary">Become a member <strong>40 → 63</strong> · Auto loans <strong>8 → 26</strong> · Vehicle hub <strong>65 → 49</strong></p>
          </article>

          <article className="card reveal" aria-labelledby="card-local">
            <div className="card__head">
              <div>
                <h3 className="card__title" id="card-local"><span className="card__icon" aria-hidden="true">◠</span>Local rankings</h3>
                <p className="card__subtitle">NeuroEndoMKE · Semrush Position Tracking</p>
              </div>
              <span className="card__top-metric">+19.7%</span>
            </div>
            <div ref={localGauge}></div>
            <div className="submetrics">
              <div><div className="submetric-value">5 → 10</div><div className="submetric-label">Top-3 terms (24 tracked)</div></div>
              <div><div className="submetric-value">13 → 18</div><div className="submetric-label">Top-10 terms</div></div>
              <div><div className="submetric-value">#1</div><div className="submetric-label">For “neurosurgeon” · Racine, WI</div></div>
            </div>
          </article>

          <article className="card card--wide reveal" aria-labelledby="card-aurit">
            <div>
              <div className="card__head">
                <div>
                  <h3 className="card__title" id="card-aurit"><span className="card__icon" aria-hidden="true">⌁</span>Top-3 growth</h3>
                  <p className="card__subtitle">NeuroEndoMKE · Semrush Position Tracking, Nov 2023 – Nov 2026</p>
                </div>
                <span className="card__top-metric">5 → 10</span>
              </div>
              <div className="metric-big"><span data-count="10">10</span></div>
              <p className="metric-caption">Top-3 terms, up from 5 in Nov 2023</p>
              <div className="submetrics">
                <div><div className="submetric-value">12</div><div className="submetric-label">Keywords improved</div></div>
                <div><div className="submetric-value">#1</div><div className="submetric-label">For “neurosurgeon” · Racine, WI</div></div>
              </div>
            </div>
            <div ref={auritChart}></div>
            <p className="chart-summary">Weekly top-3 keyword count over three years: <strong>5 → 10</strong>. Amber line shows the trend, muted line shows top-10 count.</p>
          </article>
        </div>

        <p className="proof__footnote">The ribbon aggregates the portfolio's evidence base, not client outcomes. AI Overview mapping was completed for Dream Assurance, TDE, and Omnipress only, not for every Rocket Clicks client. Client results appear in the cards below with their own sources and periods: Semrush AI Visibility, Semrush Position Tracking, Google Search Console Generative AI Features, GA4, Clio/CallRail. JLG hires reflect conversion quality, not organic growth.</p>
      </div>
    </section>
  );
}
