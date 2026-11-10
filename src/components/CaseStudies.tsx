"use client";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { ReactNode, useState } from "react";
import { caseStudies } from "../lib/constants";
import { CaseStudy } from "../lib/types";
import { card, mutedText } from "./styles";

// Renders `backticks` in case-study text as inline code.
function InlineCode({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded bg-zinc-300/70 px-1 py-0.5 font-mono text-[0.85em] dark:bg-zinc-800"
          >
            {part}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}

/* ---------- Diagram: React Router loaders (interactive) ---------- */

type Span = [from: number, to: number]; // percent of the timeline
type LoaderRow = { wait?: Span; work: Span };
type Scenario = {
  label: string;
  caption: string;
  rows: [LoaderRow, LoaderRow, LoaderRow]; // root, layout, page
  pageReadsNull?: boolean;
  doneAt?: number;
};

const loaderRows = [
  { name: "Root loader", detail: "gets the user", bar: "bg-zinc-700 dark:bg-zinc-300" },
  { name: "Layout loader", detail: "doesn't need the user", bar: "bg-zinc-400 dark:bg-zinc-600" },
  { name: "Page loader", detail: "needs the user", bar: "bg-purple-600 dark:bg-purple-400" },
];

const scenarios: Scenario[] = [
  {
    label: "1 · The bug",
    caption:
      "All loaders start together. The page loader reads the user before the root loader has stored it, and gets null.",
    rows: [{ work: [0, 50] }, { work: [0, 35] }, { work: [0, 20] }],
    pageReadsNull: true,
  },
  {
    label: "2 · One after another",
    caption:
      "Correct, but every loader waits for the one before it, including the layout loader, which doesn't need the user.",
    rows: [{ work: [0, 50] }, { work: [50, 80] }, { work: [80, 100] }],
    doneAt: 100,
  },
  {
    label: "3 · My dataStrategy",
    caption:
      "All loaders start together. Only the page loader waits, and only for the root loader. Then it reads the user.",
    rows: [{ work: [0, 50] }, { work: [0, 35] }, { wait: [0, 50], work: [50, 70] }],
    doneAt: 70,
  },
];

function spanStyle([from, to]: Span) {
  return { left: `${from}%`, width: `${to - from}%` };
}

function LoaderTimeline() {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];

  return (
    <div className="rounded-md border border-zinc-300 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div
        role="group"
        aria-label="How the loaders run"
        className="flex flex-wrap gap-2"
      >
        {scenarios.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
              i === active
                ? "border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 hover:border-zinc-500 dark:border-zinc-700 dark:hover:border-zinc-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div aria-hidden className="mt-5 space-y-3">
        {loaderRows.map((row, i) => {
          const { wait, work } = scenario.rows[i];
          const isPage = i === 2;
          return (
            <div key={row.name}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                <span>{row.name}</span>
                <span className={mutedText}>{row.detail}</span>
              </div>
              <div className="relative h-5 rounded bg-zinc-200 dark:bg-zinc-800">
                {/* Started, but waiting on the parent's promise */}
                <div
                  className="absolute inset-y-0 rounded-l bg-[repeating-linear-gradient(-45deg,currentColor_0_4px,transparent_4px_8px)] text-purple-600/50 transition-all duration-500 ease-out dark:text-purple-400/50"
                  style={wait ? spanStyle(wait) : { left: `${work[0]}%`, width: 0 }}
                />
                <div
                  className={`absolute inset-y-0 rounded transition-all duration-500 ease-out ${row.bar}`}
                  style={spanStyle(work)}
                />
                {isPage && (
                  <span
                    className={`absolute -top-0.5 ml-1.5 rounded bg-red-600 px-1.5 py-0.5 font-mono text-[10px] leading-4 text-white transition-opacity duration-300 ${
                      scenario.pageReadsNull ? "opacity-100" : "opacity-0"
                    }`}
                    // Pinned to where the bug scenario's page bar ends, so
                    // the hidden label never sits past the right edge.
                    style={{ left: `${scenarios[0].rows[2].work[1]}%` }}
                  >
                    user = null
                  </span>
                )}
                {/* "All data ready" marker */}
                <div
                  className={`absolute -inset-y-1.5 w-px bg-emerald-600 transition-all duration-500 dark:bg-emerald-400 ${
                    scenario.doneAt ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ left: `${scenario.doneAt ?? 50}%` }}
                />
              </div>
            </div>
          );
        })}
        <div className={`flex justify-between text-[11px] ${mutedText}`}>
          <span>page load starts</span>
          <span>time →</span>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm leading-6">
        {scenario.caption}
      </p>
      <p className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] ${mutedText}`}>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 rounded-sm bg-[repeating-linear-gradient(-45deg,currentColor_0_3px,transparent_3px_6px)] text-purple-600/60 dark:text-purple-400/60" />
          waiting for the parent
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-px bg-emerald-600 dark:bg-emerald-400" />
          all data ready
        </span>
        <span>Illustrative timings, not measurements.</span>
      </p>
    </div>
  );
}

/* ---------- Diagram: Firestore read cache (static) ---------- */

// Day documents from the real data (writers/{date} in July 2024). Which days
// count as "changed" is illustrative.
const DAYS = [14, 15, 16, 17, 18, 21, 22, 23];
const CHANGED_DAYS = new Set([16, 23]); // 16: an edited submission, 23: new ones

const flowSteps: ReactNode[] = [
  "A submission is created or updated",
  "Cloud Function trigger runs",
  <>
    That day&apos;s <code className="font-mono">lastModifiedTimestamp</code> is
    set to now
  </>,
];

function FirestoreCacheDiagram() {
  const rows = [
    { label: "Without the cache", fetched: () => true },
    { label: "With the cache", fetched: (day: number) => CHANGED_DAYS.has(day) },
  ];
  return (
    <div className="rounded-md border border-zinc-300 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
      {/* How a day gets marked as changed */}
      <ol className="flex flex-col items-stretch gap-1.5 text-xs sm:flex-row">
        {flowSteps.map((step, i) => (
          <li key={i} className="contents">
            {i > 0 && (
              <>
                <ArrowDown
                  aria-hidden
                  className="h-3.5 w-3.5 self-center text-zinc-500 sm:hidden"
                />
                <ArrowRight
                  aria-hidden
                  className="hidden h-3.5 w-3.5 shrink-0 self-center text-zinc-500 sm:block"
                />
              </>
            )}
            <span className="flex flex-1 items-center justify-center rounded border border-zinc-300 px-2.5 py-2 text-center leading-5 dark:border-zinc-700">
              {/* single child, so the text and <code> wrap as one line */}
              <span>{step}</span>
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-5 text-xs">
        When the dashboard opens{" "}
        <span className={mutedText}>(days in July 2024)</span>
      </p>
      <div className="mt-2 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <p className={`mb-1 text-[11px] ${mutedText}`}>{row.label}</p>
            <div aria-hidden className="grid grid-cols-8 gap-1.5">
              {DAYS.map((day) =>
                row.fetched(day) ? (
                  <span
                    key={day}
                    className="flex aspect-square items-center justify-center rounded bg-purple-600 text-[11px] text-white dark:bg-purple-400 dark:text-zinc-950"
                  >
                    {day}
                  </span>
                ) : (
                  <span
                    key={day}
                    className={`flex aspect-square items-center justify-center rounded border border-dashed border-zinc-400 text-[11px] dark:border-zinc-600 ${mutedText}`}
                  >
                    {day}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6">
        Without the cache, every day&apos;s submissions are read again each
        time. With it, the 16th had an edited submission and the 23rd got new
        ones, so only those two days are fetched; the rest come from
        localStorage.
      </p>
      <p className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] ${mutedText}`}>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-purple-600 dark:bg-purple-400" />
          fetched from Firestore
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-dashed border-zinc-400 dark:border-zinc-600" />
          read from localStorage
        </span>
        <span>Illustration, not measured numbers.</span>
      </p>
    </div>
  );
}

const diagrams: Record<CaseStudy["id"], () => JSX.Element> = {
  "dependent-loaders": LoaderTimeline,
  "firestore-cache": FirestoreCacheDiagram,
};

/* ---------- Section ---------- */

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h4 className={`text-xs uppercase tracking-wider ${mutedText}`}>
        {heading}
      </h4>
      <div className="mt-1 text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const Diagram = diagrams[study.id];
  return (
    <article className={`reveal p-4 sm:p-6 ${card}`}>
      <p className={`text-sm ${mutedText}`}>{study.context}</p>
      <h3 className="mt-1 text-xl">{study.title}</h3>
      <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0 space-y-4 text-sm leading-6">
          <Block heading="The problem">
            <InlineCode text={study.problem} />
          </Block>
          <Block heading="What made it tricky">
            <InlineCode text={study.challenge} />
          </Block>
          <Block heading="What I did">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-zinc-500">
              {study.approach.map((step) => (
                <li key={step}>
                  <InlineCode text={step} />
                </li>
              ))}
            </ul>
          </Block>
          <Block heading="Result">
            <InlineCode text={study.result} />
          </Block>
          {study.link &&
            (study.link.href.startsWith("#") ? (
              // In-page link (e.g. to the testimonials): same tab
              <a
                href={study.link.href}
                className="inline-flex items-center text-purple-700 underline-offset-2 hover:underline dark:text-primary-color"
              >
                {study.link.label}
                <ArrowUp aria-hidden className="ml-0.5 h-3.5 w-3.5" />
              </a>
            ) : (
              <a
                href={study.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-700 underline-offset-2 hover:underline dark:text-primary-color"
              >
                {study.link.label}
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            ))}
        </div>
        <div className="min-w-0 space-y-4">
          <Diagram />
          {study.code && (
            <figure>
              <pre className="overflow-x-auto rounded-md bg-zinc-900 p-4 font-mono text-xs leading-5 text-zinc-100">
                <code>{study.code.snippet}</code>
              </pre>
              <figcaption className={`mt-1.5 text-xs ${mutedText}`}>
                {study.code.caption}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section
      id="problems"
      aria-labelledby="problems-heading"
      className="w-full scroll-mt-20"
    >
      <h2 id="problems-heading" className="text-2xl">
        Problems I&apos;ve solved
      </h2>
      <p className={`mt-1 text-sm ${mutedText}`}>
        Two problems from my work, and how I approached them.
      </p>
      <div className="mt-6 space-y-6 sm:px-5">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
