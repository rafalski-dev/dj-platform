import "./../../../styles/animations.css";
import { BgGlowOrb, FloatingGlowOrb } from "./glowOrbs";
import { Sparkle } from "./sparkles";

const numberOfSparkles = 80;

const sparklesData = Array.from({ length: numberOfSparkles }, (_, index) => {
  let display = "block";
  if (index >= 20) display = "hidden md:block";
  if (index >= 40) display = "hidden xl:block";
  if (index >= 60) display = "hidden 3xl:block";

  const riseDur = 50 + Math.random() * 110;
  return {
    id: index + 1,
    size: (6 + Math.random() * 11).toFixed(1),
    left: (0 + Math.random() * 100).toFixed(1),
    baseOpacity: (0.2 + Math.random() * 0.45).toFixed(2),
    baseFloating: (4 + Math.random() * 12).toFixed(0),
    rising: `risingSparkle ${riseDur.toFixed(0)}s linear ${(-Math.random() * riseDur).toFixed(0)}s  infinite`,
    pulsing: `pulsingSparkle ${(3 + Math.random() * 7).toFixed(0)}s ease-in-out infinite`,
    floating: `floatingSparkle ${(5 + Math.random() * 8).toFixed(0)}s ease-in-out infinite`,
    display: display,
  };
});

const numberOfFloatingGlows = 8;

const floatingGlowOrbsData = Array.from({ length: numberOfFloatingGlows }, (_, index) => {
  const riseDur = 100 + Math.random() * 200;
  const fraction = index / 8;
  let display = "block";
  if (index % 2 === 0) display = "hidden";
  if (index === 0) display = "hidden md:block";
  if (index === 2) display = "hidden lg:block";
  if (index === 6) display = "hidden xl:block";
  if (index === 4 || index === 8) display = "hidden 3xl:block";
  return {
    id: index + 1,
    left: (3 + Math.random() * 94).toFixed(1),
    size: (120 + Math.random() * 130).toFixed(1),
    baseOpacity: (0.03 + Math.random() * 0.02).toFixed(2),
    baseFloating: (8 + Math.random() * 16).toFixed(0),
    rising: `risingGlowOrbs ${riseDur.toFixed(0)}s linear ${(fraction * riseDur * -1).toFixed(0)}s infinite`,
    floating: `floatingGlowOrbs ${(14 + Math.random() * 8).toFixed(0)}s ease-in-out infinite`,
    display: display,
  };
});

const staticGlowOrbsData = [
  {
    id: 1,
    size: "34",
    maxSize: "700",
    position: "top-[-10%] left-[-6%]",
    baseOpacity: "0.07",
    animationDuration: "22",
  },
  {
    id: 2,
    size: "28",
    maxSize: "750",
    position: "top-[40%] left-[45%]",
    baseOpacity: "0.05",
    animationDuration: "26",
  },
  {
    id: 3,
    size: "48",
    maxSize: "1100",
    position: "bottom-[-12%] right-[-10%]",
    baseOpacity: "0.06",
    animationDuration: "28",
  },
];

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 motion-reduce:hidden">
      {staticGlowOrbsData.map(({ id, size, maxSize, position, baseOpacity, animationDuration }) => {
        return (
          <BgGlowOrb
            key={id}
            size={size}
            maxSize={maxSize}
            position={position}
            baseOpacity={baseOpacity}
            animationDuration={animationDuration}
          />
        );
      })}
      {sparklesData.map(
        ({ id, size, left, baseOpacity, baseFloating, rising, pulsing, floating, display }) => {
          return (
            <Sparkle
              key={id}
              width={size}
              height={size}
              left={left}
              baseOpacity={baseOpacity}
              baseFloating={baseFloating}
              rising={rising}
              pulsing={pulsing}
              floating={floating}
              display={display}
            />
          );
        },
      )}
      {floatingGlowOrbsData.map(
        ({ id, left, size, baseOpacity, baseFloating, display, rising, floating }) => {
          return (
            <FloatingGlowOrb
              key={id}
              left={left}
              width={size}
              height={size}
              baseOpacity={baseOpacity}
              baseFloating={baseFloating}
              rising={rising}
              floating={floating}
              display={display}
            />
          );
        },
      )}
    </div>
  );
}
