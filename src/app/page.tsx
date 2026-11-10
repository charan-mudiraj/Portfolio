"use client";
import { Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { flushSync } from "react-dom";
import { CaseStudies } from "../components/CaseStudies";
import { Contact } from "../components/Contact";
import { Experience } from "../components/Experience";
import { Hero } from "../components/Hero";
import { PageGlow } from "../components/PageGlow";
import ProjectCard from "../components/ProjectCard";
import { SiteNav } from "../components/SiteNav";
import { mutedText, outlinePill } from "../components/styles";
import { Testimonials } from "../components/Testimonials";
import { Writing } from "../components/Writing";
import { skillsFilterAtom } from "../lib/atoms";
import {
  experience,
  profile,
  projects,
  skillIconsKeywords,
} from "../lib/constants";
import { skillIconSrc } from "../lib/utils";

// The online-status dot and the visitor chat widget are hidden for now. Their
// code (components/Chat.tsx, lib/chat_utils.ts, firestore.tsx) is still in the
// repo; CLAUDE.md ("How things work") explains how to turn them back on.

// Projects shown before "View more". Applies to the filtered list.
const INITIAL_PROJECT_COUNT = 3;

const textLinkButton =
  "text-sm text-purple-700 underline underline-offset-2 dark:text-primary-color";

const listFormat = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

function SkillsIcons() {
  const [skillsFilter, setSkillsFilter] = useAtom(skillsFilterAtom);
  const anySelected = skillsFilter.length > 0;

  const toggle = (code: string) =>
    setSkillsFilter((curr) =>
      curr.includes(code) ? curr.filter((c) => c !== code) : [...curr, code]
    );

  return (
    <div
      role="group"
      aria-label="Filter projects by technology"
      className="mt-5 flex flex-wrap gap-3 sm:px-5"
    >
      {Object.values(skillIconsKeywords).map((skill) => {
        const selected = skillsFilter.includes(skill.code);
        return (
          <Tooltip title={skill.title} arrow placement="top" key={skill.code}>
            {/* Real buttons, so the filter works from the keyboard. Selected
                skills get a ring; while filtering, the others fade back. */}
            <button
              type="button"
              aria-label={skill.title}
              aria-pressed={selected}
              onClick={() => toggle(skill.code)}
              className={`rounded-xl transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-90 dark:focus-visible:ring-offset-zinc-950 ${
                selected
                  ? "ring-2 ring-purple-600 ring-offset-2 ring-offset-white dark:ring-purple-400 dark:ring-offset-zinc-950"
                  : anySelected
                    ? "opacity-50 hover:opacity-100"
                    : ""
              }`}
            >
              <img src={skillIconSrc(skill)} alt="" className="h-12 w-12" />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [skillsFilter, setSkillsFilter] = useAtom(skillsFilterAtom);
  const clearFilter = () => setSkillsFilter([]);

  const filteredProjects = projects.filter((pjt) =>
    skillsFilter.length > 0
      ? skillsFilter.every((skillCode) =>
          pjt.stack.some((skill) => skill.code === skillCode)
        )
      : true
  );

  // For the empty state: where Charan has used the selected skills at work.
  const selectedTitles = skillsFilter.map(
    (code) =>
      Object.values(skillIconsKeywords).find((s) => s.code === code)?.title ??
      code
  );
  const usedAtWork = experience
    .map((job) => ({
      company: job.company,
      skills: (job.stack ?? []).filter((s) => skillsFilter.includes(s.code)),
    }))
    .filter((job) =>
      skillsFilter.every((code) => job.skills.some((s) => s.code === code))
    );

  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);
  const hiddenProjectCount = filteredProjects.length - visibleProjects.length;

  const collapseProjects = () => {
    // The list shrinks by several rows, so jump back to the section heading
    // instead of leaving the visitor further down the page. flushSync commits
    // the collapse first so the scroll targets the shorter page. "instant"
    // overrides the page's smooth scrolling on purpose: a smooth scroll racing
    // the layout change was unreliable and sometimes didn't move at all.
    flushSync(() => setShowAllProjects(false));
    const heading = document.getElementById("projects-heading");
    if (heading && heading.getBoundingClientRect().top < 0) {
      heading.scrollIntoView({ behavior: "instant" });
    }
  };

  return (
    <div id="top" className="relative isolate">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:bg-zinc-900"
      >
        Skip to content
      </a>
      <SiteNav />

      {/* Decorative glow + grid behind the top of the page (globals.css) */}
      <PageGlow />
      <div aria-hidden className="page-backdrop" />

      <main
        id="main-content"
        className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-20 sm:px-8 lg:px-16"
      >
        <Hero />
        <Experience />
        <Testimonials />
        <CaseStudies />

        <section id="skills" aria-labelledby="skills-heading" className="w-full">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="skills-heading" className="text-2xl">
              Technologies I&apos;ve worked on
            </h2>
            {skillsFilter.length > 0 && (
              <button
                type="button"
                onClick={clearFilter}
                className={textLinkButton}
              >
                Clear filter
              </button>
            )}
          </div>
          <p className={`mt-1 text-sm ${mutedText}`}>
            Click an icon to filter the projects below.
          </p>
          <SkillsIcons />
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="w-full scroll-mt-20"
        >
          <h2 id="projects-heading" className="scroll-mt-20 text-2xl">
            Projects
          </h2>
          <div
            id="projects-grid"
            className="mt-6 flex flex-wrap justify-evenly gap-5 sm:px-5"
          >
            {filteredProjects.length > 0 ? (
              visibleProjects.map((pjt) => (
                <ProjectCard project={pjt} key={pjt.id} />
              ))
            ) : (
              <div className="max-w-xl space-y-2 py-6 text-center">
                <p>
                  None of these projects use {listFormat.format(selectedTitles)}
                  .
                </p>
                {usedAtWork.map((job) => (
                  <p key={job.company} className={mutedText}>
                    At {job.company} I&apos;ve worked with{" "}
                    {listFormat.format(job.skills.map((s) => s.title))}.{" "}
                    <a href="#experience" className={textLinkButton}>
                      See Experience
                    </a>
                  </p>
                ))}
                <button
                  type="button"
                  onClick={clearFilter}
                  className={textLinkButton}
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
          {filteredProjects.length > INITIAL_PROJECT_COUNT && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                aria-expanded={showAllProjects}
                aria-controls="projects-grid"
                onClick={() =>
                  showAllProjects ? collapseProjects() : setShowAllProjects(true)
                }
                className={outlinePill}
              >
                {showAllProjects ? (
                  <>
                    Show fewer
                    <ChevronUp aria-hidden className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    View more ({hiddenProjectCount})
                    <ChevronDown aria-hidden className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        <Writing />
        <Contact />
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-8 lg:px-16">
        <div
          className={`flex flex-col items-center justify-between gap-3 border-t border-zinc-300 pt-6 text-sm dark:border-zinc-800 sm:flex-row ${mutedText}`}
        >
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {profile.name}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1 rounded-sm hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:hover:text-white"
          >
            Back to top
            <ArrowUp aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
