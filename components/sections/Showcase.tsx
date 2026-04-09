"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  iOS:               { bg: "rgba(248,89,0,0.18)",   color: "#FF9432" },
  "UI/UX":           { bg: "rgba(255,255,255,0.1)", color: "#D4D2D2" },
  SwiftUI:           { bg: "rgba(248,89,0,0.12)",   color: "#F85900" },
  Flutter:           { bg: "rgba(32,178,170,0.16)", color: "#5ECACA" },
  Ionic:             { bg: "rgba(59,130,246,0.16)", color: "#7DB4F8" },
  "Creator Platform":{ bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  "Mental Health":   { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  "Salud Mental":    { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  "Voice AI":        { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "Voice KI":        { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "IA de Voz":       { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "Next.js":         { bg: "rgba(255,255,255,0.1)", color: "#F5F5F7" },
  Dashboard:         { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  SaaS:              { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  React:             { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  Fitness:           { bg: "rgba(248,89,0,0.14)",   color: "#FF9432" },
  eHealth:           { bg: "rgba(248,89,0,0.14)",   color: "#F85900" },
  AR:                { bg: "rgba(139,92,246,0.18)", color: "#A78BFA" },
  Swift:             { bg: "rgba(255,149,0,0.16)",  color: "#FFAB40" },
  Kotlin:            { bg: "rgba(167,139,250,0.16)", color: "#B39DDB" },
  Hochschulprojekt:  { bg: "rgba(255,255,255,0.07)", color: "#8A8888" },
  "Uni Project":     { bg: "rgba(255,255,255,0.07)", color: "#8A8888" },
  "Proyecto Uni":    { bg: "rgba(255,255,255,0.07)", color: "#8A8888" },
  StrykerLabs:       { bg: "rgba(255,255,255,0.08)", color: "#A0A0A0" },
  Frontend:          { bg: "rgba(255,255,255,0.07)", color: "#8A8888" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] ?? { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" };
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const s = getTagStyle(tag);
        return (
          <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{ background: s.bg, color: s.color }}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}

// ─── PHONE WHEEL ──────────────────────────────────────────────────────────────
// Auto-rotating wheel: one phone in focus, others fanned behind it.
// `screens` must have at least 1 image.
function PhoneWheel({
  screens,
  centerWidth = 200,
  containerHeight = 440,
  interval = 2800,
  accentColor = "#F85900",
}: {
  screens: string[];
  centerWidth?: number;
  containerHeight?: number;
  interval?: number;
  accentColor?: string;
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = screens.length;

  const advance = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  useEffect(() => {
    if (hovered || reduce || total <= 1) return;
    timerRef.current = setInterval(advance, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hovered, reduce, total, advance, interval]);

  // Config per slot distance from center
  const SLOTS = [
    { x: 0,    rotateY:  0,  scale: 1,    opacity: 1,    z: 20, brightness: 1 },
    { x: 155,  rotateY: -42, scale: 0.74, opacity: 0.7,  z: 10, brightness: 0.6 },
    { x: -155, rotateY:  42, scale: 0.74, opacity: 0.7,  z: 10, brightness: 0.6 },
    { x: 265,  rotateY: -56, scale: 0.54, opacity: 0.3,  z:  5, brightness: 0.4 },
    { x: -265, rotateY:  56, scale: 0.54, opacity: 0.3,  z:  5, brightness: 0.4 },
  ];

  return (
    <div
      className="relative flex items-end justify-center"
      style={{ height: containerHeight, perspective: 900 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {screens.map((src, idx) => {
        // shortest-path offset
        let offset = idx - current;
        if (offset > total / 2)  offset -= total;
        if (offset < -total / 2) offset += total;

        const slot = SLOTS[Math.abs(offset)];
        if (!slot) return null;

        const sign = offset >= 0 ? 1 : -1;
        const isCenter = offset === 0;

        return (
          <motion.div
            key={src}
            animate={{
              x: sign * slot.x,
              rotateY: sign > 0 ? slot.rotateY : -slot.rotateY,
              scale: slot.scale,
              opacity: slot.opacity,
              zIndex: slot.z,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            style={{ position: "absolute", bottom: 0, transformStyle: "preserve-3d" }}
          >
            <Image
              src={src}
              alt=""
              width={centerWidth}
              height={Math.round(centerWidth * 2.165)}
              className="object-contain"
              style={{
                filter: isCenter
                  ? `drop-shadow(0 40px 70px rgba(0,0,0,0.95)) drop-shadow(0 0 40px ${accentColor}30)`
                  : `brightness(${slot.brightness}) drop-shadow(0 20px 40px rgba(0,0,0,0.8))`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── SCOON HERO ───────────────────────────────────────────────────────────────
const SCOON_SCREENS = [
  "/projects/Scoon2.png",
  "/projects/Scoon3.png",
  "/projects/Scoon4.png",
  "/projects/Scoon5.png",
];

const SCOON_SCREENS_MOBILE = [
  "/projects/Scoon2.png",
  "/projects/Scoon3.png",
  "/projects/Scoon4.png",
];

function ScoonHero({ name, description, tags, featuredLabel }: {
  name: string; description: string; tags: string[]; featuredLabel: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="col-span-12 relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ minHeight: 680, background: "#080808" }}
      whileHover={{ scale: 1.005, transition: { type: "spring", stiffness: 200, damping: 30 } }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0" aria-hidden="true"
        style={{ width: 1000, height: 500, background: "radial-gradient(ellipse, rgba(248,89,0,0.15) 0%, transparent 65%)", filter: "blur(90px)" }}
      />
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        whileHover={{ borderColor: "rgba(248,89,0,0.35)", boxShadow: "0 0 100px rgba(248,89,0,0.1)" }}
        transition={{ duration: 0.4 }}
      />

      {/* Featured badge */}
      <div className="absolute top-6 left-7 z-30">
        <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{ background: "rgba(248,89,0,0.16)", color: "#F85900", border: "1px solid rgba(248,89,0,0.35)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F85900] animate-pulse inline-block" aria-hidden="true" />
          {featuredLabel}
        </span>
      </div>

      {/* Phone wheel */}
      <div className="relative z-10 flex justify-center pt-10">
        <div className="md:hidden">
          <PhoneWheel screens={SCOON_SCREENS_MOBILE} centerWidth={130} containerHeight={360} accentColor="#F85900" />
        </div>
        <div className="hidden md:block">
          <PhoneWheel screens={SCOON_SCREENS} centerWidth={200} containerHeight={460} accentColor="#F85900" />
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 px-7 sm:px-10 pb-9 z-20"
        style={{ background: "linear-gradient(to top, #080808 52%, rgba(8,8,8,0.8) 76%, transparent)" }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <h3 className="font-heading font-black tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#F5F5F7", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
              {name}
            </h3>
            <p className="text-sm leading-relaxed max-w-lg mt-3" style={{ color: "#5A5858" }}>{description}</p>
          </div>
          <div className="flex-shrink-0 sm:pb-1"><Tags tags={tags} /></div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── APP CARD ─────────────────────────────────────────────────────────────────
function AppCard({ name, description, tags, screens, colSpan = "col-span-12 md:col-span-6", accentColor = "#F85900" }: {
  name: string; description: string; tags: string[];
  screens: string[]; colSpan?: string; accentColor?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className={`group relative rounded-2xl cursor-pointer flex flex-col ${colSpan}`}
      style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.055)", minHeight: 420 }}
      whileHover={{
        scale: 1.013,
        borderColor: `${accentColor}45`,
        boxShadow: `0 0 40px ${accentColor}12`,
        transition: { type: "spring", stiffness: 260, damping: 26 },
      }}
    >
      {/* Phone wheel */}
      <div className="flex-1 relative overflow-hidden flex items-end justify-center" style={{ minHeight: 300 }}>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true"
          style={{ width: 160, height: 96, background: `radial-gradient(ellipse, ${accentColor}18 0%, transparent 70%)`, filter: "blur(18px)" }}
        />
        <PhoneWheel
          screens={screens}
          centerWidth={130}
          containerHeight={300}
          interval={3000}
          accentColor={accentColor}
        />
      </div>

      {/* Text */}
      <div className="px-6 pb-6 pt-5">
        <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#F0EEEE" }}>{name}</h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B6969" }}>{description}</p>
        <Tags tags={tags} />
      </div>
    </motion.div>
  );
}

// ─── ANNO CARD ────────────────────────────────────────────────────────────────
function AnnoCard({ name, description, tags }: { name: string; description: string; tags: string[] }) {
  const screens = [
    "/projects/Anno2.png",
    "/projects/Anno3.png",
    "/projects/Anno1.png",
    "/projects/Anno4.png",
  ];

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className="col-span-12 md:col-span-7 relative rounded-2xl cursor-pointer flex flex-col"
      style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.055)", minHeight: 420 }}
      whileHover={{
        scale: 1.012,
        borderColor: "rgba(139,92,246,0.28)",
        boxShadow: "0 0 40px rgba(139,92,246,0.07)",
        transition: { type: "spring", stiffness: 260, damping: 26 },
      }}
    >
      {/* Uni badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ background: "rgba(139,92,246,0.18)", color: "#C084FC", border: "1px solid rgba(139,92,246,0.32)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Inholland × Pieter Both
        </span>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-end justify-center" style={{ minHeight: 300 }}>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true"
          style={{ width: 220, height: 110, background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(22px)" }}
        />
        <PhoneWheel
          screens={screens}
          centerWidth={130}
          containerHeight={300}
          interval={2600}
          accentColor="#8B5CF6"
        />
      </div>

      <div className="px-6 pb-6 pt-5">
        <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#F0EEEE" }}>{name}</h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B6969" }}>{description}</p>
        <Tags tags={tags} />
      </div>
    </motion.div>
  );
}

// ─── WEARABLE CARD ────────────────────────────────────────────────────────────
function WearableCard({ name, description, tags }: { name: string; description: string; tags: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className="group col-span-12 relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 360, background: "#0A0A0A" }}
      whileHover={{ scale: 1.008, boxShadow: "0 0 40px rgba(248,89,0,0.06)", transition: { type: "spring", stiffness: 240, damping: 30 } }}
    >
      <Image src="/projects/Weareble-Dashbaord.png" alt="Wearable Dashboard" fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(6,6,6,0.97) 22%, rgba(6,6,6,0.5) 52%, rgba(6,6,6,0.06) 100%)" }} />
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid rgba(255,255,255,0.055)" }}
        whileHover={{ borderColor: "rgba(248,89,0,0.28)" }} transition={{ duration: 0.3 }} />

      <div className="absolute top-5 left-5">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.08)", color: "#9A9898", border: "1px solid rgba(255,255,255,0.12)" }}>
          StrykerLabs GmbH · Graz
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-7 pb-7">
        <h3 className="font-heading font-bold text-2xl mb-1.5" style={{ color: "#F0EEEE" }}>{name}</h3>
        <p className="text-sm leading-relaxed mb-3 max-w-lg" style={{ color: "#5E5C5C" }}>{description}</p>
        <Tags tags={tags} />
      </div>
    </motion.div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
export default function Showcase() {
  const t         = useTranslations("showcase");
  const tScoon    = useTranslations("projects.scoon");
  const tAmigon   = useTranslations("projects.amigon");
  const tGym      = useTranslations("projects.gym");
  const tPokedex  = useTranslations("projects.pokedex");
  const tWearable = useTranslations("projects.wearable");
  const tAnno     = useTranslations("projects.anno");

  return (
    <section id="work" className="relative py-28 px-5 sm:px-8" aria-label="Selected work">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: "absolute", width: 900, height: 900, top: "5%", right: "-22%",
          background: "radial-gradient(circle, rgba(248,89,0,0.05) 0%, transparent 70%)", filter: "blur(140px)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp} transition={{ duration: 0.55 }}
          className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#F85900" }}>Portfolio</span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "#F5F5F7", letterSpacing: "-0.025em" }}>{t("title")}</h2>
          <p className="text-base max-w-md leading-relaxed" style={{ color: "#6B6969" }}>{t("subtitle")}</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          variants={stagger} className="grid grid-cols-12 gap-3 sm:gap-4">

          <ScoonHero
            name={tScoon("name")} description={tScoon("description")}
            tags={tScoon.raw("tags") as string[]} featuredLabel={t("featured_label")} />

          <AppCard name={tAmigon("name")} description={tAmigon("description")}
            tags={tAmigon.raw("tags") as string[]}
            screens={["/projects/amigon1.png", "/projects/Amigon3.png", "/projects/Amigon2.png"]}
            colSpan="col-span-12 md:col-span-5" accentColor="#00C2CB" />

          <AppCard name={tGym("name")} description={tGym("description")}
            tags={tGym.raw("tags") as string[]}
            screens={["/projects/Gymbook1.png", "/projects/Gymbook2.png", "/projects/Gymbook3.png"]}
            colSpan="col-span-12 md:col-span-7" accentColor="#F97316" />

          <AnnoCard name={tAnno("name")} description={tAnno("description")}
            tags={tAnno.raw("tags") as string[]} />

          <AppCard name={tPokedex("name")} description={tPokedex("description")}
            tags={tPokedex.raw("tags") as string[]}
            screens={["/projects/Pokedex2.png", "/projects/Pokedex3.png", "/projects/Pokedex1.png"]}
            colSpan="col-span-12 md:col-span-5" accentColor="#F85900" />

          <WearableCard name={tWearable("name")} description={tWearable("description")}
            tags={tWearable.raw("tags") as string[]} />

        </motion.div>
      </div>
    </section>
  );
}
