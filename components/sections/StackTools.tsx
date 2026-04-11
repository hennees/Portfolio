"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiFigma, SiFramer, SiSupabase, SiPostgresql, SiDocker, SiVite,
  SiPython, SiOpenai, SiKotlin, SiFlutter, SiIonic, SiSwift,
  SiXcode, SiClaude,
} from "react-icons/si";
import { FaGithub, FaRobot } from "react-icons/fa";

type Tool = { label: string; Icon: React.ElementType };

const ROW1: Tool[] = [
  { label: "React",       Icon: SiReact },
  { label: "Next.js",     Icon: SiNextdotjs },
  { label: "TypeScript",  Icon: SiTypescript },
  { label: "Tailwind",    Icon: SiTailwindcss },
  { label: "Swift",       Icon: SiSwift },
  { label: "Kotlin",      Icon: SiKotlin },
  { label: "Flutter",     Icon: SiFlutter },
  { label: "Ionic",       Icon: SiIonic },
  { label: "Node.js",     Icon: SiNodedotjs },
  { label: "Python",      Icon: SiPython },
];

const ROW2: Tool[] = [
  { label: "Figma",       Icon: SiFigma },
  { label: "Framer",      Icon: SiFramer },
  { label: "Claude",      Icon: SiClaude },
  { label: "OpenAI",      Icon: SiOpenai },
  { label: "Supabase",    Icon: SiSupabase },
  { label: "PostgreSQL",  Icon: SiPostgresql },
  { label: "GitHub",      Icon: FaGithub },
  { label: "Docker",      Icon: SiDocker },
  { label: "Xcode",       Icon: SiXcode },
  { label: "Vite",        Icon: SiVite },
];

// Duplicate for seamless loop
const LOOP1 = [...ROW1, ...ROW1];
const LOOP2 = [...ROW2, ...ROW2];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function MarqueeRow({
  items,
  direction = "left",
  duration = 28,
}: {
  items: Tool[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const from = direction === "left" ? 0 : "-50%";
  const to   = direction === "left" ? "-50%" : 0;

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0E0F10, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0E0F10, transparent)" }}
        aria-hidden="true"
      />

      <motion.div
        className="flex gap-3"
        style={{ width: "max-content" }}
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {items.map(({ label, Icon }, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Icon size={18} style={{ color: "#A8A6A6" }} />
            <span className="text-xs font-medium whitespace-nowrap" style={{ color: "#B8B6B6" }}>
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function StackTools() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="relative py-20 overflow-hidden" aria-label="Stack and tools">
      {/* Separators */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,89,0,0.2), transparent)" }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#F85900" }}>
            {t("overline")}
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            {t("title")}
          </h2>
          <p className="text-base max-w-md" style={{ color: "#C0BEBE" }}>
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-3">
        <MarqueeRow items={LOOP1} direction="left"  duration={30} />
        <MarqueeRow items={LOOP2} direction="right" duration={26} />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,89,0,0.2), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
