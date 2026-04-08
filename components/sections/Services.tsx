"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Palette, Code2, Smartphone, Zap } from "lucide-react";
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
  key: "design" | "web" | "mobile" | "ai";
  Icon: LucideIcon;
  gradient: string;
};

const SERVICES: ServiceItem[] = [
  {
    key: "design",
    Icon: Palette,
    gradient: "linear-gradient(135deg, rgba(248,89,0,0.2), rgba(255,148,50,0.1))",
  },
  {
    key: "web",
    Icon: Code2,
    gradient: "linear-gradient(135deg, rgba(248,89,0,0.15), rgba(47,47,47,0.3))",
  },
  {
    key: "mobile",
    Icon: Smartphone,
    gradient: "linear-gradient(135deg, rgba(255,148,50,0.15), rgba(47,47,47,0.3))",
  },
  {
    key: "ai",
    Icon: Zap,
    gradient: "linear-gradient(135deg, rgba(248,89,0,0.18), rgba(255,148,50,0.08))",
  },
];

export default function Services() {
  const t = useTranslations("services");

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

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map(({ key, Icon, gradient }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-6 flex flex-col gap-5 h-full group">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: gradient }}
                >
                  <Icon
                    size={22}
                    style={{ color: "#F85900" }}
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <h3
                    className="font-heading font-bold text-lg"
                    style={{ color: "#F5F5F7" }}
                  >
                    {t(`items.${key}.title`)}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#A09E9E" }}
                  >
                    {t(`items.${key}.description`)}
                  </p>
                </div>

                {/* Accent line */}
                <div
                  className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
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
