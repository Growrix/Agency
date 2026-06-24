import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { cn } from "@/lib/utils";

export type MobileStackGroup = {
  category: string;
  items: readonly string[];
};

type MobileStackGroupsProps = {
  groups: readonly MobileStackGroup[];
  footerNote?: string;
  className?: string;
};

export function MobileStackGroups({ groups, footerNote, className }: MobileStackGroupsProps) {
  return (
    <div className={cn("home-mobile-marketing__stack home-mobile-marketing__stack-groups", className)}>
      {groups.map((group) => (
        <article key={group.category} className="home-mobile-marketing__stack-group-card">
          <p className="home-mobile-marketing__stack-group-category">{group.category}</p>
          <ul className="home-mobile-marketing__stack-group-items">
            {group.items.map((item) => (
              <li key={item} className="home-mobile-marketing__stack-group-item">
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
      {footerNote ? (
        <p className="home-mobile-marketing__stack-group-footer">{footerNote}</p>
      ) : null}
    </div>
  );
}

type MobileStackSectionProps = {
  eyebrow: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  benefits: readonly { title: string; description: string }[];
  groups: readonly MobileStackGroup[];
  footerNote?: string;
};

export function MobileStackSection({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  benefits,
  groups,
  footerNote,
}: MobileStackSectionProps) {
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

      <div className="home-mobile-marketing__outcomes-grid">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="home-mobile-marketing__outcome-card home-mobile-marketing__outcome-card--text-only"
          >
            <h3 className="home-mobile-marketing__outcome-card-title">{benefit.title}</h3>
            <p className="home-mobile-marketing__outcome-card-description">{benefit.description}</p>
          </article>
        ))}
      </div>

      <MobileStackGroups groups={groups} footerNote={footerNote} />
    </div>
  );
}
