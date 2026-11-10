"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip } from "@mui/material";
import { Download, Github, Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Project } from "../lib/types";
import { getProjectContent, skillIconSrc } from "../lib/utils";
import { card } from "./styles";
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

const buttonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500";
const solidButton = `${buttonBase} border-transparent bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white`;
const outlineButton = `${buttonBase} border-zinc-300 bg-white hover:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500`;

function ProjectContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex h-[348px] flex-col justify-between gap-1 px-2 pb-3 pt-2 text-center ${card}`}
    >
      {children}
    </div>
  );
}

function LiveLink({ project, className }: { project: Project; className: string }) {
  return (
    <a
      href={project.liveLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {project.type === "mobile" ? (
        <>
          <Download aria-hidden className="h-4 w-4" />
          Download APK
        </>
      ) : (
        <>
          <Zap aria-hidden className="h-4 w-4 text-orange-500" />
          Live
        </>
      )}
    </a>
  );
}

function CodeLink({ project, className }: { project: Project; className: string }) {
  return (
    <a
      href={project.codeLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Github aria-hidden className="h-4 w-4" />
      Code
    </a>
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
            src={skillIconSrc(skill)}
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

// Thumbnail, plus the demo video that fades in and plays while hovered.
// Kept separate so the player ref lives and dies with this element (Radix
// unmounts the tab when "About" is selected).
function PreviewMedia({
  project,
  loadPlayer,
}: {
  project: Project;
  loadPlayer: boolean;
}) {
  const [isHovering, setIsHovering] = useState(false);
  // Set only in onReady, so it's never the React component or a half-made player.
  const playerRef = useRef<YouTubePlayer | null>(null);
  const hasPlayer = Boolean(project.youtubeVideoId) && loadPlayer;

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => {
        if (!hasPlayer) return;
        setIsHovering(true);
        playerRef.current?.playVideo();
      }}
      onMouseLeave={() => {
        if (!hasPlayer) return;
        setIsHovering(false);
        playerRef.current?.pauseVideo();
      }}
    >
      <ProjectThumbnail project={project} />
      {hasPlayer && (
        // Decorative preview: `inert` keeps the (usually invisible) iframe out
        // of the tab order and away from screen readers. Set via ref because
        // React 18 doesn't know the attribute.
        <div
          ref={(el) => el?.setAttribute("inert", "")}
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <YouTube
            videoId={project.youtubeVideoId}
            opts={{ height: "181", width: "100%" }}
            onReady={(e: YouTubeEvent) => {
              playerRef.current = e.target;
            }}
            className="h-full w-full"
            iframeClassName="h-full w-full rounded-lg"
          />
        </div>
      )}
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
        <DialogDescription dangerouslySetInnerHTML={{ __html: project.about }} />
      </DialogHeader>
      {/* The README scrolls; the header and buttons stay put. */}
      <div className="min-h-0 flex-1 overflow-auto leading-7">
        <div
          dangerouslySetInnerHTML={{ __html: projectContent }}
          className="project-content"
        />
      </div>
      <DialogFooter className="flex-row flex-wrap justify-end gap-2 sm:space-x-0">
        <LiveLink project={project} className={solidButton} />
        <CodeLink project={project} className={outlineButton} />
        <DialogClose asChild>
          <button type="button" className={outlineButton}>
            Close
          </button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [loadPlayer, setLoadPlayer] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Load the hover preview only once the card is near the screen, and only on
  // devices that can hover: on touch screens it could never play anyway.
  useEffect(() => {
    const el = cardRef.current;
    if (!project.youtubeVideoId || !el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadPlayer(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.youtubeVideoId]);

  return (
    <Tabs
      ref={cardRef}
      defaultValue="preview"
      // Fixed width so cards line up, but never wider than a narrow screen
      className="flex w-[318px] max-w-full flex-col justify-center"
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
          <PreviewMedia project={project} loadPlayer={loadPlayer} />
          <div
            className="text-lg opacity-80"
            dangerouslySetInnerHTML={{ __html: project.title }}
          />
          <div className="space-y-2 px-2">
            <div className="grid grid-cols-2 gap-2">
              <LiveLink project={project} className={solidButton} />
              <CodeLink project={project} className={outlineButton} />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className={`${outlineButton} w-full`}>
                  More details
                </button>
              </DialogTrigger>
              <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl flex-col">
                <ProjectDialogBox project={project} />
              </DialogContent>
            </Dialog>
          </div>
        </ProjectContent>
      </TabsContent>

      <TabsContent value="about" className="text-zinc-600 dark:text-zinc-400">
        <ProjectContent>
          <div className="flex h-full flex-col justify-between gap-2 py-1">
            <p
              dangerouslySetInnerHTML={{ __html: project.title }}
              className="px-1 text-xl"
            />
            <p
              dangerouslySetInnerHTML={{ __html: project.about }}
              className="mb-2 mt-1 overflow-auto px-1"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {project.stack.map((skill) => (
                <Tooltip title={skill.title} arrow placement="bottom" key={skill.code}>
                  <img
                    src={skillIconSrc(skill)}
                    alt={skill.title}
                    className="relative bottom-0 mb-2 h-8 opacity-90 dark:opacity-80"
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        </ProjectContent>
      </TabsContent>
    </Tabs>
  );
}
