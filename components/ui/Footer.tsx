"use client";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

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
          className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 mb-20"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col items-start gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dark.svg"
              alt="henUX"
              height={56}
              style={{ height: 56, width: "auto" }}
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

          {/* Platform Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-sm tracking-wider uppercase mb-2" style={{ color: "#F5F5F7" }}>
              {tFooter("nav_title")}
            </h3>
            <a href="#work" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("work")}</a>
            <a href="#services" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("services")}</a>
            <a href="#about" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("about")}</a>
            <a href="#contact" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tNav("contact")}</a>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-sm tracking-wider uppercase mb-2" style={{ color: "#F5F5F7" }}>
              {tFooter("legal_title")}
            </h3>
            <a href="#" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tFooter("imprint")}</a>
            <a href="#" className="text-sm hover:text-[#F85900] transition-colors" style={{ color: "#A09E9E" }}>{tFooter("privacy")}</a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Bottom Bar containing copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-2">
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
          viewBox="600 100 1480 320"
          style={{ width: "95vw", maxWidth: "1600px", height: "auto" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 'hen' paths */}
          <path d="M617.857 403V361.5H651.357V153H617.857V111.5H742.357V153H708.857V235H845.357V153H811.357V111.5H936.357V153H902.857V361.5H936.357V403H811.357V361.5H845.357V275H708.857V361.5H742.357V403H617.857ZM1089.37 408C1063.37 408 1041.54 403.333 1023.87 394C1006.21 384.667 992.873 372 983.873 356C975.206 340 970.873 322.333 970.873 303C970.873 283.667 975.206 266.167 983.873 250.5C992.54 234.833 1004.87 222.333 1020.87 213C1036.87 203.333 1055.71 198.5 1077.37 198.5C1099.37 198.5 1118.21 203.333 1133.87 213C1149.87 222.333 1162.04 234.833 1170.37 250.5C1179.04 266.167 1183.37 283.667 1183.37 303V324.5H998.873V284.5H1134.87C1134.87 277.167 1132.54 270 1127.87 263C1123.54 255.667 1117.04 249.5 1108.37 244.5C1100.04 239.5 1089.71 237 1077.37 237C1065.04 237 1054.54 239.667 1045.87 245C1037.54 250 1031.04 256.5 1026.37 264.5C1022.04 272.5 1019.87 280.667 1019.87 289V303C1019.87 322 1025.71 337.167 1037.37 348.5C1049.04 359.833 1066.87 365.5 1090.87 365.5C1104.87 365.5 1118.04 363.333 1130.37 359C1142.71 354.333 1152.87 348.333 1160.87 341L1181.87 377.5C1171.54 386.833 1158.21 394.333 1141.87 400C1125.54 405.333 1108.04 408 1089.37 408ZM1210.96 403V364.5H1241.96V242H1208.46V203.5H1289.46V234L1282.96 235.5C1295.62 222.833 1309.29 213.5 1323.96 207.5C1338.96 201.5 1353.79 198.5 1368.46 198.5C1389.46 198.5 1405.96 204.167 1417.96 215.5C1429.96 226.5 1435.96 243.833 1435.96 267.5V364.5H1464.46V403H1353.96V364.5H1384.96V280.5C1384.96 267.167 1381.96 257.5 1375.96 251.5C1369.96 245.5 1360.46 242.5 1347.46 242.5C1337.79 242.5 1327.96 244.333 1317.96 248C1307.96 251.667 1297.62 258.167 1286.96 267.5L1292.96 251.5V364.5H1321.96V403H1210.96Z" fill="#F5F5F7"/>
          {/* 'Ux' paths */}
          <path d="M1647.93 408C1621.59 408 1598.76 403.167 1579.43 393.5C1560.43 383.5 1545.76 369.333 1535.43 351C1525.43 332.667 1520.43 310.667 1520.43 285V153H1486.93V111.5H1611.43V153H1577.93V282.5C1577.93 300.167 1580.93 314.667 1586.93 326C1592.93 337.333 1601.43 345.667 1612.43 351C1623.43 356.333 1636.43 359 1651.43 359C1666.76 359 1679.93 356.333 1690.93 351C1701.93 345.667 1710.43 337.333 1716.43 326C1722.43 314.667 1725.43 300.167 1725.43 282.5V153H1691.93V111.5H1808.43V153H1774.93V285C1774.93 312.333 1769.76 335.167 1759.43 353.5C1749.43 371.5 1734.93 385.167 1715.93 394.5C1696.93 403.5 1674.26 408 1647.93 408ZM1948.35 403V364.5H1976.35L1925.85 316H1943.85L1893.85 364.5H1922.35V403H1816.35V364.5H1841.35L1913.85 296.5L1918.85 311.5L1845.35 242H1820.35V203.5H1929.85V242H1903.35L1950.35 286L1930.35 287.5L1976.85 242H1950.85V203.5H2054.35V242H2029.35L1960.85 306.5L1957.35 291.5L2034.35 364.5H2060.85V403H1948.35Z" fill="#F85900"/>
        </svg>
      </div>
    </footer>
  );
}
