import { Jost } from "next/font/google";

// Thin geometric sans with wide tracking (after Moheim). No Hebrew glyphs:
// a Hebrew partner is needed when Hebrew resumes.
export const sans = Jost({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
