export interface Skill {
  code: string;
  title: string;
}

type ProjectType = "web" | "mobile";
export interface Project {
  id: number;
  title: string;
  imgSrc: string;
  type: ProjectType;
  youtubeVideoId: string;
  liveLink: string;
  codeLink: string;
  about: string;
  stack: Skill[];
}
