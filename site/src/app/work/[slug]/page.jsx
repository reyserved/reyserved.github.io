import { notFound } from "next/navigation";
import { CASES } from "../../../data/cases";
import CaseStudy from "../../../components/CaseStudy";

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = CASES[slug];
  if (!data) return {};
  return {
    title: `${data.title} — Reymart`,
    description: data.lede,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function CasePage({ params }) {
  const { slug } = await params;
  const data = CASES[slug];
  if (!data) notFound();
  return <CaseStudy data={data} />;
}
