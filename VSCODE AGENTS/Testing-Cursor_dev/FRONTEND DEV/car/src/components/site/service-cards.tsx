import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/site";
import { routes } from "@/lib/routes";

export function ServiceCards() {
  return (
    <div className="row g-4">
      {services.map((service) => (
        <div className="col-lg-4 col-md-6" key={service.slug}>
          <div className="bg-dark-2 rounded-1 overflow-hidden h-100">
            <Image src={service.image} className="hover-scale-1-1 w-100" alt={service.subtitle} width={900} height={600} />
            <div className="p-4">
              <h3>{service.subtitle}</h3>
              <p>{service.description}</p>
              <Link className="btn-main fx-slide" href={routes.serviceDetail(service.slug)}>
                <span>View Details</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
