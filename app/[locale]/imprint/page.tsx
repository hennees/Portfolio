import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Imprint() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6" style={{ backgroundColor: "#0E0F10" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h1 className="font-heading font-black text-4xl sm:text-5xl mb-4" style={{ color: "#F5F5F7" }}>
          Impressum
        </h1>
        
        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Angaben gemäß § 5 TMG / § 14 UGB / § 5 ECG</h2>
          <p>
            <strong>Patrick Hennes</strong><br />
            Musterstraße 1<br />
            8010 Graz<br />
            Österreich
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Kontakt</h2>
          <p>
            Telefon: +43 123 456789<br />
            E-Mail: hello@henux.at
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            ATU12345678
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </section>

      </div>
      <Footer />
    </main>
  );
}
