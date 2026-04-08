"use client";

import FullLogo from "@/components/ui/FullLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        background: "rgba(14,15,16,0.95)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <FullLogo height={36} />
        <p className="text-xs" style={{ color: "#A09E9E" }}>
          © {year} henUX — Patrick Hennes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
