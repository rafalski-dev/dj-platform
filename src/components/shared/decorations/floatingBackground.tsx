import "./../../../styles/animations.css";
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
    size: (6 + Math.random() * 11).toFixed(2),
    left: (0 + Math.random() * 100).toFixed(2),
    baseOpacity: (0.2 + Math.random() * 0.45).toFixed(2),
    baseFloating: (4 + Math.random() * 12).toFixed(0),
    rising: `risingSparkle ${riseDur.toFixed(0)}s linear ${(-Math.random() * riseDur).toFixed(0)}s  infinite`,
    pulsing: `pulsingSparkle ${(3 + Math.random() * 7).toFixed(0)}s ease-in-out infinite`,
    floating: `floatingSparkle ${(5 + Math.random() * 8).toFixed(0)}s ease-in-out infinite`,
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
    </div>
  );
}
