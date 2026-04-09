import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Privacy() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6" style={{ backgroundColor: "#0E0F10" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <h1 className="font-heading font-black text-4xl sm:text-5xl mb-4" style={{ color: "#F5F5F7" }}>
          Datenschutzerklärung
        </h1>
        
        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>1. Datenschutz auf einen Blick</h2>
          <p className="leading-relaxed">
            Die Betreiber dieser Website nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>2. Verantwortliche Stelle</h2>
          <p className="leading-relaxed">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            <strong className="text-white">Patrick Hennes</strong><br />
            Griesgasse 11<br />
            8020 Graz, Österreich<br />
            E-Mail: patrick.hennes27@icloud.com
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>3. Datenerfassung auf dieser Website</h2>
          <p className="leading-relaxed">
            <strong>Server-Log-Dateien</strong><br />
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (z.B. IP-Adresse, Browsertyp, Zeitstempel). Diese Daten sind technisch notwendig, um die Website stabil und sicher anzuzeigen.
          </p>
          <p className="leading-relaxed">
            <strong>Hosting</strong><br />
            Diese Website wird bei einem externen Dienstleister gehostet (Vercel). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>4. Ihre Rechte</h2>
          <p className="leading-relaxed">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
          </p>
        </section>

      </div>
      <Footer />
    </main>
  );
}
