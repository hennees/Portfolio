"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Lottie from "lottie-react";
import developerAnimationRaw from "@/public/animations/developer.json";

// Farbanpassung: Lottie-Farben → Portfolio-Palette
const COLOR_MAP: [number[], number[]][] = [
  [[0.416, 0.914, 0.624], [0.969, 0.380, 0.039]], // grün → #F7610A
  [[0.627, 0.627, 0.780], [0.416, 0.416, 0.447]], // muted purple → neutral
  [[0.710, 0.671, 0.937], [0.627, 0.620, 0.620]], // light purple → #A09E9E
  [[0.812, 0.792, 1.000], [0.831, 0.824, 0.824]], // very light purple → #D4D2D2
  [[0.906, 0.890, 1.000], [0.929, 0.918, 0.918]], // near-white purple → #EDEAEA
  [[0.961, 0.953, 1.000], [0.961, 0.961, 0.969]], // almost white → #F5F5F7
];

function matchAndReplace(arr: number[]): void {
  for (const [src, dst] of COLOR_MAP) {
    if (
      Math.abs(arr[0] - src[0]) < 0.04 &&
      Math.abs(arr[1] - src[1]) < 0.04 &&
      Math.abs(arr[2] - src[2]) < 0.04
    ) {
      arr[0] = dst[0]; arr[1] = dst[1]; arr[2] = dst[2];
      return;
    }
  }
}

function recolor(obj: unknown): void {
  if (typeof obj !== "object" || obj === null) return;
  if (Array.isArray(obj)) { obj.forEach(recolor); return; }
  const o = obj as Record<string, unknown>;
  if ("c" in o && typeof o.c === "object" && o.c !== null) {
    const c = o.c as { a: number; k: unknown };
    if (c.a === 0 && Array.isArray(c.k) && typeof c.k[0] === "number")
      matchAndReplace(c.k as number[]);
    if (c.a === 1 && Array.isArray(c.k))
      (c.k as { s?: number[] }[]).forEach((kf) => { if (Array.isArray(kf.s)) matchAndReplace(kf.s); });
  }
  Object.values(o).forEach(recolor);
}

const developerAnimation = (() => {
  const clone = JSON.parse(JSON.stringify(developerAnimationRaw));
  recolor(clone);
  for (const layer of clone.layers ?? []) {
    if (["c++", "PHP"].includes(layer.nm)) {
      layer.ks.o = { a: 0, k: 0, ix: 11 };
    }
  }
  return clone;
})();

function TypewriterText({ phrases }: { phrases: string[] }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = phrases[current];
    if (paused) {
      timeoutRef.current = setTimeout(() => { setPaused(false); setDeleting(true); }, 2200);
      return;
    }
    if (!deleting && displayed.length < phrase.length) {
      timeoutRef.current = setTimeout(() => { setDisplayed(phrase.slice(0, displayed.length + 1)); }, 60);
    } else if (!deleting && displayed.length === phrase.length) {
      setPaused(true);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => { setDisplayed(displayed.slice(0, -1)); }, 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrent((c) => (c + 1) % phrases.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, paused, current, phrases]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="gradient-text">{displayed}</span>
      <span className="inline-block w-0.5 h-7 sm:h-8 rounded-full ml-0.5 animate-blink" style={{ background: "#F85900" }} aria-hidden="true" />
    </span>
  );
}

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
