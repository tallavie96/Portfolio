import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./Contact.module.css";

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className={`inner ${styles.box}`} data-reveal>
        <h2 className={styles.title} id="contact-title">
          <span className={styles.highlight}>{contact.title}</span>
        </h2>
        <p className={styles.note}>{contact.note}</p>
        <ul className={styles.links}>
          {contact.links.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <span className={styles.pending}>
                  {link.label} <small>({contact.pending})</small>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
