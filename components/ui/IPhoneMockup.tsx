"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BASE_W = 260;
const BASE_H = 530;

type IPhoneMockupProps = {
  src?: string;
  alt?: string;
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
};

export default function IPhoneMockup({
  src,
  alt = "App mockup",
  className = "",
  animate = true,
  style,
}: IPhoneMockupProps) {
  const w = (style?.width as number) ?? BASE_W;
  const h = (style?.height as number) ?? BASE_H;
  const scale = Math.min(w / BASE_W, h / BASE_H);

  return (
    <motion.div
      className={`relative mx-auto flex-shrink-0 ${className}`}
      style={{ width: w, height: h }}
      animate={animate ? { y: [0, -12, 0] } : undefined}
      transition={animate ? { duration: 4, ease: "easeInOut", repeat: Infinity } : undefined}
    >
      {/* Scaled inner shell */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: BASE_W,
          height: BASE_H,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* iPhone frame SVG */}
        <svg
          viewBox={`0 0 ${BASE_W} ${BASE_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          <rect x="1" y="1" width="258" height="528" rx="44" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="2" />
          <rect x="10" y="10" width="240" height="510" rx="36" fill="#0e0f10" />
          <rect x="12" y="12" width="236" height="506" rx="34" fill="#111111" clipPath="url(#sc)" />
          <rect x="96" y="22" width="68" height="24" rx="12" fill="#0e0f10" />
          <rect x="0" y="110" width="3" height="36" rx="1.5" fill="#2a2a2a" />
          <rect x="0" y="158" width="3" height="64" rx="1.5" fill="#2a2a2a" />
          <rect x="0" y="234" width="3" height="64" rx="1.5" fill="#2a2a2a" />
          <rect x="257" y="158" width="3" height="90" rx="1.5" fill="#2a2a2a" />
          <rect x="12" y="12" width="236" height="506" rx="34" fill="url(#sg)" opacity="0.04" />
          <defs>
            <clipPath id="sc">
              <rect x="12" y="12" width="236" height="506" rx="34" />
            </clipPath>
            <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Screen content */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 236,
            height: 506,
            borderRadius: 34,
            overflow: "hidden",
          }}
        >
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={236}
              height={506}
              className="h-full w-full object-contain"
              sizes="236px"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(160deg, #1a1a2e 0%, #0e0f10 50%, #1a0a00 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "rgba(248,89,0,0.15)",
                  border: "1px solid rgba(248,89,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F85900" }} />
              </div>
            </div>
          )}
        </div>

        {/* Frame gloss */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 44,
            pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
}
