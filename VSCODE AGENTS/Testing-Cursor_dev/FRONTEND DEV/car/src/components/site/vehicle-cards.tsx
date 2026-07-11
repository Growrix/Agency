import Link from "next/link";
import Image from "next/image";
import { vehicles } from "@/data/site";
import { routes } from "@/lib/routes";

type VehicleCardsProps = {
  type?: string;
  limit?: number;
};

export function VehicleCards({ type, limit }: VehicleCardsProps) {
  const normalizedType = type?.toLowerCase();
  const filtered = normalizedType
    ? vehicles.filter((vehicle) => vehicle.type.toLowerCase().includes(normalizedType))
    : vehicles;
  const list = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  if (list.length === 0) {
    return (
      <div className="p-4 rounded-1 bg-dark-2 text-center">
        No vehicles currently match this filter. Try another category.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {list.map((vehicle) => (
        <div className="col-lg-4 col-md-6" key={vehicle.slug}>
          <Link href={routes.listingDetail(vehicle.slug)} className="d-block h-100 hover relative">
            <div className="relative rounded-1 overflow-hidden">
              <h3 className="abs rounded-3 text-white lh-1 p-2 m-4 bottom-0 inset-s-0 z-3">{vehicle.price}</h3>
              <Image src={vehicle.image} className="w-100 hover-scale-1-2" alt={vehicle.title} width={1200} height={800} />
              <div className="gradient-edge-bottom op-5" />
            </div>
            <h3 className="m-0 mt-3">{vehicle.title}</h3>
            <small>{vehicle.type}</small>
            <div className="row g-1 g-4 py-4 text-center fs-14 text-white">
              <div className="col-3">
                <Image src="/images/icons-car/1.png" className="w-100 px-3 op-5 mb-1" alt="Mileage" width={60} height={60} />
                {vehicle.metrics[0]}
              </div>
              <div className="col-3">
                <Image src="/images/icons-car/2.png" className="w-100 px-3 op-5 mb-1" alt="Engine" width={60} height={60} />
                {vehicle.metrics[1]}
              </div>
              <div className="col-3">
                <Image src="/images/icons-car/3.png" className="w-100 px-3 op-5 mb-1" alt="Fuel" width={60} height={60} />
                {vehicle.metrics[2]}
              </div>
              <div className="col-3">
                <Image src="/images/icons-car/4.png" className="w-100 px-3 op-5 mb-1" alt="Transmission" width={60} height={60} />
                {vehicle.metrics[3]}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
