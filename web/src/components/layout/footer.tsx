import { FOOTER_GROUPS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export function Footer() {
  const groups = Object.values(FOOTER_GROUPS);

  return (
    <footer className="bg-foreground text-background mt-auto">
      {/* Main Footer */}
      <Container size="2xl" className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-3 text-sm opacity-60 leading-relaxed max-w-xs">
              Premium web development agency building SaaS applications, websites, MCP
              servers, and automation systems.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm opacity-60">
              <span>Avg. response: &lt; 2 hours</span>
            </div>
          </div>

          {/* Link Groups */}
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold opacity-80 mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container size="2xl" className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-40">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs opacity-40 hover:opacity-80 transition-opacity"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-xs opacity-40 hover:opacity-80 transition-opacity"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
