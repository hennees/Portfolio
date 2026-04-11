"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { FileCode, ShieldCheck, Zap, Copy, Check } from "lucide-react";

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

// ─── TYPES & TOKENS ──────────────────────────────────────────────────────────

type Token = { t: string; c: string; lightC?: string };
const kw  = (t: string): Token => ({ t, c: "rgba(248,89,0,0.85)", lightC: "#E65100" });
const id  = (t: string): Token => ({ t, c: "#F5F5F7", lightC: "#0E0F10" });
const str = (t: string): Token => ({ t, c: "#FF9432", lightC: "#F57C00" });
const op  = (t: string): Token => ({ t, c: "#8B9099", lightC: "#64748B" });
const cmt = (t: string): Token => ({ t, c: "rgba(160,158,158,0.4)", lightC: "#94A3B8" });
const bl  = (t: string): Token => ({ t, c: "#22C55E", lightC: "#16A34A" });

type FileContent = {
  name: string;
  lang: string;
  icon: React.ReactNode;
  lines: (Token[] | null)[];
};

const FILES: FileContent[] = [
  {
    name: "patrick.ts",
    lang: "TypeScript",
    icon: <FileCode size={14} />,
    lines: [
      [cmt("// henUX.at — Profile")],
      null,
      [kw("type "), id("Stack"), op(" = "), str("'Swift'"), op(" | "), str("'Next.js'")],
      [kw("type "), id("Focus"), op(" = "), str("'eHealth'"), op(" | "), str("'UX'")],
      null,
      [kw("const "), str("patrick"), op(" = {")],
      [op("  role: "), str("'Designer & Developer'"), op(",")],
      [op("  location: "), str("'Graz, Austria'"), op(",")],
      [op("  studying: "), str("'eHealth @ FH Joanneum'"), op(",")],
      [op("  stack: "), id("Stack[]"), op(",")],
      [op("  aiReady: "), bl("true"), op(",")],
      [op("}")],
    ]
  },
  {
    name: "HeartRate.swift",
    lang: "Swift",
    icon: <Zap size={14} />,
    lines: [
      [cmt("// HealthKit Integration")],
      [kw("import "), id("HealthKit")],
      null,
      [kw("struct "), id("HeartView"), op(": "), id("View"), op(" {")],
      [kw("  var "), id("body"), op(": "), kw("some "), id("View"), op(" {")],
      [id("    VStack"), op(" {")],
      [id("      Text"), op("("), str("\"Live Pulse\""), op(")")],
      [id("        .font"), op("("), id(".title"), op(")")],
      [id("        .foregroundColor"), op("("), id(".orange"), op(")")],
      [id("    }")],
      [id("  }")],
      [op("}")],
    ]
  },
  {
    name: "theme.css",
    lang: "CSS",
    icon: <ShieldCheck size={14} />,
    lines: [
      [cmt("/* Fluid Design System */")],
      [id(":root"), op(" {")],
      [id("  --c-accent"), op(": "), str("#F85900"), op(";")],
      [id("  --glass-blur"), op(": "), str("24px"), op(";")],
      [op("}")],
      null,
      [id(".card"), op(" {")],
      [id("  background"), op(": "), id("var"), op("("), id("--c-bg"), op(")"), op(";")],
      [id("  transition"), op(": "), str("all 0.3s ease"), op(";")],
      [op("}")],
    ]
  }
];

// ─── TYPEWRITER COMPONENT ────────────────────────────────────────────────────

function TypewriterLine({ tokens, isDark }: { tokens: Token[] | null, isDark: boolean }) {
  if (!tokens) return <div className="h-6" />;
  
  return (
    <div className="flex flex-wrap">
      {tokens.map((tok, j) => (
        <motion.span
          key={j}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: j * 0.05 }}
          style={{ color: isDark ? tok.c : (tok.lightC || tok.c) }}
        >
          {tok.t}
        </motion.span>
      ))}
    </div>
  );
}

// ─── CODE EDITOR ─────────────────────────────────────────────────────────────

function CodeEditor() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const activeFile = FILES[activeFileIdx];
  
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const copyCode = () => {
    const text = activeFile.lines
      .map(l => l ? l.map(t => t.t).join("") : "")
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden transition-all duration-500 group/editor"
      onMouseMove={handleMouseMove}
      style={{
        background: isDark ? "rgba(14,15,16,0.85)" : "rgba(255,255,255,0.75)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
        backdropFilter: "blur(32px)",
        boxShadow: isDark 
          ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
      }}
    >
      {/* Mouse Glow */}
      <div 
        className="absolute pointer-events-none opacity-0 group-hover/editor:opacity-100 transition-opacity duration-500 z-0"
        style={{
          width: 400,
          height: 400,
          left: glowPos.x - 200,
          top: glowPos.y - 200,
          background: `radial-gradient(circle, ${isDark ? "rgba(248,89,0,0.08)" : "rgba(248,89,0,0.04)"} 0%, transparent 70%)`,
        }}
      />

      {/* Header / Tabs */}
      <div
        className="relative z-10 flex items-center justify-between px-4 pt-3 pb-0"
        style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, background: isDark ? "rgba(20,20,22,0.4)" : "rgba(248,248,250,0.3)" }}
      >
        <div className="flex gap-1.5 items-center mb-3">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]/80" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]/80" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]/80" />
          </div>
          
          <div className="flex gap-1">
            {FILES.map((file, i) => (
              <button
                key={file.name}
                onClick={() => setActiveFileIdx(i)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-[10px] font-medium transition-all duration-200"
                style={{
                  background: activeFileIdx === i ? (isDark ? "rgba(255,255,255,0.05)" : "#fff") : "transparent",
                  color: activeFileIdx === i ? (isDark ? "#F5F5F7" : "#0E0F10") : "#64748B",
                  border: activeFileIdx === i ? `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}` : "1px solid transparent",
                  borderBottom: activeFileIdx === i ? `1px solid ${isDark ? "#121315" : "#fff"}` : "none",
                  marginBottom: "-1px"
                }}
              >
                <span style={{ color: activeFileIdx === i ? "#F85900" : "inherit" }}>{file.icon}</span>
                {file.name}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={copyCode}
          className="mb-3 p-1.5 rounded-md hover:bg-white/10 transition-colors"
          style={{ color: "#64748B" }}
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative z-10 px-0 py-5 font-mono text-[11px] sm:text-xs leading-6 overflow-x-auto min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFile.name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {activeFile.lines.map((line, i) => (
              <div key={i} className="flex items-start group/line">
                <span className="select-none text-right shrink-0 w-10 px-3 opacity-20 group-hover/line:opacity-50 transition-opacity">
                  {i + 1}
                </span>
                <TypewriterLine tokens={line} isDark={isDark} />
              </div>
            ))}
            
            {/* Interactive Cursor line */}
            <div className="flex items-center mt-2">
              <span className="select-none text-right shrink-0 w-10 px-3 opacity-20">{activeFile.lines.length + 1}</span>
              <span className="text-[#F85900] font-bold">hire</span>
              <span className="opacity-40">(</span>
              <span className="text-[#F85900] font-bold underline">patrick</span>
              <span className="opacity-40">)</span>
              <span className="w-1.5 h-4 bg-[#F85900] ml-1 rounded-sm animate-blink" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer / Status */}
      <div
        className="relative z-10 flex items-center justify-between px-4 py-2 text-[9px] uppercase tracking-widest font-bold"
        style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, background: isDark ? "rgba(248,89,0,0.03)" : "rgba(248,89,0,0.02)" }}
      >
        <div className="flex gap-4">
          <span style={{ color: "#F85900" }}>{activeFile.lang}</span>
          <span style={{ color: "#64748B" }}>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span style={{ color: isDark ? "#F5F5F7" : "#0E0F10" }}>Ready to Build</span>
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
    <section id="about" className="relative py-24 px-6 overflow-hidden" aria-label="About Patrick Hennes">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] -top-24 -right-24 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute w-[400px] h-[400px] -bottom-24 -left-24 rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-accent">About</span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter mb-6 text-text-primary">
            {t("title")}
          </h2>
          <p className="text-lg max-w-2xl text-text-muted leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Content */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-6"
            >
              {[t("bio1"), t("bio2"), t("bio3")].map((bio, i) => (
                <motion.p key={i} variants={fadeUp} className="text-lg text-text-muted leading-relaxed">
                  {bio}
                </motion.p>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {(["experience", "projects"] as const).map((statKey) => {
                const rawValue = t(`stat_values.${statKey}`) as string;
                const numericPart = parseInt(rawValue);
                const suffix = rawValue.replace(/[0-9]/g, "");
                return (
                  <div key={statKey} className="glass p-6 rounded-3xl flex flex-col items-center text-center">
                    <span className="text-4xl font-black gradient-text mb-1">
                      <AnimatedCounter target={numericPart} suffix={suffix} />
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-text-muted">{t(`stats.${statKey}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Premium Editor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <CodeEditor />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
