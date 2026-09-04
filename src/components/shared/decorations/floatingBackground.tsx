import "./../../../styles/animations.css";
import { FloatingGlowOrb } from "./glowOrbs";
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

const numberOfGlows = 8;

const glowsData = Array.from({ length: numberOfGlows }, (_, index) => {
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
    baseOpacity: (0.04 + Math.random() * 0.04).toFixed(2),
    baseFloating: (8 + Math.random() * 16).toFixed(0),
    rising: `risingGlowOrbs ${riseDur.toFixed(0)}s linear ${(fraction * riseDur * -1).toFixed(0)}s infinite`,
    floating: `floatingGlowOrbs ${(14 + Math.random() * 8).toFixed(0)}s ease-in-out infinite`,
    display: display,
  };
});

export function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
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
      {glowsData.map(({ id, left, size, baseOpacity, baseFloating, display, rising, floating }) => {
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
      })}
    </div>
  );
}
