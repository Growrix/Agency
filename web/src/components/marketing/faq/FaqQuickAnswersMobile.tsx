import { MobilePrincipleList } from "@/components/marketing/mobile/MobilePrincipleList";

type FaqQuickAnswersMobileProps = {
  items: Array<{ question: string; answer: string }>;
};

export function FaqQuickAnswersMobile({ items }: FaqQuickAnswersMobileProps) {
  return (
    <MobilePrincipleList
      eyebrow="Quick answers"
      titleLead="The most common"
      titleAccent="ones up front."
      items={items.map((item) => ({
        title: item.question,
        description: item.answer,
      }))}
    />
  );
}
