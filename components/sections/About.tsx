"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative py-24 px-6"
      aria-label="About Patrick Hennes"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(34,34,34,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(248,89,0,0.06) 0%, transparent 70%)",
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
            About
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
            style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            {t("title")}
          </h2>
          <p className="text-base" style={{ color: "#A09E9E" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Main content: split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="flex flex-col gap-6"
          >
            {[t("bio1"), t("bio2"), t("bio3")].map((bio, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: i === 0 ? "#F5F5F7" : "#A09E9E" }}
              >
                {bio}
              </motion.p>
            ))}

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 gap-4 mt-4"
            >
              {(["experience", "projects"] as const).map((statKey) => {
                const rawValue = t(`stat_values.${statKey}`) as string;
                const numericPart = parseInt(rawValue);
                const suffix = rawValue.replace(/[0-9]/g, "");
                return (
                  <div
                    key={statKey}
                    className="flex flex-col items-center gap-1 p-4 rounded-2xl text-center"
                    style={{
                      background: "rgba(47,47,47,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className="font-heading font-black text-2xl sm:text-3xl gradient-text">
                      <AnimatedCounter target={numericPart} suffix={suffix} />
                    </span>
                    <span
                      className="text-xs font-medium text-center leading-tight"
                      style={{ color: "#A09E9E" }}
                    >
                      {t(`stats.${statKey}`)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: decorative glass art */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center"
            aria-hidden="true"
          >
            <div
              className="relative w-full max-w-sm mx-auto rounded-3xl p-8 overflow-hidden"
              style={{
                background: "rgba(47,47,47,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Code snippet art */}
              <div className="font-mono text-xs leading-6 select-none">
                {/* Comment header */}
                <div className="mb-2" style={{ color: "rgba(160,158,158,0.5)" }}>
                  {"// henUX.at — patrick.ts"}
                </div>

                {/* Type definition */}
                <div>
                  <span style={{ color: "rgba(248,89,0,0.6)" }}>type </span>
                  <span style={{ color: "#F5F5F7" }}>Stack </span>
                  <span style={{ color: "#A09E9E" }}>= </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>Swift</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}> | </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>Kotlin</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}> | </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>Flutter</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}> | </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>Next.js</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                </div>

                <div className="mb-2">
                  <span style={{ color: "rgba(248,89,0,0.6)" }}>type </span>
                  <span style={{ color: "#F5F5F7" }}>Focus </span>
                  <span style={{ color: "#A09E9E" }}>= </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>eHealth</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}> | </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>UI/UX</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}> | </span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                  <span style={{ color: "#FF9432" }}>Mobile</span>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>&apos;</span>
                </div>

                {/* Const object */}
                <div>
                  <span style={{ color: "rgba(248,89,0,0.8)" }}>const </span>
                  <span style={{ color: "#FF9432" }}>patrick </span>
                  <span style={{ color: "#A09E9E" }}>= </span>
                  <span style={{ color: "#F85900" }}>{`{`}</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>name: </span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#F5F5F7" }}>Patrick Hennes</span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>location: </span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#F5F5F7" }}>Graz, Austria</span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>education: </span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#F5F5F7" }}>MSc eHealth @ FH Joanneum</span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>stack: </span>
                  <span style={{ color: "#F5F5F7" }}>Stack[]</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>focus: </span>
                  <span style={{ color: "#F5F5F7" }}>Focus</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>currentlyWorking: </span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#F5F5F7" }}>Healthcare & IT</span>
                  <span style={{ color: "rgba(248,89,0,0.7)" }}>&apos;</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>aiPowered: </span>
                  <span style={{ color: "#F85900" }}>true</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="pl-4">
                  <span style={{ color: "#A09E9E" }}>available: </span>
                  <span style={{ color: "#F85900" }}>true</span>
                  <span style={{ color: "#A09E9E" }}>,</span>
                </div>
                <div className="mb-2">
                  <span style={{ color: "#F85900" }}>{`}`}</span>
                </div>

                {/* Function call */}
                <div style={{ color: "rgba(160,158,158,0.4)" }}>{"// ready to build something?"}</div>
                <div>
                  <span style={{ color: "#FF9432" }}>hire</span>
                  <span style={{ color: "#A09E9E" }}>(</span>
                  <span style={{ color: "#FF9432" }}>patrick</span>
                  <span style={{ color: "#A09E9E" }}>)</span>
                  <span className="inline-block w-0.5 h-3.5 ml-0.5 rounded-sm animate-blink align-middle" style={{ background: "#F85900" }} aria-hidden="true" />
                </div>
              </div>

              {/* Decorative orb */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(248,89,0,0.2) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,148,50,0.12) 0%, transparent 70%)",
                  filter: "blur(25px)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
