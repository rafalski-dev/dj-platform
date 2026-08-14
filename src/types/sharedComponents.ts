export type WrapperProps = {
  children: React.ReactNode;
};

export type SectionLabelProps = {
  children: string;
  textStyle?: string;
  position?: "center" | "left";
};

export type SectionDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export type SectionTitleProps = {
  children: string;
  className?: string;
};

export type LogoProps = {
  iconSize: number;
  className: string;
};

export type CustomImageProps = {
  src: string;
  alt: string;
  ratio?: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
  sizes?: string;
  contrast?: string;
  hue?: string;
};
