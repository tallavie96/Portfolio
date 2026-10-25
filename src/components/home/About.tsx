import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import portraitImage from "@/assets/images/portrait.webp";
import { CopyText } from "@/components/ui/DraftTag";
import { Tape } from "@/components/ui/Tape";
import styles from "./About.module.css";

export function About({ dict }: { dict: Dictionary }) {
  const { about, common } = dict;
  return (
    <section className={`band ${styles.about}`} id="about" aria-labelledby="about-title">
      <div className="inner">
        <h2 className={styles.title} id="about-title">
          {about.title}
        </h2>
        <div className={styles.layout}>
          <figure className={styles.photo}>
            <Tape style={{ top: -12, insetInlineStart: "36%", transform: "rotate(-6deg)" }} />
            <Image src={portraitImage} alt={dict.hero.portraitAlt} sizes="(max-width: 760px) 80vw, 30vw" />
            <figcaption>
              {dict.hero.firstName} {dict.hero.lastName}
            </figcaption>
          </figure>
          <div className={styles.text}>
            <p className={styles.intro}>
              <CopyText copy={about.intro} draftLabel={common.draft} />
            </p>
            <dl className={styles.facts}>
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="label">{fact.label}</dt>
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
