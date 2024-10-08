"use client";
import { ModeToggle } from "../components/ModeToggle";
import ProjectCard from "../components/ProjectCard";
import { projects, skillIconsKeywords } from "../lib/constants";
import { Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { skillsFilterAtom } from "../lib/atoms";
import React, { useEffect, useState } from "react";
import { DB } from "../firestore";
import { doc, getDoc } from "firebase/firestore";

interface OnlineStatus {
  isOnline: boolean;
}

function SkillsIcons() {
  const [skillsFilter, setSkillsFilter] = useAtom(skillsFilterAtom);

  return (
    <div className="flex flex-wrap gap-3 px-16 text-xl">
      {Object.values(skillIconsKeywords).map((skill, i) => (
        <Tooltip title={skill.title} arrow placement="top" key={i}>
          <img
            src={`https://skillicons.dev/icons?i=${skill.code}`}
            className={`cursor-pointer duration-300 active:scale-[0.85] ${
              skillsFilter.includes(skill.code) && "opacity-50 scale-[0.85]"
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
  const [amIOnline, setAmIOnline] = useState(false);

  const getFilteredProjects = () => {
    return projects.filter((pjt) =>
      skillsFilter.length > 0
        ? skillsFilter.every((skillCode) =>
            pjt.stack.some((skill) => skill.code === skillCode)
          )
        : true
    );
  };
  const filteredProjects = getFilteredProjects();

  useEffect(() => {
    const docRef = doc(DB, "background", "online-status");
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as OnlineStatus;
          if (data.isOnline) setAmIOnline(data.isOnline);
        } else {
          throw new Error("Failed to fetch online status");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center pb-6 px-16">
      <div className="flex gap-2">
        Online Status:{" "}
        <div
          className={`${
            amIOnline ? "bg-green-500" : "bg-zinc-500"
          } p-3 rounded-full`}
        />
      </div>

      <div className="text-center mt-5 text-xl font-light font-mono">
        <p>Hello There !</p>
        <p>I'm Charan</p>
      </div>
      <ModeToggle className="absolute top-5 right-5" />
      <br />
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-xl">
            Technologies I've worked on:{" "}
            <span className="text-zinc-500 text-sm">
              (Click on icon to filter the below projects)
            </span>
          </p>
          {skillsFilter.length > 0 && (
            <p
              className="underline text-primary-color cursor-pointer"
              onClick={() => setSkillsFilter([])}
            >
              Clear
            </p>
          )}
        </div>
        <br />
        <SkillsIcons />
      </div>
      <br />
      <div className="w-full">
        <p className="text-xl">Projects:</p>
        <br />
        <div className="px-5 flex flex-wrap gap-5 justify-evenly">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((pjt, i) => (
              <ProjectCard project={pjt} key={i} />
            ))
          ) : (
            <p>
              No projects to show on selected stack.{" "}
              <span
                className="underline text-primary-color cursor-pointer"
                onClick={() => setSkillsFilter([])}
              >
                Clear Filter
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
