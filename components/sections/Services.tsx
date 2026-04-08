"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Palette, Code2, Smartphone, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { type LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type ServiceItem = {
  key: "web" | "mobile" | "design" | "performance";
  number: string;
  Icon: LucideIcon;
  gradient: string;
  spanClass: string;
};

const SERVICES: ServiceItem[] = [
  {
    key: "web",
    number: "01",
    Icon: Code2,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.15) 0%, rgba(47,47,47,0) 70%)",
    spanClass: "lg:col-span-2",
  },
  {
    key: "mobile",
    number: "02",
    Icon: Smartphone,
    gradient: "radial-gradient(circle at center, rgba(255,148,50,0.15) 0%, rgba(47,47,47,0) 70%)",
    spanClass: "lg:col-span-1",
  },
  {
    key: "design",
    number: "03",
    Icon: Palette,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.2) 0%, rgba(255,148,50,0) 70%)",
    spanClass: "lg:col-span-1",
  },
  {
    key: "performance",
    number: "04",
    Icon: ShieldCheck,
    gradient: "radial-gradient(circle at center, rgba(248,89,0,0.18) 0%, rgba(255,148,50,0) 70%)",
    spanClass: "lg:col-span-2",
  },
];

export default function Services() {
  const t = useTranslations("services");

  const tags = ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind"];

  return (
    <section
      id="services"
      className="relative py-24 px-6"
      aria-label="Services"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(34,34,34,0.3)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: "-20%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(248,89,0,0.05) 0%, transparent 70%)",
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
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F85900" }}
          >
            Services
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

        {/* Bento Box Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map(({ key, number, Icon, gradient, spanClass }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className={`h-full ${spanClass}`}
            >
              <GlassCard className="p-8 sm:p-10 flex flex-col h-full group relative overflow-hidden">
                {/* Text Content */}
                <div className="relative z-10 w-full sm:w-[75%] lg:w-[85%] flex-1">
                  <span className="text-xs font-mono font-medium tracking-widest uppercase mb-4 block" style={{ color: "#A09E9E" }}>
                    {number}
                  </span>
                  <h3
                    className="font-heading font-bold text-2xl mb-4"
                    style={{ color: "#F5F5F7" }}
                  >
                    {t(`items.${key}.title`)}
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "#A09E9E" }}
                  >
                    {t(`items.${key}.description`)}
                  </p>
                  
                  {/* Tags specifically for Web */}
                  {key === "web" && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#A09E9E" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Oversized Glowing Icon */}
                <div 
                  className="absolute -bottom-8 -right-8 w-48 h-48 sm:w-[240px] sm:h-[240px] rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6" 
                  style={{ background: gradient }}
                >
                  <Icon className="w-24 h-24 sm:w-32 sm:h-32" strokeWidth={0.5} style={{ color: "rgba(248,89,0,0.5)" }} />
                </div>
                
                {/* Accent line border */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ background: "linear-gradient(90deg, #F85900, transparent)" }}
                  aria-hidden="true"
                />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
