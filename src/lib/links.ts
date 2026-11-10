import { Profile } from "./types";

// wa.me opens the chat in the WhatsApp app on phones; on desktop it offers
// the desktop app or WhatsApp Web. The message is pre-filled, not sent.
export function whatsappLink({
  number,
  message,
}: NonNullable<Profile["whatsapp"]>) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Opens the visitor's default mail app with the address and subject filled in.
export function emailLink({ address, subject }: NonNullable<Profile["email"]>) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
