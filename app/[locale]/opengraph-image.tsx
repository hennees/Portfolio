import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0E0F10",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Orange glow bottom center */}
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(248,89,0,0.18) 0%, transparent 65%)",
            bottom: -300,
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />

        {/* Top-right subtle glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(248,89,0,0.08) 0%, transparent 65%)",
            top: -200,
            right: -100,
            display: "flex",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 80px",
            height: "100%",
          }}
        >
          {/* Top: Icon + henUX */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="36" height="44" viewBox="0 0 560 693" fill="none">
              <path d="M0 267.5C0 278.546 8.9543 287.5 20 287.5C31.0457 287.5 40 278.546 40 267.5H20H0ZM20 267.5H40V87H20H0V267.5H20ZM451 87H431V217H451H471V87H451ZM87 20V40H384V20V0H87V20ZM451 87H471C471 38.9512 432.049 0 384 0V20V40C409.957 40 431 61.0426 431 87H451ZM20 87H40C40 61.0426 61.0426 40 87 40V20V0C38.9512 0 0 38.9512 0 87H20Z" fill="#C8C8C8"/>
              <path d="M471 477C471 465.954 462.046 457 451 457C439.954 457 431 465.954 431 477H451H471ZM451 477H431V606H451H471V477H451ZM384 673V653H87V673V693H384V673ZM20 606H40V489.5H20H0V606H20ZM87 673V653C61.0426 653 40 631.957 40 606H20H0C0 654.049 38.9512 693 87 693V673ZM451 606H431C431 631.957 409.957 653 384 653V673V693C432.049 693 471 654.049 471 606H451Z" fill="#C8C8C8"/>
              <rect x="178" y="58" width="116" height="46" rx="23" fill="#C8C8C8"/>
              <circle cx="236" cy="356" r="50" fill="#F85900"/>
              <path d="M170.997 216.516L163.366 208.884C160.134 205.653 160.134 200.428 163.366 197.231L230.156 130.406C233.387 127.175 238.612 127.175 241.809 130.406L308.6 197.197C311.831 200.428 311.831 205.653 308.6 208.85L300.969 216.481C297.703 219.747 292.375 219.678 289.178 216.344L249.75 174.956V273.75C249.75 278.322 246.072 282 241.5 282H230.5C225.928 282 222.25 278.322 222.25 273.75V174.956L182.787 216.378C179.591 219.747 174.262 219.816 170.997 216.516Z" fill="#F85900"/>
              <path d="M152 374.5C163.046 374.5 172 365.546 172 354.5C172 343.454 163.046 334.5 152 334.5V354.5V374.5ZM20 489.5H40V421.5H20H0V489.5H20ZM87 354.5V374.5H152V354.5V334.5H87V354.5ZM20 421.5H40C40 395.543 61.0426 374.5 87 374.5V354.5V334.5C38.9512 334.5 0 373.451 0 421.5H20Z" fill="#F85900"/>
            </svg>
            <span style={{ color: "#5A5A5A", fontSize: 22, letterSpacing: 2, fontWeight: 600 }}>
              henux.at
            </span>
          </div>

          {/* Center: Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Tag */}
            <div
              style={{
                display: "flex",
                width: "fit-content",
                padding: "8px 20px",
                borderRadius: 8,
                background: "rgba(248,89,0,0.12)",
                border: "1px solid rgba(248,89,0,0.3)",
                color: "#F85900",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              UI/UX · eHealth · Mobile
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: "#F5F5F7",
                lineHeight: 1,
                letterSpacing: "-3px",
              }}
            >
              Patrick Hennes
            </div>

            {/* Subtitle */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 40, height: 2, background: "#F85900", display: "flex" }} />
              <span style={{ color: "#6B6969", fontSize: 26, fontWeight: 400 }}>
                Designer & eHealth Developer · Graz, Austria
              </span>
            </div>
          </div>

          {/* Bottom: Tags */}
          <div style={{ display: "flex", gap: 12 }}>
            {["iOS", "Flutter", "Next.js", "Figma", "FHIR"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#A09E9E",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
