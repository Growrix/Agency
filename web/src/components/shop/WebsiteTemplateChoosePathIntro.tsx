import {
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { WEBSITE_TEMPLATE_CHOOSE_PATH_COPY } from "@/lib/website-template-path-content";
import { cn } from "@/lib/utils";

const PATH_ICONS = {
  "code-bracket": CodeBracketSquareIcon,
  sparkles: SparklesIcon,
  rocket: RocketLaunchIcon,
} as const;

export function WebsiteTemplateChoosePathIntro() {
  const { title, description, guideTitle, paths } = WEBSITE_TEMPLATE_CHOOSE_PATH_COPY;

  return (
    <div className="product-choose-path">
      <div className="product-choose-path__header">
        <p className="product-choose-path__eyebrow">{guideTitle}</p>
        <h2 className="product-choose-path__title">{title}</h2>
        <p className="product-choose-path__description">{description}</p>
      </div>

      <div className="product-choose-path__guide-panel">
        <div className="product-choose-path__guide-grid">
          {paths.map((path) => {
            const Icon = PATH_ICONS[path.icon];
            const featured = "featured" in path && path.featured;

            return (
              <article
                key={path.id}
                className={cn(
                  "product-choose-path__guide-card",
                  featured && "product-choose-path__guide-card--featured",
                )}
              >
                <div className="product-choose-path__guide-card-head">
                  <span className="product-choose-path__icon" aria-hidden>
                    <Icon className="product-choose-path__icon-glyph" />
                  </span>
                  <div className="product-choose-path__guide-card-meta">
                    <div className="product-choose-path__guide-card-title-row">
                      <span className="product-choose-path__step">{path.step}</span>
                      <h3 className="product-choose-path__guide-title">{path.title}</h3>
                      {featured && "badge" in path && path.badge ? (
                        <Badge tone="primary" className="product-choose-path__badge">
                          {path.badge}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="product-choose-path__guide-description">{path.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
