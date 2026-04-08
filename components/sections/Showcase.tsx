"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import IPhoneMockup from "@/components/ui/IPhoneMockup";
import GlassCard from "@/components/ui/GlassCard";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  iOS: { bg: "rgba(248,89,0,0.12)", color: "#FF9432" },
  "UI/UX": { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  SwiftUI: { bg: "rgba(248,89,0,0.08)", color: "#F85900" },
  "Creator App": { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  "App para Creadores": { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  "Mental Health": { bg: "rgba(248,89,0,0.08)", color: "#FF9432" },
  "Salud Mental": { bg: "rgba(248,89,0,0.08)", color: "#FF9432" },
  "AI-Powered": { bg: "rgba(248,89,0,0.12)", color: "#F85900" },
  "KI-gestützt": { bg: "rgba(248,89,0,0.12)", color: "#F85900" },
  IA: { bg: "rgba(248,89,0,0.12)", color: "#F85900" },
  Web: { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  "Next.js": { bg: "rgba(255,255,255,0.06)", color: "#F5F5F7" },
  "Framer Motion": { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  i18n: { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  Dashboard: { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
  SaaS: { bg: "rgba(248,89,0,0.08)", color: "#FF9432" },
  React: { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] ?? { bg: "rgba(255,255,255,0.06)", color: "#A09E9E" };
}

type ProjectCardData = {
  projectKey: string;
  name: string;
  description: string;
  tags: string[];
  index: number;
};

function ProjectCard({ name, description, tags, index }: ProjectCardData) {
  return (
    <GlassCard className="p-6 h-full flex flex-col gap-4">
      {/* Placeholder image area */}
      <div
        className="w-full rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          height: 180,
          background: `linear-gradient(135deg, rgba(248,89,0,${0.06 + index * 0.02}) 0%, rgba(47,47,47,0.8) 100%)`,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-bold text-base"
            style={{
              background: "rgba(248,89,0,0.15)",
              border: "1px solid rgba(248,89,0,0.3)",
              color: "#F85900",
            }}
          >
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ background: "rgba(245,245,247,0.12)" }}
            />
            <div
              className="h-1.5 w-14 rounded-full"
              style={{ background: "rgba(245,245,247,0.07)" }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="font-heading font-bold text-lg"
          style={{ color: "#F5F5F7" }}
        >
          {name}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "#A09E9E" }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ background: style.bg, color: style.color }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

export default function Showcase() {
  const t = useTranslations("showcase");
  const tScoon = useTranslations("projects.scoon");
  const tAmigon = useTranslations("projects.amigon");
  const tPortfolio = useTranslations("projects.portfolio");
  const tDataflow = useTranslations("projects.dataflow");

  const projects: ProjectCardData[] = [
    {
      projectKey: "scoon",
      name: tScoon("name"),
      description: tScoon("description"),
      tags: tScoon.raw("tags") as string[],
      index: 0,
    },
    {
      projectKey: "amigon",
      name: tAmigon("name"),
      description: tAmigon("description"),
      tags: tAmigon.raw("tags") as string[],
      index: 1,
    },
    {
      projectKey: "portfolio",
      name: tPortfolio("name"),
      description: tPortfolio("description"),
      tags: tPortfolio.raw("tags") as string[],
      index: 2,
    },
    {
      projectKey: "dataflow",
      name: tDataflow("name"),
      description: tDataflow("description"),
      tags: tDataflow.raw("tags") as string[],
      index: 3,
    },
  ];

  const featuredProject = projects[0];

  return (
    <section
      id="work"
      className="relative py-24 px-6"
      aria-label="Selected work"
    >
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "30%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(248,89,0,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
            Portfolio
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

        {/* Featured project */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
            style={{
              background: "rgba(47,47,47,0.3)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Background accent */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="absolute"
                style={{
                  width: 400,
                  height: 400,
                  top: -100,
                  right: -100,
                  background: "radial-gradient(circle, rgba(248,89,0,0.12) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
            </div>

            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              {/* iPhone mockup */}
              <div className="flex-shrink-0">
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-6 text-center lg:text-left"
                  style={{ color: "#F85900" }}
                >
                  {t("featured_label")}
                </div>
                <IPhoneMockup animate={true} alt="Scoon iOS app mockup" />
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-6 max-w-lg text-center lg:text-left">
                <h3
                  className="font-heading font-black text-4xl sm:text-5xl tracking-tight"
                  style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}
                >
                  {featuredProject.name}
                </h3>
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "#A09E9E" }}
                >
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {featuredProject.tags.map((tag) => {
                    const style = getTagStyle(tag);
                    return (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-xl text-sm font-medium"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <div
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "#F85900" }}
                >
                  <span
                    className="w-8 h-px"
                    style={{ background: "#F85900" }}
                    aria-hidden="true"
                  />
                  Design only — no live link
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.projectKey}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
