"use client";
import { Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { Experience } from "../components/Experience";
import { Hero } from "../components/Hero";
import { ModeToggle } from "../components/ModeToggle";
import ProjectCard from "../components/ProjectCard";
import { skillsFilterAtom } from "../lib/atoms";
import { projects, skillIconsKeywords } from "../lib/constants";

// The online-status dot and the visitor chat widget are hidden for now. Their
// code (components/Chat.tsx, lib/chat_utils.ts, firestore.tsx) is still in the
// repo; CLAUDE.md ("How things work") explains how to turn them back on.

const textLinkButton =
  "text-sm text-purple-700 underline underline-offset-2 dark:text-primary-color";

function SkillsIcons() {
  const [skillsFilter, setSkillsFilter] = useAtom(skillsFilterAtom);

  return (
    <div className="mt-5 flex flex-wrap gap-3 sm:px-5">
      {Object.values(skillIconsKeywords).map((skill, i) => (
        <Tooltip title={skill.title} arrow placement="top" key={i}>
          <img
            src={`https://skillicons.dev/icons?i=${skill.code}`}
            alt={skill.title}
            className={`h-12 w-12 cursor-pointer active:duration-300 duration-150 active:scale-[0.85] ${
              skillsFilter.includes(skill.code) ? "opacity-50 scale-[0.85]" : ""
            }`}
            onClick={() =>
              setSkillsFilter((curr) => {
                const currentSelectedSkills = [...curr];
                const index = currentSelectedSkills.indexOf(skill.code);
                if (index !== -1) {
                  currentSelectedSkills.splice(index, 1);
                  return currentSelectedSkills;
                }
                return [...currentSelectedSkills, skill.code];
              })
            }
          />
        </Tooltip>
      ))}
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

  return (
    <div className="relative isolate">
      {/* Decorative grid + glow behind the top of the page (globals.css) */}
      <div aria-hidden className="page-backdrop" />
      <ModeToggle className="fixed top-4 right-4 z-50 sm:top-5 sm:right-5" />

      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-20 sm:px-8 lg:px-16">
        <Hero />
        <Experience />

        <section aria-labelledby="skills-heading" className="w-full">
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
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Click an icon to filter the projects below.
          </p>
          <SkillsIcons />
        </section>

        <section aria-labelledby="projects-heading" className="w-full">
          <h2 id="projects-heading" className="text-2xl">
            Projects
          </h2>
          <div className="mt-6 flex flex-wrap justify-evenly gap-5 sm:px-5">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((pjt) => (
                <ProjectCard project={pjt} key={pjt.id} />
              ))
            ) : (
              <p>
                No projects to show on selected stack.{" "}
                <button
                  type="button"
                  onClick={clearFilter}
                  className={textLinkButton}
                >
                  Clear filter
                </button>
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
