"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle({ ...props }) {
  // resolvedTheme is "light" or "dark" even when the theme is "system", so the
  // first click always flips what the visitor is actually seeing.
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div {...props}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle light and dark theme</span>
      </Button>
    </div>
  );
}
