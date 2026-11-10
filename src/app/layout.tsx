import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "../components/theme-provider";
import { siteUrl } from "../lib/constants";

const inter = Poppins({ subsets: ["latin"], weight: "300" });

const title = "Charan Mudiraj · Full-stack developer";
const description =
  "Charan Mudiraj is a full-stack developer in Hyderabad, India, building production web apps with React, TypeScript, Django and PostgreSQL at GrowMeOrganic.";

// The preview image itself comes from opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Charan Mudiraj",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes sets the theme class on <html>
    // before React hydrates, so its attributes differ from the server HTML.
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Follows the browser/OS theme until the visitor picks one with the
            toggle; that choice is saved in localStorage ("theme"). */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* Vercel Web Analytics: page views only send data once Analytics
            is enabled for the project in the Vercel dashboard. In dev it
            just logs to the console. */}
        <Analytics />
      </body>
    </html>
  );
}
