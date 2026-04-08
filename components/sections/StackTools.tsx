"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import MarqueeRow from "@/components/ui/MarqueeRow";

const TECH_STACK = [
  { label: "React" },
  { label: "Next.js" },
  { label: "TypeScript" },
  { label: "SwiftUI" },
  { label: "React Native" },
  { label: "Tailwind CSS" },
  { label: "Figma" },
  { label: "Framer" },
  { label: "Node.js" },
  { label: "Supabase" },
];

const AI_TOOLS = [
  { label: "Claude" },
  { label: "Cursor" },
  { label: "GitHub Copilot" },
  { label: "Midjourney" },
  { label: "v0" },
  { label: "ChatGPT" },
  { label: "Perplexity" },
  { label: "Runway" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function StackTools() {
  const t = useTranslations("stack");

  return (
    <section
      id="stack"
      className="relative py-24 overflow-hidden"
      aria-label="Stack and tools"
    >
      {/* Subtle separator top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,89,0,0.2), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F85900" }}
          >
            Technologies
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            {t("title")}
          </h2>
          <p className="text-base max-w-md" style={{ color: "#A09E9E" }}>
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — full width */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4"
      >
        {/* Label */}
        <div className="px-6 max-w-6xl mx-auto w-full">
          <span
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "#A09E9E" }}
          >
            Tech Stack
          </span>
        </div>
        <MarqueeRow items={TECH_STACK} reverse={false} className="py-1" />

        <div className="px-6 max-w-6xl mx-auto w-full mt-4">
          <span
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "#A09E9E" }}
          >
            AI Tools
          </span>
        </div>
        <MarqueeRow items={AI_TOOLS} reverse={true} className="py-1" />
      </motion.div>

      {/* Subtle separator bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,89,0,0.2), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
