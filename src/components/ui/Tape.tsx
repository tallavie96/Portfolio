import type { CSSProperties } from "react";
import styles from "./ui.module.css";

export function Tape({ pink = false, style }: { pink?: boolean; style?: CSSProperties }) {
  return <span className={`${styles.tape} ${pink ? styles.tapePink : ""}`} style={style} aria-hidden="true" />;
}
