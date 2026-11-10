"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

// TypeScript 5.5's DOM types don't include the View Transitions API yet.
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

export function ModeToggle({ ...props }) {
  // resolvedTheme is "light" or "dark" even when the theme is "system", so the
  // first click always flips what the visitor is actually seeing.
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }
    // Cross-fade between the old and new theme (timing in globals.css).
    // next-themes applies the class in an effect, so flushSync commits the
    // change inside the transition callback; PageGlow restarts its bloom in
    // the same commit.
    doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <div {...props}>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle light and dark theme</span>
      </Button>
    </div>
  );
}
