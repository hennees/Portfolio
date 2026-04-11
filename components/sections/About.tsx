"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { 
  FileCode, User, Target, Copy, Check, 
  Terminal, Monitor, Cpu, Sparkles
} from "lucide-react";

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
const bl  = (t: string): Token => ({ t, c: "#22C55E", lightC: "#16A34A" }); // boolean

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
    icon: <User size={14} className="text-blue-400" />,
    lines: [
      [cmt("// Profile: Patrick Hennes")],
      [kw("const "), id("developer"), op(" = {" )],
      [id("  identity: "), str("'Human-Centered Engineer'") , op(",")],
      [id("  currentRole: "), str("'Freelance UI/UX & eHealth Dev'") , op(",")],
      [id("  base: "), str("'Graz, Austria'") , op(",")],
      null,
      [id("  focusArea: "), op("{")],
      [id("    sector: "), str("'Digital Health'") , op(",")],
      [id("    specialty: "), str("'FHIR & UX Consistency'") ],
      [id("  }"), op(",")],
      null,
      [id("  available: "), bl("true"), op(",")],
      [id("  passions: "), op("["), str("'Clean UI'"), op(", "), str("'Accessibility'"), op("]")],
      [op("};")],
    ]
  },
  {
    name: "mission.ts",
    lang: "TypeScript",
    icon: <Target size={14} className="text-orange-400" />,
    lines: [
      [cmt("// The Mission: Bridging the Gap")],
      [kw("function "), id("buildImpactfulSoftware"), op("() {")],
      [kw("  return "), op("{")],
      [id("    vision: "), str("'Seamless Healthcare Tech'") , op(",")],
      [id("    approach: "), str("'UX-Driven Development'") , op(",")],
      null,
      [cmt("// Core Pillars")],
      [id("    pillars: "), op("[")],
      [id("      "), str("'Interoperability (HL7/FHIR)'") , op(",")],
      [id("      "), str("'Scalable Design Systems'") , op(",")],
      [id("      "), str("'Pixel-Perfect Execution'")],
      [id("    ]")],
      [op("  };")],
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: (lineIdx * 0.05) + (j * 0.02) }}
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
      className="relative w-full rounded-2xl overflow-hidden transition-all duration-500 flex flex-col"
      style={{
        background: isDark ? "rgba(10,11,12,0.85)" : "rgba(255,255,255,0.85)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
        backdropFilter: "blur(40px)",
        boxShadow: isDark 
          ? "0 40px 100px rgba(0,0,0,0.7)"
          : "0 20px 60px rgba(0,0,0,0.08)",
      }}
    >
      {/* TITLE BAR (Simpler) */}
      <div 
        className="flex items-center justify-between px-4 h-10 select-none border-b"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", background: isDark ? "rgba(0,0,0,0.2)" : "rgba(240,240,245,0.3)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        </div>
        <div className="flex gap-1 items-center opacity-40 font-mono text-[9px] uppercase tracking-widest">
          <Sparkles size={10} /> <span>Portfolio IDE</span>
        </div>
        <button onClick={copyCode} className="opacity-40 hover:opacity-100 transition-opacity">
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </button>
      </div>

      {/* TABS */}
      <div className="flex bg-black/5 h-9 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
        {FILES.map((file, i) => (
          <button
            key={file.name}
            onClick={() => setActiveFileIdx(i)}
            className="flex items-center gap-2 px-4 h-full text-[10px] font-bold border-r relative"
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
      <div className="flex-1 font-mono text-[11px] sm:text-xs leading-6 py-6 overflow-x-auto min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFile.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeFile.lines.map((line, i) => (
              <div key={i} className="flex items-start">
                <span className="select-none text-right shrink-0 w-10 px-3 opacity-20 text-[10px]">
                  {i + 1}
                </span>
                <TypewriterLine tokens={line} isDark={isDark} lineIdx={i} />
              </div>
            ))}
            
            {/* HIRE BUTTON */}
            <div className="flex items-center mt-6">
              <span className="select-none text-right shrink-0 w-10 px-3 opacity-20 text-[10px]">{activeFile.lines.length + 1}</span>
              <a 
                href="#contact" 
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F85900]/10 border border-[#F85900]/20 text-[#F85900] text-[10px] font-bold hover:bg-[#F85900]/20 transition-all ml-1"
              >
                <span>hire_patrick.sh</span>
                <span className="w-1 h-3 bg-[#F85900] animate-blink" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STATUS BAR */}
      <div 
        className="h-6 px-4 flex items-center justify-between text-[8px] font-bold uppercase tracking-widest border-t"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", background: "#F85900", color: "#000" }}
      >
        <div className="flex gap-4">
          <div className="flex items-center gap-1"><Monitor size={10} /> <span>Ready</span></div>
          <div className="flex items-center gap-1"><Cpu size={10} /> <span>{activeFile.lang}</span></div>
        </div>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(248,89,0,0.03),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* TEXT CONTENT */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <div>
                <motion.span variants={fadeUp} className="text-accent font-mono text-xs tracking-[0.4em] font-bold mb-4 block uppercase">
                  Patrick Hennes
                </motion.span>
                <motion.h2 variants={fadeUp} className="font-heading font-black text-5xl md:text-7xl tracking-tighter mb-6 text-text-primary leading-[0.9]">
                  {t("title")}
                </motion.h2>
              </div>

              <div className="space-y-6">
                {[t("bio1"), t("bio2"), t("bio3")].map((bio, i) => (
                  <motion.p key={i} variants={fadeUp} className="text-base sm:text-lg text-text-muted leading-relaxed">
                    {bio}
                  </motion.p>
                ))}
              </div>

              {/* STATS */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-4">
                {(["experience", "projects"] as const).map((statKey) => {
                  const rawValue = t(`stat_values.${statKey}`) as string;
                  const numericPart = parseInt(rawValue);
                  const suffix = rawValue.replace(/[0-9]/g, "");
                  return (
                    <div key={statKey} className="glass p-5 rounded-2xl flex flex-col">
                      <span className="text-3xl font-black gradient-text mb-1">
                        <AnimatedCounter target={numericPart} suffix={suffix} />
                      </span>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-text-muted opacity-60">{t(`stats.${statKey}`)}</span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* SIMPLIFIED EDITOR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative group max-w-2xl mx-auto lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent/10 to-transparent rounded-[2.5rem] blur-2xl opacity-50" />
              <CodeEditor />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
