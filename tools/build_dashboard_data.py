"""Build derived, publishable dashboard data from approved evidence.

Raw client exports stay outside the repository. This script only writes
rounded, chart-ready values and their source labels.
"""
import json
import re
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path("/Users/reymartjansarigumba/Downloads")
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


def rank(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def weekly_series(path, sample_every=3):
    rows = read_semrush_xlsx(path)
    header_index = next(i for i, row in enumerate(rows) if row and row[0] == "Keyword")
    header = rows[header_index]
    date_cols = []
    for index, label in enumerate(header):
        match = re.match(r".*_(\d{8})$", str(label))
        if match:
            date_cols.append((index, match.group(1)))
    data = [row for row in rows[header_index + 1:] if row and row[0].strip()]
    series = []
    for position, (col_index, date) in enumerate(date_cols):
        if position % sample_every != 0 and position != len(date_cols) - 1:
            continue
        ranks = [rank(row[col_index] if col_index < len(row) else "") for row in data]
        series.append({
            "date": f"{date[:4]}-{date[4:6]}-{date[6:]}",
            "top3": sum(1 for value in ranks if value is not None and value <= 3),
            "top10": sum(1 for value in ranks if value is not None and value <= 10),
        })
    return series


def main():
    aurit = weekly_series(DOWNLOADS / "17139700_1911025_position_tracking_rankings_overview_20261106 (3).xlsx")
    neuro = weekly_series(DOWNLOADS / "2624964_position_tracking_rankings_overview_20261106.xlsx")
    payload = {
        "scu": {
            "client": "Service Credit Union",
            "aiFeatureImpressions": 180938,
            "aiFeaturePeriod": "Aug 2026",
            "aiOverviewScore": 39,
            "aiOverviewPeriod": "Jul 12 – Aug 11, 2026",
            "aiVisibilityScore": 17,
            "aiVisibilityTarget": 44,
            "citations": [
                {"page": "Vehicle loans hub", "previous": 65, "current": 49},
                {"page": "Become a member", "previous": 40, "current": 63},
                {"page": "Credit card APR blog", "previous": 54, "current": 62},
                {"page": "Auto loans page", "previous": 8, "current": 26},
                {"page": "What is a credit union", "previous": 8, "current": 22},
                {"page": "Military banking", "previous": 8, "current": 15},
            ],
            "citationPeriod": "Aug 8 – Sep 7, 2026 vs Jul 12 – Aug 11, 2026",
            "source": "Semrush AI Visibility + GSC Generative AI Features",
        },
        "neuroendo": {
            "client": "NeuroEndoMKE",
            "top3Previous": neuro[0]["top3"],
            "top3Current": neuro[-1]["top3"],
            "top10Previous": neuro[0]["top10"],
            "top10Current": neuro[-1]["top10"],
            "trackedKeywords": 24,
            "visibilityChange": 19.7,
            "period": "Nov 2023 – Nov 2026",
            "source": "Semrush Position Tracking",
            "series": neuro,
            "keywordsImproved": 12,
        },
        "aurit": {
            "client": "Aurit Mediation",
            "series": aurit,
            "period": "May 2024 – Nov 2026",
            "source": "Semrush Position Tracking",
            "topKeywords": [
                {"keyword": "chandler divorce mediation", "position": 1},
                {"keyword": "scottsdale divorce mediation", "position": 1},
                {"keyword": "arizona divorce mediation", "position": 3},
            ],
            "snapshotDate": "Nov 6, 2026",
        },
    }
    output = ROOT / "assets/data/dashboard.js"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text("window.DASHBOARD_DATA = " + json.dumps(payload, indent=2) + ";\n")
    print(f"Wrote {output}")
    print(f"Aurit points: {len(aurit)}; top3 {aurit[0]['top3']} -> {aurit[-1]['top3']}; top10 {aurit[0]['top10']} -> {aurit[-1]['top10']}")
    print(f"NeuroEndo points: {len(neuro)}; top3 {neuro[0]['top3']} -> {neuro[-1]['top3']}")


if __name__ == "__main__":
    main()
