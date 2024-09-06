"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import { useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Project } from "../lib/types";

function ProjectContent({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col justify-between gap-1 border-[1px] border-zinc-500 rounded-lg text-center px-2 pt-2 pb-3 h-[348px] bg-zinc-200 dark:bg-black`}
    >
      {children}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  return (
    <Tabs
      defaultValue="preview"
      className="w-[318px] flex flex-col justify-center"
    >
      <TabsList>
        <TabsTrigger value="preview" className="w-full">
          Preview
        </TabsTrigger>

        <TabsTrigger value="about" className="w-full">
          About
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <ProjectContent>
          <div
            className="relative rounded-lg overflow-hidden"
            onMouseEnter={(e) => {
              if (!project.youtubeVideoId) return;
              setIsHovering(true);
              playerRef.current?.playVideo();
            }}
            onMouseLeave={(e) => {
              if (!project.youtubeVideoId) return;
              setIsHovering(false);
              playerRef.current?.pauseVideo();
            }}
          >
            <img
              src={project.imgSrc}
              className={`rounded-lg aspect-video object-cover h-[181px]`}
            />
            {project.youtubeVideoId && (
              <YouTube
                videoId={project.youtubeVideoId}
                opts={{
                  height: "181",
                }}
                onReady={(e: YouTubeEvent) => {
                  playerRef.current = e.target;
                }}
                ref={playerRef}
                className={`absolute top-0 h-full object-cover rounded-lg z-10 ${
                  isHovering ? "opacity-100" : "opacity-0"
                } transition-opacity duration-700`}
              />
            )}
          </div>
          <div
            className="text-lg opacity-80 cursor-pointer hover:underline"
            dangerouslySetInnerHTML={{ __html: project.title }}
          />
          <div className="px-2 space-y-2">
            <div className="flex w-full justify-between gap-2">
              <Link href={project.liveLink} target="_blank" className="w-full">
                <Button className="w-full font-bold bg-zinc-800 dark:bg-zinc-200">
                  Live
                  <BoltIcon className="text-orange-400" />
                </Button>
              </Link>
              <Link href={project.codeLink} target="_blank" className="w-full">
                <Button className="w-full font-bold bg-zinc-800 dark:bg-zinc-200">
                  Code
                  <CodeIcon className="ml-1 text-blue-500" />
                </Button>
              </Link>
            </div>
            <Button className="w-full font-bold bg-zinc-800 dark:bg-zinc-200">
              More Details
            </Button>
          </div>
        </ProjectContent>
      </TabsContent>

      <TabsContent value="about" className="dark:text-zinc-400 text-zinc-600">
        <ProjectContent>
          <div className="h-full flex flex-col px-1 py-1 justify-between">
            <div>
              <p
                dangerouslySetInnerHTML={{ __html: project.title }}
                className="text-xl cursor-pointer hover:underline"
              />
              <p
                dangerouslySetInnerHTML={{ __html: project.about }}
                className="mt-2"
              />
            </div>

            <img
              src={`https://skillicons.dev/icons?i=${project.stack.join(",")}`}
              className="h-8 dark:opacity-80 opacity-90 relative bottom-0 mb-2"
            />
          </div>
        </ProjectContent>
      </TabsContent>
    </Tabs>
  );
}
