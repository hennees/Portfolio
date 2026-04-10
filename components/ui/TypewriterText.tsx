"use client";

import { useEffect, useState, useRef } from "react";

export function TypewriterText({ phrases }: { phrases: string[] }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = phrases[current];
    if (paused) {
      timeoutRef.current = setTimeout(() => { setPaused(false); setDeleting(true); }, 2200);
      return;
    }
    if (!deleting && displayed.length < phrase.length) {
      timeoutRef.current = setTimeout(() => { setDisplayed(phrase.slice(0, displayed.length + 1)); }, 60);
    } else if (!deleting && displayed.length === phrase.length) {
      setPaused(true);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => { setDisplayed(displayed.slice(0, -1)); }, 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrent((c) => (c + 1) % phrases.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, paused, current, phrases]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="gradient-text">{displayed}</span>
      <span className="inline-block w-0.5 h-7 sm:h-8 rounded-full ml-0.5 animate-blink" style={{ background: "#F85900" }} aria-hidden="true" />
    </span>
  );
}
