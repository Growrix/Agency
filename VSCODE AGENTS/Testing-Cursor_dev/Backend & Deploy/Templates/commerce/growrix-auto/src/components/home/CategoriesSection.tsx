import Image from "next/image";
import Link from "next/link";
import { homeCategories } from "@/data/home";
import { categoryPath } from "@/data/routes";

export default function CategoriesSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {homeCategories.map((item) => (
            <Link
              key={item.slug}
              href={categoryPath(item.slug)}
              className="group flex flex-col items-center gap-4 rounded-full px-3 py-3 text-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#ddd] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff3434] group-hover:shadow-xl">
                <Image src={item.image} alt={item.label} width={72} height={72} className="h-16 w-16 rounded-full object-cover" />
              </div>
              <p className="max-w-30 text-[12px] font-semibold uppercase leading-5 text-[#222] transition-colors duration-300 group-hover:text-[#ff3434]">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
