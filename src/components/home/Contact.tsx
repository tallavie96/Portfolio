import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./Contact.module.css";

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  return (
    <section className={`band ${styles.contact}`} id="contact" aria-labelledby="contact-title">
      <div className={`inner ${styles.layout}`}>
        <h2 className={styles.say} id="contact-title">
          {contact.title}
        </h2>
        <div className={styles.links}>
          <p className={styles.note}>{contact.note}</p>
          <ul>
            {contact.links.map((link) =>
              link.href ? (
                <li key={link.label}>
                  <a className={styles.link} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <span className={styles.pending}>
                    {link.label} <small>({contact.pending})</small>
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
