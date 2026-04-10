"use client";

import { motion } from "framer-motion";
import { PhoneWheel } from "@/components/ui/PhoneWheel";
import { Tags } from "@/components/ui/Tag";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function AppCard({ name, description, tags, screens, colSpan = "col-span-12 md:col-span-6", accentColor = "#F85900" }: {
  name: string; description: string; tags: string[];
  screens: string[]; colSpan?: string; accentColor?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className={`group relative rounded-2xl cursor-pointer flex flex-col overflow-hidden ${colSpan}`}
      style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.055)", minHeight: 420 }}
      whileHover={{
        scale: 1.013,
        borderColor: `${accentColor}45`,
        boxShadow: `0 0 40px ${accentColor}12`,
        transition: { type: "spring", stiffness: 260, damping: 26 },
      }}
    >
      {/* Phone wheel */}
      <div className="flex-1 relative flex justify-center items-end overflow-hidden" style={{ minHeight: 300 }}>
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
