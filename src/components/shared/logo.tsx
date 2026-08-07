import Link from "next/link";

type LogoProps = {
  size: string;
};

export function Logo({ size }: LogoProps) {
  return (
    <Link href="/" className={`text-primary font-serif ${size}`}>
      Logo
    </Link>
  );
}
