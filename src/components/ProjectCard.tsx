"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import React, { useEffect, useRef, useState } from "react";
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

// Firebase Storage currently returns 402 for every thumbnail (see the roadmap in
// CLAUDE.md). Until the images move to public/, try `imgSrc`, then the demo
// video's YouTube thumbnail, then fall back to the project's stack icons.
function ProjectThumbnail({ project }: { project: Project }) {
  const sources = [
    project.imgSrc,
    project.youtubeVideoId
      ? `https://i.ytimg.com/vi/${project.youtubeVideoId}/hqdefault.jpg`
      : "",
  ].filter(Boolean);
  const [sourceIndex, setSourceIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Only advance past the source that actually failed, so a duplicate error
  // report can't skip a fallback.
  const markFailed = (index: number) =>
    setSourceIndex((curr) => (curr === index ? index + 1 : curr));

  // The first image starts loading from the server-rendered HTML and can fail
  // before React attaches onError, so check it once after mount as well.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) markFailed(0);
  }, []);

  if (sourceIndex >= sources.length) {
    return (
      <div className="flex h-[181px] w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-br from-zinc-300 to-zinc-100 dark:from-zinc-800 dark:to-zinc-950">
        {project.stack.map((skill) => (
          <img
            key={skill.code}
            src={`https://skillicons.dev/icons?i=${skill.code}`}
            alt=""
            className="h-10 w-10"
          />
        ))}
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={sources[sourceIndex]}
      alt=""
      onError={() => markFailed(sourceIndex)}
      className="h-[181px] w-full rounded-lg object-cover"
    />
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
    <React.Fragment>
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
              {project.type === "web" && (
                <>
                  <p>Live</p>
                  <BoltIcon className="text-orange-400" />
                </>
              )}
              {project.type === "mobile" && (
                <>
                  <p>Download APK</p>&nbsp;
                  <CloudDownloadIcon className="dark:text-zinc-600 text-zinc-300" />
                </>
              )}
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
    </React.Fragment>
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
        <TabsList className="light:bg-zinc-200">
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
              <ProjectThumbnail project={project} />
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
                    {project.type === "web" && (
                      <>
                        <p>Live</p>
                        <BoltIcon className="text-orange-400" />
                      </>
                    )}
                    {project.type === "mobile" && (
                      <>
                        <p>Download APK</p>&nbsp;
                        <CloudDownloadIcon className="dark:text-zinc-600 text-zinc-300" />
                      </>
                    )}
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
