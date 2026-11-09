"""Package the prototype as openable HTML mockups."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "mockups"
OUT.mkdir(exist_ok=True)


def inline_assets(html):
    def css_repl(match):
        path = ROOT / match.group(1)
        return "<style>\n" + path.read_text() + "\n</style>"

    def js_repl(match):
        path = ROOT / match.group(1)
        return "<script>\n" + path.read_text() + "\n</script>"

    html = re.sub(r'<link rel="stylesheet" href="(assets/css/[^"]+)">', css_repl, html)
    html = re.sub(r'<script src="(assets/[^"]+)"></script>', js_repl, html)
    return html


source = (ROOT / "index.html").read_text()
desktop = inline_assets(source)
(OUT / "home-desktop.html").write_text(desktop)

proof = re.sub(r"<section class=\"hero\".*?</section>", "", source, flags=re.S)
(OUT / "proof-dashboard.html").write_text(inline_assets(proof))

mobile = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>Reymart — Mobile mockup</title>
  <style>
    body { margin:0; min-height:100vh; display:grid; place-items:center; background:#e8e6e1; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
    .wrap { padding:40px 20px; text-align:center; }
    .label { margin-bottom:18px; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; color:#6b6b66; }
    .phone { width:390px; max-width:100%; height:844px; margin:0 auto; background:#fff; border:10px solid #111; border-radius:44px; overflow:hidden; box-shadow:0 40px 80px -40px rgba(0,0,0,0.45); }
    iframe { width:100%; height:100%; border:0; }
    .links { margin-top:18px; font-size:14px; }
    .links a { color:#111; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="label">Reymart — Mobile mockup · 390 × 844</div>
    <div class="phone"><iframe src="home-desktop.html" title="Mobile portfolio mockup"></iframe></div>
    <div class="links"><a href="home-desktop.html">Open full page</a> · <a href="proof-dashboard.html">Dashboard only</a> · <a href="index.html">Back to gallery</a></div>
  </div>
</body>
</html>
"""
(OUT / "home-mobile.html").write_text(mobile)

gallery = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>Reymart — Prototype mockups</title>
  <style>
    :root { --ink:#111; --muted:#6b6b66; --line:rgba(17,17,17,0.12); }
    body { margin:0; background:#f4f3f0; color:var(--ink); font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
    header { padding:28px 32px; display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between; border-bottom:1px solid var(--line); }
    h1 { margin:0; font-size:20px; letter-spacing:-0.02em; }
    .switcher { display:flex; gap:8px; }
    button { padding:10px 16px; border:1px solid var(--line); border-radius:999px; background:#fff; font:inherit; font-size:13px; cursor:pointer; }
    button.active { background:#111; color:#fff; border-color:#111; }
    main { padding:32px; }
    .stage { display:flex; justify-content:center; }
    .frame { background:#fff; border:1px solid var(--line); border-radius:18px; overflow:hidden; box-shadow:0 30px 60px -40px rgba(0,0,0,0.35); transition:width 300ms ease; }
    iframe { display:block; border:0; width:100%; height:1200px; }
    .files { margin-top:24px; display:flex; flex-wrap:wrap; gap:16px; justify-content:center; font-size:14px; }
    .files a { color:var(--ink); }
  </style>
</head>
<body>
  <header>
    <h1>Reymart — Prototype mockups</h1>
    <div class="switcher" role="group" aria-label="Viewport">
      <button data-width="1440" class="active">Desktop 1440</button>
      <button data-width="810">Tablet 810</button>
      <button data-width="390">Mobile 390</button>
    </div>
  </header>
  <main>
    <div class="stage"><div class="frame" id="frame" style="width:min(1440px,100%)"><iframe src="home-desktop.html" title="Portfolio prototype"></iframe></div></div>
    <div class="files">
      <a href="home-desktop.html">Desktop HTML</a>
      <a href="home-mobile.html">Mobile HTML</a>
      <a href="proof-dashboard.html">Dashboard-only HTML</a>
    </div>
  </main>
  <script>
    const frame = document.getElementById('frame');
    document.querySelectorAll('button[data-width]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('button[data-width]').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        const width = parseInt(button.dataset.width, 10);
        frame.style.width = width >= 1440 ? 'min(1440px,100%)' : width + 'px';
        frame.style.maxWidth = '100%';
      });
    });
  </script>
</body>
</html>
"""
(OUT / "index.html").write_text(gallery)

print("Wrote mockups:")
for path in sorted(OUT.glob("*.html")):
    print(f"  {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")
