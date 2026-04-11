"use client";

import { useTheme } from "./ThemeProvider";

type Props = {
  height?: number;
  className?: string;
};

export default function FullLogo({ height = 80, className = "" }: Props) {
  const { theme } = useTheme();
  const aspectRatio = 1486 / 693;
  const width = Math.round(height * aspectRatio);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
      alt="henUX"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}
