"use client";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../lib/constants";
import { ModeToggle } from "./ModeToggle";
import { mutedText } from "./styles";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Sections linked from the bar. Each id must exist on the page (and have
// `scroll-mt-20` so it lands below the bar); missing ones are dropped.
const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "problems", label: "Problems" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

// Elements watched for the "you are here" highlight -> nav item they count as.
const SPY_TARGETS: Record<string, string | null> = {
  intro: null,
  experience: "experience",
  testimonials: "testimonials",
  problems: "problems",
  skills: "projects", // the skills filter belongs to the projects
  projects: "projects",
  writing: "writing",
  contact: "contact",
};

const linkBase =
  "rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500";

export function SiteNav() {
  const [links, setLinks] = useState(SECTIONS);
  const [scrolled, setScrolled] = useState(false);
  const [pastIntro, setPastIntro] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setLinks(SECTIONS.filter((s) => document.getElementById(s.id)));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // The last section is short, so it may never reach the spy band.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive("contact");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // A section is "active" while it crosses a thin band ~40% down the screen.
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(SPY_TARGETS[entry.target.id] ?? null);
          }
        }
      },
      { rootMargin: "-38% 0px -60% 0px" }
    );
    for (const id of Object.keys(SPY_TARGETS)) {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    }

    // Show the name in the bar once the big one in the intro is out of view.
    const heading = document.querySelector("#intro h1");
    const nameWatch = new IntersectionObserver(
      ([entry]) => setPastIntro(!entry.isIntersecting),
      { rootMargin: "-56px 0px 0px 0px" } // the bar's height
    );
    if (heading) nameWatch.observe(heading);

    return () => {
      spy.disconnect();
      nameWatch.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label="Sections"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-16"
      >
        <a
          href="#top"
          aria-hidden={!pastIntro}
          tabIndex={pastIntro ? undefined : -1}
          className={`rounded-sm text-sm tracking-tight transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
            pastIntro ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`${linkBase} ${
                    active === link.id
                      ? "bg-zinc-200/80 text-zinc-950 dark:bg-zinc-800/80 dark:text-white"
                      : `${mutedText} hover:text-zinc-950 dark:hover:text-white`
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Phones and tablets: the same links in a menu */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Open sections menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {links.map((link) => (
                <DropdownMenuItem key={link.id} asChild>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? "true" : undefined}
                    className={
                      active === link.id ? "bg-accent text-accent-foreground" : ""
                    }
                  >
                    {link.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
