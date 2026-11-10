"use client";
import { Check, Copy, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "../lib/constants";
import { emailLink, whatsappLink } from "../lib/links";
import { WhatsAppGlyph } from "./icons";
import { card, mutedText, outlinePill, solidPill } from "./styles";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const linkedin = profile.links.find((l) => l.kind === "linkedin");
  const email = profile.email;

  // mailto: does nothing on computers without a mail app set up, so offer
  // copying the address too.
  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full scroll-mt-20 sm:px-5"
    >
      <div className={`reveal px-4 py-10 text-center sm:px-10 ${card}`}>
        <h2 id="contact-heading" className="text-2xl">
          Get in touch
        </h2>
        <p className={`mt-2 ${mutedText}`}>
          Email or WhatsApp is the quickest way to reach me.
        </p>
        {email && (
          <p className="mt-4 break-all font-mono text-sm">{email.address}</p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {email && (
            <>
              <a href={emailLink(email)} className={solidPill}>
                <Mail aria-hidden className="h-4 w-4" />
                Email me
              </a>
              <button type="button" onClick={copyEmail} className={outlinePill}>
                {copied ? (
                  <Check aria-hidden className="h-4 w-4" />
                ) : (
                  <Copy aria-hidden className="h-4 w-4" />
                )}
                <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
              </button>
            </>
          )}
          {profile.whatsapp && (
            <a
              href={whatsappLink(profile.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={outlinePill}
            >
              <WhatsAppGlyph aria-hidden className="h-4 w-4" />
              WhatsApp
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className={outlinePill}
            >
              <Linkedin aria-hidden className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
