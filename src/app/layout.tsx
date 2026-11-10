import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const inter = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Charan Mudiraj",
  description:
    "Charan Mudiraj is a Full-Stack Web Developer from India, skilled in MERN stack and Next.js. With multiple internship experiences, he brings expertise in building dynamic and scalable web applications.",
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
      </body>
    </html>
  );
}
