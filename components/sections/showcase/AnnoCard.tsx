"use client";

import { motion } from "framer-motion";
import { PhoneWheel } from "@/components/ui/PhoneWheel";
import { Tags } from "@/components/ui/Tag";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function AnnoCard({ name, description, tags }: { name: string; description: string; tags: string[] }) {
  const screens = [
    "/projects/Anno2.webp",
    "/projects/Anno3.webp",
    "/projects/Anno1.webp",
    "/projects/Anno4.webp",
  ];

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className="col-span-12 md:col-span-7 relative rounded-2xl cursor-pointer flex flex-col overflow-hidden"
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

      <div className="flex-1 relative flex justify-center items-end overflow-hidden" style={{ minHeight: 300 }}>
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
