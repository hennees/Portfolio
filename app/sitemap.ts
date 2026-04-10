import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
  DEFAULT_LOCALE,
  SEO_SITEMAP_PATHS,
  type SupportedLocale,
  getLocalizedPath,
  toAbsoluteUrl,
} from "@/lib/seo";

const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales as readonly SupportedLocale[];

  return locales.flatMap((locale) =>
    SEO_SITEMAP_PATHS.map((path) => {
      const languageAlternates = Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          toAbsoluteUrl(getLocalizedPath(alternateLocale, path)),
        ])
      ) as Record<string, string>;

      languageAlternates["x-default"] = toAbsoluteUrl(
        getLocalizedPath(DEFAULT_LOCALE, path)
      );

      return {
        url: toAbsoluteUrl(getLocalizedPath(locale, path)),
        lastModified: LAST_MODIFIED,
        changeFrequency: path === "" ? "monthly" : "yearly",
        priority: path === "" ? 1 : 0.3,
        alternates: {
          languages: languageAlternates,
        },
      };
    })
  );
}
