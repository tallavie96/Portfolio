import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className={styles.footer}>
      <div className={`inner ${styles.row}`}>
        <span className="label">
          {dict.hero.firstName} {dict.hero.lastName} · {dict.hero.role}
        </span>
        <a className="label" href="#top">
          {dict.common.backToTop}
        </a>
      </div>
    </footer>
  );
}
