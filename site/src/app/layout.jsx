import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/components.css";
import "../styles/home.css";
import "../styles/case-study.css";
import "../styles/charts.css";
import "../styles/stack.css";
import "../styles/home-v2.css";
import Script from "next/script";
import SiteNav from "../components/SiteNav";
import ClientEffects from "../components/ClientEffects";
import AnalyticsEvents from "../components/AnalyticsEvents";

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7FQVEZGK52"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-7FQVEZGK52');
          `}
        </Script>
      </head>
      <body>
        <SiteNav />
        <main>{children}</main>
        <ClientEffects />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
