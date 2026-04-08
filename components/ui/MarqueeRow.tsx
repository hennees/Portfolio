"use client";

type MarqueeItem = {
  label: string;
  icon?: string;
};

type MarqueeRowProps = {
  items: MarqueeItem[];
  reverse?: boolean;
  className?: string;
};

export default function MarqueeRow({ items, reverse = false, className = "" }: MarqueeRowProps) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 w-24 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0E0F10, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 w-24 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #0E0F10, transparent)",
        }}
      />

      <div
        className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200"
            style={{
              background: "rgba(47,47,47,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#A09E9E",
              backdropFilter: "blur(12px)",
            }}
          >
            {item.icon && (
              <span className="text-base leading-none" aria-hidden="true">
                {item.icon}
              </span>
            )}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
