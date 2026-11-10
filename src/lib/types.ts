export interface Skill {
  code: string; // unique id; also the skillicons.dev icon id unless `src` is set
  title: string;
  src?: string; // own icon in public/skills/, for skills skillicons.dev doesn't have
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
  kind: "github" | "linkedin" | "blog" | "whatsapp" | "email"; // picks the icon
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  links: ProfileLink[];
  // Optional: each button stays hidden until its field is filled in.
  resume?: {
    href: string; // a file in public/, e.g. "/Charan-Mudiraj-Resume.pdf"
    fileName: string; // name the browser saves it as
  };
  whatsapp?: {
    number: string; // country code + number, digits only, e.g. "91XXXXXXXXXX"
    message: string; // pre-filled chat text; the visitor can edit it before sending
  };
  email?: {
    address: string;
    subject: string; // pre-filled subject line for the mailto: link
  };
}

export interface Testimonial {
  // Consecutive messages (e.g. on Slack), each word for word and shown on its
  // own line. Leave messages out rather than rewording them.
  messages: string[];
  // Exact phrase from one of the messages to emphasise (highlighter style).
  // Must match the message text character for character.
  highlight?: string;
  source?: string; // where it was said, e.g. "Slack"; shown as "via Slack"
  context?: string; // what it was about, in Charan's words
  name: string;
  role: string;
  company: string;
  companyLink?: string; // company's LinkedIn page
  date?: string; // e.g. "Mar 2025"; only if known
  link?: string; // their LinkedIn profile or recommendation
  // Sample data. Rendered only by `npm run dev`, never in production builds,
  // so made-up quotes can't reach the live site.
  isPlaceholder?: boolean;
}

export interface CaseStudy {
  id: "dependent-loaders" | "firestore-cache"; // picks the diagram in CaseStudies.tsx
  title: string;
  context: string; // where and with what, e.g. "GrowMeOrganic · React Router"
  // `backticks` in these strings render as inline code.
  problem: string;
  challenge: string;
  approach: string[];
  result: string;
  code?: { caption: string; snippet: string };
  link?: { label: string; href: string };
}

export interface BlogPost {
  title: string; // as published
  date: string; // e.g. "Nov 2024"
  href: string;
  coverImage: string;
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
  // Technologies used there. Only what the highlights (or Charan) state; the
  // chip label is `title`, so override it when only part applies
  // (e.g. { ...aws, title: "AWS S3" }).
  stack?: Skill[];
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
