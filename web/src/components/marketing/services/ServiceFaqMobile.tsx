import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { Accordion, type AccordionItem } from "@/components/sections/Accordion";

type ServiceFaqMobileProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  items: AccordionItem[];
};

export function ServiceFaqMobile({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  items,
}: ServiceFaqMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={titleLead}
        titleAccent={titleAccent}
        title={titleLead && titleAccent ? undefined : title}
        description={description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <Accordion items={items} className="home-mobile-marketing__faq" />
    </div>
  );
}
