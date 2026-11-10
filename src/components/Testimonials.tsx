import { Linkedin, MessageSquare, Quote, Slack } from "lucide-react";
import { testimonials } from "../lib/constants";
import { Testimonial } from "../lib/types";
import { card, mutedText } from "./styles";

// Placeholder quotes render only in `npm run dev`. NODE_ENV is inlined at
// build time, so production builds drop them, and the whole section disappears
// if there's no real testimonial left.
const visibleTestimonials = testimonials.filter(
  (t) => !t.isPlaceholder || process.env.NODE_ENV === "development"
);

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const textLink =
  "underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm";

// Highlighter-pen band behind the lower part of the text; box-decoration
// clone keeps it continuous when the phrase wraps onto the next line.
const highlightMark =
  "bg-transparent bg-[linear-gradient(transparent_45%,rgb(168_85_247_/_0.28)_45%)] text-zinc-950 [-webkit-box-decoration-break:clone] [box-decoration-break:clone] dark:bg-[linear-gradient(transparent_45%,rgb(168_85_247_/_0.5)_45%)] dark:text-white";

// The words stay exactly as written; the highlight only adds emphasis.
function Messages({ t }: { t: Testimonial }) {
  const highlight = t.highlight;
  const highlightIn = highlight
    ? t.messages.findIndex((m) => m.includes(highlight))
    : -1;

  if (
    process.env.NODE_ENV === "development" &&
    highlight &&
    highlightIn === -1
  ) {
    console.warn(
      `Testimonial from ${t.name}: highlight "${highlight}" isn't in any message, so nothing is highlighted.`
    );
  }

  return (
    <blockquote className="space-y-2 leading-7 text-zinc-800 dark:text-zinc-200">
      {t.messages.map((message, i) => {
        if (i !== highlightIn || !highlight) return <p key={message}>{message}</p>;
        const start = message.indexOf(highlight);
        return (
          <p key={message}>
            {message.slice(0, start)}
            <mark className={highlightMark}>{highlight}</mark>
            {message.slice(start + highlight.length)}
          </p>
        );
      })}
    </blockquote>
  );
}

export function Testimonials() {
  if (visibleTestimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full scroll-mt-20"
    >
      <h2 id="testimonials-heading" className="text-2xl">
        What people I&apos;ve worked with say
      </h2>
      <ul className="mt-6 grid gap-4 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleTestimonials.map((t) => (
          <li key={`${t.name}-${t.messages[0]}`} className={`reveal ${card}`}>
            <figure className="flex h-full flex-col justify-between gap-6 p-6">
              <div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <Quote
                    aria-hidden
                    className="h-6 w-6 shrink-0 text-purple-700 dark:text-primary-color"
                  />
                  <span className="flex flex-wrap justify-end gap-2">
                    {t.source && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] ${mutedText}`}
                      >
                        {t.source === "Slack" ? (
                          <Slack aria-hidden className="h-3 w-3" />
                        ) : (
                          <MessageSquare aria-hidden className="h-3 w-3" />
                        )}
                        via {t.source}
                      </span>
                    )}
                    {t.isPlaceholder && (
                      <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs text-amber-900 dark:bg-amber-900/60 dark:text-amber-100">
                        Sample · dev only
                      </span>
                    )}
                  </span>
                </div>
                {t.context && (
                  <p className={`mb-3 text-xs ${mutedText}`}>{t.context}</p>
                )}
                {/* One paragraph per message, as they were sent */}
                <Messages t={t} />
              </div>
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {initials(t.name)}
                </span>
                <span className="min-w-0 text-sm">
                  {t.link ? (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-base ${textLink}`}
                    >
                      {t.name}
                      <Linkedin
                        aria-hidden
                        className="h-3.5 w-3.5 text-zinc-500"
                      />
                      <span className="sr-only">(LinkedIn)</span>
                    </a>
                  ) : (
                    <span className="block text-base">{t.name}</span>
                  )}
                  <span className={`block ${mutedText}`}>
                    {t.role} ·{" "}
                    {t.companyLink ? (
                      <a
                        href={t.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={textLink}
                      >
                        {t.company}
                      </a>
                    ) : (
                      t.company
                    )}
                    {t.date && <> · {t.date}</>}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
