import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ui.module.css";

type Variant = "primary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  ghost: styles.ghost,
};

export function PillLink({
  href,
  variant = "primary",
  arrow = false,
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${styles.btn} ${variantClass[variant]}`}>
      {children}
      {arrow && (
        <svg className={styles.arrow} viewBox="0 0 14 14" aria-hidden="true">
          <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </Link>
  );
}
