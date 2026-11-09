/* Accessible SVG telemetry charts. All animation is reduced-motion aware. */

const NS = "http://www.w3.org/2000/svg";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function svgEl(tag, attrs = {}, text) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeSvg(width, height, label) {
  return svgEl("svg", {
    viewBox: `0 0 ${width} ${height}`,
    class: "chart",
    role: "img",
    "aria-label": label,
  });
}

export function animateNumber(node, target, formatter, duration = 2400) {
  if (prefersReducedMotion()) {
    node.textContent = formatter(target);
    return;
  }
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = formatter(target * eased);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export function onVisible(element, callback) {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    callback();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(element);
}

export function renderRadialGauge(element, { value, max, label, centerLabel }) {
  const svg = makeSvg(220, 220, label);
  const cx = 110;
  const cy = 110;
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const arcFraction = 0.75;

  const track = svgEl("circle", {
    cx, cy, r: radius, fill: "none", class: "chart__track", "stroke-width": 14,
    "stroke-dasharray": `${circumference * arcFraction} ${circumference}`,
    transform: `rotate(135 ${cx} ${cy})`,
  });
  const arc = svgEl("circle", {
    cx, cy, r: radius, fill: "none", class: "chart__arc", "stroke-width": 14,
    "stroke-dasharray": `${circumference * arcFraction} ${circumference}`,
    "stroke-dashoffset": circumference * arcFraction,
    transform: `rotate(135 ${cx} ${cy})`,
  });
  svg.append(track, arc);

  for (let i = 0; i <= 40; i += 1) {
    const angle = (135 + (i / 40) * 270) * (Math.PI / 180);
    svg.appendChild(svgEl("line", {
      x1: cx + (radius - 24) * Math.cos(angle),
      y1: cy + (radius - 24) * Math.sin(angle),
      x2: cx + (radius - 18) * Math.cos(angle),
      y2: cy + (radius - 18) * Math.sin(angle),
      stroke: "rgba(255,255,255,0.18)", "stroke-width": 1,
    }));
  }

  const valueText = svgEl("text", {
    x: cx, y: cy + 6, "text-anchor": "middle", class: "chart__value",
    style: "font-size:44px;font-family:var(--font-sans);letter-spacing:-0.04em",
  }, "0");
  const caption = svgEl("text", { x: cx, y: cy + 28, "text-anchor": "middle" }, centerLabel);
  svg.append(valueText, caption);
  element.appendChild(svg);

  onVisible(element, () => {
    arc.style.transition = "stroke-dashoffset 2400ms cubic-bezier(0.16,1,0.3,1)";
    requestAnimationFrame(() => { arc.style.strokeDashoffset = circumference * arcFraction * (1 - value / max); });
    animateNumber(valueText, value, (v) => Math.round(v).toString());
  });
}

export function renderStemChart(element, { items, label }) {
  const width = 340;
  const height = 210;
  const baseline = 160;
  const maxValue = Math.max(...items.map((item) => Math.max(item.previous, item.current))) * 1.15;
  const svg = makeSvg(width, height, label);
  const step = width / items.length;

  svg.appendChild(svgEl("line", { x1: 0, y1: baseline, x2: width, y2: baseline, class: "chart__grid" }));

  items.forEach((item, index) => {
    const x = step * index + step / 2;
    const currentHeight = (item.current / maxValue) * 130;
    const previousY = baseline - (item.previous / maxValue) * 130;

    svg.appendChild(svgEl("line", { x1: x, y1: baseline, x2: x, y2: baseline - currentHeight, class: "chart__stem" }));
    svg.appendChild(svgEl("line", { x1: x - 6, y1: previousY, x2: x + 6, y2: previousY, stroke: "rgba(255,255,255,0.35)", "stroke-width": 1 }));
    svg.appendChild(svgEl("circle", {
      cx: x, cy: baseline - currentHeight, r: 3.5,
      class: item.current >= item.previous ? "chart__dot" : "chart__dot--accent",
    }));

    const delta = item.current - item.previous;
    svg.appendChild(svgEl("text", {
      x, y: baseline - currentHeight - 12, "text-anchor": "middle",
      class: delta >= 0 ? "chart__delta--pos" : "chart__delta--neg",
    }, `${delta >= 0 ? "+" : ""}${delta}`));
    svg.appendChild(svgEl("text", { x, y: baseline + 16, "text-anchor": "middle", class: "chart__value" }, String(item.current)));
    svg.appendChild(svgEl("text", { x, y: baseline + 34, "text-anchor": "middle" }, item.short));
  });

  element.appendChild(svg);
}

export function renderSemiGauge(element, { value, max, label, centerLabel }) {
  const svg = makeSvg(240, 150, label);
  const cx = 120;
  const cy = 130;
  const radius = 96;
  const arcLength = Math.PI * radius;

  const track = svgEl("path", {
    d: `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
    fill: "none", class: "chart__track", "stroke-width": 14,
  });
  const arc = svgEl("path", {
    d: `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
    fill: "none", class: "chart__arc chart__arc--accent", "stroke-width": 14,
    "stroke-dasharray": arcLength, "stroke-dashoffset": arcLength,
  });
  svg.append(track, arc);

  for (let i = 0; i <= 30; i += 1) {
    const angle = Math.PI - (i / 30) * Math.PI;
    svg.appendChild(svgEl("line", {
      x1: cx + (radius - 24) * Math.cos(angle),
      y1: cy - (radius - 24) * Math.sin(angle),
      x2: cx + (radius - 18) * Math.cos(angle),
      y2: cy - (radius - 18) * Math.sin(angle),
      stroke: "rgba(255,255,255,0.18)", "stroke-width": 1,
    }));
  }

  const valueText = svgEl("text", {
    x: cx, y: cy - 22, "text-anchor": "middle", class: "chart__value",
    style: "font-size:42px;font-family:var(--font-sans);letter-spacing:-0.04em",
  }, "0");
  const caption = svgEl("text", { x: cx, y: cy - 2, "text-anchor": "middle" }, centerLabel);
  svg.append(valueText, caption);
  element.appendChild(svg);

  onVisible(element, () => {
    arc.style.transition = "stroke-dashoffset 2400ms cubic-bezier(0.16,1,0.3,1)";
    requestAnimationFrame(() => { arc.style.strokeDashoffset = arcLength * (1 - value / max); });
    animateNumber(valueText, value, (v) => Math.round(v).toString());
  });
}

export function renderLineChart(element, { series, label }) {
  const width = 660;
  const height = 240;
  const padding = { top: 24, right: 16, bottom: 30, left: 16 };
  const svg = makeSvg(width, height, label);
  const maxValue = Math.max(...series.map((point) => point.top10)) + 1;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const x = (index) => padding.left + (index / (series.length - 1)) * innerWidth;
  const y = (value) => padding.top + innerHeight - (value / maxValue) * innerHeight;

  for (let i = 0; i <= 4; i += 1) {
    const gy = padding.top + (i / 4) * innerHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, y1: gy, x2: width - padding.right, y2: gy, class: "chart__grid" }));
  }

  const defs = svgEl("defs");
  const gradient = svgEl("linearGradient", { id: "chartAreaGradient", x1: "0", y1: "0", x2: "0", y2: "1" });
  gradient.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#e5a93c", "stop-opacity": 0.35 }));
  gradient.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#e5a93c", "stop-opacity": 0 }));
  defs.appendChild(gradient);
  svg.appendChild(defs);

  const top10Path = series.map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point.top10)}`).join(" ");
  svg.appendChild(svgEl("path", { d: top10Path, class: "chart__line chart__line--muted" }));

  const linePath = series.map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point.top3)}`).join(" ");
  const areaPath = `${linePath} L ${x(series.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  svg.appendChild(svgEl("path", { d: areaPath, class: "chart__area" }));

  const line = svgEl("path", { d: linePath, class: "chart__line" });
  svg.appendChild(line);

  const last = series[series.length - 1];
  svg.appendChild(svgEl("circle", { cx: x(series.length - 1), cy: y(last.top3), r: 4, fill: "#e5a93c" }));
  svg.appendChild(svgEl("text", { x: x(series.length - 1) - 4, y: y(last.top3) - 12, "text-anchor": "end", class: "chart__value" }, `${last.top3} in top 3`));
  svg.appendChild(svgEl("text", { x: padding.left, y: height - 8 }, series[0].date.slice(0, 7)));
  svg.appendChild(svgEl("text", { x: width - padding.right, y: height - 8, "text-anchor": "end" }, last.date.slice(0, 7)));

  element.appendChild(svg);

  onVisible(element, () => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.transition = "stroke-dashoffset 2600ms cubic-bezier(0.16,1,0.3,1)";
    requestAnimationFrame(() => { line.style.strokeDashoffset = 0; });
  });
}
