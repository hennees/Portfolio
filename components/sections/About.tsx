"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { 
  FileCode, Zap, ShieldCheck, Copy, Check, 
  ChevronRight, Folder, Search,
  Terminal, Monitor, Cpu
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

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

// ─── CODE EDITOR DATA ────────────────────────────────────────────────────────

type Token = { t: string; c: string; lightC?: string };
const kw  = (t: string): Token => ({ t, c: "#F85900", lightC: "#E65100" }); // keywords
const id  = (t: string): Token => ({ t, c: "#F5F5F7", lightC: "#0E0F10" }); // identifiers
const str = (t: string): Token => ({ t, c: "#FF9432", lightC: "#F57C00" }); // strings
const op  = (t: string): Token => ({ t, c: "#8B9099", lightC: "#64748B" }); // operators
const cmt = (t: string): Token => ({ t, c: "rgba(160,158,158,0.4)", lightC: "#94A3B8" }); // comments
const bl  = (t: string): Token => ({ t, c: "#22C55E", lightC: "#16A34A" }); // boolean/special

type FileContent = {
  name: string;
  lang: string;
  icon: React.ReactNode;
  lines: (Token[] | null)[];
};

const FILES: FileContent[] = [
  {
    name: "Profile.ts",
    lang: "TypeScript",
    icon: <FileCode size={14} className="text-blue-400" />,
    lines: [
      [cmt("// henUX.at — Developer Profile")],
      null,
      [kw("interface "), id("Developer"), op(" {")],
      [id("  name: "), str("'Patrick Hennes'") , op(";")],
      [id("  focus: "), str("'eHealth & UX'") , op(";")],
      [id("  stack: "), id("string[]"), op(";")],
      [op("}")],
      null,
      [kw("const "), id("me"), op(": "), id("Developer"), op(" = {")],
      [id("  stack: "), op("["), str("'Next.js'"), op(", "), str("'Flutter'"), op(", "), str("'Swift'"), op("],")],
      [id("  aiPowered: "), bl("true"), op(",")],
      [id("  available: "), bl("true")],
      [op("};")],
    ]
  },
  {
    name: "LiveMetrics.swift",
    lang: "Swift",
    icon: <Zap size={14} className="text-orange-400" />,
    lines: [
      [cmt("// Real-time Patient Data")],
      [kw("import "), id("HealthKit")],
      [kw("import "), id("SwiftUI")],
      null,
      [kw("struct "), id("MetricsView"), op(": "), id("View"), op(" {")],
      [kw("  var "), id("body"), op(": "), kw("some "), id("View"), op(" {")],
      [id("    VStack"), op(" {")],
      [id("      HeartRateChart"), op("("), id("bpm: "), id("currentPulse"), op(")")],
      [id("        .padding"), op("()")],
      [id("        .accentColor"), op("("), id(".orange"), op(")")],
      [id("    }")],
      [id("  }")],
      [op("}")],
    ]
  },
  {
    name: "DesignSystem.css",
    lang: "CSS",
    icon: <ShieldCheck size={14} className="text-emerald-400" />,
    lines: [
      [cmt("/* Fluid UI Definition */")],
      [id(":root"), op(" {")],
      [id("  --brand-orange"), op(": "), str("#F85900"), op(";")],
      [id("  --glass-blur"), op(": "), str("24px"), op(";")],
      [op("}")],
      null,
      [id(".premium-card"), op(" {")],
      [id("  backdrop-filter"), op(": "), id("blur"), op("("), id("var"), op("("), id("--glass-blur"), op(")"), op(");")],
      [id("  border"), op(": "), str("1px solid rgba(255,255,255,0.1)"), op(";")],
      [op("}")],
    ]
  }
];

// ─── TYPEWRITER LINE ─────────────────────────────────────────────────────────

function TypewriterLine({ tokens, isDark, lineIdx }: { tokens: Token[] | null, isDark: boolean, lineIdx: number }) {
  if (!tokens) return <div className="h-6" />;
  
  return (
    <div className="flex flex-wrap">
      {tokens.map((tok, j) => (
        <motion.span
          key={j}
          initial={{ opacity: 0, x: -2 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: (lineIdx * 0.05) + (j * 0.03) }}
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
  const [explorerOpen, setExplorerOpen] = useState(true);
  const activeFile = FILES[activeFileIdx];
  
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

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
      className="relative w-full rounded-2xl overflow-hidden transition-all duration-500 group/editor flex flex-col"
      onMouseMove={handleMouseMove}
      style={{
        background: isDark ? "rgba(10,11,12,0.8)" : "rgba(255,255,255,0.85)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"}`,
        backdropFilter: "blur(40px)",
        boxShadow: isDark 
          ? "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02)",
      }}
    >
      {/* ─── TITLE BAR ─── */}
      <div 
        className="flex items-center justify-between px-4 h-10 select-none border-b"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", background: isDark ? "rgba(0,0,0,0.3)" : "rgba(240,240,245,0.5)" }}
      >
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="ml-4 text-[10px] font-medium tracking-wide opacity-40 uppercase">henUX IDE v2.0</span>
        </div>
        <div className="flex gap-4 opacity-40">
          <Search size={14} />
          <FaGithub size={14} />
        </div>
      </div>

      <div className="flex flex-1 min-h-[400px]">
        {/* ─── EXPLORER SIDEBAR ─── */}
        <motion.div 
          animate={{ width: explorerOpen ? 180 : 48 }}
          className="border-r overflow-hidden flex flex-col"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", background: isDark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.02)" }}
        >
          <div className="flex flex-col pt-4">
            <button 
              onClick={() => setExplorerOpen(!explorerOpen)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 transition-colors w-full text-left"
            >
              <motion.div animate={{ rotate: explorerOpen ? 90 : 0 }}><ChevronRight size={14} /></motion.div>
              {explorerOpen && <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Explorer</span>}
            </button>
            
            <AnimatePresence>
              {explorerOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2">
                  <div className="flex items-center gap-2 px-6 py-1 opacity-40 text-[10px] mb-2">
                    <Folder size={12} /> <span>portfolio-v2</span>
                  </div>
                  {FILES.map((file, i) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveFileIdx(i)}
                      className="flex items-center gap-2 px-8 py-2 w-full text-left group/item transition-colors"
                      style={{ 
                        background: activeFileIdx === i ? (isDark ? "rgba(248,89,0,0.1)" : "rgba(248,89,0,0.05)") : "transparent",
                        color: activeFileIdx === i ? "#F85900" : "inherit"
                      }}
                    >
                      <span className="opacity-70 group-hover/item:opacity-100">{file.icon}</span>
                      <span className="text-[11px] font-medium truncate">{file.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── MAIN EDITOR AREA ─── */}
        <div className="flex-1 flex flex-col relative">
          {/* TABS */}
          <div className="flex bg-black/5 dark:bg-black/20 h-9">
            {FILES.map((file, i) => (
              <button
                key={file.name}
                onClick={() => setActiveFileIdx(i)}
                className="flex items-center gap-2 px-4 h-full text-[10px] font-medium border-r relative"
                style={{
                  background: activeFileIdx === i ? (isDark ? "rgba(10,11,12,1)" : "#fff") : "transparent",
                  borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  color: activeFileIdx === i ? (isDark ? "#fff" : "#000") : "rgba(128,128,128,0.5)",
                }}
              >
                {activeFileIdx === i && <motion.div layoutId="tab-active" className="absolute top-0 left-0 right-0 h-[2px] bg-[#F85900]" />}
                {file.icon}
                {file.name}
              </button>
            ))}
          </div>

          {/* CODE CONTENT */}
          <div className="flex-1 relative overflow-auto font-mono text-[11px] sm:text-xs leading-6 py-6 group/lines">
            {/* Mouse Glow */}
            <div 
              className="absolute pointer-events-none opacity-0 group-hover/editor:opacity-100 transition-opacity duration-500 z-0"
              style={{
                width: 500,
                height: 500,
                left: glowPos.x - 400,
                top: glowPos.y - 250,
                background: `radial-gradient(circle, ${isDark ? "rgba(248,89,0,0.12)" : "rgba(248,89,0,0.06)"} 0%, transparent 70%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {activeFile.lines.map((line, i) => (
                  <div 
                    key={i} 
                    className="flex items-start transition-colors duration-150"
                    onMouseEnter={() => setHoveredLine(i)}
                    onMouseLeave={() => setHoveredLine(null)}
                    style={{ background: hoveredLine === i ? (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)") : "transparent" }}
                  >
                    <span className="select-none text-right shrink-0 w-12 px-4 opacity-20 font-mono text-[10px]">
                      {i + 1}
                    </span>
                    <TypewriterLine tokens={line} isDark={isDark} lineIdx={i} />
                  </div>
                ))}
                
                {/* HIRE PROMPT */}
                <div className="flex items-center mt-4">
                  <span className="select-none text-right shrink-0 w-12 px-4 opacity-20 text-[10px]">{activeFile.lines.length + 1}</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 ml-1">
                    <span className="text-[#F85900] font-bold">hire</span>
                    <span className="opacity-40">(</span>
                    <a href="#contact" className="text-[#F85900] font-bold underline hover:text-orange-400 transition-colors">patrick</a>
                    <span className="opacity-40">)</span>
                    <span className="w-1 h-4 bg-[#F85900] animate-blink" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── TERMINAL / STATUS ─── */}
          <div 
            className="h-24 border-t flex flex-col"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", background: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.03)" }}
          >
            <div className="flex items-center gap-2 px-4 h-8 opacity-40 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
              <Terminal size={12} /> <span className="text-[9px] font-bold uppercase tracking-wider">Output</span>
            </div>
            <div className="p-3 font-mono text-[10px] space-y-1">
              <div className="flex gap-2">
                <span className="text-green-500">✔</span>
                <span className="opacity-60">Build process complete. All modules optimized.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-500">ℹ</span>
                <span className="opacity-60">Deployment target: henux.at — status: </span>
                <span className="text-green-500 font-bold animate-pulse">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FOOTER BAR ─── */}
      <div 
        className="h-6 border-t px-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-tighter"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", background: isDark ? "#F85900" : "#F85900", color: "#000" }}
      >
        <div className="flex gap-4">
          <div className="flex items-center gap-1"><Monitor size={10} /> <span>Main</span></div>
          <div className="flex items-center gap-1"><Cpu size={10} /> <span>{activeFile.lang}</span></div>
        </div>
        <div className="flex gap-4">
          <span>UTF-8</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Copy Button Floating */}
      <button 
        onClick={copyCode}
        className="absolute top-12 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all z-30"
        style={{ color: isDark ? "#fff" : "#000" }}
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="opacity-40" />}
      </button>
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
    <section id="about" className="relative py-32 px-6 overflow-hidden" aria-label="About Patrick Hennes">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(248,89,0,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: CONTENT (5 columns) */}
          <div className="lg:col-span-5 pt-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <div>
                <motion.span variants={fadeUp} className="text-accent font-mono text-sm tracking-[0.3em] font-bold mb-4 block">
                  ./whoami
                </motion.span>
                <motion.h2 variants={fadeUp} className="font-heading font-black text-5xl md:text-7xl tracking-tighter mb-8 text-text-primary leading-[0.9]">
                  {t("title")}
                </motion.h2>
              </div>

              <div className="space-y-6">
                {[t("bio1"), t("bio2"), t("bio3")].map((bio, i) => (
                  <motion.p key={i} variants={fadeUp} className="text-lg text-text-muted leading-relaxed max-w-xl">
                    {bio}
                  </motion.p>
                ))}
              </div>

              {/* Enhanced Stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6 pt-8">
                {(["experience", "projects"] as const).map((statKey) => {
                  const rawValue = t(`stat_values.${statKey}`) as string;
                  const numericPart = parseInt(rawValue);
                  const suffix = rawValue.replace(/[0-9]/g, "");
                  return (
                    <div key={statKey} className="group relative">
                      <div className="absolute -inset-2 bg-accent/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative p-6 rounded-3xl border border-white/5 bg-white/[0.02] dark:bg-black/20 backdrop-blur-sm">
                        <span className="text-5xl font-black gradient-text block mb-2">
                          <AnimatedCounter target={numericPart} suffix={suffix} />
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-text-muted opacity-60">
                          {t(`stats.${statKey}`)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: THE IDE (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 perspective-1000"
          >
            <div className="relative group">
              {/* Decorative elements behind the editor */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent/20 to-transparent rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CodeEditor />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F85900] text-black shadow-2xl shadow-orange-500/20 z-40"
              >
                <div className="p-2 rounded-full bg-black/10"><Zap size={18} fill="currentColor" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase leading-none opacity-60">Status</span>
                  <span className="text-sm font-bold leading-tight">Ready to Code</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
