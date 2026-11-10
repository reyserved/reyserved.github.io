"""Update Reymart's resume with AEO/GEO positioning and case-study evidence."""
import copy
from pathlib import Path
from docx import Document

RESUME_DIR = Path("/Users/reymartjansarigumba/Dream Assurance/content-update/DIGITAL MARKETING/output/Reymart-Sarigumba-SEO-Resume-2026")
DOCX = RESUME_DIR / "Reymart-Sarigumba-Senior-SEO-GEO-Specialist.docx"

ROLES = {
    "Senior SEO & GEO Specialist": {
        "company": "Rocket Clicks",
        "bullets": [
            "Own SEO strategy across client accounts, running technical audits, developing content briefs, and overseeing local SEO initiatives.",
            "Design answer-first content systems for AEO and GEO: definitional intros, question-led sections, FAQ blocks, source citations, and schema that help AI Overviews and LLMs extract and cite client pages.",
            "Run AEO/GEO readiness audits and content gap analyses, prioritizing by business value, search opportunity, and AI citation potential.",
            "Measure AI search visibility at page level using Semrush AI Visibility, GSC Generative AI Features, and citation tracking, reporting gains with explicit claim limits.",
            "Contributed to a credit union GEO program that produced 180,938 Google Generative AI feature impressions in August 2026 (+7.1% MoM) and increased page-level AI citations, including 8 to 26 prompts for an auto-loans page.",
            "Led AEO content and local strategy for a family law firm: business-relevant query impressions +19.5%, prenup guide clicks 4 to 14, and GBP calls +51.5%.",
            "Build AI-assisted content calendars and briefs with brand-intelligence and persona inputs, maintaining human QA and source checks.",
        ],
    },
    "Search Engine Optimization Specialist (Support Channel Specialist)": {
        "company": "Rocket Clicks",
        "bullets": [
            "Resolved SEO requests across client accounts, triaging and addressing technical, on-page, content, and local SEO issues.",
            "Identified and fixed crawlability and indexation issues across client websites.",
            "Troubleshot and implemented conversion tracking fixes using Google Tag Manager (GTM) and Google Analytics 4 (GA4).",
            "Implemented and troubleshot JSON-LD schema markup across page types to improve structured data accuracy and rich-result eligibility.",
        ],
    },
    "SEO Specialist": {
        "company": "Dream Assurance Group",
        "new_title": "SEO & GEO Specialist",
        "bullets": [
            "Own end-to-end SEO and GEO for a US independent insurance agency: technical audits, content strategy, schema, internal linking, local SEO, conversion tracking, and reporting.",
            "Apply AEO/GEO to service pages and blogs: answer the query in the opening paragraph, structure follow-ups as question-led sections, cite authoritative sources, and add FAQ/schema for extractability.",
            "Map AI Overview exposure across 685 tracked queries; identified 561 (81.9%) with AI Overviews and 107 top-10 terms to prioritize content and schema work.",
            "Build AI-assisted content calendars and briefs using brand-intelligence and audience/persona inputs, with human review of claims and sources.",
            "Implement and troubleshoot JSON-LD schema graphs, FAQ parity, and internal-link/jump-link audits; built a contractor hub with 18 child pages.",
            "Manage Facebook Ads and Google Ads campaigns; set up conversion tracking in Google Tag Manager.",
        ],
    },
    "Technical SEO Specialist": {
        "company": "First Page",
        "new_title": "SEO & SGE Specialist",
        "bullets": [
            "Ran technical SEO audits and keyword research for client websites across APAC.",
            "Analyzed content traffic and drove SEO improvements in content creation and optimization.",
            "Structured content for featured snippets, People Also Ask, and other SERP features; implemented schema markup and on-page optimization.",
            "Coordinated vendor backlink delivery and set up conversion/e-commerce tracking with GTM.",
            "Contributed to client results including +105% non-branded organic traffic for RELX APAC and +273% organic traffic for Tuttee (team work).",
        ],
    },
    "SEO Specialist / Media Buyer": {
        "company": "INITIA Group",
        "bullets": [
            "Ran and optimized Facebook Ads and Google Ads campaigns.",
            "Implemented local, on-page, and off-page SEO recommendations.",
            "Increased Walking On Sunshine organic traffic +17.59% in 2 months through landing-page content, metadata, and Google Business Profile optimization.",
        ],
    },
}

PROFILE = (
    "Senior SEO & GEO Specialist with 6+ years in SEO across agency and in-house roles. "
    "I build answer-first content systems for AEO, SGE, and GEO, run technical and local SEO programs, "
    "and measure AI search visibility at page level with clear claim limits. I also build AI-assisted content workflows with human QA."
)

EXPERTISE = (
    "Technical SEO · Site audits · Crawlability and indexation · On-page SEO · Schema markup · Content strategy · "
    "Topic clusters · Content audits and gap analysis · Local SEO · Link building · Conversion tracking · AEO · SGE · GEO · "
    "Answer-first content · AI citation measurement · AI-assisted content operations"
)

TOOLS = (
    "Google Search Console · GA4 · Google Tag Manager · Looker Studio · Ahrefs · Semrush · Screaming Frog · Surfer · "
    "WordPress · Shopify · Wix · HTML/CSS · Google Business Profile · Claude · ChatGPT · Figma"
)


def replace_paragraph_text(paragraph, text):
    if paragraph.runs:
        paragraph.runs[0].text = text
        for run in paragraph.runs[1:]:
            run.text = ""
    else:
        paragraph.text = text


def insert_bullets_after(anchor, bullets, template):
    for text in bullets:
        new_p = copy.deepcopy(template._p)
        anchor._p.addnext(new_p)
        from docx.text.paragraph import Paragraph
        paragraph = Paragraph(new_p, anchor._parent)
        replace_paragraph_text(paragraph, f"•\t{text}")
        anchor = paragraph


def main():
    doc = Document(DOCX)
    paragraphs = doc.paragraphs
    template = next(p for p in paragraphs if p.text.strip().startswith("•"))

    for p in paragraphs:
        text = p.text.strip()
        if text == "Senior SEO & GEO Specialist with agency and in-house experience. I run technical audits, develop content briefs, manage local and off-page campaigns, and handle conversion tracking. I build AI-assisted workflows with human QA and measure AI search visibility.":
            replace_paragraph_text(p, PROFILE)
        elif text.startswith("Technical SEO  ·  Site audits"):
            replace_paragraph_text(p, EXPERTISE)
        elif text.startswith("Google Search Console  ·  GA4"):
            replace_paragraph_text(p, TOOLS)
        elif text == "SEO case studies  —  clippings.me/users/reymartjs":
            replace_paragraph_text(p, "SEO & GEO case studies  —  reyserved.github.io")

    for title, config in ROLES.items():
        title_index = next(
            (i for i, p in enumerate(doc.paragraphs) if p.text.strip().endswith(title)),
            None,
        )
        if title_index is None:
            print(f"Role not found: {title}")
            continue

        title_p = doc.paragraphs[title_index]
        if "new_title" in config:
            date_part = title_p.text.split("\t")[0]
            replace_paragraph_text(title_p, f"{date_part}\t{config['new_title']}")

        company_index = title_index + 1
        company_p = doc.paragraphs[company_index]

        bullet_indices = []
        for i in range(company_index + 1, len(doc.paragraphs)):
            text = doc.paragraphs[i].text.strip()
            if text.startswith("•"):
                bullet_indices.append(i)
            elif text:
                break

        for i in reversed(bullet_indices):
            element = doc.paragraphs[i]._p
            element.getparent().remove(element)

        insert_bullets_after(company_p, config["bullets"], template)

    doc.save(DOCX)
    print(f"Saved {DOCX}")
    for p in Document(DOCX).paragraphs:
        if p.text.strip():
            print(p.text)


if __name__ == "__main__":
    main()
