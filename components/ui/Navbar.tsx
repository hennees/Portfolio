"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
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
  const [activeSection, setActiveSection] = useState("hero");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["hero", "work", "services", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const el = dialogRef.current;
    if (!el) return;

    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      } else if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [mobileOpen]);

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
          <Link
            href="/"
            className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-75"
            aria-label="henUX — Home"
          >
            <Image
              src="/logo-dark.svg"
              alt="henUX"
              height={56}
              width={112}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links & locale */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="nav-link px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
                      style={isActive ? { color: "#F5F5F7", background: "rgba(255,255,255,0.08)" } : undefined}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
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
                  className="px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[40px]"
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
              className="md:hidden p-2 rounded-xl transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ color: "#A09E9E" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-24 left-4 right-4 z-50 rounded-3xl p-6 overflow-hidden"
            style={{
              background: "rgba(18, 19, 21, 0.98)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-2" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold transition-colors duration-200 active:bg-white/5"
                      style={{ color: "#F5F5F7" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                <a
                  href="#contact"
                  className="flex items-center justify-center w-full py-4 rounded-2xl text-base font-bold transition-transform duration-200 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #F85900, #FF9432)",
                    color: "#0E0F10",
                    boxShadow: "0 8px 20px rgba(248,89,0,0.3)"
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("contact")}
                </a>

                <div className="flex gap-2 p-1 rounded-2xl bg-white/5" role="group" aria-label="Language switcher">
                  {LOCALES.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { switchLocale(code); setMobileOpen(false); }}
                      className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                      style={{
                        background: locale === code ? "rgba(255,255,255,0.15)" : "transparent",
                        color: locale === code ? "#F5F5F7" : "#A09E9E",
                      }}
                      aria-pressed={locale === code}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
