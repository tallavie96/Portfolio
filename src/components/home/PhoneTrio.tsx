import Image from "next/image";
import type { HomeImage } from "./data";
import styles from "./Home.module.css";

/** Three phone screens side by side, centred. The middle one sits slightly forward. */
export function PhoneTrio({
  phones,
  sizes,
  priority = false,
}: {
  phones: HomeImage[];
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={styles.trio}>
      {phones.map((phone, i) => (
        <Image
          key={i}
          src={phone.src}
          alt={phone.alt}
          sizes={sizes}
          priority={priority}
          className={styles.phone}
          draggable={false}
        />
      ))}
    </div>
  );
}
