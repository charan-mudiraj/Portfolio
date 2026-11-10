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
export interface ProfileLink {
  kind: "github" | "linkedin" | "blog"; // picks the icon in Hero.tsx
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  links: ProfileLink[];
}

// Experience entries. Titles and dates must match the offer/experience
// letters exactly (see "About Charan" in CLAUDE.md).
export interface ExperienceRole {
  title: string;
  employmentType?: string; // e.g. "Full-time"; leave out when the title already says it (e.g. "Intern")
  dates: string; // display string, copied as written (e.g. "Jun – Jul 2024")
  note?: string;
  isCurrent?: boolean; // highlights the role's timeline dot
}

export interface ExperienceHighlight {
  // When `link` is set it is rendered at the end as " (label)." so leave the
  // closing period off `text`.
  text: string;
  link?: { label: string; href: string };
}

export interface Experience {
  company: string;
  companyNote?: string; // shown muted in parentheses after the name
  roles: ExperienceRole[]; // newest first
  highlights: ExperienceHighlight[];
}

export enum MessageStatus {
  WAITING = "WAITING",
  SENT = "SENT",
  SEEN = "SEEN",
}
export interface Message {
  id: string;
  docId?: string;
  message: string;
  status: MessageStatus;
  senderId: string;
  time: string;
}

export interface User {
  id: string; // (docID)
  name: string;
  chatId: string; // chatId === id (collectionID)
}

export class Queue {
  private list: Message[];

  constructor() {
    this.list = [];
  }

  enqueue(x: Message) {
    this.list.push(x);
  }

  dequeue() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.list.shift();
  }

  isEmpty() {
    if (this.getSize() == 0) {
      return true;
    }
    return false;
  }

  getSize() {
    return this.list.length;
  }
}

export interface PromiseReturnValue {
  isSuccess: boolean;
  message: string;
  data?: any;
}
