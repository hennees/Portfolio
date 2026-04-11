"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── CODE EDITOR ─────────────────────────────────────────────────────────────

type Token = { t: string; c: string };
const kw  = (t: string): Token => ({ t, c: "rgba(248,89,0,0.75)" });
const id  = (t: string): Token => ({ t, c: "#F5F5F7" });
const str = (t: string): Token => ({ t, c: "#FF9432" });
const op  = (t: string): Token => ({ t, c: "#8B9099" });
const cmt = (t: string): Token => ({ t, c: "rgba(160,158,158,0.4)" });
const bl  = (t: string): Token => ({ t, c: "#22C55E" });

// null = empty line
const CODE: (Token[] | null)[] = [
  [cmt("// henUX.at — patrick.ts")],
  null,
  [kw("type "), id("Stack"), op(" = "), str("'Swift'"), op(" | "), str("'Kotlin'"), op(" | "), str("'Flutter'"), op(" | "), str("'Next.js'")],
  [kw("type "), id("Focus"), op(" = "), str("'eHealth'"), op(" | "), str("'UI/UX'"), op(" | "), str("'Mobile'")],
  null,
  [kw("const "), str("patrick"), op(" = {")],
  [op("  name: "),            str("'Patrick Hennes'"),         op(",")],
  [op("  location: "),        str("'Graz, Austria'"),           op(",")],
  [op("  studying: "),        str("'eHealth @ FH Joanneum'"),   op(",")],
  [op("  stack: "),           id("Stack[]"),                    op(",")],
  [op("  focus: "),           id("Focus"),                      op(",")],
  [op("  aiPowered: "),       bl("true"),                       op(",")],
  [op("  available: "),       bl("true"),                       op(",")],
  [op("}")],
  null,
  [cmt("// ready to build something?")],
];

const lineVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
};

const ACTIVE_LINE = 5; // "const patrick = {" — highlighted

function CodeEditor() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(14,15,16,0.85)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(20,20,22,0.8)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        </div>
        <div className="flex items-center gap-1 ml-2 px-3 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#F5F5F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[10px]" style={{ color: "#6B7280" }}>patrick.ts</span>
        </div>
      </div>

      {/* Code lines */}
      <motion.div
        className="px-0 py-4 font-mono text-[11px] sm:text-xs leading-6 overflow-x-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055 } } }}
      >
        {CODE.map((line, i) => (
          <motion.div
            key={i}
            variants={lineVariants}
            className="flex items-center gap-0 pr-4 relative"
            style={{
              background: i === ACTIVE_LINE ? "rgba(248,89,0,0.05)" : "transparent",
              borderLeft: i === ACTIVE_LINE ? "2px solid rgba(248,89,0,0.4)" : "2px solid transparent",
            }}
          >
            {/* Line number */}
            <span
              className="select-none text-right shrink-0 w-8 px-2"
              style={{ color: i === ACTIVE_LINE ? "rgba(248,89,0,0.4)" : "#2E2E34" }}
            >
              {i + 1}
            </span>
            {/* Tokens */}
            <span className="whitespace-pre">
              {line === null
                ? "\u00A0"
                : line.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                  ))}
            </span>
          </motion.div>
        ))}

        {/* Hire line — interactive */}
        <motion.div variants={lineVariants} className="flex items-center gap-0 pr-4">
          <span className="select-none text-right shrink-0 w-8 px-2" style={{ color: "#2E2E34" }}>
            {CODE.length + 1}
          </span>
          <a
            href="#contact"
            className="group whitespace-pre cursor-pointer"
            aria-label="Hire Patrick — jump to contact"
          >
            <span style={{ color: "#FF9432" }} className="group-hover:underline underline-offset-2">hire</span>
            <span style={{ color: "#6B7280" }}>(</span>
            <span style={{ color: "#FF9432" }} className="group-hover:underline underline-offset-2">patrick</span>
            <span style={{ color: "#6B7280" }}>)</span>
            <span
              className="inline-block w-[5px] h-[13px] ml-0.5 rounded-sm animate-blink align-middle"
              style={{ background: "#F85900" }}
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(248,89,0,0.07)" }}
      >
        <span className="font-mono text-[9px]" style={{ color: "rgba(248,89,0,0.5)" }}>TypeScript</span>
        <span className="font-mono text-[9px]" style={{ color: "rgba(160,158,158,0.35)" }}>UTF-8</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />
          <span className="font-mono text-[9px]" style={{ color: "rgba(34,197,94,0.6)" }}>available</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative py-24 px-6"
      aria-label="About Patrick Hennes"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--c-surface-1)", opacity: 0.2 }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(248,89,0,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#F85900" }}>
            About
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "var(--c-text-primary)", letterSpacing: "-0.02em" }}
          >
            {t("title")}
          </h2>
          <p className="text-base" style={{ color: "var(--c-text-muted)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Main content: split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text + stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="flex flex-col gap-6"
          >
            {[t("bio1"), t("bio2"), t("bio3")].map((bio, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: i === 0 ? "var(--c-text-primary)" : "var(--c-text-muted)" }}
              >
                {bio}
              </motion.p>
            ))}

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              {(["experience", "projects"] as const).map((statKey) => {
                const rawValue = t(`stat_values.${statKey}`) as string;
                const numericPart = parseInt(rawValue);
                const suffix = rawValue.replace(/[0-9]/g, "");
                return (
                  <div
                    key={statKey}
                    className="flex flex-col items-center gap-1 p-4 rounded-2xl text-center"
                    style={{
                      background: "var(--c-glass-bg)",
                      border: "1px solid var(--c-border)",
                    }}
                  >
                    <span className="font-heading font-black text-2xl sm:text-3xl gradient-text">
                      <AnimatedCounter target={numericPart} suffix={suffix} />
                    </span>
                    <span className="text-xs font-medium text-center leading-tight" style={{ color: "var(--c-text-muted)" }}>
                      {t(`stats.${statKey}`)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: code editor */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <CodeEditor />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
