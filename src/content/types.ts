/**
 * Every piece of copy carries a status. Draft copy renders with a visible
 * "Draft copy" tag until Tal approves it, so placeholders never pass as final.
 */
export type CopyStatus = "draft" | "approved";

export interface Copy {
  text: string;
  status: CopyStatus;
}

export const draft = (text: string): Copy => ({ text, status: "draft" });
export const approved = (text: string): Copy => ({ text, status: "approved" });

/** The three accent colors of the identity. */
export type AccentColor = "blush" | "sky" | "butter";
