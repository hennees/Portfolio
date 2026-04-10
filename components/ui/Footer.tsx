"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import { LinkedInIcon, InstagramIcon } from "@/components/ui/Icons";

const SOCIALS = [
  { Icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/hennespatrick/" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/hennees" },
] as const;

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden bg-[#0E0F10]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 800,
            height: 800,
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(248,89,0,0.03) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* Top Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 mb-12 md:mb-20"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col items-start gap-6">
            <Image
              src="/logo-dark.svg"
              alt="henUX"
              height={56}
              width={112}
              className="h-14 w-auto"
            />
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: "#A09E9E" }}>
              Bridging health and technology — designing interfaces that feel as good as they look.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    color: "#A09E9E"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F85900";
                    e.currentTarget.style.borderColor = "rgba(248,89,0,0.2)";
                    e.currentTarget.style.background = "rgba(248,89,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#A09E9E";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Platform + Legal — nebeneinander auf Mobile, je eigene Spalte auf Desktop */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 grid grid-cols-2 md:contents gap-8">
            {/* Platform Links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-sm tracking-wider uppercase mb-1" style={{ color: "#F5F5F7" }}>
                {tFooter("nav_title")}
              </h3>
              <a href="#work" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("work")}</a>
              <a href="#services" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("services")}</a>
              <a href="#about" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("about")}</a>
              <a href="#contact" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("contact")}</a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-sm tracking-wider uppercase mb-1" style={{ color: "#F5F5F7" }}>
                {tFooter("legal_title")}
              </h3>
              <Link href="/imprint" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tFooter("imprint")}</Link>
              <Link href="/privacy" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tFooter("privacy")}</Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Bottom Bar containing copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 pb-2 text-center sm:text-left">
          <p className="text-xs" style={{ color: "#A09E9E" }}>
            &copy; {year} {tFooter("made_with")}
            <span style={{ color: "#F5F5F7", fontWeight: 700, marginLeft: "4px" }}>
              Patrick Hennes
            </span>. {tFooter("rights")}
          </p>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)" }}></span>
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#A09E9E" }}>Available for work</span>
          </div>
        </div>
      </div>

      {/* Giant Typography Background using Logo SVG paths */}
      <div 
        className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none"
        style={{ transform: "translateY(30%)", zIndex: 0, opacity: 0.04 }}
      >
        <svg
          viewBox="590 250 870 185"
          style={{ width: "95vw", maxWidth: "1600px", height: "auto" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 'HEN' paths */}
          <path d="M592.314 430V405.1H612.414V280H592.314V255.1H667.014V280H646.914V329.2H728.814V280H708.414V255.1H783.414V280H763.314V405.1H783.414V430H708.414V405.1H728.814V353.2H646.914V405.1H667.014V430H592.314ZM875.224 433C859.624 433 846.524 430.2 835.924 424.6C825.324 419 817.324 411.4 811.924 401.8C806.724 392.2 804.124 381.6 804.124 370C804.124 358.4 806.724 347.9 811.924 338.5C817.124 329.1 824.524 321.6 834.124 316C843.724 310.2 855.024 307.3 868.024 307.3C881.224 307.3 892.524 310.2 901.924 316C911.524 321.6 918.824 329.1 923.824 338.5C929.024 347.9 931.624 358.4 931.624 370V382.9H820.924V358.9H902.524C902.524 354.5 901.124 350.2 898.324 346C895.724 341.6 891.824 337.9 886.624 334.9C881.624 331.9 875.424 330.4 868.024 330.4C860.624 330.4 854.324 332 849.124 335.2C844.124 338.2 840.224 342.1 837.424 346.9C834.824 351.7 833.524 356.6 833.524 361.6V370C833.524 381.4 837.024 390.5 844.024 397.3C851.024 404.1 861.724 407.5 876.124 407.5C884.524 407.5 892.424 406.2 899.824 403.6C907.224 400.8 913.324 397.2 918.124 392.8L930.724 414.7C924.524 420.3 916.524 424.8 906.724 428.2C896.924 431.4 886.424 433 875.224 433ZM948.173 430V406.9H966.773V333.4H946.673V310.3H995.273V328.6L991.373 329.5C998.973 321.9 1007.17 316.3 1015.97 312.7C1024.97 309.1 1033.87 307.3 1042.67 307.3C1055.27 307.3 1065.17 310.7 1072.37 317.5C1079.57 324.1 1083.17 334.5 1083.17 348.7V406.9H1100.27V430H1033.97V406.9H1052.57V356.5C1052.57 348.5 1050.77 342.7 1047.17 339.1C1043.57 335.5 1037.87 333.7 1030.07 333.7C1024.27 333.7 1018.37 334.8 1012.37 337C1006.37 339.2 1000.17 343.1 993.773 348.7L997.373 339.1V406.9H1014.77V430H948.173Z" fill="#42474A"/>
          {/* 'UX' paths */}
          <path d="M1210.36 433C1194.56 433 1180.86 430.1 1169.26 424.3C1157.86 418.3 1149.06 409.8 1142.86 398.8C1136.86 387.8 1133.86 374.6 1133.86 359.2V280H1113.76V255.1H1188.46V280H1168.36V357.7C1168.36 368.3 1170.16 377 1173.76 383.8C1177.36 390.6 1182.46 395.6 1189.06 398.8C1195.66 402 1203.46 403.6 1212.46 403.6C1221.66 403.6 1229.56 402 1236.16 398.8C1242.76 395.6 1247.86 390.6 1251.46 383.8C1255.06 377 1256.86 368.3 1256.86 357.7V280H1236.76V255.1H1306.66V280H1286.56V359.2C1286.56 375.6 1283.46 389.3 1277.26 400.3C1271.26 411.1 1262.56 419.3 1251.16 424.9C1239.76 430.3 1226.16 433 1210.36 433ZM1390.61 430V406.9H1407.41L1377.11 377.8H1387.91L1357.91 406.9H1375.01V430H1311.41V406.9H1326.41L1369.91 366.1L1372.91 375.1L1328.81 333.4H1313.81V310.3H1379.51V333.4H1363.61L1391.81 359.8L1379.81 360.7L1407.71 333.4H1392.11V310.3H1454.21V333.4H1439.21L1398.11 372.1L1396.01 363.1L1442.21 406.9H1458.11V430H1390.61Z" fill="#F7610A"/>
        </svg>
      </div>
    </footer>
  );
}
