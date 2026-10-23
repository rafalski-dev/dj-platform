import { StaticImageData } from "next/image";
import { Pathname } from "./navigation";

export type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export type SectionLabelProps = {
  children: string;
  textStyle?: string;
  position?: "center" | "left";
  decoration?: boolean;
  animation?: string;
};

export type SectionDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export type SectionProps = {
  children: React.ReactNode;
  anchorLink?: string;
  className?: string;
};

export type SectionTitleProps = {
  children: string;
  className?: string;
  animation?: string;
};

export type LogoProps = {
  iconSize: number;
  className: string;
  href: Pathname;
};

export type CustomImageProps = {
  src: StaticImageData;
  alt: string;
  ratio: string;
  preload?: boolean;
  sizes?: string;
  loading?: "eager" | "lazy";
  contrast?: string;
  hue?: string;
  width?: string;
};
