"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

function TypewriterText({ phrases }: { phrases: string[] }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = phrases[current];

    if (paused) {
      timeoutRef.current = setTimeout(() => {
        setPaused(false);
        setDeleting(true);
      }, 2200);
      return;
    }

    if (!deleting && displayed.length < phrase.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length + 1));
      }, 60);
    } else if (!deleting && displayed.length === phrase.length) {
      setPaused(true);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrent((c) => (c + 1) % phrases.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, paused, current, phrases]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="gradient-text">{displayed}</span>
      <span
        className="inline-block w-0.5 h-8 sm:h-10 md:h-12 rounded-full ml-0.5 animate-blink"
        style={{ background: "#F85900" }}
        aria-hidden="true"
      />
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const phrases = t.raw("roles") as string[];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full animate-orb-1"
          style={{
            width: 600,
            height: 600,
            top: "10%",
            left: "15%",
            background: "radial-gradient(circle, #F85900 0%, transparent 70%)",
            opacity: 0.15,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full animate-orb-2"
          style={{
            width: 400,
            height: 400,
            top: "50%",
            right: "10%",
            background: "radial-gradient(circle, #FF9432 0%, transparent 70%)",
            opacity: 0.1,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full animate-orb-3"
          style={{
            width: 300,
            height: 300,
            bottom: "20%",
            left: "5%",
            background: "radial-gradient(circle, #F85900 0%, transparent 70%)",
            opacity: 0.08,
            filter: "blur(60px)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-heading font-bold mb-6"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            minHeight: "1.2em",
          }}
          aria-live="polite"
          aria-label="Role"
        >
          <TypewriterText phrases={phrases} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "#A09E9E" }}
        >
          {t("tagline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#work"
            className="hero-cta-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
          >
            {t("cta_work")}
          </a>
          <a
            href="#contact"
            className="hero-cta-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
          >
            {t("cta_contact")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-medium" style={{ color: "#A09E9E" }}>
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} style={{ color: "#F85900" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
