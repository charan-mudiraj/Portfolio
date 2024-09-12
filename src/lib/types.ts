interface Skill {
  code: string;
  title: string;
}
export interface Project {
  id: number;
  title: string;
  imgSrc: string;
  youtubeVideoId: string;
  liveLink: string;
  codeLink: string;
  about: string;
  stack: Skill[];
}
