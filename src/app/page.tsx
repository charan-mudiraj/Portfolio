import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <div className="">
      <div className="text-center mt-5 text-xl font-light font-mono">
        <p>Hello There !</p>
        <p>I'm Charan</p>
      </div>
      <ModeToggle className="absolute top-5 right-5" />
      <ProjectCard
        title="<b>Chat App</b><br/>(Whatsapp Clone)"
        imgSrc="img.png"
        youtubeVideoId="5_Ouh0Q_aQo"
        liveLink="https://chat-app-by-charan.vercel.app/"
        codeLink="https://github.com/charan-mudiraj/Chat-App"
        about="A <b>Chatting Web Application</b> similar to <b>WhatsApp</b> where users can
              share messages, images, videos, and any other files with a single
              (or) multiple recipients and make calls (Audio/Video) with P2P
              WebRTC Connection."
      />
    </div>
  );
}
