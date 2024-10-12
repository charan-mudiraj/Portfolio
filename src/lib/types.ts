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
export enum MessageStatus {
  WAITING = "WAITING",
  SENT = "SENT",
  SEEN = "SEEN",
}
export interface Message {
  id: string;
  message: string;
  status: MessageStatus;
  senderId: string;
  time: string;
}

export interface LocalStorageKeys {
  userId: string; // encrypted id string
}

export interface User {
  id: string; // (docID)
  name: string;
  chatId: string; // chatId === id (collectionID)
}
