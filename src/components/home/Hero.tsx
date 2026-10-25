import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import keaImage from "@/assets/images/kea.webp";
import { CopyText } from "@/components/ui/DraftTag";
import { Marker } from "@/components/ui/Marker";
import { PillLink } from "@/components/ui/PillLink";
import styles from "./Hero.module.css";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, common } = dict;
  return (
    <section className={`section dotted-fade ${styles.hero}`} id="top" aria-labelledby="hero-name">
      <div className={`inner ${styles.layout}`}>
        <div className={styles.text}>
          <Marker color="sky">{hero.role}</Marker>
          <h1 className={styles.name} id="hero-name">
            {hero.firstName} {hero.lastName}
          </h1>
          <p className={styles.lead}>
            <CopyText copy={hero.line} draftLabel={common.draft} />
          </p>
          <p className={styles.facts}>{hero.facts.text}</p>
          <div className={styles.actions}>
            <PillLink href="#work" arrow>
              {hero.ctaWork}
            </PillLink>
            <PillLink href="#contact" variant="ghost">
              {hero.ctaContact}
            </PillLink>
          </div>
        </div>

        <figure className={styles.featured}>
          <div className={styles.frame}>
            <Image src={keaImage} alt={hero.featuredAlt} sizes="(max-width: 860px) 90vw, 46vw" priority />
          </div>
          <figcaption>{hero.featuredCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
