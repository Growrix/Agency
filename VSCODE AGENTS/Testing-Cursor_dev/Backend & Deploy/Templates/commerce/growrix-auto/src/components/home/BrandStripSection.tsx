import { brandLogos } from "@/data/home";

export default function BrandStripSection() {
  return (
    <section className="bg-[#f5f5f5] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 overflow-hidden border border-[#e6e6e6] bg-white md:grid-cols-3 lg:grid-cols-6">
          {brandLogos.map((brand) => (
            <div key={brand} className="flex h-24 items-center justify-center border-r border-[#e6e6e6] last:border-r-0">
              <span className="text-[18px] font-black uppercase text-[#777]">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
