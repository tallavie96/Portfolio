import { Bricolage_Grotesque, Courier_Prime, IBM_Plex_Sans } from "next/font/google";

// None of these have Hebrew glyphs. When Hebrew resumes, each needs a Hebrew partner.
export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const typeFont = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-type",
  display: "swap",
});
