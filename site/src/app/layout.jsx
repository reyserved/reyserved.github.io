import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/components.css";
import "../styles/home.css";
import "../styles/case-study.css";
import "../styles/charts.css";
import SiteNav from "../components/SiteNav";
import ClientEffects from "../components/ClientEffects";

export const metadata = {
  title: "Reymart — SEO & GEO Specialist",
  description:
    "Reymart Sarigumba builds answer-first SEO and GEO programs. Case studies cover AI citation measurement, answer-first content, local SEO, and technical SEO.",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteNav />
        <main>{children}</main>
        <ClientEffects />
      </body>
    </html>
  );
}
