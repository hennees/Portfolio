"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Globe, Briefcase, PenTool, Send, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const SOCIALS = [
  { Icon: Globe, label: "GitHub" },
  { Icon: Briefcase, label: "LinkedIn" },
  { Icon: PenTool, label: "Figma" },
] as const;

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6"
      aria-label="Contact"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            bottom: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(248,89,0,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F85900" }}
          >
            Contact
          </span>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6"
            style={{ color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base sm:text-lg max-w-lg leading-relaxed"
            style={{ color: "#A09E9E" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Main CTA button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <a
            href="mailto:patrick@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-200 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #F85900, #FF9432)",
              color: "#0E0F10",
              boxShadow: "0 12px 40px rgba(248,89,0,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 16px 50px rgba(248,89,0,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 12px 40px rgba(248,89,0,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
          >
            <Mail size={20} aria-hidden="true" />
            {t("cta")}
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-4 mb-12"
        >
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <span className="text-xs font-medium" style={{ color: "#A09E9E" }}>
            or fill the form
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mb-16"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-12 rounded-2xl"
              style={{
                background: "rgba(47,47,47,0.4)",
                border: "1px solid rgba(248,89,0,0.2)",
              }}
              role="status"
              aria-live="polite"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(248,89,0,0.15)" }}
              >
                <Send size={24} style={{ color: "#F85900" }} aria-hidden="true" />
              </div>
              <h3
                className="font-heading font-bold text-xl"
                style={{ color: "#F5F5F7" }}
              >
                Message sent!
              </h3>
              <p className="text-sm" style={{ color: "#A09E9E" }}>
                I&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              aria-label="Contact form"
              noValidate
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#A09E9E" }}
                  >
                    {t("form.name")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder={t("form.name_placeholder")}
                    className="glass-input px-4 py-3 rounded-xl text-sm w-full"
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#A09E9E" }}
                  >
                    {t("form.email")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder={t("form.email_placeholder")}
                    className="glass-input px-4 py-3 rounded-xl text-sm w-full"
                    autoComplete="email"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#A09E9E" }}
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder={t("form.message_placeholder")}
                  className="glass-input px-4 py-3 rounded-xl text-sm w-full resize-none"
                />
              </motion.div>

              <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: sending
                      ? "rgba(47,47,47,0.6)"
                      : "linear-gradient(135deg, #F85900, #FF9432)",
                    color: sending ? "#A09E9E" : "#0E0F10",
                    boxShadow: sending
                      ? "none"
                      : "0 8px 24px rgba(248,89,0,0.3)",
                  }}
                  aria-busy={sending}
                >
                  <Send size={16} aria-hidden="true" />
                  {sending ? "Sending..." : t("form.send")}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs font-medium" style={{ color: "#A09E9E" }}>
            {t("social")}
          </span>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
                style={{
                  background: "rgba(47,47,47,0.4)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#A09E9E",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(248,89,0,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#F85900";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(248,89,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#A09E9E";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(47,47,47,0.4)";
                }}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "#A09E9E" }}>
            &copy; {new Date().getFullYear()} Patrick Hennes. Designed &amp;
            built with care.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
