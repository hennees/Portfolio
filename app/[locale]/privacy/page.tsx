import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Privacy() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6" style={{ backgroundColor: "#0E0F10" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h1 className="font-heading font-black text-4xl sm:text-5xl mb-4" style={{ color: "#F5F5F7" }}>
          Datenschutzerklärung
        </h1>
        
        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>1. Datenschutz auf einen Blick</h2>
          <p>
            <strong>Allgemeine Hinweise</strong><br />
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <p>
            <strong>Datenschutz</strong><br />
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
          </p>
          <p>
            <strong>Hinweis zur verantwortlichen Stelle</strong><br />
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            Patrick Hennes<br />
            Musterstraße 1<br />
            8010 Graz<br />
            Österreich<br /><br />
            Telefon: +43 123 456789<br />
            E-Mail: hello@henux.at
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>3. Datenerfassung auf dieser Website</h2>
          <p>
            <strong>Server-Log-Dateien</strong><br />
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:<br />
            - Browsertyp und Browserversion<br />
            - verwendetes Betriebssystem<br />
            - Referrer URL<br />
            - Hostname des zugreifenden Rechners<br />
            - Uhrzeit der Serveranfrage<br />
            - IP-Adresse<br /><br />
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
          </p>
          <p>
            <strong>Kontaktformular</strong><br />
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>

      </div>
      <Footer />
    </main>
  );
}
