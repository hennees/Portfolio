"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Palette, Code2, Smartphone, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { type LucideIcon } from "lucide-react";
import Lottie from "lottie-react";
import webDesignAnimationRaw from "@/public/animations/web-design.json";
import uxDesignAnimationRaw from "@/public/animations/ux-design.json";
import mobileDevAnimationRaw from "@/public/animations/mobile-dev.json";
import faceIdAnimationRaw from "@/public/animations/face-id.json";

// ─── LOTTIE RECOLORING ENGINE ──────────────────────────────────────────────
const PALETTE = {
  primary:   [0.972, 0.349, 0.0],   // #F85900
  secondary: [1.000, 0.650, 0.250], // #FFB040
  accent:    [1.000, 1.000, 1.000],
  muted:     [0.400, 0.400, 0.420],
};

function recolor(obj: any): void {
  if (typeof obj !== "object" || obj === null) return;
  if (Array.isArray(obj)) { obj.forEach(recolor); return; }
  const o = obj as Record<string, any>;
  if ("c" in o && typeof o.c === "object" && o.c !== null) {
    const c = o.c;
    if (c.a === 0 && Array.isArray(c.k) && typeof c.k[0] === "number") {
      const [r, g, b] = c.k;
      if (!(r > 0.98 && g > 0.98 && b > 0.98) && !(r < 0.02 && g < 0.02 && b < 0.02)) {
        const brightness = (r + g + b) / 3;
        c.k = [...(brightness > 0.5 ? PALETTE.secondary : PALETTE.primary), c.k[3] ?? 1];
      }
    }
    if (c.a === 1 && Array.isArray(c.k)) {
      c.k.forEach((kf: any) => {
        if (Array.isArray(kf.s)) {
          const [r, g, b] = kf.s;
          if (!(r > 0.98 && g > 0.98 && b > 0.98) && !(r < 0.02 && g < 0.02 && b < 0.02)) {
            const brightness = (r + g + b) / 3;
            kf.s = [...(brightness > 0.5 ? PALETTE.secondary : PALETTE.primary), kf.s[3] ?? 1];
          }
        }
      });
    }
  }
  Object.values(o).forEach(recolor);
}

const webDesignAnimation = (() => {
  const clone = JSON.parse(JSON.stringify(webDesignAnimationRaw));
  recolor(clone);
  return clone;
})();

const uxDesignAnimation = (() => {
  const clone = JSON.parse(JSON.stringify(uxDesignAnimationRaw));
  recolor(clone);
  return clone;
})();

const mobileDevAnimation = (() => {
  const clone = JSON.parse(JSON.stringify(mobileDevAnimationRaw));
  recolor(clone);
  return clone;
})();

const faceIdAnimation = (() => {
  const clone = JSON.parse(JSON.stringify(faceIdAnimationRaw));
  recolor(clone);
  return clone;
})();

// ─── COMPONENTS ────────────────────────────────────────────────────────────

export default function Services() {
  const t = useTranslations("services");

  const services = [
    { key: "web",         num: "01", span: "lg:col-span-2", anim: webDesignAnimation },
    { key: "design",      num: "02", span: "lg:col-span-1", anim: uxDesignAnimation },
    { key: "mobile",      num: "03", span: "lg:col-span-2", anim: mobileDevAnimation },
    { key: "performance", num: "04", span: "lg:col-span-1", anim: faceIdAnimation },
  ];

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden" aria-label="Services">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(248,89,0,0.03) 0%, transparent 80%)" }} />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#F85900" }}>Solutions</span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4" style={{ color: "#F5F5F7" }}>
            {t("title")}
          </h2>
          <p className="text-base max-w-md" style={{ color: "#A09E9E" }}>{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {services.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={s.span}
            >
              <GlassCard className="group h-full flex flex-col relative overflow-hidden p-0 border-white/5 hover:border-orange-500/20 transition-all duration-500">
                <div className="flex flex-col h-full">
                  
                  {/* Animation Area - Optimized Size */}
                  <div className="relative w-full aspect-[16/10] lg:h-[220px] flex items-center justify-center bg-black/10 transition-colors duration-700">
                    <div className="absolute w-[70%] h-[70%] rounded-full blur-[80px] opacity-10 group-hover:opacity-25 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #F85900 0%, transparent 70%)" }} />
                    
                    <div className="relative z-10 w-[75%] h-[75%] transition-transform duration-700 group-hover:scale-105">
                      <Lottie animationData={s.anim} loop autoplay />
                    </div>
                  </div>

                  {/* Text Area - More Compact */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold opacity-20 group-hover:opacity-100 group-hover:text-orange-500 transition-all" style={{ color: "#F5F5F7" }}>{s.num}</span>
                      {s.key === "web" && (
                        <div className="flex gap-1">
                          {["React", "Next.js"].map(tag => (
                            <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10" style={{ color: "#6A6A6A" }}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-heading font-bold text-2xl mb-3 tracking-tight" style={{ color: "#F5F5F7" }}>
                      {t(`items.${s.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#A09E9E" }}>
                      {t(`items.${s.key}.description`)}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-orange-600 to-transparent" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
