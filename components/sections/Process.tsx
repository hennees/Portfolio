"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const STEPS = [
  {
    key: "analyse",
    number: "01",
    Icon: Search,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.15) 0%, rgba(47,47,47,0) 70%)",
  },
  {
    key: "design",
    number: "02",
    Icon: PenTool,
    gradient: "radial-gradient(circle at center, rgba(255,148,50,0.1) 0%, rgba(47,47,47,0) 70%)",
  },
  {
    key: "development",
    number: "03",
    Icon: Code2,
    gradient: "radial-gradient(circle at center, rgba(255,148,50,0.15) 0%, rgba(47,47,47,0) 70%)",
  },
  {
    key: "launch",
    number: "04",
    Icon: Rocket,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.2) 0%, rgba(47,47,47,0) 70%)",
  }
];

export default function Process() {
  const t = useTranslations("process");

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute"
          style={{
            width: "100%",
            height: "1px",
            top: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
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
            Process
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4" style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}>
            {t("title")}
          </h2>
          <p className="text-base max-w-md" style={{ color: "#A09E9E" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Process Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {STEPS.map(({ key, number, Icon, gradient }) => (
            <motion.div key={key} variants={fadeUp} transition={{ duration: 0.5 }}>
              <GlassCard className="p-8 sm:p-10 flex flex-col h-full group relative overflow-hidden">
                {/* Step Number Top Left */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="text-xs font-mono font-medium tracking-widest uppercase" style={{ color: "#A09E9E" }}>
                    STEP {number}
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
                
                {/* Text Content */}
                <div className="mb-24 sm:mb-12 relative z-10 w-full sm:w-[75%]">
                  <h3 className="font-heading font-black text-3xl mb-4" style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}>
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#A09E9E" }}>
                    {t(`items.${key}.description`)}
                  </p>
                </div>

                {/* Glowing Oversized Icon Area */}
                <div 
                  className="absolute -bottom-8 -right-8 w-48 h-48 sm:w-[280px] sm:h-[280px] rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6" 
                  style={{ background: gradient }}
                >
                  <Icon className="w-24 h-24 sm:w-36 sm:h-36" strokeWidth={0.5} style={{ color: "rgba(248,89,0,0.5)" }} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
