import { atom, createStore } from "jotai";
import { Message, User } from "./types";

export const atomStore = createStore();

export const skillsFilterAtom = atom<string[]>([]);

export const userAtom = atom<User | undefined>();
