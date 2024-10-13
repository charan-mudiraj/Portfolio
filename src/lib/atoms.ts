import { atom } from "jotai";
import { Message } from "./types";

export const skillsFilterAtom = atom<string[]>([]);

export const messagesAtom = atom<Message[]>([]);
