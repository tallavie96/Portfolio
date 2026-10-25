import type { CSSProperties } from "react";
import styles from "./ui.module.css";

export function Placeholder({ label, color = "sky" }: { label: string; color?: string }) {
  return (
    <div className={styles.placeholder} style={{ "--ph-bg": `var(--${color})` } as CSSProperties}>
      <span>{label}</span>
    </div>
  );
}
