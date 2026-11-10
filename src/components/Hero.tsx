import {
  BookOpen,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { ComponentType } from "react";
import { profile } from "../lib/constants";
import { emailLink, whatsappLink } from "../lib/links";
import { ProfileLink } from "../lib/types";
import { IconProps, WhatsAppGlyph } from "./icons";
import { iconPill, mutedText, outlinePill, solidPill } from "./styles";

const linkIcons: Record<ProfileLink["kind"], ComponentType<IconProps>> = {
  github: Github,
  linkedin: Linkedin,
  blog: BookOpen,
  whatsapp: WhatsAppGlyph,
  email: Mail,
};

export function Hero() {
  const links: ProfileLink[] = [...profile.links];
  if (profile.whatsapp) {
    links.push({
      kind: "whatsapp",
      label: "WhatsApp",
      href: whatsappLink(profile.whatsapp),
    });
  }
  if (profile.email) {
    links.push({ kind: "email", label: "Email", href: emailLink(profile.email) });
  }

  return (
    <header
      id="intro"
      className="flex flex-col items-center pt-20 text-center sm:pt-28"
    >
      <p className={`font-mono text-sm sm:text-base ${mutedText}`}>
        {"Hello there! I'm"}
      </p>
      <h1 className="mt-3 text-4xl tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p
        className={`mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${mutedText}`}
      >
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
              className={solidPill}
            >
              <FileText aria-hidden className="h-4 w-4" />
              View resume
            </a>
            {/* `download` only works for same-origin files like public/ */}
            <a
              href={profile.resume.href}
              download={profile.resume.fileName}
              className={outlinePill}
            >
              <Download aria-hidden className="h-4 w-4" />
              Download
            </a>
          </div>
        )}

        <ul className="flex flex-wrap justify-center gap-3">
          {links.map((link) => {
            const Icon = linkIcons[link.kind];
            const opensNewTab = link.kind !== "email";
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(opensNewTab && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={iconPill}
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
