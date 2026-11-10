import { ImageResponse } from "next/og";
import { profile } from "../lib/constants";

// The preview card shown when the site's link is shared (LinkedIn, WhatsApp,
// Slack, X...), as a 1200x630 PNG.
//
// Edge runtime: in Next 14 the Node.js build of next/og builds its font path
// with path.join on a file:// URL, which breaks `next build` on Windows
// ("TypeError: Invalid URL"). The edge build loads its fonts differently.
// Vercel caches the image after the first request.
export const runtime = "edge";
export const alt = `${profile.name} · ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(168, 85, 247, 0.35), rgba(9, 9, 11, 0) 70%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#a1a1aa", letterSpacing: 2 }}>
          Hello there! I&apos;m
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 600,
            letterSpacing: -3,
            marginTop: 12,
          }}
        >
          {profile.name}
        </div>
        <div style={{ fontSize: 38, color: "#d4d4d8", marginTop: 20 }}>
          {`${profile.tagline} · ${profile.location}`}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
            fontSize: 28,
            color: "#e4e4e7",
          }}
        >
          {["React", "TypeScript", "Django", "PostgreSQL"].map((skill) => (
            <div
              key={skill}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: "2px solid #3f3f46",
                backgroundColor: "#18181b",
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
