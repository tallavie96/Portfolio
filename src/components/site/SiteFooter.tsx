import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer>
      <p>
        {dict.hero.firstName} {dict.hero.lastName} · {dict.hero.role}
      </p>
      <a href="#top">{dict.common.backToTop}</a>
    </footer>
  );
}
