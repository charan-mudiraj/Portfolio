import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import ProjectCard from "../components/ProjectCard";
import { projects, skillIconsKeywords } from "../lib/constants";
import { Tooltip } from "@mui/material";

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-6 px-16">
      <div className="text-center mt-5 text-xl font-light font-mono">
        <p>Hello There !</p>
        <p>I'm Charan</p>
      </div>
      <ModeToggle className="absolute top-5 right-5" />
      <br />
      <div className="w-full">
        <p className="text-xl">Technologies I've worked on:</p>
        <br />
        <div className="flex flex-wrap gap-3 px-16 text-xl">
          {Object.values(skillIconsKeywords).map((skill, i) => (
            <Tooltip title={skill.title} arrow placement="top" key={i}>
              <img src={`https://skillicons.dev/icons?i=${skill.code}`} />
            </Tooltip>
          ))}
        </div>
      </div>
      <br />
      <div>
        <p className="text-xl">Projects:</p>
        <br />
        <div className="px-5 flex flex-wrap gap-5 justify-evenly">
          {projects.map((pjt, i) => (
            <ProjectCard project={pjt} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
