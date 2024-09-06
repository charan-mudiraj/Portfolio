import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/constants";

export default function Home() {
  return (
    <div className="">
      <div className="text-center mt-5 text-xl font-light font-mono">
        <p>Hello There !</p>
        <p>I'm Charan</p>
      </div>
      <ModeToggle className="absolute top-5 right-5" />
      <p>Projects:</p>
      <br />
      <div className="px-5 flex flex-wrap gap-5">
        {projects.map((pjt, i) => (
          <ProjectCard project={pjt} key={i} />
        ))}
      </div>
    </div>
  );
}
