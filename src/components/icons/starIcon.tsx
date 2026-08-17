export function StarIcon({
  size = 33,
  color = "#FFFFFF",
  variant = "filled",
  className = "",
  ...props
}: {
  size?: number;
  color?: string;
  variant?: "filled" | "empty";
  className?: string;
} & React.SVGProps<SVGSVGElement>) {
  const isEmpty = variant === "empty";
  return (
    <svg
      viewBox="0 -0.5 33 33"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={isEmpty ? "none" : color}
      stroke={color}
      strokeWidth={isEmpty ? 2 : 0}
      strokeLinejoin="round"
      {...props}
    >
      <title>star</title>
      <polygon points="27.865,31.83 17.615,26.209 7.462,32.009 9.553,20.362 0.99,12.335 12.532,10.758 17.394,0 22.436,10.672 34,12.047 25.574,20.22" />
    </svg>
  );
}
