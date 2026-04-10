"use client";

import { motion } from "framer-motion";
import { PhoneWheel } from "@/components/ui/PhoneWheel";
import { Tags } from "@/components/ui/Tag";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

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

export function ScoonHero({ name, description, tags, featuredLabel }: {
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

      {/* Phone wheel — overflow:hidden clips the fan at card edges */}
      <div className="relative z-10 flex justify-center pt-10 overflow-hidden">
        <div className="md:hidden">
          <PhoneWheel screens={SCOON_SCREENS_MOBILE} centerWidth={140} containerHeight={380} accentColor="#F85900" />
        </div>
        <div className="hidden md:block">
          <PhoneWheel screens={SCOON_SCREENS} centerWidth={210} containerHeight={470} accentColor="#F85900" />
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
