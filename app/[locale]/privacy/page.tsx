import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
  SITE_NAME,
  buildAlternates,
  getLocalizedPath,
  getOgLocale,
  getPageSeo,
  resolveLocale,
} from "@/lib/seo";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = resolveLocale(requestedLocale);
  const seo = getPageSeo(locale, "privacy");

  return {
    title: seo.title,
    description: seo.description,
    alternates: buildAlternates(locale, "/privacy"),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: getLocalizedPath(locale, "/privacy"),
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function Privacy() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6">
      <Navbar />

      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <h1 className="font-heading font-black text-4xl sm:text-5xl mb-4" style={{ color: "var(--c-text-primary)" }}>
          Datenschutzerklärung
        </h1>
        
        <section className="flex flex-col gap-4 text-base" style={{ color: "var(--c-text-muted)" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--c-text-primary)" }}>1. Datenschutz auf einen Blick</h2>
          <p className="leading-relaxed">
            Die Betreiber dieser Website nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "var(--c-text-muted)" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--c-text-primary)" }}>2. Verantwortliche Stelle</h2>
          <p className="leading-relaxed">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            <strong style={{ color: "var(--c-text-primary)" }}>Patrick Hennes</strong><br />
            Graz, Österreich<br />
            E-Mail: patrick.hennes27@icloud.com
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "var(--c-text-muted)" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--c-text-primary)" }}>3. Datenerfassung auf dieser Website</h2>
          <p className="leading-relaxed">
            <strong style={{ color: "var(--c-text-primary)" }}>Server-Log-Dateien</strong><br />
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (z.B. IP-Adresse, Browsertyp, Zeitstempel). Diese Daten sind technisch notwendig, um die Website stabil und sicher anzuzeigen.
          </p>
          <p className="leading-relaxed">
            <strong style={{ color: "var(--c-text-primary)" }}>Hosting</strong><br />
            Diese Website wird bei einem externen Dienstleister gehostet (Vercel). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "var(--c-text-muted)" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--c-text-primary)" }}>4. Ihre Rechte</h2>
          <p className="leading-relaxed">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
          </p>
        </section>

      </div>
      <Footer />
    </main>
  );
}
