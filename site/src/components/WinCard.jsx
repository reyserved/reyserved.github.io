"use client";

import { useState } from "react";
import { DASHBOARD_DATA } from "../data/dashboard";

function MiniLineChart({ series }) {
  const width = 520;
  const height = 170;
  const pad = 14;
  const max = Math.max(...series.map((p) => p.top3)) + 1;
  const x = (i) => pad + (i / (series.length - 1)) * (width - pad * 2);
  const y = (v) => pad + (1 - v / max) * (height - pad * 2);
  const path = series.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.top3)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart" role="img" aria-label="Top-3 keyword trend">
      <path d={`${path} L ${x(series.length - 1)} ${height - pad} L ${x(0)} ${height - pad} Z`} fill="rgba(229,169,60,0.18)" />
      <path d={path} fill="none" stroke="#e5a93c" strokeWidth="2" />
      <circle cx={x(series.length - 1)} cy={y(series[series.length - 1].top3)} r="4" fill="#e5a93c" />
      <text x={x(series.length - 1) - 6} y={y(series[series.length - 1].top3) - 10} textAnchor="end" fill="#fff" fontSize="12">{series[series.length - 1].top3} in top 3</text>
    </svg>
  );
}

function MiniBars({ items }) {
  const width = 520;
  const rowHeight = 42;
  const height = items.length * rowHeight + 12;
  const labelWidth = 220;
  const maxValue = Math.max(...items.map((item) => Math.max(item.previous, item.current))) * 1.1;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart" role="img" aria-label="Before and after comparison">
      {items.map((item, index) => {
        const y = index * rowHeight + 10;
        const prevWidth = (item.previous / maxValue) * (width - labelWidth - 60);
        const currWidth = (item.current / maxValue) * (width - labelWidth - 60);
        return (
          <g key={item.label}>
            <text x="0" y={y + 14} fill="#c6bfae" fontSize="11" fontFamily="var(--font-mono)">{item.label}</text>
            <rect x={labelWidth} y={y} width={prevWidth} height="12" fill="rgba(255,255,255,0.18)" />
            <rect x={labelWidth} y={y + 16} width={currWidth} height="12" fill="#e5a93c" />
            <text x={labelWidth + currWidth + 8} y={y + 26} fill="#fff" fontSize="11">{item.current}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function WinCard({ item }) {
  const [open, setOpen] = useState(false);
  const visual = item.visual;

  return (
    <button
      type="button"
      className={`win-card win-card--interactive${open ? " is-open" : ""}`}
      onClick={() => setOpen((value) => !value)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-expanded={open}
    >
      <div className="win-card__client">{item.client}</div>
      <div className="win-card__metric">{item.metric}</div>
      <div className="win-card__desc">{item.desc}</div>
      <div className="win-card__meta">{item.source}</div>
      {item.tags.map((tag) => (
        <span className="win-card__tag" key={tag}>{tag}</span>
      ))}

      {visual && (
        <span className="win-card__visual" aria-hidden={!open}>
          {visual.type === "line" && <MiniLineChart series={DASHBOARD_DATA.neuroendo.series} />}
          {visual.type === "bars" && <MiniBars items={visual.items} />}
          {visual.type === "image" && <img src={visual.src} alt={`${item.client} case study`} />}
        </span>
      )}
    </button>
  );
}
