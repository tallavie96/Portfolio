import styles from "./ui.module.css";

/** Stand-in for a missing image. Clearly labelled, never a fake screen. */
export function Placeholder({ label }: { label: string }) {
  return (
    <div className={styles.placeholder}>
      <span>{label}</span>
    </div>
  );
}
