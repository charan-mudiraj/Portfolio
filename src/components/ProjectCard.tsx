"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import { useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

function ProjectContent({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col justify-between border-[1px] border-zinc-700 rounded-lg text-center px-2 pt-2 pb-3 h-[300px]`}
    >
      {children}
    </div>
  );
}

export default function ProjectCard({
  title,
  imgSrc,
  youtubeVideoId,
  liveLink,
  codeLink,
  about,
}: {
  title: string;
  imgSrc: string;
  youtubeVideoId: string;
  liveLink: string;
  codeLink: string;
  about: string;
}) {
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
            className="h-[65%] relative rounded-lg overflow-hidden"
            onMouseEnter={(e) => {
              setIsHovering(true);
              playerRef.current?.playVideo();
            }}
            onMouseLeave={(e) => {
              setIsHovering(false);
              playerRef.current?.pauseVideo();
            }}
          >
            <img
              src={imgSrc}
              className={`rounded-lg h-full aspect-video object-cover`}
            />
            <YouTube
              videoId={youtubeVideoId}
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
          </div>
          <div
            className="text-lg opacity-80"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="flex w-full justify-between gap-2 px-2">
            <Link href={liveLink} className="w-full">
              <Button className="w-full font-bold">
                Live
                <BoltIcon className="text-orange-400" />
              </Button>
            </Link>
            <Link href={codeLink} className="w-full">
              <Button className="w-full font-bold">
                Code
                <CodeIcon className="ml-1 text-blue-500" />
              </Button>
            </Link>
          </div>
        </ProjectContent>
      </TabsContent>

      <TabsContent value="about" className="text-zinc-400">
        <ProjectContent>
          <div className="h-full flex flex-col justify-center px-1">
            <p dangerouslySetInnerHTML={{ __html: about }} />
          </div>
        </ProjectContent>
      </TabsContent>
    </Tabs>
  );
}
