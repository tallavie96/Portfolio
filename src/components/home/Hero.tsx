import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import keaImage from "@/assets/images/kea.webp";
import portraitImage from "@/assets/images/portrait.webp";
import { CopyText } from "@/components/ui/DraftTag";
import { PillLink } from "@/components/ui/PillLink";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { Tape } from "@/components/ui/Tape";
import styles from "./Hero.module.css";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, common } = dict;
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-name">
      <div className={styles.inner}>
        <div className={styles.redline} aria-hidden="true">
          <b>48</b>
        </div>
        <h1 className={styles.name} id="hero-name">
          <span>{hero.firstName}</span> <span>{hero.lastName}</span>
        </h1>

        <div className={styles.board} aria-label={hero.boardLabel} role="group">
          <figure className={`${styles.piece} ${styles.cut} ${styles.kea}`}>
            <span className={`label ${styles.frameLabel}`}>kea — AI playground</span>
            <Tape style={{ top: -12, insetInlineStart: "42%", transform: "rotate(-3deg)" }} />
            <Image
              src={keaImage}
              alt="Three screens from kea, a skincare routine app: onboarding, product list, and morning and evening routine"
              sizes="(max-width: 760px) 86vw, 44vw"
              priority
            />
            <SelectionBox className={styles.keaSelection} />
          </figure>

          <figure className={`${styles.piece} ${styles.cut} ${styles.portrait}`}>
            <Tape pink style={{ top: -12, insetInlineStart: "30%", transform: "rotate(8deg)", width: 72 }} />
            <Image src={portraitImage} alt={hero.portraitAlt} sizes="(max-width: 760px) 38vw, 210px" priority />
            <figcaption>{hero.portraitCaption}</figcaption>
          </figure>

          <div className={`${styles.piece} ${styles.sticky}`}>
            <p>
              {hero.sticky}
              <br />
              <span className={styles.stickyTag}>{common.placeholder}</span>
            </p>
          </div>

          <div className={`${styles.piece} ${styles.stamp}`} aria-hidden="true">
            {hero.stamp.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>

          <div className={styles.cursor} aria-hidden="true">
            <svg viewBox="0 0 18 18">
              <path
                d="M2 1.5l13 6.2-5.6 1.6-2.3 5.4z"
                fill="var(--cursor)"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <b>{hero.firstName}</b>
          </div>
        </div>

        <div className={styles.foot}>
          <div className={styles.who}>
            <p className={styles.role}>{hero.role}</p>
            <p>
              <CopyText copy={hero.line} draftLabel={common.draft} /> {hero.facts.text}.
            </p>
          </div>
          <div className={styles.actions}>
            <PillLink href="#work" arrow>
              {hero.ctaWork}
            </PillLink>
            <PillLink href="#contact" variant="ghost">
              {hero.ctaContact}
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
