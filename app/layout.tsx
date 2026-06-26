import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

// editorial serif for big headlines
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tony Kang — Software Engineer",
  description:
    "Tony (Wen-Teng) Kang — software engineer and MSc Computer Science student at the University of Birmingham. Full-stack, AI/ML and fintech projects with an economics and finance background.",
  metadataBase: new URL("https://portfolio-v2-eta-liard.vercel.app"),
  openGraph: {
    title: "Tony Kang — Software Engineer",
    description:
      "Full-stack, AI/ML and fintech projects from a software engineer with a finance background, now studying MSc CS in the UK.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
