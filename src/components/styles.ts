// Shared class strings. Kept under src/components so Tailwind scans them.

// Secondary text. zinc-600 / zinc-400 pass WCAG AA on both the page and the
// card backgrounds; zinc-500 doesn't, so don't use it for text.
export const mutedText = "text-zinc-600 dark:text-zinc-400";

// Same look as the project cards.
export const card =
  "rounded-lg border border-zinc-500 bg-zinc-200 dark:bg-black";

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500";
const outlineColors =
  "border-zinc-300 bg-white/70 hover:border-zinc-500 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/70 dark:hover:border-zinc-500 dark:hover:bg-zinc-900";
const solidColors =
  "border-transparent bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white";

export const solidPill = `${pillBase} ${solidColors} px-3 py-2 sm:px-4`;
export const outlinePill = `${pillBase} ${outlineColors} px-3 py-2 sm:px-4`;
// 44px icon-only circle on phones (so a row of them fits), labelled pill
// from `sm` up. Pair the label with `sr-only sm:not-sr-only`.
export const iconPill = `${pillBase} ${outlineColors} h-11 w-11 sm:h-auto sm:w-auto sm:px-4 sm:py-2`;
