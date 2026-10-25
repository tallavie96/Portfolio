import type { Copy } from "@/content/types";
import { Marker } from "./Marker";

export function DraftTag({ label }: { label: string }) {
  return <Marker color="butter">{label}</Marker>;
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
