import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/ui/Footer";

const Showcase   = dynamic(() => import("@/components/sections/Showcase"));
const Services   = dynamic(() => import("@/components/sections/Services"));
const Process    = dynamic(() => import("@/components/sections/Process"));
const StackTools = dynamic(() => import("@/components/sections/StackTools"));
const About      = dynamic(() => import("@/components/sections/About"));
const Contact    = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Showcase />
      <Services />
      <Process />
      <StackTools />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
