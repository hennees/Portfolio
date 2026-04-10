export type ColorMap = [number[], number[]][];
export type HexColorMap = Record<string, string>;

export const PORTFOLIO_COLOR_MAP: ColorMap = [
  [[0.416, 0.914, 0.624], [0.969, 0.380, 0.039]], // grün → #F7610A
  [[0.627, 0.627, 0.780], [0.416, 0.416, 0.447]], // muted purple → neutral
  [[0.710, 0.671, 0.937], [0.627, 0.620, 0.620]], // light purple → #A09E9E
  [[0.812, 0.792, 1.000], [0.831, 0.824, 0.824]], // very light purple → #D4D2D2
  [[0.906, 0.890, 1.000], [0.929, 0.918, 0.918]], // near-white purple → #EDEAEA
  [[0.961, 0.953, 1.000], [0.961, 0.961, 0.969]], // almost white → #F5F5F7
];

export function hexToLottieRgb(hex: string): number[] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function lottieRgbToHex(r: number, g: number, b: number): string {
  const to255 = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255);
  return "#" + [r, g, b]
    .map((v) => to255(v).toString(16).padStart(2, "0"))
    .join("").toLowerCase();
}

function matchAndReplace(arr: number[], colorMap: ColorMap): void {
  for (const [src, dst] of colorMap) {
    if (
      Math.abs(arr[0] - src[0]) < 0.04 &&
      Math.abs(arr[1] - src[1]) < 0.04 &&
      Math.abs(arr[2] - src[2]) < 0.04
    ) {
      arr[0] = dst[0]; arr[1] = dst[1]; arr[2] = dst[2];
      return;
    }
  }
}

export function recolorLottie(animationData: any, colorMap: ColorMap | HexColorMap): any {
  const clone = JSON.parse(JSON.stringify(animationData));
  
  let activeMap: ColorMap;
  if (!Array.isArray(colorMap)) {
    activeMap = Object.entries(colorMap).map(([srcHex, dstHex]) => [
      hexToLottieRgb(srcHex),
      hexToLottieRgb(dstHex)
    ]);
  } else {
    activeMap = colorMap;
  }

  function process(obj: unknown): void {
    if (typeof obj !== "object" || obj === null) return;
    if (Array.isArray(obj)) { obj.forEach(process); return; }
    const o = obj as Record<string, unknown>;
    if ("c" in o && typeof o.c === "object" && o.c !== null) {
      const c = o.c as { a: number; k: unknown };
      if (c.a === 0 && Array.isArray(c.k) && typeof c.k[0] === "number")
        matchAndReplace(c.k as number[], activeMap);
      if (c.a === 1 && Array.isArray(c.k))
        (c.k as { s?: number[] }[]).forEach((kf) => { if (Array.isArray(kf.s)) matchAndReplace(kf.s, activeMap); });
    }
    Object.values(o).forEach(process);
  }

  process(clone);
  return clone;
}
