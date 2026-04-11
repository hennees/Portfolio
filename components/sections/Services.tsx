"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Lottie from "lottie-react";
import { useMemo, useRef } from "react";
import webDesignAnimationRaw from "@/public/animations/web-design.json";
import uxDesignAnimationRaw from "@/public/animations/ux-design.json";
import mobileDevAnimationRaw from "@/public/animations/mobile-dev.json";
import faceIdAnimationRaw from "@/public/animations/face-id.json";
import medicalAppAnimationRaw from "@/public/animations/medical-app.json";
import { recolorLottie } from "@/lib/lottie";
import { useTheme } from "@/components/ui/ThemeProvider";

// ─── PER-ANIMATION PALETTES ────────────────────────────────────────────────

const WEB_MAP_DARK: Record<string, string> = {
  "#00caae": "#00D4BE", "#ffec36": "#F85900", "#1a1a1a": "#111111",
};
const WEB_MAP_LIGHT: Record<string, string> = {
  "#00caae": "#009688", "#ffec36": "#F85900", "#1a1a1a": "#e0e0e0",
};

const UX_MAP_DARK: Record<string, string> = {
  "#4a3ed0": "#8B5CF6", "#455a64": "#1E3A52", "#37474f": "#162F45", "#263238": "#0F2438",
};
const UX_MAP_LIGHT: Record<string, string> = {
  "#4a3ed0": "#6D28D9", "#455a64": "#94A3B8", "#37474f": "#CBD5E1", "#263238": "#E2E8F0",
};

const MOBILE_MAP_DARK: Record<string, string> = {
  "#ff9f24": "#F85900", "#ff6a5f": "#F97316", "#009cdf": "#0EA5E9",
};
const MOBILE_MAP_LIGHT: Record<string, string> = {
  "#ff9f24": "#E65100", "#ff6a5f": "#F57C00", "#009cdf": "#0288D1",
};

const MEDICAL_MAP_DARK: Record<string, string> = {
  "#60c3da": "#10B981", "#000000": "#3A4A44", "#ffffff": "#D1D5DB",
};
const MEDICAL_MAP_LIGHT: Record<string, string> = {
  "#60c3da": "#059669", "#000000": "#10B981", "#ffffff": "#374151",
};

// ─── DATA ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { key: "web",         num: "01", tags: ["React", "Next.js", "Tailwind"],       scale: "95%" },
  { key: "design",      num: "02", tags: ["Figma", "Prototyping", "Design System"], scale: "37%" },
  { key: "mobile",      num: "03", tags: ["Swift", "Flutter", "iOS", "Android"], scale: "76%" },
  { key: "performance", num: "04", tags: ["FHIR", "DSGVO", "Telemedizin"],        scale: "70%" },
] as const;

// ─── CARD ACCENT COLORS ────────────────────────────────────────────────────
const ACCENTS: Record<string, { color: string; rgb: string }> = {
  web:         { color: "#00D4BE", rgb: "0,212,190"   },
  design:      { color: "#8B5CF6", rgb: "139,92,246"  },
  mobile:      { color: "#F85900", rgb: "248,89,0"    },
  performance: { color: "#10B981", rgb: "16,185,129"  },
};

function ServiceCard({ s, idx, t, animationData }: { s: typeof SERVICES[number], idx: number, t: any, animationData: any }) {
  const accent = ACCENTS[s.key];
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, { amount: 0.2, once: false });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.09 }}
    >
      <GlassCard className="group h-full flex flex-col relative overflow-hidden p-0 transition-all duration-500">
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: `linear-gradient(to right, ${accent.color}, rgba(${accent.rgb},0.2), transparent)` }}
        />

        <div className="relative w-full h-[200px] sm:h-[220px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 80%, rgba(${accent.rgb},0.07) 0%, transparent 65%)` }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(${accent.rgb},0.18) 0%, transparent 65%)` }}
          />
          <div
            className="relative z-10 transition-transform duration-700 group-hover:scale-105"
            style={{ width: s.scale, maxWidth: "240px" }}
          >
            <Lottie animationData={animationData} loop autoplay={isVisible} />
          </div>
          <span
            className="absolute bottom-2 right-4 font-heading font-black leading-none select-none pointer-events-none"
            style={{ fontSize: "4rem", color: accent.color, opacity: 0.12 }}
          >
            {s.num}
          </span>
        </div>

        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(to right, rgba(${accent.rgb},0.4), rgba(${accent.rgb},0.05), transparent)` }}
        />

        <div className="flex flex-col flex-1 p-6 sm:p-7">
          <span
            className="text-xs font-mono font-bold mb-4 block"
            style={{ color: accent.color, opacity: 0.85 }}
          >
            {s.num}
          </span>
          <h3
            className="font-heading font-bold text-xl sm:text-2xl mb-2.5 tracking-tight"
            style={{ color: "var(--c-text-primary)" }}
          >
            {t(`items.${s.key}.title`)}
          </h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--c-text-muted)" }}>
            {t(`items.${s.key}.description`)}
          </p>

          {s.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5">
              {s.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{
                    color: accent.color,
                    borderColor: `rgba(${accent.rgb},0.25)`,
                    background: `rgba(${accent.rgb},0.07)`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700"
          style={{ background: `linear-gradient(to right, ${accent.color}, transparent)` }}
        />
      </GlassCard>
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations("services");
  const { theme } = useTheme();

  const animations = useMemo(() => {
    const isDark = theme === "dark";
    return {
      web:         recolorLottie(webDesignAnimationRaw,  isDark ? WEB_MAP_DARK : WEB_MAP_LIGHT),
      design:      recolorLottie(uxDesignAnimationRaw,   isDark ? UX_MAP_DARK : UX_MAP_LIGHT),
      mobile:      recolorLottie(mobileDevAnimationRaw,  isDark ? MOBILE_MAP_DARK : MOBILE_MAP_LIGHT),
      performance: recolorLottie(medicalAppAnimationRaw, isDark ? MEDICAL_MAP_DARK : MEDICAL_MAP_LIGHT),
    };
  }, [theme]);

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 overflow-hidden" aria-label="Services">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(248,89,0,0.025) 0%, transparent 80%)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#F85900" }}>
            Solutions
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "var(--c-text-primary)" }}
          >
            {t("title")}
          </h2>
          <p className="text-base max-w-md leading-relaxed" style={{ color: "var(--c-text-muted)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((s, idx) => (
            <ServiceCard key={s.key} s={s} idx={idx} t={t} animationData={(animations as any)[s.key]} />
          ))}
        </div>
      </div>
    </section>
  );
}
