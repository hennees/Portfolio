"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Lottie from "lottie-react";
import webDesignAnimationRaw from "@/public/animations/web-design.json";
import uxDesignAnimationRaw from "@/public/animations/ux-design.json";
import mobileDevAnimationRaw from "@/public/animations/mobile-dev.json";
import faceIdAnimationRaw from "@/public/animations/face-id.json";

// ─── COLOR REMAPPING ENGINE ────────────────────────────────────────────────
// Maps exact original hex colors to new ones. Unlisted colors stay as-is.

function hex2rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function rgb2hex(r: number, g: number, b: number): string {
  return "#" + [r, g, b]
    .map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0"))
    .join("");
}

function recolorMap(raw: unknown, map: Record<string, string>): unknown {
  const clone = JSON.parse(JSON.stringify(raw));
  // pre-parse target colors to rgb
  const lookup: Record<string, [number, number, number]> = {};
  for (const [from, to] of Object.entries(map)) {
    lookup[from.toLowerCase()] = hex2rgb(to);
  }

  function remap(r: number, g: number, b: number): [number, number, number] | null {
    return lookup[rgb2hex(r, g, b)] ?? null;
  }

  function process(obj: unknown): void {
    if (typeof obj !== "object" || obj === null) return;
    if (Array.isArray(obj)) { obj.forEach(process); return; }
    const o = obj as Record<string, unknown>;
    const c = o["c"] as Record<string, unknown> | null | undefined;
    if (c && typeof c === "object") {
      if (c["a"] === 0 && Array.isArray(c["k"]) && typeof (c["k"] as unknown[])[0] === "number") {
        const k = c["k"] as number[];
        const mapped = remap(k[0], k[1], k[2]);
        if (mapped) c["k"] = [...mapped, k[3] ?? 1];
      }
      if (c["a"] === 1 && Array.isArray(c["k"])) {
        (c["k"] as unknown[]).forEach((kf) => {
          const frame = kf as Record<string, unknown>;
          if (Array.isArray(frame["s"])) {
            const s = frame["s"] as number[];
            const mapped = remap(s[0], s[1], s[2]);
            if (mapped) frame["s"] = [...mapped, s[3] ?? 1];
          }
        });
      }
    }
    Object.values(o).forEach(process);
  }

  process(clone);
  return clone;
}

// ─── PER-ANIMATION PALETTES ────────────────────────────────────────────────

const WEB_MAP: Record<string, string> = {
  "#00caae": "#00D4BE", // teal → brighter vivid teal
  "#ffec36": "#F85900", // yellow → brand orange
  "#1a1a1a": "#111111",
};

const UX_MAP: Record<string, string> = {
  "#4a3ed0": "#8B5CF6", // indigo → vivid violet
  "#455a64": "#1E3A52",
  "#37474f": "#162F45",
  "#263238": "#0F2438",
};

const MOBILE_MAP: Record<string, string> = {
  "#ff9f24": "#F85900",
  "#ff6a5f": "#F97316",
  "#fe685e": "#F97316",
  "#ff795c": "#F85900",
  "#ff625a": "#F85900",
  "#ff6159": "#F85900",
  "#f46a59": "#F97316",
  "#ff7a6a": "#FB923C",
  "#fe9a5e": "#FDBA74",
  "#ffd6a6": "#FED7AA",
  "#fff3e4": "#FFF7ED",
  "#ffebd2": "#FFEDD5",
  "#ffdfba": "#FEF3C7",
  "#e84857": "#F43F5E",
  "#ff6d7a": "#FB7185",
  "#fe4f60": "#F43F5E",
  "#009cdf": "#0EA5E9",
  "#6bc5e8": "#38BDF8",
  "#3a9ec1": "#0284C7",
  "#c9e8f3": "#BAE6FD",
  "#dbeeff": "#E0F2FE",
  "#d747de": "#C026D3",
  "#5762df": "#6366F1",
  "#6379e4": "#818CF8",
  "#637be5": "#818CF8",
  "#6278e4": "#6366F1",
  "#5a69e0": "#6366F1",
  "#e4e7f8": "#EEF2FF",
  "#0e4356": "#0C2340",
  "#283c5a": "#1E3A5F",
  "#3d4962": "#2D3F62",
};

// face-id is a near-black silhouette → recolor shapes to brand orange
// so it glows like an orange face-scan on dark background
const FACEID_MAP: Record<string, string> = {
  "#252525": "#F85900",
};

// ─── PRE-PROCESS ANIMATIONS ───────────────────────────────────────────────
const ANIMS = {
  web:         recolorMap(webDesignAnimationRaw,  WEB_MAP),
  design:      recolorMap(uxDesignAnimationRaw,   UX_MAP),
  mobile:      recolorMap(mobileDevAnimationRaw,  MOBILE_MAP),
  performance: recolorMap(faceIdAnimationRaw,     FACEID_MAP),
} as Record<string, unknown>;

// ─── CARD ACCENT COLORS ────────────────────────────────────────────────────
const ACCENTS: Record<string, { color: string; rgb: string }> = {
  web:         { color: "#00D4BE", rgb: "0,212,190"   },
  design:      { color: "#8B5CF6", rgb: "139,92,246"  },
  mobile:      { color: "#F85900", rgb: "248,89,0"    },
  performance: { color: "#F85900", rgb: "248,89,0"    },
};

// ─── DATA ──────────────────────────────────────────────────────────────────
// scale: controls Lottie container width — compensates for different
// intrinsic aspect ratios (web=16:9 wide, ux=portrait, mobile/face=square)
const SERVICES = [
  { key: "web",         num: "01", tags: ["React", "Next.js"], scale: "95%" },
  { key: "design",      num: "02", tags: [],                   scale: "37%" },
  { key: "mobile",      num: "03", tags: [],                   scale: "76%" },
  { key: "performance", num: "04", tags: [],                   scale: "35%" },
] as const;

// ─── COMPONENT ─────────────────────────────────────────────────────────────
export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 overflow-hidden" aria-label="Services">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(248,89,0,0.025) 0%, transparent 80%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
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
            style={{ color: "#F5F5F7" }}
          >
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base max-w-md leading-relaxed" style={{ color: "#A09E9E" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Grid: 1 col mobile → 2 col tablet+ ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((s, idx) => {
            const accent = ACCENTS[s.key];
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.09 }}
              >
                <GlassCard className="group h-full flex flex-col relative overflow-hidden p-0 border-white/5 transition-all duration-500">

                  {/* ── Colored top strip (always visible) ── */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-10"
                    style={{ background: `linear-gradient(to right, ${accent.color}, rgba(${accent.rgb},0.2), transparent)` }}
                  />

                  {/* ── Animation area ── */}
                  <div className="relative w-full h-[200px] sm:h-[220px] flex items-center justify-center overflow-hidden">
                    {/* Static ambient glow (always on, subtle) */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 50% 80%, rgba(${accent.rgb},0.07) 0%, transparent 65%)` }}
                    />
                    {/* Stronger glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(${accent.rgb},0.18) 0%, transparent 65%)` }}
                    />
                    {/* Lottie — width tuned per animation aspect ratio */}
                    <div
                      className="relative z-10 transition-transform duration-700 group-hover:scale-105"
                      style={{ width: s.scale, maxWidth: "240px" }}
                    >
                      <Lottie animationData={ANIMS[s.key]} loop autoplay />
                    </div>
                    {/* Watermark number */}
                    <span
                      className="absolute bottom-2 right-4 font-heading font-black leading-none select-none pointer-events-none"
                      style={{ fontSize: "4rem", color: accent.color, opacity: 0.12 }}
                    >
                      {s.num}
                    </span>
                  </div>

                  {/* ── Divider ── */}
                  <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(to right, rgba(${accent.rgb},0.4), rgba(${accent.rgb},0.05), transparent)` }}
                  />

                  {/* ── Text ── */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7">
                    {/* Number badge */}
                    <span
                      className="text-[10px] font-mono font-bold mb-4 block"
                      style={{ color: accent.color, opacity: 0.7 }}
                    >
                      {s.num}
                    </span>
                    <h3
                      className="font-heading font-bold text-xl sm:text-2xl mb-2.5 tracking-tight"
                      style={{ color: "#F5F5F7" }}
                    >
                      {t(`items.${s.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#A09E9E" }}>
                      {t(`items.${s.key}.description`)}
                    </p>

                    {s.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
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

                  {/* ── Bottom accent line on hover ── */}
                  <div
                    className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700"
                    style={{ background: `linear-gradient(to right, ${accent.color}, transparent)` }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
