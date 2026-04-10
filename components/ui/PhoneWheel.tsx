"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

export function PhoneWheel({
  screens,
  centerWidth = 200,
  containerHeight = 440,
  interval = 2800,
  accentColor = "#F85900",
}: {
  screens: string[];
  centerWidth?: number;
  containerHeight?: number;
  interval?: number;
  accentColor?: string;
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = screens.length;

  const touchStartX = useRef<number | null>(null);

  const advance = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const retreat = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (hovered || reduce || total <= 1) return;
    timerRef.current = setInterval(advance, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hovered, reduce, total, advance, interval]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setHovered(true); // pause auto-rotate while touching
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) {
      dx < 0 ? advance() : retreat();
    }
    touchStartX.current = null;
    setHovered(false);
  }

  const s1x = centerWidth * 1.1;
  const s2x = centerWidth * 1.95;

  const slots = [
    { x: 0,    ry:  0,  scale: 1,    opacity: 1,    z: 30, brightness: 1    },
    { x: s1x,  ry: 38,  scale: 0.78, opacity: 0.65, z: 20, brightness: 0.6  },
    { x: s2x,  ry: 52,  scale: 0.58, opacity: 0.28, z: 10, brightness: 0.4  },
  ];

  // Wide enough to show the full fan on both sides
  const containerWidth = s2x * 2 + centerWidth;

  return (
    <div
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        perspective: 1000,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {screens.map((src, idx) => {
        let offset = idx - current;
        if (offset > total / 2)  offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);
        if (absOffset >= slots.length) return null;

        const slot     = slots[absOffset];
        const sign     = offset > 0 ? 1 : offset < 0 ? -1 : 0;
        const isCenter = offset === 0;

        return (
          <motion.div
            key={src}
            animate={{
              x: sign * slot.x,
              rotateY: sign * slot.ry,
              scale: slot.scale,
              opacity: slot.opacity,
            }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            style={{
              position: "absolute",
              bottom: 0,
              // Anchor at 50% of the container; marginLeft centers the phone
              left: "50%",
              marginLeft: -centerWidth / 2,
              width: centerWidth,
              zIndex: slot.z,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={src}
              alt=""
              width={centerWidth}
              height={Math.round(centerWidth * 2.165)}
              sizes="(max-width: 768px) 140px, 210px"
              loading={isCenter ? "eager" : "lazy"}
              className="object-contain select-none"
              draggable={false}
              style={{
                filter: isCenter
                  ? `drop-shadow(0 32px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 35px ${accentColor}35)`
                  : `brightness(${slot.brightness}) drop-shadow(0 16px 32px rgba(0,0,0,0.75))`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
