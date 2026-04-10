"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ScoonHero } from "./showcase/ScoonHero";
import { AppCard } from "./showcase/AppCard";
import { AnnoCard } from "./showcase/AnnoCard";
import { WearableCard } from "./showcase/WearableCard";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

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
