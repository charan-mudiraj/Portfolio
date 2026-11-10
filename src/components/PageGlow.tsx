"use client";
import { useTheme } from "next-themes";
import { useLayoutEffect, useRef } from "react";

// The purple glow behind the top of the page (.page-glow in globals.css).
// The CSS "bloom" animation plays on page load; this replays it whenever the
// theme changes (the toggle, or the OS theme while following the system).
export function PageGlow() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const previousTheme = useRef<string | undefined>(undefined);

  // Layout effect: restart before the browser paints the new theme, so the
  // full-size glow never flashes first. On the first resolved value (right
  // after hydration) there's nothing to restart.
  useLayoutEffect(() => {
    if (
      previousTheme.current &&
      resolvedTheme &&
      previousTheme.current !== resolvedTheme
    ) {
      // Empty when the visitor prefers reduced motion (animation: none).
      ref.current?.getAnimations().forEach((animation) => {
        animation.currentTime = 0;
        animation.play();
      });
    }
    previousTheme.current = resolvedTheme;
  }, [resolvedTheme]);

  return <div ref={ref} aria-hidden className="page-glow" />;
}
