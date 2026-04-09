import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Imprint() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6" style={{ backgroundColor: "#0E0F10" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading font-black text-4xl sm:text-5xl" style={{ color: "#F5F5F7" }}>
            Impressum
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider" style={{ background: "rgba(248,89,0,0.1)", color: "#F85900", border: "1px solid rgba(248,89,0,0.2)" }}>
            Einzelunternehmen in Gründung
          </div>
        </div>
        
        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Angaben gemäß § 5 ECG / § 25 MedienG</h2>
          <p className="leading-relaxed">
            <strong className="text-white">Patrick Hennes</strong><br />
            Griesgasse 11<br />
            8020 Graz<br />
            Österreich
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Kontakt</h2>
          <p className="leading-relaxed">
            E-Mail: <a href="mailto:patrick.hennes27@icloud.com" className="hover:text-white transition-colors">patrick.hennes27@icloud.com</a>
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Unternehmensgegenstand</h2>
          <p className="leading-relaxed">
            UI/UX Design & Softwareentwicklung (eHealth)
          </p>
        </section>

        <section className="flex flex-col gap-4 text-base" style={{ color: "#A09E9E" }}>
          <h2 className="font-heading font-bold text-xl" style={{ color: "#F5F5F7" }}>Haftungsausschluss</h2>
          <p className="leading-relaxed italic text-sm">
            Hinweis: Diese Website dient aktuell als Portfolio zur Präsentation meiner Leistungen. Die offizielle Gewerbeanmeldung befindet sich in Vorbereitung. Alle Angaben erfolgen nach bestem Wissen, jedoch ohne Gewähr für die Vollständigkeit.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
