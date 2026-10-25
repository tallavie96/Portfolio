import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjects } from "@/content/projects";
import portraitImage from "@/assets/images/portrait.webp";
import { CopyText } from "@/components/ui/DraftTag";
import { Placeholder } from "@/components/ui/Placeholder";
import { SiteFooter } from "@/components/site/SiteFooter";

/** Homepage content skeleton. Unstyled on purpose: the visual design starts fresh. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, work, about, contact, common } = dict;

  return (
    <>
      <header id="top">
        <p>
          {hero.firstName} {hero.lastName} · {hero.role}
        </p>
        <nav aria-label={dict.nav.label}>
          <a href="#work">{dict.nav.work}</a> <a href="#about">{dict.nav.about}</a>{" "}
          <a href="#contact">{dict.nav.contact}</a>
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="intro-title">
          <h1 id="intro-title">
            {hero.firstName} {hero.lastName}
          </h1>
          <p>{hero.role}</p>
          <p>
            <CopyText copy={hero.line} draftLabel={common.draft} />
          </p>
          <p>{hero.facts.text}</p>
        </section>

        <section id="work" aria-labelledby="work-title">
          <h2 id="work-title">{work.title}</h2>
          <ul>
            {getProjects(lang).map((project) => (
              <li key={project.slug}>
                <article>
                  {project.cover ? (
                    <Image src={project.cover} alt={project.coverAlt ?? ""} sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <Placeholder label={common.screensPending} />
                  )}
                  <p>
                    {project.number} · {project.kindLabel}
                  </p>
                  <h3>
                    <Link href={`/${lang}/work/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p>
                    <CopyText copy={project.summary} draftLabel={common.draft} />
                  </p>
                  <p>{project.tags.join(" · ")}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" aria-labelledby="about-title">
          <h2 id="about-title">{about.title}</h2>
          <Image src={portraitImage} alt={hero.portraitAlt} sizes="(max-width: 768px) 100vw, 400px" />
          <p>
            <CopyText copy={about.intro} draftLabel={common.draft} />
          </p>
          <dl>
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.note}</p>
          <ul>
            {contact.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <span>
                    {link.label} ({contact.pending})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter dict={dict} />
    </>
  );
}
