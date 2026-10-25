import type { CSSProperties, ReactNode } from "react";
import type { AccentColor } from "@/content/types";
import styles from "./ui.module.css";

export function Marker({ color = "butter", children }: { color?: AccentColor; children: ReactNode }) {
  return (
    <span className={styles.marker} style={{ "--marker": `var(--${color})` } as CSSProperties}>
      {children}
    </span>
  );
}
