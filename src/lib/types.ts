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
