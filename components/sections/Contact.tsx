"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowRight, ArrowLeft } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "@/components/ui/Icons";

const SOCIALS = [
  { Icon: () => <LinkedInIcon size={16} />, label: "LinkedIn", href: "https://www.linkedin.com/in/hennespatrick/" },
  { Icon: () => <InstagramIcon size={16} />, label: "Instagram", href: "https://www.instagram.com/hennees" },
] as const;

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
          : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#B8B6B6" }
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
      <span className="text-xs leading-relaxed" style={{ color: "#B8B6B6" }}>
        {desc}
      </span>
    </button>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8" aria-label={`Step ${current} of 2`}>
      {[1, 2].map((s) => (
        <React.Fragment key={s}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
            style={{
              background: s < current ? "#F85900" : s === current ? "rgba(248,89,0,0.15)" : "rgba(255,255,255,0.05)",
              border: s === current ? "1px solid rgba(248,89,0,0.5)" : "1px solid transparent",
              color: s < current ? "#0E0F10" : s === current ? "#F85900" : "#B0AEAE",
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

const isValidUUID = (uuid: string) => 
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);

const envKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const fallbackKey = "feef905c-fd31-4d7a-a4d1-306b68ca7838";
const WEB3FORMS_KEY = (envKey && isValidUUID(envKey)) ? envKey : fallbackKey;

export default function Contact() {
  const t = useTranslations("contact");

  // Load i18n chip data
  const PROJECT_TYPES = t.raw("form.project_types") as string[];
  const SCOPES = t.raw("form.scopes") as Array<{ key: string; label: string; desc: string }>;
  const TIMELINES = t.raw("form.timelines") as string[];

  const [step, setStep]               = useState(1);
  const [direction, setDirection]     = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedScope, setSelectedScope] = useState<string | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [submitted, setSubmitted]     = useState(false);
  const [sending, setSending]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState(false);

  const [nameError, setNameError]       = useState(false);
  const [emailError, setEmailError]     = useState(false);
  const [messageError, setMessageError] = useState(false);

  const toggleType = (val: string) =>
    setSelectedTypes((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);

  const validateStep1 = () => {
    const nErr = !name.trim();
    const eErr = !email.trim();
    const mErr = !message.trim();
    setNameError(nErr);
    setEmailError(eErr);
    setMessageError(mErr);
    return !nErr && !eErr && !mErr;
  };

  const goNext = () => {
    if (!validateStep1()) return;
    setDirection(1);
    setStep(2);
  };
  const goBack = () => { setDirection(-1); setStep(1); };

  const sendFormData = async () => {
    if (!validateStep1()) return;

    if (botcheck) {
      setSubmitted(true);
      return;
    }

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
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || `Error: ${res.status}`);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(t("form.error"));
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendFormData();
  };

  const submitDirect = async () => {
    await sendFormData();
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
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F85900" }}>
              {t("overline")}
            </span>

            <h2
              className="font-heading font-black tracking-tight"
              style={{ color: "#F5F5F7", letterSpacing: "-0.03em", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.05 }}
            >
              {t("title")}
            </h2>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#B0AEAE" }}>
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
              <span className="text-sm" style={{ color: "#B0AEAE" }}>{t("response_time")}</span>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#B0AEAE" }}>
                {t("social")}
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#C0BEBE" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F85900"; e.currentTarget.style.borderColor = "rgba(248,89,0,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#A09E9E"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  >
                    <Icon />{label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.4)" }} aria-hidden="true" />
                <span className="text-sm" style={{ color: "#B0AEAE" }}>{t("available")}</span>
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
                  <p className="text-sm" style={{ color: "#C0BEBE" }}>{t("form.success_message")}</p>
                </div>
              </motion.div>
            ) : (
              <div
                className="rounded-2xl p-7 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <StepIndicator current={step} />

                <form onSubmit={handleSubmit} aria-label="Contact form" noValidate>

                  <AnimatePresence mode="wait" custom={direction}>

                    {/* ── Step 1: Contact details ── */}
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
                            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#C0BEBE" }}>
                              {t("form.name")}
                              <span className="ml-1" style={{ color: "#F85900" }} aria-hidden="true">*</span>
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              required
                              aria-required="true"
                              aria-describedby={nameError ? "name-error" : undefined}
                              aria-invalid={nameError}
                              value={name}
                              onChange={e => { setName(e.target.value); if (nameError) setNameError(false); }}
                              placeholder={t("form.name_placeholder")}
                              autoComplete="name"
                              className="glass-input px-4 py-3 rounded-xl text-sm w-full"
                              style={nameError ? { borderColor: "rgba(248,89,0,0.5)" } : undefined}
                            />
                            {nameError && (
                              <p id="name-error" className="text-xs" style={{ color: "#F85900" }} role="alert">
                                {t("form.field_required")}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#C0BEBE" }}>
                              {t("form.email")}
                              <span className="ml-1" style={{ color: "#F85900" }} aria-hidden="true">*</span>
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              required
                              aria-required="true"
                              aria-describedby={emailError ? "email-error" : undefined}
                              aria-invalid={emailError}
                              value={email}
                              onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(false); }}
                              placeholder={t("form.email_placeholder")}
                              autoComplete="email"
                              className="glass-input px-4 py-3 rounded-xl text-sm w-full"
                              style={emailError ? { borderColor: "rgba(248,89,0,0.5)" } : undefined}
                            />
                            {emailError && (
                              <p id="email-error" className="text-xs" style={{ color: "#F85900" }} role="alert">
                                {t("form.field_required")}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#C0BEBE" }}>
                            {t("form.message")}
                            <span className="ml-1" style={{ color: "#F85900" }} aria-hidden="true">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            rows={5}
                            required
                            aria-required="true"
                            aria-describedby={messageError ? "message-error" : undefined}
                            aria-invalid={messageError}
                            value={message}
                            onChange={e => { setMessage(e.target.value); if (messageError) setMessageError(false); }}
                            placeholder={t("form.message_placeholder")}
                            className="glass-input px-4 py-3 rounded-xl text-sm w-full resize-none"
                            style={messageError ? { borderColor: "rgba(248,89,0,0.5)" } : undefined}
                          />
                          {messageError && (
                            <p id="message-error" className="text-xs" style={{ color: "#F85900" }} role="alert">
                              {t("form.field_required")}
                            </p>
                          )}
                        </div>

                        {/* Honeypot field for bot protection */}
                        <input
                          type="checkbox"
                          name="botcheck"
                          className="hidden"
                          style={{ display: "none" }}
                          onChange={(e) => setBotcheck(e.target.checked)}
                          checked={botcheck}
                          aria-hidden="true"
                          tabIndex={-1}
                          autoComplete="off"
                        />

                        {error && (
                          <p className="text-xs" style={{ color: "#F85900" }} role="alert">{error}</p>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          {/* Direct send — skip step 2 */}
                          <button
                            type="button"
                            onClick={submitDirect}
                            disabled={sending}
                            className="text-xs font-medium transition-colors duration-200 cursor-pointer disabled:opacity-40"
                            style={{ color: "#B0AEAE" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#F5F5F7"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "#B0AEAE"; }}
                            aria-busy={sending}
                          >
                            {sending ? t("form.sending") : t("form.skip")}
                          </button>

                          <button
                            type="button"
                            onClick={goNext}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200"
                            style={{ background: "linear-gradient(135deg, #F85900, #FF9432)", color: "#0E0F10", boxShadow: "0 8px 24px rgba(248,89,0,0.25)" }}
                          >
                            {t("form.next")} <ArrowRight size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 2: Project details (optional) ── */}
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
                        <p className="text-xs px-3 py-2 rounded-lg" style={{ color: "#B0AEAE", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          {t("form.optional_hint")}
                        </p>

                        {/* Project type */}
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#C0BEBE" }}>
                            {t("form.project_label")}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {PROJECT_TYPES.map((pt) => (
                              <Chip key={pt} label={pt} selected={selectedTypes.includes(pt)} onClick={() => toggleType(pt)} />
                            ))}
                          </div>
                        </div>

                        {/* Scope */}
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#C0BEBE" }}>
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
                          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                            {t("form.timeline_label")}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {TIMELINES.map((tl) => (
                              <Chip key={tl} label={tl} selected={selectedTimeline === tl}
                                onClick={() => setSelectedTimeline(tl === selectedTimeline ? null : tl)} />
                            ))}
                          </div>
                        </div>

                        {error && (
                          <p className="text-xs text-accent mt-2" role="alert">{error}</p>
                        )}

                        <div className="flex items-center justify-between pt-1">

                          <button
                            type="button" onClick={goBack}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#C0BEBE" }}
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
