"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tags } from "@/components/ui/Tag";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function WearableCard({ name, description, tags }: { name: string; description: string; tags: string[] }) {
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
