type Props = {
  height?: number;
  className?: string;
};

export default function FullLogo({ height = 80, className = "" }: Props) {
  const aspectRatio = 2077 / 820;
  const width = Math.round(height * aspectRatio);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-dark.svg"
      alt="henUX"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}
