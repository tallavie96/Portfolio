import styles from "./ui.module.css";

export function SelectionBox({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.selection} ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
