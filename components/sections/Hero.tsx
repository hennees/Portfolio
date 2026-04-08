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
        className="inline-block w-0.5 h-8 sm:h-10 md:h-12 rounded-full ml-0.5"
        style={{
          background: "#F85900",
          animation: "blink 1s step-end infinite",
        }}
        aria-hidden="true"
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(248,89,0,0.12)",
            border: "1px solid rgba(248,89,0,0.25)",
            color: "#FF9432",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#F85900", boxShadow: "0 0 6px #F85900" }}
            aria-hidden="true"
          />
          Available for new projects
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading font-black tracking-tight mb-4"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.0,
            color: "#F5F5F7",
            letterSpacing: "-0.03em",
          }}
        >
          {t("name")}
        </motion.h1>

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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #F85900, #FF9432)",
              color: "#0E0F10",
              boxShadow: "0 8px 32px rgba(248,89,0,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 12px 40px rgba(248,89,0,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 32px rgba(248,89,0,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
          >
            {t("cta_work")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(47,47,47,0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#F5F5F7",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(248,89,0,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(248,89,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(47,47,47,0.4)";
            }}
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
