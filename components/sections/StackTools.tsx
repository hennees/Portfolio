"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiPython, 
  SiFigma, SiFramer, SiDocker, SiVite,
  SiOpenai, SiSupabase, SiPostgresql, SiStripe,
  SiTailwindcss, SiNodedotjs, SiApple
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FaAws, FaGithub, FaRobot } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const TECHNOLOGIES = [
  { label: "React", Icon: SiReact },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Tailwind CSS", Icon: SiTailwindcss },
  { label: "Figma", Icon: SiFigma },
  { label: "Node.js", Icon: SiNodedotjs },
  { label: "Supabase", Icon: SiSupabase },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "iOS / Swift", Icon: SiApple },
  { label: "Framer", Icon: SiFramer },
  { label: "OpenAI", Icon: SiOpenai },
  { label: "GitHub", Icon: FaGithub },
  { label: "Docker", Icon: SiDocker },
  { label: "AWS", Icon: FaAws },
  { label: "Vite", Icon: SiVite },
  { label: "Python", Icon: SiPython },
  { label: "AI Tools", Icon: FaRobot },
  { label: "Stripe", Icon: SiStripe },
];

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

        {/* Tech Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {TECHNOLOGIES.map(({ label, Icon }) => (
            <motion.div key={label} variants={fadeUp}>
              <GlassCard className="flex flex-col items-center justify-center p-6 gap-4 h-full aspect-square group transition-all duration-300 hover:-translate-y-1">
                <div 
                  className="p-4 rounded-2xl transition-all duration-300 flex items-center justify-center group-hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.03)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
                >
                  <Icon size={32} style={{ color: "#A09E9E" }} className="group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-medium text-center" style={{ color: "#A09E9E" }}>
                  {label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle separator bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,89,0,0.2), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
