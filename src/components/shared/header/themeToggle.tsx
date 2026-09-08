"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ ariaLabel }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="secondary"
      size="icon-sm"
      className="text-foreground"
      aria-label={ariaLabel}
      onClick={() => {
        if (resolvedTheme === "dark") setTheme("light");
        if (resolvedTheme === "light") setTheme("dark");
      }}
    >
      {mounted && resolvedTheme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
