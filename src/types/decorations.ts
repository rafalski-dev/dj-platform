export type GlowOrbProps = {
  className?: string;
};

export type BgGlowOrbProps = {
  className?: string;
  size: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  baseOpacity: string;
  animationDuration: string;
};

export type FloatingGlowOrbProps = {
  className?: string;
  top?: string;
  left: string;
  width: string;
  height: string;
  display: string;
  baseOpacity?: string;
  baseFloating: string;
  rising: string;
  floating: string;
};

export type SparkleProps = {
  className?: string;
  width: string;
  height: string;
  left: string;
  baseOpacity: string;
  baseFloating: string;
  rising: string;
  pulsing: string;
  floating: string;
  display?: string;
};
