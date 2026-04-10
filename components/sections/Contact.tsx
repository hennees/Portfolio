"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowRight, ArrowLeft } from "lucide-react";

// ── Icons ──────────────────────────────────────────────────────────────────

import { LinkedInIcon, InstagramIcon } from "@/components/ui/Icons";

const SOCIALS = [
  { Icon: () => <LinkedInIcon size={16} />, label: "LinkedIn", href: "https://www.linkedin.com/in/hennespatrick/" },
  { Icon: () => <InstagramIcon size={16} />, label: "Instagram", href: "https://www.instagram.com/hennees" },
] as const;

// ── Data — in Kundensprache, kein Tech-Jargon ──────────────────────────────

const PROJECT_TYPES = [
  "App (iOS)",
  "App (Android)",
  "Website",
  "UI/UX Design",
  "eHealth Lösung",
  "Beratung",
];

const SCOPES = [
  { key: "kompakt",     label: "Kompakt",     desc: "Einzelne Seite, Konzept oder Komponente" },
  { key: "projekt",     label: "Projekt",     desc: "Vollständige App, Website oder Design" },
  { key: "langfristig", label: "Langfristig", desc: "Produkt, laufende Zusammenarbeit" },
];

const TIMELINES = ["Flexibel", "1–3 Monate", "ASAP"];

// ── Sub-components ─────────────────────────────────────────────────────────

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer"
      style={
        selected
          ? { background: "rgba(248,89,0,0.12)", border: "1px solid rgba(248,89,0,0.35)", color: "#F85900" }
          : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#6A6A6A" }
      }
    >
      {label}
    </button>
  );
}

function ScopeCard({ label, desc, selected, onClick }: { label: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="flex flex-col gap-1 p-4 rounded-xl text-left cursor-pointer transition-all duration-150 w-full"
      style={
        selected
          ? { background: "rgba(248,89,0,0.08)", border: "1px solid rgba(248,89,0,0.3)" }
          : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }
      }
    >
      <span className="font-semibold text-sm" style={{ color: selected ? "#F85900" : "#F5F5F7" }}>
        {label}
      </span>
      <span className="text-xs leading-relaxed" style={{ color: "#6A6A6A" }}>
        {desc}
      </span>
    </button>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8" aria-label={`Schritt ${current} von 2`}>
      {[1, 2].map((s) => (
        <React.Fragment key={s}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
            style={{
              background: s < current ? "#F85900" : s === current ? "rgba(248,89,0,0.15)" : "rgba(255,255,255,0.05)",
              border: s === current ? "1px solid rgba(248,89,0,0.5)" : "1px solid transparent",
              color: s < current ? "#0E0F10" : s === current ? "#F85900" : "#4A4A4A",
            }}
          >
            {s < current ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : s}
          </div>
          {s < 2 && (
            <div
              className="h-px transition-all duration-500"
              style={{ background: s < current ? "#F85900" : "rgba(255,255,255,0.07)", width: "3rem" }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const stepVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
};

// ── Main ───────────────────────────────────────────────────────────────────

const WEB3FORMS_KEY = "feef905c-fd31-4d7a-a4d1-306b68ca7838";

export default function Contact() {
  const t = useTranslations("contact");

  const [step, setStep]               = useState(1);
  const [direction, setDirection]     = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedScope, setSelectedScope] = useState<string | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [submitted, setSubmitted]     = useState(false);
  const [sending, setSending]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  // Store contact fields in state so they survive step transitions
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");

  const toggleType = (val: string) =>
    setSelectedTypes((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);

  const goNext = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setDirection(1);
    setStep(2);
  };
  const goBack = () => { setDirection(-1); setStep(1); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          project_types: selectedTypes.join(", "),
          scope: selectedScope ?? "",
          timeline: selectedTimeline ?? "",
          subject: `Neue Anfrage von ${name} – henUX Portfolio`,
          from_name: "henUX Portfolio",
          replyto: email,
        }),
      });
      const result = await res.json();
      if (result.success) setSubmitted(true);
      else setError(t("form.error"));
    } catch {
      setError(t("form.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6" aria-label="Contact">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            bottom: "-30%", left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(248,89,0,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-16 lg:gap-24 items-start">

          {/* ── Left: Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10 lg:sticky lg:top-32"
          >
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F85900" }}>
              Contact
            </span>

            <h2
              className="font-heading font-black tracking-tight"
              style={{ color: "#F5F5F7", letterSpacing: "-0.03em", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.05 }}
            >
              {t("title")}
            </h2>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5A5A5A" }}>
                {t("email_label")}
              </span>
              <a
                href="mailto:patrick.hennes27@icloud.com"
                className="font-heading font-bold transition-colors duration-200 cursor-pointer"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "#F5F5F7", letterSpacing: "-0.01em" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#F85900"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#F5F5F7"; }}
              >
                patrick.hennes27@icloud.com
              </a>
              <span className="text-sm" style={{ color: "#5A5A5A" }}>{t("response_time")}</span>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5A5A5A" }}>
                {t("social")}
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#A09E9E" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F85900"; e.currentTarget.style.borderColor = "rgba(248,89,0,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#A09E9E"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  >
                    <Icon />{label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.4)" }} aria-hidden="true" />
                <span className="text-sm" style={{ color: "#5A5A5A" }}>{t("available")}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: 2-step form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
              {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-5 py-20 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(248,89,0,0.12)" }}
                role="status" aria-live="polite"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(248,89,0,0.1)" }}>
                  <Send size={24} style={{ color: "#F85900" }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1" style={{ color: "#F5F5F7" }}>
                    {t("form.success_title")}
                  </h3>
                  <p className="text-sm" style={{ color: "#A09E9E" }}>{t("form.success_message")}</p>
                </div>
              </motion.div>
            ) : (
              <div
                className="rounded-2xl p-7 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <StepIndicator current={step} />

                <form onSubmit={handleSubmit} aria-label="Contact form">

                  <AnimatePresence mode="wait" custom={direction}>

                    {/* ── Schritt 1: Kontaktdaten ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="flex flex-col gap-5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A09E9E" }}>
                              {t("form.name")}
                            </label>
                            <input
                              id="contact-name" type="text"
                              value={name} onChange={e => setName(e.target.value)}
                              placeholder={t("form.name_placeholder")} autoComplete="name"
                              className="glass-input px-4 py-3 rounded-xl text-sm w-full"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A09E9E" }}>
                              {t("form.email")}
                            </label>
                            <input
                              id="contact-email" type="email"
                              value={email} onChange={e => setEmail(e.target.value)}
                              placeholder={t("form.email_placeholder")} autoComplete="email"
                              className="glass-input px-4 py-3 rounded-xl text-sm w-full"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A09E9E" }}>
                            {t("form.message")}
                          </label>
                          <textarea
                            id="contact-message" rows={5}
                            value={message} onChange={e => setMessage(e.target.value)}
                            placeholder={t("form.message_placeholder")}
                            className="glass-input px-4 py-3 rounded-xl text-sm w-full resize-none"
                          />
                        </div>

                        {error && (
                          <p className="text-xs" style={{ color: "#F85900" }} role="alert">{error}</p>
                        )}

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={goNext}
                            disabled={!name.trim() || !email.trim() || !message.trim()}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 disabled:opacity-40"
                            style={{ background: "linear-gradient(135deg, #F85900, #FF9432)", color: "#0E0F10", boxShadow: "0 8px 24px rgba(248,89,0,0.25)" }}
                          >
                            {t("form.next")} <ArrowRight size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Schritt 2: Projektdetails (optional) ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="flex flex-col gap-6"
                      >
                        {/* Optional hint */}
                        <p className="text-xs px-3 py-2 rounded-lg" style={{ color: "#6A6A6A", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          {t("form.optional_hint")}
                        </p>

                        {/* Projektart */}
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A09E9E" }}>
                            {t("form.project_label")}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {PROJECT_TYPES.map((pt) => (
                              <Chip key={pt} label={pt} selected={selectedTypes.includes(pt)} onClick={() => toggleType(pt)} />
                            ))}
                          </div>
                        </div>

                        {/* Umfang */}
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A09E9E" }}>
                            {t("form.scope_label")}
                          </span>
                          <div className="flex flex-col gap-2">
                            {SCOPES.map((s) => (
                              <ScopeCard key={s.key} label={s.label} desc={s.desc}
                                selected={selectedScope === s.key}
                                onClick={() => setSelectedScope(s.key === selectedScope ? null : s.key)} />
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A09E9E" }}>
                            {t("form.timeline_label")}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {TIMELINES.map((tl) => (
                              <Chip key={tl} label={tl} selected={selectedTimeline === tl}
                                onClick={() => setSelectedTimeline(tl === selectedTimeline ? null : tl)} />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button" onClick={goBack}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#A09E9E" }}
                          >
                            <ArrowLeft size={15} aria-hidden="true" /> {t("form.back")}
                          </button>
                          <button
                            type="submit"
                            disabled={sending}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              background: sending ? "rgba(47,47,47,0.6)" : "linear-gradient(135deg, #F85900, #FF9432)",
                              color: sending ? "#A09E9E" : "#0E0F10",
                              boxShadow: sending ? "none" : "0 8px 24px rgba(248,89,0,0.25)",
                            }}
                            aria-busy={sending}
                          >
                            <Send size={15} aria-hidden="true" />
                            {sending ? t("form.sending") : t("form.send")}
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </form>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
