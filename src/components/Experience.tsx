import { ArrowUpRight } from "lucide-react";
import { experience } from "../lib/constants";
import {
  Experience as ExperienceEntry,
  ExperienceHighlight,
  ExperienceRole,
} from "../lib/types";

// Secondary text. zinc-600 / zinc-400 pass WCAG AA on the card backgrounds
// (zinc-200 / black); zinc-500 doesn't, so don't use it here.
const mutedText = "text-zinc-600 dark:text-zinc-400";

function RoleTimeline({ roles }: { roles: ExperienceRole[] }) {
  return (
    <ol className="mt-3">
      {roles.map((role, i) => {
        const isLast = i === roles.length - 1;
        return (
          <li
            key={`${role.title}-${role.dates}`}
            className={`relative pl-6 ${isLast ? "" : "pb-4"}`}
          >
            {/* Rail joining this role's dot to the next one */}
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-[5px] top-[18px] -bottom-[7px] w-px bg-zinc-400 dark:bg-zinc-600"
              />
            )}
            <span
              aria-hidden
              className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border ${
                role.isCurrent
                  ? "border-purple-700 bg-purple-700 dark:border-primary-color dark:bg-primary-color"
                  : "border-zinc-500 bg-zinc-200 dark:bg-black"
              }`}
            />
            <h4 className="text-base">{role.title}</h4>
            <p className={`text-sm ${mutedText}`}>
              {role.employmentType && <>{role.employmentType} · </>}
              {role.dates}
            </p>
            {role.note && (
              <p className={`mt-1 text-sm ${mutedText}`}>{role.note}</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Highlight({ highlight }: { highlight: ExperienceHighlight }) {
  if (!highlight.link) return <li>{highlight.text}</li>;
  return (
    <li>
      {highlight.text}{" "}
      {/* nowrap keeps "(label ↗)." together when the line wraps */}
      <span className="whitespace-nowrap">
        (
        <a
          href={highlight.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-700 underline-offset-2 hover:underline dark:text-primary-color"
        >
          {highlight.link.label}
          <ArrowUpRight
            aria-hidden
            className="inline h-3.5 w-3.5 align-[-2px]"
          />
        </a>
        ).
      </span>
    </li>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="rounded-lg border border-zinc-500 bg-zinc-200 p-4 dark:bg-black sm:p-6 lg:flex lg:gap-8">
      <div className="lg:w-72 lg:shrink-0">
        <h3 className="text-lg">
          {entry.company}
          {entry.companyNote && (
            <span className={mutedText}> ({entry.companyNote})</span>
          )}
        </h3>
        <RoleTimeline roles={entry.roles} />
      </div>
      <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700 marker:text-zinc-500 dark:text-zinc-300 lg:mt-0">
        {entry.highlights.map((highlight) => (
          <Highlight key={highlight.text} highlight={highlight} />
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full"
    >
      <h2 id="experience-heading" className="text-2xl">
        Experience
      </h2>
      <div className="mt-6 space-y-4 sm:px-5">
        {experience.map((entry) => (
          <ExperienceCard key={entry.company} entry={entry} />
        ))}
      </div>
    </section>
  );
}
