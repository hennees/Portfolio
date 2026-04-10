import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://henux.at";
export const SITE_METADATA_BASE = new URL(SITE_URL);
export const SITE_NAME = "henux";

export type SupportedLocale = (typeof routing.locales)[number];

const SUPPORTED_LOCALES = routing.locales as readonly SupportedLocale[];
export const DEFAULT_LOCALE = routing.defaultLocale as SupportedLocale;

type HomeSeo = {
  title: string;
  description: string;
  keywords: string[];
};

type PageSeo = {
  title: string;
  description: string;
};

type SeoCopy = {
  home: HomeSeo;
  imprint: PageSeo;
  privacy: PageSeo;
};

const OG_LOCALE_BY_LOCALE: Record<SupportedLocale, string> = {
  en: "en_US",
  de: "de_AT",
  es: "es_ES",
};

const SEO_COPY: Record<SupportedLocale, SeoCopy> = {
  en: {
    home: {
      title: "Patrick Hennes — UI/UX Designer & eHealth Developer | henux.at",
      description:
        "Austrian freelance UI/UX designer and eHealth developer based in Graz. Mobile apps, web platforms and AI-powered workflows.",
      keywords: [
        "UI/UX Designer",
        "eHealth Developer",
        "Freelancer",
        "Mobile Apps",
        "Web Development",
        "Graz",
        "Austria",
        "henux",
      ],
    },
    imprint: {
      title: "Legal Notice | henux.at",
      description:
        "Legal notice and provider information for the portfolio website of Patrick Hennes.",
    },
    privacy: {
      title: "Privacy Policy | henux.at",
      description:
        "Privacy policy for the henux.at portfolio website, including information about data processing and your rights.",
    },
  },
  de: {
    home: {
      title: "Patrick Hennes — UI/UX Designer & eHealth Entwickler | henux.at",
      description:
        "Freelance UI/UX Designer und eHealth Entwickler aus Graz, Österreich. Mobile Apps, Webplattformen und KI-gestützte Workflows.",
      keywords: [
        "UI/UX Designer",
        "eHealth Entwickler",
        "Freelancer",
        "Mobile App Entwicklung",
        "Webentwicklung",
        "Graz",
        "Österreich",
        "henux",
      ],
    },
    imprint: {
      title: "Impressum | henux.at",
      description:
        "Impressum und Anbieterkennzeichnung für die Portfolio-Website von Patrick Hennes.",
    },
    privacy: {
      title: "Datenschutzerklärung | henux.at",
      description:
        "Datenschutzerklärung der Website henux.at mit Informationen zur Datenverarbeitung und zu Ihren Rechten.",
    },
  },
  es: {
    home: {
      title: "Patrick Hennes — Diseñador UI/UX y Desarrollador eHealth | henux.at",
      description:
        "Diseñador UI/UX y desarrollador eHealth freelance en Graz, Austria. Apps móviles, plataformas web y flujos de trabajo con IA.",
      keywords: [
        "Diseñador UI/UX",
        "Desarrollador eHealth",
        "Freelance",
        "Aplicaciones móviles",
        "Desarrollo web",
        "Graz",
        "Austria",
        "henux",
      ],
    },
    imprint: {
      title: "Aviso legal | henux.at",
      description:
        "Aviso legal e información del proveedor para el sitio de portafolio de Patrick Hennes.",
    },
    privacy: {
      title: "Política de privacidad | henux.at",
      description:
        "Política de privacidad del sitio henux.at con información sobre tratamiento de datos y derechos del usuario.",
    },
  },
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function resolveLocale(locale: string): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getHomeSeo(locale: SupportedLocale): HomeSeo {
  return SEO_COPY[locale].home;
}

export function getPageSeo(locale: SupportedLocale, page: "imprint" | "privacy"): PageSeo {
  return SEO_COPY[locale][page];
}

export function getOgLocale(locale: SupportedLocale): string {
  return OG_LOCALE_BY_LOCALE[locale];
}

function normalizePath(pathname = ""): string {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPath(locale: SupportedLocale, pathname = ""): string {
  return `/${locale}${normalizePath(pathname)}`;
}

export function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function getLanguageAlternates(pathname = ""): Record<string, string> {
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, getLocalizedPath(locale, pathname)])
  ) as Record<string, string>;

  alternates["x-default"] = getLocalizedPath(DEFAULT_LOCALE, pathname);

  return alternates;
}

export function buildAlternates(
  locale: SupportedLocale,
  pathname = ""
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: getLocalizedPath(locale, pathname),
    languages: getLanguageAlternates(pathname),
  };
}

export const SEO_SITEMAP_PATHS = ["", "/imprint", "/privacy"] as const;
