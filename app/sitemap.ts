import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, SEO_SITEMAP_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  return SEO_SITEMAP_PATHS.flatMap((path) =>
    locales.map((locale) => {
      const isDefault = locale === routing.defaultLocale;
      const url = isDefault && path === "" 
        ? `${SITE_URL}/${locale}` 
        : `${SITE_URL}/${locale}${path}`;

      return {
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly" as any,
        priority: path === "" ? 1.0 : 0.5,
      };
    })
  );
}
