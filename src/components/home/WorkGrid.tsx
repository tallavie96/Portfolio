import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";
import { CopyText } from "@/components/ui/DraftTag";
import { Placeholder } from "@/components/ui/Placeholder";
import styles from "./WorkGrid.module.css";

export function WorkGrid({ dict, lang, projects }: { dict: Dictionary; lang: Locale; projects: Project[] }) {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="inner">
        <div className="section-head" data-reveal>
          <h2 id="work-title">{dict.work.title}</h2>
          <span className="meta">{dict.work.count}</span>
        </div>
        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <li key={project.slug} data-reveal style={{ "--reveal-i": i } as CSSProperties}>
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
    <article className={styles.card} style={{ "--project": `var(--${project.color})` } as CSSProperties}>
      <div className={styles.art}>
        {project.cover ? (
          <Image src={project.cover} alt={project.coverAlt ?? ""} sizes="(max-width: 760px) 90vw, 30vw" />
        ) : (
          <Placeholder label={dict.common.screensPending} color={project.color} />
        )}
      </div>
      <div className={styles.meta}>
        <span className={styles.kind}>
          {project.number} · {project.kindLabel}
        </span>
        <h3>
          {/* The whole card is clickable through this link's stretched hit area */}
          <Link href={`/${lang}/work/${project.slug}`} className={styles.link}>
            {project.title}
            <span className="visually-hidden"> — {action}</span>
          </Link>
        </h3>
        <p>
          <CopyText copy={project.summary} draftLabel={dict.common.draft} />
        </p>
        <ul className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
