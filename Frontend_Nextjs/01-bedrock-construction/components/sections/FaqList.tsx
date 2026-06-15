import type { FaqItem } from '@/lib/content/types';
import { IconMinus, IconPlus } from '@/components/icons';

export function FaqList({ items, limit }: { items: FaqItem[]; limit?: number }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <>
      {list.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-q">
            {item.question}
            <span className="faq-ico-p">
              <IconPlus size={18} />
            </span>
            <span className="faq-ico-m">
              <IconMinus size={18} />
            </span>
          </summary>
          <p className="faq-a">{item.answer}</p>
        </details>
      ))}
    </>
  );
}
