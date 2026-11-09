# Reymart SEO & GEO Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish a noindexed GitHub Pages portfolio with three evidence-led SEO/AEO/GEO case studies, then update Reymart's resume to match.

**Architecture:** Static multi-page site, no build step, shared CSS/JS, derived JSON chart data, Python stdlib validation tests. Cohesion supplies the personal shell; Armory supplies the evidence modules. Every metric is traceable to the approved design doc.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, SVG charts, Python 3 stdlib for data and tests, python-docx for the resume, GitHub Pages.

**Project root:** `/Users/reymartjansarigumba/Dream Assurance/content-update/DIGITAL MARKETING/output/reymart-seo-portfolio-2026-11`

**Design doc:** `design/plans/2026-11-09-reymart-seo-portfolio-design.md`

---

## Global rules for every task

- Use `Reymart` in nav, hero wordmark, footer watermark, and page furniture. Use `Reymart Sarigumba` only in the cover introduction.
- Every page includes `<meta name="robots" content="noindex, nofollow, noarchive">`.
- No assets from `framerusercontent.com`, no copied Cohesion or Armory text, no client logos, no invented testimonials.
- Every chart has a nearby text equivalent and a source/period label.
- Every metric must match the design doc. If a number is not in the evidence pack, it does not ship.
- Commit after each green task.

---

### Task 1: Scaffold and test harness

**Files:**
- Create: `assets/css/tokens.css`, `assets/css/base.css`, `assets/js/main.js`
- Create: `tests/test_site.py`
- Create: `robots.txt`, `.nojekyll`, `README.md`

**Step 1: Write the failing test**

```python
# tests/test_site.py
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class ScaffoldTests(unittest.TestCase):
    def test_required_runtime_files_exist(self):
        for rel in ["assets/css/tokens.css", "assets/css/base.css", "assets/js/main.js", "robots.txt", ".nojekyll"]:
            self.assertTrue((ROOT / rel).exists(), rel)

    def test_robots_allows_crawling_for_noindex(self):
        text = (ROOT / "robots.txt").read_text()
        self.assertIn("User-agent: *", text)
        self.assertNotIn("Disallow: /", text)

if __name__ == "__main__":
    unittest.main()
```

**Step 2: Run test to verify it fails**

Run: `python3 tests/test_site.py`
Expected: FAIL with missing runtime files.

**Step 3: Create the scaffold**

`robots.txt`:

```text
User-agent: *
Allow: /
```

`.nojekyll` is empty. `tokens.css` contains the color, type, spacing, and radius custom properties from the design doc. `base.css` contains reset, container, typography, focus-visible, and `@media (prefers-reduced-motion: reduce)` rules. `main.js` is initially empty with a `"use strict";` header.

**Step 4: Run test to verify it passes**

Run: `python3 tests/test_site.py`
Expected: `OK`.

**Step 5: Commit**

```bash
git add assets tests robots.txt .nojekyll README.md
git commit -m "Scaffold static portfolio and validation harness"
```

---

### Task 2: Evidence data pack

**Files:**
- Create: `tools/build_data.py`
- Create: `assets/data/metrics.json`
- Test: `tests/test_data.py`

**Step 1: Write the failing test**

```python
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class DataTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((ROOT / "assets/data/metrics.json").read_text())

    def test_scu_ai_impressions(self):
        self.assertEqual(self.data["scu"]["aiFeatureImpressions"], 180938)

    def test_tde_filtered_impression_change(self):
        self.assertEqual(self.data["tde"]["filteredQueryImpressions"]["current"], 23637)
        self.assertEqual(self.data["tde"]["filteredQueryImpressions"]["previous"], 19783)

    def test_da_ai_overview_coverage(self):
        da = self.data["dreamAssurance"]
        self.assertEqual(da["trackedQueries"], 685)
        self.assertEqual(da["aiOverviewQueries"], 561)

    def test_neuroendo_top3(self):
        self.assertEqual(self.data["neuroendo"]["top3"]["previous"], 5)
        self.assertEqual(self.data["neuroendo"]["top3"]["current"], 10)

    def test_every_metric_has_source_and_period(self):
        for case in self.data.values():
            for metric in case.get("metrics", []):
                self.assertTrue(metric.get("source"))
                self.assertTrue(metric.get("period"))

if __name__ == "__main__":
    unittest.main()
```

**Step 2: Run test to verify it fails**

Run: `python3 tests/test_data.py`
Expected: FAIL because `assets/data/metrics.json` does not exist.

**Step 3: Implement the parser**

`tools/build_data.py` must parse Semrush XLSX files from raw XML, not openpyxl dimensions:

```python
import re
import zipfile
import xml.etree.ElementTree as ET

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"

def col_to_idx(ref):
    letters = re.match(r"([A-Z]+)", ref).group(1)
    value = 0
    for char in letters:
        value = value * 26 + (ord(char) - 64)
    return value - 1

def read_semrush_xlsx(path):
    with zipfile.ZipFile(path) as archive:
        shared = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in root.findall(NS + "si"):
                shared.append("".join(node.text or "" for node in item.iter(NS + "t")))
        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
        rows = []
        for row in sheet.iter(NS + "row"):
            cells = {}
            for cell in row.findall(NS + "c"):
                value_node = cell.find(NS + "v")
                if value_node is None:
                    continue
                value = value_node.text
                if cell.get("t") == "s":
                    value = shared[int(value)]
                cells[col_to_idx(cell.get("r"))] = value
            if cells:
                rows.append([cells.get(i, "") for i in range(max(cells) + 1)])
        return rows
```

The script writes only derived, publishable values into `assets/data/metrics.json`. Raw client exports stay outside the repository. Include the three deep cases plus every SEO-win card in the design doc: NeuroEndoMKE, Aurit, Kalish, Fanash, Michael Ireland, Omnipress, LJP, Johnson Law Group business impact, and the First Page/iPrice entries.

**Step 4: Run tests**

Run: `python3 tools/build_data.py && python3 tests/test_data.py`
Expected: `OK`.

**Step 5: Commit**

```bash
git add tools/build_data.py assets/data/metrics.json tests/test_data.py
git commit -m "Add validated evidence data pack"
```

---

### Task 3: Shared page shell, navigation, and footer

**Files:**
- Create: `index.html`
- Create: `assets/css/components.css`
- Modify: `assets/js/main.js`
- Test: `tests/test_site.py`

**Step 1: Add failing tests**

```python
def test_home_has_noindex_and_answer_first_intro(self):
    html = (ROOT / "index.html").read_text()
    self.assertIn('name="robots" content="noindex, nofollow, noarchive"', html)
    self.assertIn("Reymart Sarigumba", html)
    self.assertIn('class="answer-first"', html)

def test_surname_is_not_used_as_brand_wordmark(self):
    html = (ROOT / "index.html").read_text()
    self.assertNotIn("SARIGUMBA", html)
    self.assertIn("Reymart", html)
```

**Step 2: Run tests**

Run: `python3 tests/test_site.py`
Expected: FAIL on missing home content.

**Step 3: Implement the shell**

Build the semantic header, floating pill nav, main landmark, footer with low-contrast `Reymart` watermark, and shared JSON-LD `Person` schema. Add the dual-layer roll-link markup:

```html
<a class="roll-link" href="/work/">
  <span class="roll-link__track">
    <span>Case studies</span>
    <span aria-hidden="true">Case studies</span>
  </span>
</a>
```

The cover introduction is the only place containing `Reymart Sarigumba`. Add one paragraph with `class="answer-first"` that directly states who Reymart is and what the portfolio proves.

**Step 4: Run tests**

Run: `python3 tests/test_site.py`
Expected: `OK`.

**Step 5: Commit**

```bash
git add index.html assets/css/components.css assets/js/main.js tests/test_site.py
git commit -m "Add shared page shell and navigation"
```

---

### Task 4: Motion primitives with reduced-motion fallbacks

**Files:**
- Modify: `assets/js/main.js`
- Modify: `assets/css/components.css`
- Test: `tests/test_motion.py`

**Step 1: Write the failing test**

```python
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class MotionTests(unittest.TestCase):
    def test_reduced_motion_is_respected(self):
        css = (ROOT / "assets/css/components.css").read_text()
        js = (ROOT / "assets/js/main.js").read_text()
        self.assertIn("prefers-reduced-motion", css)
        self.assertIn("prefers-reduced-motion", js)

    def test_no_animation_library_dependency(self):
        html = (ROOT / "index.html").read_text()
        self.assertNotIn("framerusercontent.com", html)
        self.assertNotIn("gsap", html.lower())

if __name__ == "__main__":
    unittest.main()
```

**Step 2: Run test to verify it fails**

Run: `python3 tests/test_motion.py`
Expected: FAIL.

**Step 3: Implement**

Use one `matchMedia("(prefers-reduced-motion: reduce)")` gate for all motion. Implement IntersectionObserver reveals, 1200ms counters, roll-link hover CSS, optional fine-pointer cursor, and subtle clay-shape float. Counters render final values immediately when reduced motion is requested.

**Step 4: Run test**

Run: `python3 tests/test_motion.py`
Expected: `OK`.

**Step 5: Commit**

```bash
git add assets/js/main.js assets/css/components.css tests/test_motion.py
git commit -m "Add accessible motion primitives"
```

---

### Task 5: Home hero and About bento

**Files:**
- Modify: `index.html`
- Create: `assets/css/home.css`
- Create: `assets/img/clay.svg`

**Step 1: Add a failing content test**

Assert the home page contains the hero wordmark `Reymart`, the specialty ticker items `AEO`, `GEO`, `Technical SEO`, `Local SEO`, and the About cards including `Read My CV`.

**Step 2: Run test**

Run: `python3 tests/test_site.py`
Expected: FAIL.

**Step 3: Implement**

Build the Cohesion-inspired hero with original SVG clay shapes, monogram profile card, ticker, proof pill, and CTA. Use only the approved palette. Build the three-card About bento. Do not use a headshot until one is supplied.

**Step 4: Run test**

Run: `python3 tests/test_site.py`
Expected: `OK`.

**Step 5: Visual check**

Run: `python3 -m http.server 8000`
Open `http://localhost:8000` in the browser tool and capture desktop and mobile screenshots. Confirm no horizontal overflow and readable type at 390px.

**Step 6: Commit**

```bash
git add index.html assets/css/home.css assets/img/clay.svg tests/test_site.py
git commit -m "Build home hero and about bento"
```

---

### Task 6: Armory telemetry chart components

**Files:**
- Create: `assets/js/charts.js`
- Create: `assets/css/charts.css`
- Create: `work/chart-test.html`
- Test: `tests/test_charts.py`

**Step 1: Write the failing test**

```python
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class ChartTests(unittest.TestCase):
    def test_chart_module_and_styles_exist(self):
        self.assertTrue((ROOT / "assets/js/charts.js").exists())
        self.assertTrue((ROOT / "assets/css/charts.css").exists())

    def test_charts_have_accessible_fallbacks(self):
        js = (ROOT / "assets/js/charts.js").read_text()
        self.assertIn("aria-label", js)
        self.assertIn("prefers-reduced-motion", js)

    def test_no_canvas_only_data(self):
        html = (ROOT / "work/chart-test.html").read_text()
        self.assertIn("chart-summary", html)

if __name__ == "__main__":
    unittest.main()
```

**Step 2: Run test**

Run: `python3 tests/test_charts.py`
Expected: FAIL.

**Step 3: Implement**

Create four SVG renderers with text summaries:

- `renderRadialGauge(el, { value, max, label, source })`
- `renderStemChart(el, { values, target, labels, source })`
- `renderSemiGauge(el, { value, max, label, source })`
- `renderLineChart(el, { points, labels, source })`

All use SVG, not canvas-only output. All read `assets/data/metrics.json`. All disable animation under reduced motion.

**Step 4: Run test**

Run: `python3 tests/test_charts.py`
Expected: `OK`.

**Step 5: Visual check**

Open `/work/chart-test.html` at desktop and mobile widths. Verify gauges and line charts are legible and have visible source labels.

**Step 6: Commit**

```bash
git add assets/js/charts.js assets/css/charts.css work/chart-test.html tests/test_charts.py
git commit -m "Add accessible SVG telemetry charts"
```

---

### Task 7: Home proof dashboard with real metrics

**Files:**
- Modify: `index.html`
- Modify: `assets/css/home.css`
- Test: `tests/test_home_data.py`

**Step 1: Write the failing test**

Assert `index.html` contains the dark proof dashboard, `180,938`, `AI feature impressions`, and a visible note that overall AI Visibility is below target.

**Step 2: Run test**

Run: `python3 tests/test_home_data.py`
Expected: FAIL.

**Step 3: Implement**

Build a four-widget dark bento:

- Radial gauge: AI Overview 39/100, with the 17/100 overall AI Visibility caveat.
- Stem chart: SCU cited prompts by page for the two windows.
- Semi gauge: NeuroEndoMKE top-3 movement 5 to 10.
- Wide line chart: a real Semrush weekly series from the data pack, labeled with client and window.

**Step 4: Run test**

Run: `python3 tests/test_home_data.py`
Expected: `OK`.

**Step 5: Visual check**

Capture the dashboard at desktop and mobile. Confirm the caveat is visible without hovering.

**Step 6: Commit**

```bash
git add index.html assets/css/home.css tests/test_home_data.py
git commit -m "Add real-metric home proof dashboard"
```

---

### Task 8: Case index, tool flip cards, capability stack

**Files:**
- Create: `work/index.html`
- Modify: `index.html`
- Modify: `assets/css/components.css`
- Modify: `assets/js/main.js`

**Step 1: Write failing tests**

Assert all three case links exist, the tool grid has 12 cards, the capability list has 12 items, and flip cards support `Enter` and `Space`.

**Step 2: Run tests**

Run: `python3 tests/test_site.py`
Expected: FAIL.

**Step 3: Implement**

Build the Armory-style hairline case list with typographic client marks, `//2026` indexes, titles, monospace descriptions, and arrow links. Build the 12 tool flip cards and the 12 sticky capability cards. On `/work/`, add the grouped SEO wins sections from the design doc: Rocket Clicks wins, earlier-role wins, and Johnson Law Group business impact labeled separately. Each win card includes its source, period, and caveat tag.

**Step 4: Run tests**

Run: `python3 tests/test_site.py`
Expected: `OK`.

**Step 5: Visual and keyboard check**

Tab through all flip cards and activate them with keyboard. Check sticky-stack behavior at desktop and that it becomes a normal list on mobile.

**Step 6: Commit**

```bash
git add work/index.html index.html assets/css/components.css assets/js/main.js tests/test_site.py
git commit -m "Add case index, tool stack, and capability stack"
```

---

### Task 9: Service Credit Union case study

**Files:**
- Create: `work/service-credit-union/index.html`
- Create: `assets/css/case-study.css`
- Test: `tests/test_scu.py`

**Step 1: Write the failing test**

Assert the page contains objective, strategy, execution, role, results, claim limits, `180,938`, `8 → 26`, `40 → 63`, `17/100`, and the source labels `Semrush` and `GSC`.

**Step 2: Run test**

Run: `python3 tests/test_scu.py`
Expected: FAIL.

**Step 3: Implement**

Follow the case template in the design doc. Include the Query → Answer → Citation diagram, citation stem charts, AI Overview gauge, preapproval CTR metric, and a claim ledger. State that Reymart led strategy and page audits. Do not publish GSC page-level AI impression shares.

**Step 4: Run test**

Run: `python3 tests/test_scu.py`
Expected: `OK`.

**Step 5: Content QA**

Read the page against the SCU audit. Every number must match; no claim of leads or revenue from AI visibility.

**Step 6: Commit**

```bash
git add work/service-credit-union/index.html assets/css/case-study.css tests/test_scu.py
git commit -m "Build Service Credit Union GEO case study"
```

---

### Task 10: TDE and Dream Assurance case studies

**Files:**
- Create: `work/tde-family-law/index.html`
- Create: `work/dream-assurance/index.html`
- Test: `tests/test_cases.py`

**Step 1: Write failing tests**

TDE must include `+19.5%`, `4 → 14`, `+51.5%`, and the qualified-call caveat. Dream Assurance must include `685`, `561`, `81.9%`, `107`, and a statement that it is an operating-system case rather than a traffic-growth case.

**Step 2: Run tests**

Run: `python3 tests/test_cases.py`
Expected: FAIL.

**Step 3: Implement**

Build both pages with the same template. TDE emphasizes the AEO content map, answer-first structure, local demand, and snippet gains. Dream Assurance emphasizes end-to-end ownership, AI Overview opportunity mapping, technical extractability, content clusters, and AI-assisted content operations.

**Step 4: Run tests**

Run: `python3 tests/test_cases.py`
Expected: `OK`.

**Step 5: Content QA**

Verify every figure against the evidence workbook and the Dream Assurance keyword snapshot.

**Step 6: Commit**

```bash
git add work/tde-family-law/index.html work/dream-assurance/index.html tests/test_cases.py
git commit -m "Build TDE and Dream Assurance case studies"
```

---

### Task 11: Method and About pages

**Files:**
- Create: `method/index.html`
- Create: `about/index.html`
- Create: `assets/js/method.js`

**Step 1: Write failing tests**

Assert the Method page has six nodes, four tabs, and an FAQ with AEO/GEO/SGE definitions. Assert the About page links to the resume PDF and uses email and LinkedIn without a phone number.

**Step 2: Run tests**

Run: `python3 tests/test_site.py`
Expected: FAIL.

**Step 3: Implement**

Build the animated node canvas with SVG bezier connectors and reduced-motion fallback. Build tabbed phase panels and the FAQ accordion with keyboard support. Build the About page with bio, experience, tools, resume download, and contact links.

**Step 4: Run tests**

Run: `python3 tests/test_site.py`
Expected: `OK`.

**Step 5: Accessibility check**

Verify accordion buttons use `aria-expanded`, tabs use `aria-selected`, and all are keyboard operable.

**Step 6: Commit**

```bash
git add method/index.html about/index.html assets/js/method.js tests/test_site.py
git commit -m "Build method and about pages"
```

---

### Task 12: Site-wide QA and print/PDF output

**Files:**
- Create: `tests/test_release.py`
- Create: `assets/css/print.css`
- Modify: all HTML pages to include the print stylesheet

**Step 1: Write release tests**

```python
def test_every_page_has_noindex(self):
    for page in ROOT.rglob("*.html"):
        self.assertIn("noindex, nofollow, noarchive", page.read_text(), str(page))

def test_no_reference_site_assets(self):
    for page in ROOT.rglob("*.html"):
        self.assertNotIn("framerusercontent.com", page.read_text(), str(page))

def test_internal_links_resolve(self):
    # Parse href/src attributes and assert local targets exist.
    ...

def test_no_placeholder_text(self):
    for page in ROOT.rglob("*.html"):
        text = page.read_text()
        for marker in ["Lorem ipsum", "TODO", "Larry", "Cohesion", "Armory AI"]:
            self.assertNotIn(marker, text, str(page))
```

**Step 2: Run tests**

Run: `python3 tests/test_release.py`
Expected: failures are fixed before proceeding.

**Step 3: Implement print CSS and PDF export**

Add print styles that hide nav, cursor, and motion elements, expand dark cards to legible print colors, and avoid page breaks inside metric cards. Export Home and each case study to PDF using the browser's print-to-PDF.

**Step 4: Responsive and accessibility check**

Check 1440px, 810px, and 390px. Confirm 44px touch targets, visible focus states, chart text equivalents, and no horizontal scroll.

**Step 5: Run all tests**

Run: `python3 -m unittest discover -s tests -p "test_*.py"`
Expected: `OK`.

**Step 6: Commit**

```bash
git add . && git commit -m "Add release QA, print styles, and PDF exports"
```

---

### Task 13: GitHub Pages publication

**Files:**
- Modify: `README.md`

**Step 1: Add the remote**

```bash
git remote add origin https://github.com/reyserved/reyserved.github.io.git
```

**Step 2: Push**

```bash
git push -u origin main
```

If the remote already has history, fetch and inspect it before pushing. Do not force-push over unknown content.

**Step 3: Enable Pages**

Use the GitHub repository settings or CLI to publish from the `main` branch root. Keep `.nojekyll`.

**Step 4: Verify live**

Check `https://reyserved.github.io` returns 200, every case URL loads, and every page includes the noindex meta. Confirm `robots.txt` allows crawling and no sitemap is submitted.

**Step 5: Commit README updates**

```bash
git add README.md && git commit -m "Document GitHub Pages deployment"
git push
```

---

### Task 14: Resume update

**Files:**
- Modify source copy of `Reymart-Sarigumba-Senior-SEO-GEO-Specialist.docx` inside `resume/`
- Create: `resume/Reymart-Sarigumba-Senior-SEO-GEO-Specialist.pdf`

**Step 1: Write resume content tests**

Assert the DOCX text contains `SEO & GEO Specialist` for Dream Assurance, `SEO & SGE Specialist` for First Page, `reyserved.github.io`, AEO/GEO bullets, and no bracketed placeholders.

**Step 2: Run test**

Run: `python3 tests/test_resume.py`
Expected: FAIL before edits.

**Step 3: Implement with python-docx**

Update titles, profile, core expertise, and bullets. Add verified metrics with led/contributed labels. Trim older roles to preserve two pages. Keep the ATS-safe layout.

**Step 4: Export and verify**

Export to PDF with LibreOffice if available, otherwise use the existing document-to-PDF workflow. Render the PDF to images and confirm two pages, no overflow, and readable type.

**Step 5: Run tests**

Run: `python3 tests/test_resume.py`
Expected: `OK`.

**Step 6: Commit**

```bash
git add resume tests/test_resume.py
git commit -m "Update resume with AEO and GEO positioning"
```

---

### Task 15: Final handoff

**Files:**
- Modify: `README.md`

**Step 1: Document**

Include how to edit case content, regenerate `assets/data/metrics.json`, run tests, deploy, and replace the monogram with a headshot.

**Step 2: Final verification**

Run the full test suite, check the live site, and confirm the resume PDF opens correctly.

**Step 3: Commit and push**

```bash
git add README.md && git commit -m "Add portfolio maintenance guide"
git push
```

---

## Execution handoff

**Plan complete and saved to `design/plans/2026-11-09-reymart-seo-portfolio.md`. Two execution options:**

**1. Subagent-Driven (this session)** - Dispatch fresh subagents per task with review between tasks.

**2. Parallel Session (separate)** - Open a new session with executing-plans for batch execution with checkpoints.

**Which approach?**
