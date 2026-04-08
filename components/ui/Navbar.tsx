"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const LOCALES = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
] as const;

type LocaleCode = "en" | "de" | "es";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLocale = (next: LocaleCode) => {
    router.replace(pathname, { locale: next });
  };

  const navLinks = [
    { href: "#work", label: t("work") },
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 rounded-2xl"
        style={{
          background: scrolled
            ? "rgba(14, 15, 16, 0.92)"
            : "rgba(14, 15, 16, 0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "background 300ms ease",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-75"
            aria-label="henUX — Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dark.svg"
              alt="henUX"
              height={56}
              style={{ height: 56, width: "auto" }}
            />
          </a>

          {/* Desktop nav links & locale */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="nav-link px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Locale switcher */}
            <div
              className="flex items-center rounded-xl p-0.5"
              style={{ background: "rgba(255,255,255,0.05)" }}
              role="group"
              aria-label="Language switcher"
            >
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: locale === code ? "rgba(255,255,255,0.1)" : "transparent",
                    color: locale === code ? "#F5F5F7" : "#A09E9E",
                  }}
                  aria-label={`Switch to ${label}`}
                  aria-pressed={locale === code}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side: Contact CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #F85900, #FF9432)",
                color: "#0E0F10",
                boxShadow: "0 4px 14px rgba(248,89,0,0.25)",
              }}
            >
              {t("contact")}
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors duration-200 cursor-pointer"
              style={{ color: "#A09E9E" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-4"
            style={{
              background: "rgba(14, 15, 16, 0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="nav-link block px-4 py-3 rounded-xl text-sm font-medium cursor-pointer"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              
              {/* Mobile Contact Link */}
              <li>
                <a
                  href="#contact"
                  className="block px-4 py-3 rounded-xl text-sm font-bold cursor-pointer mt-2"
                  style={{ background: "linear-gradient(135deg, #F85900, #FF9432)", color: "#0E0F10" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("contact")}
                </a>
              </li>

              {/* Mobile Locale Switcher */}
              <li className="mt-4 pt-4 flex gap-2 justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {LOCALES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => { switchLocale(code); setMobileOpen(false); }}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex-1"
                    style={{
                      background: locale === code ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      color: locale === code ? "#F5F5F7" : "#A09E9E",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
