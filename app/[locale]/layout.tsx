import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  SITE_METADATA_BASE,
  SITE_NAME,
  buildAlternates,
  getHomeSeo,
  getLocalizedPath,
  getOgLocale,
  isSupportedLocale,
  resolveLocale,
} from "@/lib/seo";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/icon",
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
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
