"use client";

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  iOS:               { bg: "rgba(248,89,0,0.18)",   color: "#FF9432" },
  "UI/UX":           { bg: "rgba(255,255,255,0.1)", color: "#D4D2D2" },
  SwiftUI:           { bg: "rgba(248,89,0,0.12)",   color: "#F85900" },
  Flutter:           { bg: "rgba(32,178,170,0.16)", color: "#5ECACA" },
  Ionic:             { bg: "rgba(59,130,246,0.16)", color: "#7DB4F8" },
  "Creator Platform":{ bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  "Mental Health":   { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  "Salud Mental":    { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  "Voice AI":        { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "Voice KI":        { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "IA de Voz":       { bg: "rgba(168,85,247,0.18)", color: "#C084FC" },
  "Next.js":         { bg: "rgba(255,255,255,0.1)", color: "#F5F5F7" },
  Dashboard:         { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  SaaS:              { bg: "rgba(248,89,0,0.12)",   color: "#FF9432" },
  React:             { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" },
  Fitness:           { bg: "rgba(248,89,0,0.14)",   color: "#FF9432" },
  eHealth:           { bg: "rgba(248,89,0,0.14)",   color: "#F85900" },
  AR:                { bg: "rgba(139,92,246,0.18)", color: "#A78BFA" },
  Swift:             { bg: "rgba(255,149,0,0.16)",  color: "#FFAB40" },
  Kotlin:            { bg: "rgba(167,139,250,0.16)", color: "#B39DDB" },
  Hochschulprojekt:  { bg: "rgba(255,255,255,0.07)", color: "#C0BEBE" },
  "Uni Project":     { bg: "rgba(255,255,255,0.07)", color: "#C0BEBE" },
  "Proyecto Uni":    { bg: "rgba(255,255,255,0.07)", color: "#C0BEBE" },
  StrykerLabs:       { bg: "rgba(255,255,255,0.08)", color: "#C0BEBE" },
  Frontend:          { bg: "rgba(255,255,255,0.07)", color: "#C0BEBE" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] ?? { bg: "rgba(255,255,255,0.08)", color: "#B0AEAE" };
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const s = getTagStyle(tag);
        return (
          <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{ background: s.bg, color: s.color }}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}
