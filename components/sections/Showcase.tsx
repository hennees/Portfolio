"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
  "Creator App":     { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  "App para Creadores": { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  "Mental Health":   { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  "Salud Mental":    { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  "AI-Powered":      { bg: "rgba(248,89,0,0.18)",   color: "#F85900" },
  "KI-gestützt":     { bg: "rgba(248,89,0,0.18)",   color: "#F85900" },
  "Voice AI":        { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "Voice KI":        { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "IA de Voz":       { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  IA:                { bg: "rgba(248,89,0,0.18)",   color: "#F85900" },
  Web:               { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
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
  StrykerLabs:        { bg: "rgba(255,255,255,0.08)", color: "#A0A0A0" },
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

// ─── Phone Fan ─────────────────────────────────────────────────────────────
type FanPhone = { src: string; r: number; ty: number; w: number; op: number };

const DESKTOP_FAN: FanPhone[] = [
  { src: "/projects/Scoon5.png", r: -18, ty: 78, w: 148, op: 0.26 },
  { src: "/projects/Scoon3.png", r: -9,  ty: 36, w: 170, op: 0.54 },
  { src: "/projects/Scoon2.png", r:  0,  ty:  0, w: 204, op: 1.00 },
  { src: "/projects/Scoon4.png", r:  9,  ty: 36, w: 170, op: 0.54 },
  { src: "/projects/Scoon4_2.png", r: 18,  ty: 78, w: 148, op: 0.26 },
];

const MOBILE_FAN: FanPhone[] = [
  { src: "/projects/Scoon3.png", r: -11, ty: 26, w: 96,  op: 0.50 },
  { src: "/projects/Scoon2.png", r:  0,  ty:  0, w: 126, op: 1.00 },
  { src: "/projects/Scoon4.png", r: 11,  ty: 26, w: 96,  op: 0.50 },
];

function PhoneFan({ phones, overlap, centerIdx, reduce, isHovered }: {
  phones: FanPhone[]; overlap: number; centerIdx: number; reduce: boolean | null; isHovered: boolean;
}) {
  return (
    <div className="flex items-end justify-center" style={{ height: 460 }}>
      {phones.map((p, i) => {
        const isCenter = i === centerIdx;
        return (
          <div
            key={p.src}
            style={{
              transform: `rotate(${p.r}deg) translateY(${p.ty}px)`,
              transformOrigin: "bottom center",
              opacity: p.op,
              zIndex: isCenter ? 10 : 10 - Math.abs(i - centerIdx) * 2,
              marginLeft: i > 0 ? overlap : 0,
              flexShrink: 0,
            }}
          >
            <motion.div
              animate={{ y: isHovered && !reduce ? (isCenter ? -20 : -10) : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={p.src}
                alt={`Scoon screen ${i + 1}`}
                width={p.w}
                height={Math.round(p.w * 2.165)}
                className="object-contain"
                style={{
                  filter: isCenter
                    ? "drop-shadow(0 50px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(248,89,0,0.22))"
                    : "drop-shadow(0 24px 44px rgba(0,0,0,0.8))",
                }}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SCOON HERO ───────────────────────────────────────────────────────────────
function ScoonHero({ name, description, tags, featuredLabel }: {
  name: string; description: string; tags: string[]; featuredLabel: string;
}) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="col-span-12 relative rounded-3xl cursor-pointer overflow-hidden"
      style={{ minHeight: 680, background: "#080808" }}
      whileHover={{ scale: 1.005, transition: { type: "spring", stiffness: 200, damping: 30 } }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          width: 1000, height: 500,
          background: "radial-gradient(ellipse, rgba(248,89,0,0.15) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        whileHover={{ borderColor: "rgba(248,89,0,0.35)", boxShadow: "0 0 100px rgba(248,89,0,0.1)" }}
        transition={{ duration: 0.4 }}
      />

      {/* Featured badge */}
      <div className="absolute top-6 left-7 z-30">
        <span
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{ background: "rgba(248,89,0,0.16)", color: "#F85900", border: "1px solid rgba(248,89,0,0.35)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F85900] animate-pulse inline-block" aria-hidden="true" />
          {featuredLabel}
        </span>
      </div>

      {/* Phone fans */}
      <div className="relative z-10 flex justify-center pt-10">
        <div className="md:hidden">
          <PhoneFan phones={MOBILE_FAN} overlap={-30} centerIdx={1} reduce={reduce} isHovered={isHovered} />
        </div>
        <div className="hidden md:block">
          <PhoneFan phones={DESKTOP_FAN} overlap={-54} centerIdx={2} reduce={reduce} isHovered={isHovered} />
        </div>
      </div>

      {/* Bottom text */}
      <div
        className="absolute bottom-0 left-0 right-0 px-7 sm:px-10 pb-9 z-20"
        style={{ background: "linear-gradient(to top, #080808 52%, rgba(8,8,8,0.8) 76%, transparent)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <h3
              className="font-heading font-black tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#F5F5F7", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            >
              {name}
            </h3>
            <p className="text-sm leading-relaxed max-w-lg mt-3" style={{ color: "#5A5858" }}>
              {description}
            </p>
          </div>
          <div className="flex-shrink-0 sm:pb-1">
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── APP CARD (Amigon, GymLog, Pokédex) ─────────────────────────────────────
function AppCard({ name, description, tags, screens, colSpan = "col-span-12 md:col-span-6" }: {
  name: string; description: string; tags: string[];
  screens: string[]; colSpan?: string;
}) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  const backSrcLeft  = screens.length >= 3 ? screens[0] : (screens.length >= 2 ? screens[0] : null);
  const backSrcRight = screens.length >= 3 ? screens[1] : null;
  const frontSrc     = screens.length >= 3 ? screens[2] : (screens.length >= 2 ? screens[1] : screens[0]);

  const phones = [
    backSrcLeft && { src: backSrcLeft, rot: -12, x: screens.length >= 3 ? -75 : -55, y: 20, z: 1, scale: 0.85 },
    backSrcRight && { src: backSrcRight, rot: 12, x: 75, y: 20, z: 1, scale: 0.85 },
    frontSrc && { src: frontSrc, rot: 0, x: screens.length >= 3 ? 0 : (screens.length === 2 ? 30 : 0), y: 0, z: 5, scale: 1 },
  ].filter(Boolean) as { src: string; rot: number; x: number; y: number; z: number; scale: number }[];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className={`group relative rounded-2xl cursor-pointer flex flex-col ${colSpan}`}
      style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.055)", minHeight: 420 }}
      whileHover={{
        scale: 1.013,
        borderColor: "rgba(248,89,0,0.28)",
        boxShadow: "0 0 40px rgba(248,89,0,0.07)",
        transition: { type: "spring", stiffness: 260, damping: 26 },
      }}
    >
      {/* Phone display area */}
      <div className="flex-1 relative overflow-hidden" style={{ minHeight: 300 }}>
        {/* Subtle glow */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
          style={{
            width: 160, height: 96,
            background: "radial-gradient(ellipse, rgba(248,89,0,0.09) 0%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />

        {phones.map((phone, i) => (
          <div key={phone.src} style={{ position: "absolute", bottom: -10, left: "50%", zIndex: phone.z }}>
            <motion.div
              initial={{ x: `calc(-50% + ${phone.x}px)`, y: phone.y, rotate: phone.rot, scale: phone.scale }}
              animate={{
                x: `calc(-50% + ${phone.x}px)`,
                y: isHovered && !reduce ? phone.y - 12 : phone.y,
                rotate: phone.rot,
                scale: phone.scale
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformOrigin: "bottom center", opacity: phone.z === 5 ? 1 : 0.5 }}
            >
              <Image src={phone.src} alt={`${name} screen ${i}`} width={136} height={290}
                className="object-contain"
                style={{ filter: phone.z === 5 ? "drop-shadow(0 30px 52px rgba(0,0,0,0.92))" : "drop-shadow(0 16px 32px rgba(0,0,0,0.8))" }}
              />
            </motion.div>
          </div>
        ))}
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

// ─── ANNO CARD — 4-phone layout ──────────────────────────────────────────────
function AnnoCard({ name, description, tags }: { name: string; description: string; tags: string[] }) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const phones = [
    { src: "/projects/Anno1.png", rot: -18, x: -110, y: 25, z: 1, scale: 0.8 },
    { src: "/projects/Anno4.png", rot: 18,  x: 110,  y: 25, z: 1, scale: 0.8 },
    { src: "/projects/Anno2.png", rot: -6,  x: -45,  y: 10, z: 2, scale: 0.9 },
    { src: "/projects/Anno3.png", rot: 6,   x: 45,   y: 10, z: 3, scale: 0.9 },
  ];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <span
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ background: "rgba(139,92,246,0.18)", color: "#C084FC", border: "1px solid rgba(139,92,246,0.32)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Inholland × Pieter Both
        </span>
      </div>

      {/* Phone display — 4 screens symmetrically distributed */}
      <div className="flex-1 relative overflow-hidden" style={{ minHeight: 300 }}>
        {/* Ambient glow */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
          style={{
            width: 220, height: 110,
            background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)",
            filter: "blur(22px)",
          }}
        />

        {phones.map((phone, i) => (
          <div key={phone.src} style={{ position: "absolute", bottom: -10, left: "50%", zIndex: phone.z }}>
            <motion.div
              initial={{ x: `calc(-50% + ${phone.x}px)`, y: phone.y, rotate: phone.rot, scale: phone.scale }}
              animate={{
                x: `calc(-50% + ${phone.x}px)`,
                y: isHovered && !reduce ? phone.y - 12 : phone.y,
                rotate: phone.rot,
                scale: phone.scale
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformOrigin: "bottom center", opacity: phone.z >= 2 ? 0.95 : 0.5 }}
            >
              <Image src={phone.src} alt={`Anno screen ${i}`} width={130} height={280}
                className="object-contain"
                style={{ filter: phone.z >= 2 ? "drop-shadow(0 25px 45px rgba(0,0,0,0.85))" : "drop-shadow(0 15px 30px rgba(0,0,0,0.7))" }}
              />
            </motion.div>
          </div>
        ))}
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

// ─── WEARABLE CARD — full-width landscape dashboard ──────────────────────────
function WearableCard({ name, description, tags }: { name: string; description: string; tags: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className="group col-span-12 relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 360, background: "#0A0A0A" }}
      whileHover={{
        scale: 1.008,
        boxShadow: "0 0 40px rgba(248,89,0,0.06)",
        transition: { type: "spring", stiffness: 240, damping: 30 },
      }}
    >
      <Image
        src="/projects/Weareble-Dashbaord.png"
        alt="Wearable Dashboard"
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(6,6,6,0.97) 22%, rgba(6,6,6,0.5) 52%, rgba(6,6,6,0.06) 100%)" }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid rgba(255,255,255,0.055)" }}
        whileHover={{ borderColor: "rgba(248,89,0,0.28)" }}
        transition={{ duration: 0.3 }}
      />

      {/* StrykerLabs badge */}
      <div className="absolute top-5 left-5">
        <span
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.08)", color: "#9A9898", border: "1px solid rgba(255,255,255,0.12)" }}
        >
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
  const t          = useTranslations("showcase");
  const tScoon     = useTranslations("projects.scoon");
  const tAmigon    = useTranslations("projects.amigon");
  const tGym       = useTranslations("projects.gym");
  const tPokedex   = useTranslations("projects.pokedex");
  const tWearable  = useTranslations("projects.wearable");
  const tAnno      = useTranslations("projects.anno");

  return (
    <section id="work" className="relative py-28 px-5 sm:px-8" aria-label="Selected work">
      {/* Ambient bg glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: "absolute", width: 900, height: 900,
          top: "5%", right: "-22%",
          background: "radial-gradient(circle, rgba(248,89,0,0.05) 0%, transparent 70%)",
          filter: "blur(140px)",
        }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#F85900" }}>
            Portfolio
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "#F5F5F7", letterSpacing: "-0.025em" }}
          >
            {t("title")}
          </h2>
          <p className="text-base max-w-md leading-relaxed" style={{ color: "#6B6969" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-12 gap-3 sm:gap-4"
        >
          {/* 1 — Scoon Hero (full width) */}
          <ScoonHero
            name={tScoon("name")}
            description={tScoon("description")}
            tags={tScoon.raw("tags") as string[]}
            featuredLabel={t("featured_label")}
          />

          {/* 2 — Amigon + GymLog */}
          <AppCard
            name={tAmigon("name")}
            description={tAmigon("description")}
            tags={tAmigon.raw("tags") as string[]}
            screens={["/projects/amigon1.png", "/projects/Amigon3.png", "/projects/Amigon2.png"]}
            colSpan="col-span-12 md:col-span-5"
          />
          <AppCard
            name={tGym("name")}
            description={tGym("description")}
            tags={tGym.raw("tags") as string[]}
            screens={["/projects/Gymbook1.png", "/projects/Gymbook2.png", "/projects/Gymbook3.png"]}
            colSpan="col-span-12 md:col-span-7"
          />

          {/* 3 — Anno Amsterdam + Pokédex */}
          <AnnoCard
            name={tAnno("name")}
            description={tAnno("description")}
            tags={tAnno.raw("tags") as string[]}
          />
          <AppCard
            name={tPokedex("name")}
            description={tPokedex("description")}
            tags={tPokedex.raw("tags") as string[]}
            screens={["/projects/Pokedex2.png", "/projects/Pokedex3.png", "/projects/Pokedex1.png"]}
            colSpan="col-span-12 md:col-span-5"
          />

          {/* 4 — Wearable Dashboard (full width) */}
          <WearableCard
            name={tWearable("name")}
            description={tWearable("description")}
            tags={tWearable.raw("tags") as string[]}
          />
        </motion.div>
      </div>
    </section>
  );
}
