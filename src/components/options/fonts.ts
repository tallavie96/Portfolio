import { Anton, IBM_Plex_Mono, Jost, Karantina, Newsreader } from "next/font/google";

// Option A: condensed display (has Hebrew) + mono labels
export const aDisplay = Karantina({ subsets: ["latin", "hebrew"], weight: ["700"], variable: "--font-a-display" });
export const aMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-a-mono" });

// Option B: thin geometric sans (Hebrew partner needed later)
export const bSans = Jost({ subsets: ["latin"], variable: "--font-b" });

// Option C: condensed + light serif + mono (Hebrew partners needed later)
export const cDisplay = Anton({ subsets: ["latin"], weight: ["400"], variable: "--font-c-display" });
export const cSerif = Newsreader({ subsets: ["latin"], variable: "--font-c-serif" });
export const cMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-c-mono" });
