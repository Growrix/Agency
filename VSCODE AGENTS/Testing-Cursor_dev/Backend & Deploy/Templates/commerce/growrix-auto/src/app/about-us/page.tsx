import Image from "next/image";
import Link from "next/link";
import { aboutPage } from "@/data/pages";
import { getServerPreferences } from "@/lib/serverPreferences";

export default async function AboutUsPage() {
  const { t } = await getServerPreferences();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 text-[14px] text-[#777] sm:px-6 lg:px-10">
        <Link href="/" className="hover:text-[#ff3434]">{t("common.home")}</Link> <span className="px-2">›</span> <span>{t("common.about")}</span>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <div className="relative h-95 overflow-hidden">
          <Image src={aboutPage.heroImage} alt={t("about.title")} fill sizes="100vw" className="object-cover" />
        </div>
        <h1 className="mt-10 text-center text-[34px] font-black uppercase text-[#222]">{t("about.title")}</h1>
        <div className="mx-auto mt-5 max-w-5xl space-y-5 text-center text-[15px] leading-8 text-[#666]">
          {[t("about.intro1"), t("about.intro2")].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h2 className="mb-8 text-center text-[28px] font-black uppercase text-[#222]">{t("about.team")}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {aboutPage.team.map((member) => (
            <article key={member.name} className="text-center">
              <div className="relative h-62.5 overflow-hidden bg-[#eee]">
                <Image src={member.image} alt={member.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
              </div>
              <h3 className="mt-4 text-[18px] font-bold text-[#222]">{member.name}</h3>
              <p className="text-[14px] text-[#777]">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h2 className="mb-8 text-center text-[28px] font-black uppercase text-[#222]">{t("about.locations")}</h2>
        <div className="relative h-115 overflow-hidden border border-[#eee]">
          <Image src={aboutPage.mapImage} alt="Map location" fill sizes="100vw" className="object-cover" />
        </div>
      </section>
    </div>
  );
}
