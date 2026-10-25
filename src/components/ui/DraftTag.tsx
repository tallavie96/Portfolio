import type { Copy } from "@/content/types";
import styles from "./ui.module.css";

export function DraftTag({ label }: { label: string }) {
  return <span className={styles.draft}>{label}</span>;
}

/** Renders copy text, followed by a draft tag when it isn't approved yet. */
export function CopyText({ copy, draftLabel }: { copy: Copy; draftLabel: string }) {
  return (
    <>
      {copy.text}
      {copy.status === "draft" && (
        <>
          {" "}
          <DraftTag label={draftLabel} />
        </>
      )}
    </>
  );
}
