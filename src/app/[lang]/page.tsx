import { notFound } from "next/navigation";
import { isEnabledLocale } from "@/i18n/config";
import { HomeView } from "@/components/home/HomeView";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isEnabledLocale(lang)) notFound();
  return <HomeView lang={lang} variant="photos" />;
}
