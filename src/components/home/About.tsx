import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import portraitImage from "@/assets/images/portrait.webp";
import { CopyText } from "@/components/ui/DraftTag";
import styles from "./About.module.css";

export function About({ dict }: { dict: Dictionary }) {
  const { about, common } = dict;
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="inner">
        <div className="section-head" data-reveal>
          <h2 id="about-title">{about.title}</h2>
        </div>
        <div className={styles.layout}>
          <figure className={styles.photo} data-reveal>
            <Image src={portraitImage} alt={dict.hero.portraitAlt} sizes="(max-width: 760px) 90vw, 32vw" />
          </figure>
          <div className={styles.text} data-reveal style={{ "--reveal-i": 1 } as CSSProperties}>
            <p className={styles.intro}>
              <CopyText copy={about.intro} draftLabel={common.draft} />
            </p>
            <dl className={styles.facts}>
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
