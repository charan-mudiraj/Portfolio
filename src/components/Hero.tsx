import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  BookOpen,
  Download,
  FileText,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { ComponentType } from "react";
import { profile } from "../lib/constants";
import { Profile, ProfileLink } from "../lib/types";

type IconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

// MUI icons size themselves with font-size via emotion styles, which can win
// over Tailwind's h-/w- classes, so size a wrapper and fill it instead.
function WhatsAppGlyph({ className, ...rest }: IconProps) {
  return (
    <span className={`inline-flex ${className ?? ""}`} {...rest}>
      <WhatsAppIcon style={{ width: "100%", height: "100%" }} />
    </span>
  );
}

const linkIcons: Record<ProfileLink["kind"], ComponentType<IconProps>> = {
  github: Github,
  linkedin: Linkedin,
  blog: BookOpen,
  whatsapp: WhatsAppGlyph,
};

// wa.me opens the chat in the WhatsApp app on phones; on desktop it offers
// the desktop app or WhatsApp Web. The message is pre-filled, not sent.
function whatsappLink({ number, message }: NonNullable<Profile["whatsapp"]>) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500";
const outlineColors =
  "border-zinc-300 bg-white/70 hover:border-zinc-500 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/70 dark:hover:border-zinc-500 dark:hover:bg-zinc-900";
const solidColors =
  "border-transparent bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white";
const labelledPill = `${pillBase} px-3 py-2 sm:px-4`;
// Socials are 44px icon-only circles on phones, so they all fit on one row,
// and labelled pills from `sm` up.
const socialPill = `${pillBase} ${outlineColors} h-11 w-11 sm:h-auto sm:w-auto sm:px-4 sm:py-2`;

export function Hero() {
  const links: ProfileLink[] = profile.whatsapp
    ? [
        ...profile.links,
        {
          kind: "whatsapp",
          label: "WhatsApp",
          href: whatsappLink(profile.whatsapp),
        },
      ]
    : profile.links;

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

      <div className="mt-8 flex flex-col items-center gap-4">
        {profile.resume && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {/* Opens the PDF in the browser's built-in viewer */}
            <a
              href={profile.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${labelledPill} ${solidColors}`}
            >
              <FileText aria-hidden className="h-4 w-4" />
              View resume
            </a>
            {/* `download` only works for same-origin files like public/ */}
            <a
              href={profile.resume.href}
              download={profile.resume.fileName}
              className={`${labelledPill} ${outlineColors}`}
            >
              <Download aria-hidden className="h-4 w-4" />
              Download
            </a>
          </div>
        )}

        <ul className="flex flex-wrap justify-center gap-3">
          {links.map((link) => {
            const Icon = linkIcons[link.kind];
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPill}
                >
                  <Icon aria-hidden className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="sr-only sm:not-sr-only">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
