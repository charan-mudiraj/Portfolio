import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import ProjectCard from "../components/ProjectCard";
import { projects, skillIconsKeywords } from "../lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-6">
      <div className="text-center mt-5 text-xl font-light font-mono">
        <p>Hello There !</p>
        <p>I'm Charan</p>
      </div>
      <ModeToggle className="absolute top-5 right-5" />
      <br />
      <div>
        <p className="text-xl">Technologies I've worked on:</p>
        <br />
        <img
          src={`https://skillicons.dev/icons?i=${Object.values(
            skillIconsKeywords
          ).join(",")}`}
          className="pl-8"
        />
      </div>
      <br />
      <div className="px-16">
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
