import { Frank_Ruhl_Libre, IBM_Plex_Sans, IBM_Plex_Sans_Hebrew } from "next/font/google";

// Headings: one serif with both Latin and Hebrew glyphs.
export const headingFont = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  variable: "--font-heading",
  display: "swap",
});

// Body and UI: Plex Sans for Latin, Plex Sans Hebrew (same design family) for Hebrew.
export const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const bodyHebrewFont = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew"],
  weight: ["400", "500", "600"],
  variable: "--font-body-he",
  display: "swap",
  preload: false, // only fetched when Hebrew text is on the page
});
