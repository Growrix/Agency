import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { WebsitesIconFeatureCard } from "@/components/marketing/services/WebsitesIconFeatureCard";
import type { WebsitesPrincipleIconKey } from "@/lib/websites-service-icons";
import { getWebsitesPrincipleIcon } from "@/lib/websites-service-icons";

type PrincipleItem = {
  title: string;
  description: string;
  icon: WebsitesPrincipleIconKey;
};

type WebsitesPrinciplesDesktopProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  description: string;
  items: readonly PrincipleItem[];
};

export function WebsitesPrinciplesDesktop({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  items,
}: WebsitesPrinciplesDesktopProps) {
  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        titleLead={titleLead}
        titleAccent={titleAccent}
        description={description}
      />
      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
        {items.map((item) => {
          const Icon = getWebsitesPrincipleIcon(item.icon);
          return (
            <RevealItem key={item.title} className="h-full">
              <WebsitesIconFeatureCard
                icon={Icon}
                title={item.title}
                description={item.description}
                variant="principle"
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </>
  );
}
