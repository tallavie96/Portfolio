import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";
import { CopyText } from "@/components/ui/DraftTag";
import { Placeholder } from "@/components/ui/Placeholder";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { TornEdge } from "@/components/ui/TornEdge";
import styles from "./WorkGrid.module.css";

export function WorkGrid({ dict, lang, projects }: { dict: Dictionary; lang: Locale; projects: Project[] }) {
  return (
    <section className={`band ${styles.work}`} id="work" aria-labelledby="work-title">
      <TornEdge />
      <div className="inner">
        <div className={styles.head}>
          <h2 id="work-title">{dict.work.title}</h2>
          <span className="label">{dict.work.count}</span>
        </div>
        <ul className={styles.grid}>
          {projects.map((project) => (
            <li key={project.slug} className={styles.cell}>
              <div className={`label ${styles.frameLabel}`} aria-hidden="true">
                <span>
                  {project.number} — {project.title}
                </span>
                <span>{project.kindLabel}</span>
              </div>
              <ProjectCard project={project} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  const action = project.type === "collection" ? dict.work.openCollection : dict.work.openCaseStudy;
  return (
    <Link
      href={`/${lang}/work/${project.slug}`}
      className={styles.card}
      style={{ "--project": `var(--${project.color})` } as CSSProperties}
    >
      <div className={styles.art}>
        {project.cover ? (
          <Image src={project.cover} alt={project.coverAlt ?? ""} sizes="(max-width: 760px) 92vw, 30vw" />
        ) : (
          <Placeholder label={dict.common.screensPending} color={project.color} />
        )}
      </div>
      <div className={styles.meta}>
        <div className={styles.titleRow}>
          <h3>{project.title}</h3>
          <span className={`label ${styles.number}`}>{project.number}</span>
        </div>
        <p>
          <CopyText copy={project.summary} draftLabel={dict.common.draft} />
        </p>
      </div>
      <ul className={styles.tags} aria-label="Tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <span className="visually-hidden">{action}</span>
      <SelectionBox className={styles.selection} />
    </Link>
  );
}
