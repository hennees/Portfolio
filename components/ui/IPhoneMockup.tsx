"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type IPhoneMockupProps = {
  src?: string;
  alt?: string;
  className?: string;
  animate?: boolean;
};

export default function IPhoneMockup({
  src,
  alt = "App mockup",
  className = "",
  animate = true,
}: IPhoneMockupProps) {
  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      style={{ width: 260, height: 530 }}
      animate={animate ? { y: [0, -12, 0] } : undefined}
      transition={
        animate
          ? { duration: 4, ease: "easeInOut", repeat: Infinity }
          : undefined
      }
    >
      {/* iPhone frame SVG */}
      <svg
        viewBox="0 0 260 530"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Outer shell */}
        <rect
          x="1"
          y="1"
          width="258"
          height="528"
          rx="44"
          fill="#1a1a1a"
          stroke="#3a3a3a"
          strokeWidth="2"
        />
        {/* Screen bezel */}
        <rect
          x="10"
          y="10"
          width="240"
          height="510"
          rx="36"
          fill="#0e0f10"
        />
        {/* Screen area */}
        <rect
          x="12"
          y="12"
          width="236"
          height="506"
          rx="34"
          fill="#111111"
          clipPath="url(#screen-clip)"
        />
        {/* Dynamic island */}
        <rect
          x="96"
          y="22"
          width="68"
          height="24"
          rx="12"
          fill="#0e0f10"
        />
        {/* Side buttons left */}
        <rect x="0" y="110" width="3" height="36" rx="1.5" fill="#2a2a2a" />
        <rect x="0" y="158" width="3" height="64" rx="1.5" fill="#2a2a2a" />
        <rect x="0" y="234" width="3" height="64" rx="1.5" fill="#2a2a2a" />
        {/* Side button right */}
        <rect
          x="257"
          y="158"
          width="3"
          height="90"
          rx="1.5"
          fill="#2a2a2a"
        />
        {/* Subtle screen shine */}
        <rect
          x="12"
          y="12"
          width="236"
          height="506"
          rx="34"
          fill="url(#shine-gradient)"
          opacity="0.04"
        />
        <defs>
          <clipPath id="screen-clip">
            <rect x="12" y="12" width="236" height="506" rx="34" />
          </clipPath>
          <linearGradient
            id="shine-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Screen content */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: 12,
          left: 12,
          width: 236,
          height: 506,
          borderRadius: 34,
        }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="236px"
          />
        ) : (
          /* Placeholder screen content */
          <div className="w-full h-full flex flex-col items-center justify-center gap-4"
            style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #0e0f10 50%, #1a0a00 100%)" }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(248,89,0,0.15)", border: "1px solid rgba(248,89,0,0.3)" }}>
              <div className="w-8 h-8 rounded-lg" style={{ background: "#F85900" }} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-2 w-24 rounded-full" style={{ background: "rgba(245,245,247,0.2)" }} />
              <div className="h-2 w-16 rounded-full" style={{ background: "rgba(245,245,247,0.1)" }} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-24 rounded-xl"
                  style={{ background: `rgba(248,89,0,${0.05 + i * 0.03})`, border: "1px solid rgba(255,255,255,0.05)" }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Frame gloss overlay */}
      <div
        className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
