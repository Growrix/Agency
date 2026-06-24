import type { ComponentType, SVGProps } from "react";
import { Card } from "@/components/primitives/Card";
import { cn } from "@/lib/utils";

type WebsitesIconFeatureCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  variant?: "outcome" | "principle";
  className?: string;
};

export function WebsitesIconFeatureCard({
  icon: Icon,
  title,
  description,
  variant = "outcome",
  className,
}: WebsitesIconFeatureCardProps) {
  return (
    <Card
      hoverable
      className={cn(
        "websites-icon-feature-card h-full",
        variant === "principle" && "websites-icon-feature-card--principle",
        className,
      )}
    >
      <span className="websites-icon-feature-card__icon" aria-hidden>
        <Icon className="websites-icon-feature-card__icon-glyph" />
      </span>
      <h3 className="websites-icon-feature-card__title">{title}</h3>
      <p className="websites-icon-feature-card__description">{description}</p>
    </Card>
  );
}
