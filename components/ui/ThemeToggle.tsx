"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl transition-colors duration-200 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
      style={{
        background: "var(--c-glass-bg)",
        border: "1px solid var(--c-border)",
        color: "var(--c-text-muted)",
      }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
