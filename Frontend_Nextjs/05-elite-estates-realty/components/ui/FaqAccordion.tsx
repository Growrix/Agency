import type { FaqItem } from '@/lib/content/types';
import { IconMinus, IconPlus } from '@/components/icons';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div>
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary className="faq-q">
            {item.question}
            <span className="faq-ico-p">
              <IconPlus width={16} height={16} />
            </span>
            <span className="faq-ico-m">
              <IconMinus width={16} height={16} />
            </span>
          </summary>
          <p className="faq-a">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
