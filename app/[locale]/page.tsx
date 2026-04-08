import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import Services from "@/components/sections/Services";
import StackTools from "@/components/sections/StackTools";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0E0F10" }}>
      <Navbar />
      <Hero />
      <Showcase />
      <Services />
      <StackTools />
      <About />
      <Contact />
    </main>
  );
}
