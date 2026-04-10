"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import developerAnimationRaw from "@/public/animations/developer.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { recolorLottie, PORTFOLIO_COLOR_MAP } from "@/lib/lottie";
import { TypewriterText } from "@/components/ui/TypewriterText";

const developerAnimation = (() => {
  const recolored = recolorLottie(developerAnimationRaw, PORTFOLIO_COLOR_MAP);
  for (const layer of recolored.layers ?? []) {
    if (["c++", "PHP"].includes(layer.nm)) {
      layer.ks.o = { a: 0, k: 0, ix: 11 };
    }
  }
  return recolored;
})();

export default function Hero() {
  const t = useTranslations("hero");
  const phrases = t.raw("roles") as string[];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute rounded-full animate-orb-1" style={{ width: 600, height: 600, top: "10%", left: "15%", background: "radial-gradient(circle, #F85900 0%, transparent 70%)", opacity: 0.12, filter: "blur(80px)" }} />
        <div className="absolute rounded-full animate-orb-2" style={{ width: 400, height: 400, top: "50%", right: "10%", background: "radial-gradient(circle, #FF9432 0%, transparent 70%)", opacity: 0.08, filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-orb-3" style={{ width: 300, height: 300, bottom: "20%", left: "5%", background: "radial-gradient(circle, #F85900 0%, transparent 70%)", opacity: 0.07, filter: "blur(60px)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      {/* Content — 2-col auf Desktop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 lg:pt-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

        {/* Animation on Mobile (Visible before text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex lg:hidden items-center justify-center w-full max-w-[280px] aspect-square"
          aria-hidden="true"
        >
          <div className="absolute rounded-full pointer-events-none" style={{ width: "100%", height: "100%", background: "radial-gradient(circle, rgba(248,89,0,0.15) 0%, transparent 70%)", filter: "blur(30px)" }} />
          <Lottie animationData={developerAnimation} loop autoplay style={{ width: "100%", height: "100%" }} />
        </motion.div>

        {/* Links: Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading font-black tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 10vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F5F5F7" }}
          >
            {t("name")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="font-heading font-semibold mb-6"
            style={{ fontSize: "clamp(1.1rem, 4vw, 1.6rem)", minHeight: "1.4em", color: "#A09E9E" }}
            aria-live="polite" aria-label="Role"
          >
            <TypewriterText phrases={phrases} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
            className="text-base sm:text-lg mb-10 leading-relaxed max-w-md lg:max-w-none"
            style={{ color: "#A09E9E" }}
          >
            {t("tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 w-full sm:w-auto"
          >
            <a href="#work" className="hero-cta-primary w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm cursor-pointer">{t("cta_work")}</a>
            <a href="#contact" className="hero-cta-secondary w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm cursor-pointer">{t("cta_contact")}</a>
          </motion.div>
        </div>

        {/* Rechts: Lottie (Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex-shrink-0 hidden lg:flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="absolute rounded-full pointer-events-none" style={{ width: 380, height: 380, background: "radial-gradient(circle, rgba(248,89,0,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <Lottie animationData={developerAnimation} loop autoplay style={{ width: 440, height: 440 }} />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-medium" style={{ color: "#A09E9E" }}>{t("scroll")}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} style={{ color: "#F85900" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
