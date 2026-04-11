"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const STEPS = [
  {
    key: "analyse",
    number: "01",
    Icon: Search,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.18) 0%, transparent 70%)",
  },
  {
    key: "design",
    number: "02",
    Icon: PenTool,
    gradient: "radial-gradient(circle at center, rgba(255,148,50,0.14) 0%, transparent 70%)",
  },
  {
    key: "development",
    number: "03",
    Icon: Code2,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.18) 0%, transparent 70%)",
  },
  {
    key: "launch",
    number: "04",
    Icon: Rocket,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.22) 0%, transparent 70%)",
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Process() {
  const t = useTranslations("process");

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(248,89,0,0.03) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#F85900" }}>
            Process
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

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {STEPS.map(({ key, number, Icon, gradient }) => (
            <motion.div key={key} variants={fadeUp} transition={{ duration: 0.5 }}>
              <GlassCard className="group relative overflow-hidden flex flex-col h-full min-h-[220px] p-8 sm:p-10">
                {/* Step label */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>
                    STEP {number}
                  </span>
                  <div className="h-px flex-1" style={{ background: "var(--c-border)" }} />
                </div>

                {/* Text */}
                <div className="relative z-10 max-w-[70%]">
                  <h3
                    className="font-heading font-black text-2xl sm:text-3xl mb-3 tracking-tight"
                    style={{ color: "var(--c-text-primary)", letterSpacing: "-0.02em" }}
                  >
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-text-muted)" }}>
                    {t(`items.${key}.description`)}
                  </p>
                </div>

                {/* Glowing icon — bottom right */}
                <div
                  className="absolute -bottom-6 -right-6 w-40 h-40 sm:w-52 sm:h-52 rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: gradient }}
                >
                  <Icon
                    className="w-20 h-20 sm:w-28 sm:h-28"
                    strokeWidth={0.5}
                    style={{ color: "rgba(248,89,0,0.45)" }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
