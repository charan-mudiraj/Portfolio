import { BookOpen, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../lib/constants";
import { ProfileLink } from "../lib/types";

const linkIcons: Record<ProfileLink["kind"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  blog: BookOpen,
};

export function Hero() {
  return (
    <header className="flex flex-col items-center pt-20 text-center sm:pt-28">
      <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
        {"Hello there! I'm"}
      </p>
      <h1 className="mt-3 text-4xl tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-zinc-600 dark:text-zinc-400">
        <span>{profile.tagline}</span>
        {/* Hidden on phones, where the two parts wrap onto separate lines */}
        <span aria-hidden className="hidden sm:inline">
          ·
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin aria-hidden className="h-4 w-4" />
          {profile.location}
        </span>
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        {profile.links.map((link) => {
          const Icon = linkIcons[link.kind];
          return (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-3 py-2 text-sm sm:px-4 transition-colors hover:border-zinc-500 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-900/70 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
              >
                <Icon aria-hidden className="h-4 w-4" />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
