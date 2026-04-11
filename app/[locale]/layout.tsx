import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  isSupportedLocale,
  resolveLocale,
  getHomeSeo,
  getOgLocale,
  buildAlternates,
  SITE_METADATA_BASE,
  SITE_NAME,
  getLocalizedPath,
  SITE_URL,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type RouteParams = Promise<{ locale: string }>;

type MetadataProps = {
  params: RouteParams;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = resolveLocale(requestedLocale);
  const homeSeo = getHomeSeo(locale);

  return {
    title: homeSeo.title,
    description: homeSeo.description,
    keywords: homeSeo.keywords,
    authors: [{ name: "Patrick Hennes" }],
    creator: "Patrick Hennes",
    publisher: "Patrick Hennes",
    metadataBase: SITE_METADATA_BASE,
    alternates: buildAlternates(locale),
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon",
    },
    openGraph: {
      title: homeSeo.title,
      description: homeSeo.description,
      type: "website",
      url: getLocalizedPath(locale),
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: homeSeo.title,
      description: homeSeo.description,
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: RouteParams;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: requestedLocale } = await params;
  const locale = resolveLocale(requestedLocale);
  const localizedHomeUrl = `${SITE_URL}${getLocalizedPath(locale)}`;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "henUX",
        "description": "Patrick Hennes — UI/UX Designer & eHealth Developer",
        "inLanguage": locale,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "henUX",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo-dark.svg`,
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Graz",
          "addressCountry": "AT",
        },
        "sameAs": [
          "https://www.linkedin.com/in/hennespatrick/",
        ],
        "knowsAbout": [
          "UI/UX Design", "eHealth", "Mobile App Development",
          "FHIR", "iOS Development", "Flutter", "Next.js", "Figma",
        ],
        "makesOffer": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Web Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "eHealth Solutions" } },
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Patrick Hennes",
        "url": SITE_URL,
        "jobTitle": "UI/UX Designer & eHealth Developer",
        "worksFor": { "@id": `${SITE_URL}/#organization` },
        "sameAs": [
          "https://www.linkedin.com/in/hennespatrick/",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${localizedHomeUrl}/#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": localizedHomeUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Imprint",
            "item": `${localizedHomeUrl}/imprint`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Privacy",
            "item": `${localizedHomeUrl}/privacy`,
          },
        ],
      },
    ],
  };

  return (
    <html lang={locale} className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" />
      </head>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
