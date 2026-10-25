import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjects } from "@/content/projects";
import { Hero } from "@/components/home/Hero";
import { WorkGrid } from "@/components/home/WorkGrid";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Toolbar } from "@/components/site/Toolbar";
import { SiteFooter } from "@/components/site/SiteFooter";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main id="main">
        <Hero dict={dict} />
        <WorkGrid dict={dict} lang={lang} projects={getProjects(lang)} />
        <About dict={dict} />
        <Contact dict={dict} />
      </main>
      <SiteFooter dict={dict} />
      <Toolbar
        onHome
        homeHref={`/${lang}`}
        homeLabel={dict.nav.home}
        label={dict.nav.label}
        items={[
          { id: "top", label: dict.nav.home },
          { id: "work", label: dict.nav.work },
          { id: "about", label: dict.nav.about },
          { id: "contact", label: dict.nav.contact },
        ]}
      />
    </>
  );
}
