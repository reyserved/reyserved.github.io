"""Package every current page as openable HTML mockups."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "mockups"
OUT.mkdir(exist_ok=True)


def inline_assets(html):
    def css_repl(match):
        path = ROOT / match.group(1).lstrip("/")
        return "<style>\n" + path.read_text() + "\n</style>"

    def js_repl(match):
        path = ROOT / match.group(1).lstrip("/")
        return "<script>\n" + path.read_text() + "\n</script>"

    html = re.sub(r'<link rel="stylesheet" href="(/?assets/css/[^"]+)">', css_repl, html)
    html = re.sub(r'<script src="(/?assets/[^"]+)"></script>', js_repl, html)
    return html


def mobile_frame(filename, title):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>{title} — Mobile mockup</title>
  <style>
    body {{ margin:0; min-height:100vh; display:grid; place-items:center; background:#e8e6e1; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }}
    .wrap {{ padding:40px 20px; text-align:center; }}
    .label {{ margin-bottom:18px; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; color:#6b6b66; }}
    .phone {{ width:390px; max-width:100%; height:844px; margin:0 auto; background:#fff; border:10px solid #111; border-radius:44px; overflow:hidden; box-shadow:0 40px 80px -40px rgba(0,0,0,0.45); }}
    iframe {{ width:100%; height:100%; border:0; }}
    .links {{ margin-top:18px; font-size:14px; }}
    .links a {{ color:#111; }}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="label">{title} — Mobile mockup · 390 × 844</div>
    <div class="phone"><iframe src="{filename}" title="Mobile mockup"></iframe></div>
    <div class="links"><a href="{filename}">Open full page</a> · <a href="index.html">Back to gallery</a></div>
  </div>
</body>
</html>
"""


pages = [
    ("index.html", "home-desktop.html", "home-mobile.html", "Reymart — Home"),
    ("work/index.html", "work-desktop.html", "work-mobile.html", "Reymart — Case studies"),
    ("work/service-credit-union/index.html", "case-scu-desktop.html", "case-scu-mobile.html", "Reymart — Service Credit Union"),
    ("work/tde-family-law/index.html", "case-tde-desktop.html", "case-tde-mobile.html", "Reymart — TDE Family Law"),
    ("work/dream-assurance/index.html", "case-da-desktop.html", "case-da-mobile.html", "Reymart — Dream Assurance"),
]

for source, desktop, mobile, title in pages:
    html = inline_assets((ROOT / source).read_text())
    (OUT / desktop).write_text(html)
    (OUT / mobile).write_text(mobile_frame(desktop, title))
    print(f"Wrote {desktop} and {mobile}")

links = "\n".join(
    f'      <li><a href="{desktop}">{title}</a> · <a href="{mobile}">mobile</a></li>'
    for _, desktop, mobile, title in pages
)

gallery = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>Reymart — HTML mockups</title>
  <style>
    body {{ margin:0; background:#f4f3f0; color:#111; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }}
    main {{ max-width:860px; margin:0 auto; padding:64px 24px; }}
    h1 {{ letter-spacing:-0.03em; }}
    p {{ color:#555552; line-height:1.7; }}
    li {{ margin:14px 0; font-size:17px; }}
    a {{ color:#111; }}
    .note {{ margin-top:28px; padding:18px 20px; background:#fff; border:1px solid rgba(17,17,17,0.1); border-radius:16px; font-size:14px; }}
  </style>
</head>
<body>
  <main>
    <h1>Reymart — HTML mockups</h1>
    <p>Desktop files are self-contained. Mobile files show the same page inside a 390 × 844 device frame. Keep all files in this folder together.</p>
    <ul>
{links}
    </ul>
    <div class="note">These mockups are generated from the current build. The production site is being rebuilt in Next.js/React with static export for GitHub Pages.</div>
  </main>
</body>
</html>
"""
(OUT / "index.html").write_text(gallery)
print("Wrote mockup gallery")
