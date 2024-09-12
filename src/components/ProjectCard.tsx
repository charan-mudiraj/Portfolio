"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Project } from "../lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { getProjectContent } from "../lib/utils";
import { Tooltip } from "@mui/material";

function ProjectContent({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col justify-between gap-1 border-[1px] border-zinc-500 rounded-lg text-center px-2 pt-2 pb-3 h-[348px] bg-zinc-200 dark:bg-black`}
    >
      {children}
    </div>
  );
}

export function ProjectDialogBox({ project }: { project: Project }) {
  const [projectContent, setProjectContent] = useState("");

  useEffect(() => {
    getProjectContent(project.codeLink).then((content) =>
      setProjectContent(content)
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle dangerouslySetInnerHTML={{ __html: project.title }} />
        <DialogDescription
          dangerouslySetInnerHTML={{ __html: project.about }}
        />
      </DialogHeader>
      <div className="overflow-auto h-full max-h-[calc(100%-20px)] leading-7">
        <div
          dangerouslySetInnerHTML={{ __html: projectContent }}
          className="project-content"
        />
        {/* <div>{projectContent}</div> */}
      </div>
      <DialogFooter>
        <div className="w-1/2 flex gap-3">
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
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  return (
    <>
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
              className="text-lg opacity-80"
              dangerouslySetInnerHTML={{ __html: project.title }}
            />
            <div className="px-2 space-y-2">
              <div className="flex w-full justify-between gap-2">
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className="w-full"
                >
                  <Button className="w-full font-bold bg-zinc-800 dark:bg-zinc-200">
                    Live
                    <BoltIcon className="text-orange-400" />
                  </Button>
                </Link>
                <Link
                  href={project.codeLink}
                  target="_blank"
                  className="w-full"
                >
                  <Button className="w-full font-bold bg-zinc-800 dark:bg-zinc-200">
                    Code
                    <CodeIcon className="ml-1 text-blue-500" />
                  </Button>
                </Link>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full font-bold bg-zinc-800 dark:bg-zinc-200">
                    More Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[calc(100%-50px)] max-w-[calc(100%-100px)] flex flex-col">
                  <ProjectDialogBox project={project} />
                </DialogContent>
              </Dialog>
            </div>
          </ProjectContent>
        </TabsContent>

        <TabsContent value="about" className="dark:text-zinc-400 text-zinc-600">
          <ProjectContent>
            <div className="h-full flex flex-col py-1 justify-between gap-2">
              <p
                dangerouslySetInnerHTML={{ __html: project.title }}
                className="text-xl px-1"
              />
              <p
                dangerouslySetInnerHTML={{ __html: project.about }}
                className="mt-1 mb-2 overflow-auto px-1"
              />
              <div className="flex flex-wrap gap-3 justify-center">
                {project.stack.map((skill, i) => (
                  <Tooltip title={skill.title} arrow placement="bottom" key={i}>
                    <img
                      src={`https://skillicons.dev/icons?i=${skill.code}`}
                      className="h-8 dark:opacity-80 opacity-90 relative bottom-0 mb-2"
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          </ProjectContent>
        </TabsContent>
      </Tabs>
    </>
  );
}
