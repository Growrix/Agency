function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function fontQuery(fontFamily, weights) {
  const family = fontFamily.replaceAll(' ', '+');
  return `${family}:wght@${weights}`;
}

function uniqueItems(items) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function labelizeBusinessType(businessType) {
  const labels = {
    cafe: 'Cafe',
    restaurant: 'Restaurant',
    photography: 'Photography Studio',
    agency: 'Digital Agency',
    retail: 'Retail Shop',
    salon: 'Salon',
    other: 'Business Profile'
  };

  return labels[businessType] || 'Business Profile';
}

function renderLink(action, className) {
  if (!action) {
    return '';
  }

  return `<a href="${escapeHtml(action.href)}" class="${className}"${action.external ? ' target="_blank" rel="noreferrer"' : ''}>${escapeHtml(action.label)}</a>`;
}

function buildPrimaryCta(brief) {
  if (brief.optionalSections.bookingLink) {
    return {
      href: brief.optionalSections.bookingLink,
      label: brief.businessType === 'photography' ? 'Book a Session' : brief.businessType === 'agency' ? 'Book Discovery Call' : 'Book Now',
      external: true
    };
  }

  if (brief.contact.whatsapp) {
    const labels = {
      agency: 'Get a Free Quote',
      cafe: 'Order on WhatsApp',
      restaurant: 'Order on WhatsApp',
      photography: 'Book on WhatsApp',
      retail: 'Order on WhatsApp',
      salon: 'Book on WhatsApp',
      other: 'Chat on WhatsApp'
    };

    return {
      href: `https://wa.me/${brief.contact.whatsapp}`,
      label: labels[brief.businessType] || 'Chat on WhatsApp',
      external: true
    };
  }

  return {
    href: `tel:${brief.contact.phone}`,
    label: 'Call Now',
    external: false
  };
}

function buildSecondaryCta(brief, primaryCta) {
  const whatsappHref = `https://wa.me/${brief.contact.whatsapp}`;

  if (brief.contact.whatsapp && primaryCta.href !== whatsappHref) {
    return {
      href: whatsappHref,
      label: 'Chat on WhatsApp',
      external: true
    };
  }

  if (brief.social.website) {
    return {
      href: brief.social.website,
      label: brief.businessType === 'agency' ? 'Visit Website' : 'Visit Site',
      external: true
    };
  }

  if (brief.location.googleMapsLink) {
    return {
      href: brief.location.googleMapsLink,
      label: 'View Map',
      external: true
    };
  }

  if (brief.contact.phone && primaryCta.href !== `tel:${brief.contact.phone}`) {
    return {
      href: `tel:${brief.contact.phone}`,
      label: 'Call Now',
      external: false
    };
  }

  return null;
}

function buildActionLinks(brief) {
  const actions = [
    { label: 'Call', href: `tel:${brief.contact.phone}`, external: false },
    { label: 'WhatsApp', href: `https://wa.me/${brief.contact.whatsapp}`, external: true },
    { label: 'Email', href: `mailto:${brief.contact.email}`, external: false },
    { label: 'Map', href: brief.location.googleMapsLink, external: true }
  ];

  if (brief.social.facebook) {
    actions.push({ label: 'Facebook', href: brief.social.facebook, external: true });
  }

  if (brief.social.instagram) {
    actions.push({ label: 'Instagram', href: brief.social.instagram, external: true });
  }

  if (brief.social.website) {
    actions.push({ label: 'Website', href: brief.social.website, external: true });
  }

  return actions.filter((action) => action.href);
}

function buildSocialActions(brief) {
  return buildActionLinks(brief).filter((action) => ['Map', 'Facebook', 'Instagram', 'Website'].includes(action.label));
}

function buildHourEntries(brief) {
  return [
    { label: 'Mon - Fri', value: brief.hours.mondayFriday },
    { label: 'Saturday', value: brief.hours.saturday },
    { label: 'Sunday', value: brief.hours.sunday },
    { label: 'Public Holidays', value: brief.hours.publicHolidays }
  ];
}

function buildProofEntries(brief, limit = 4) {
  if (brief.optionalSections.proofStats.length > 0) {
    return brief.optionalSections.proofStats.slice(0, limit);
  }

  const derived = [];

  if (brief.services.length > 0) {
    derived.push({ value: String(brief.services.length), label: 'Services' });
  }

  if (brief.optionalSections.portfolioLabels.length > 0) {
    derived.push({ value: String(brief.optionalSections.portfolioLabels.length), label: 'Highlights' });
  }

  if (brief.team.length > 0) {
    derived.push({ value: String(brief.team.length), label: 'Team' });
  }

  const socialCount = buildSocialActions(brief).length;

  if (socialCount > 0) {
    derived.push({ value: String(socialCount), label: 'Channels' });
  }

  return derived.slice(0, limit);
}

function buildHospitalityChips(brief) {
  return uniqueItems([
    brief.optionalSections.deliveryInfo,
    brief.optionalSections.ratingLabel,
    ...brief.services.slice(0, 3).map((service) => service.name)
  ]).slice(0, 5);
}

function buildRetailHighlights(brief) {
  return uniqueItems([
    brief.optionalSections.deliveryInfo,
    brief.optionalSections.ratingLabel,
    brief.optionalSections.statusLabel,
    ...brief.services.slice(0, 2).map((service) => service.name)
  ]).slice(0, 4);
}

function buildPortfolioEntries(brief) {
  if (brief.optionalSections.portfolioLabels.length > 0) {
    return brief.optionalSections.portfolioLabels.slice(0, 4);
  }

  return brief.services.slice(0, 4).map((service) => service.name);
}

function renderStatusPill(label, className = 'status-pill') {
  if (!label) {
    return '';
  }

  return `<div class="${className}">${escapeHtml(label)}</div>`;
}

function renderSocialRow(brief, className, itemClassName, limit = 4) {
  const items = buildSocialActions(brief)
    .slice(0, limit)
    .map((action) => renderLink(action, itemClassName))
    .join('');

  if (!items) {
    return '';
  }

  return `<div class="${className}">${items}</div>`;
}

function renderActionRow(actions, className, itemClassName, limit = actions.length) {
  const items = actions
    .slice(0, limit)
    .map((action) => renderLink(action, itemClassName))
    .join('');

  if (!items) {
    return '';
  }

  return `<div class="${className}">${items}</div>`;
}

function renderContactBox(brief, options = {}) {
  const rows = [
    { label: 'Email', value: brief.contact.email },
    { label: 'Phone', value: brief.contact.phone },
    { label: 'Location', value: brief.location.address },
    { label: 'Website', value: brief.social.website || brief.location.googleMapsLink }
  ].filter((row) => row.value);

  if (rows.length === 0) {
    return '';
  }

  const containerClass = options.containerClass || 'contact-box';
  const rowClass = options.rowClass || 'contact-row';
  const labelClass = options.labelClass || 'contact-label';
  const valueClass = options.valueClass || 'contact-value';

  return `
    <div class="${containerClass}">
      ${rows
        .map(
          (row) => `
            <div class="${rowClass}">
              <span class="${labelClass}">${escapeHtml(row.label)}</span>
              <span class="${valueClass}">${escapeHtml(row.value)}</span>
            </div>`
        )
        .join('')}
    </div>`;
}

function renderHospitalityLayout({ brief, theme, themeName }) {
  const primaryCta = buildPrimaryCta(brief);
  const secondaryCta = buildSecondaryCta(brief, primaryCta);
  const chips = buildHospitalityChips(brief);
  const actionLinks = buildActionLinks(brief);
  const hoursMarkup = buildHourEntries(brief)
    .map(
      (entry) => `
        <div class="hour-item">
          <div class="hour-day">${escapeHtml(entry.label)}</div>
          <div class="hour-time">${escapeHtml(entry.value)}</div>
        </div>`
    )
    .join('');
  const menuItems = brief.services
    .map(
      (service) => `
        <article class="menu-item">
          <div>
            <div class="menu-name">${escapeHtml(service.name)}</div>
            <div class="menu-desc">${escapeHtml(service.description)}</div>
          </div>
          <div class="menu-price">${escapeHtml(service.price)}</div>
        </article>`
    )
    .join('');

  return buildDocument({
    brief,
    theme,
    themeName,
    layoutName: 'hospitality-cafe',
    pageBackground: theme.colorText,
    appBackground: theme.colorBg,
    layoutCss: `
      .hero {
        min-height: 260px;
        background: ${theme.heroGradient};
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 28px 20px 22px;
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px);
        background-size: 18px 18px;
        pointer-events: none;
      }

      .status-pill {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(255,255,255,.18);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,.26);
        border-radius: 999px;
        padding: 6px 12px;
        font-size: 11px;
        color: var(--color-text-on-hero);
        letter-spacing: .04em;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .status-pill::before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #4ade80;
      }

      .logo-badge {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: rgba(255,255,255,.18);
        border: 1px solid rgba(255,255,255,.24);
        display: grid;
        place-items: center;
        box-shadow: 0 8px 24px rgba(0,0,0,.26);
        margin-bottom: 14px;
        position: relative;
      }

      .logo-badge img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }

      .hero h1 {
        position: relative;
        font-size: 34px;
        line-height: .98;
        color: var(--color-text-on-hero);
      }

      .tagline {
        position: relative;
        margin-top: 8px;
        font-size: 13px;
        color: var(--color-muted-on-hero);
      }

      .hero-rating {
        position: relative;
        margin-top: 12px;
        font-size: 12px;
        color: rgba(255,255,255,.72);
      }

      .chips-strip {
        display: flex;
        gap: 8px;
        padding: 14px 16px;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid var(--color-border);
      }

      .chips-strip::-webkit-scrollbar { display: none; }

      .chip {
        flex-shrink: 0;
        white-space: nowrap;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        border-radius: 999px;
        padding: 7px 13px;
        font-size: 11px;
      }

      .body {
        padding: 4px 18px 40px;
      }

      .sec-title {
        font-family: var(--font-heading);
        font-size: 20px;
        color: var(--color-text);
        margin: 22px 0 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .sec-title::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, var(--color-border), transparent);
      }

      .menu-list {
        display: grid;
      }

      .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 0;
        border-bottom: 1px solid rgba(0,0,0,.06);
      }

      .menu-item:last-child { border-bottom: none; }
      .menu-name { font-size: 14px; font-weight: 700; color: var(--color-text); }
      .menu-desc { font-size: 11px; color: var(--color-muted); margin-top: 4px; font-style: italic; line-height: 1.45; }
      .menu-price { font-family: var(--font-heading); font-size: 18px; color: var(--color-primary); flex-shrink: 0; }

      .hours-box,
      .map-panel {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: calc(var(--radius) + 2px);
      }

      .hours-box {
        padding: 14px 16px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .hour-day { font-size: 12px; font-weight: 700; color: var(--color-text); }
      .hour-time { font-size: 11px; color: var(--color-muted); margin-top: 4px; }

      .map-panel {
        padding: 14px 16px;
        background: linear-gradient(135deg, var(--color-surface), rgba(254,244,235,.92));
        font-size: 12px;
        color: var(--color-text);
        line-height: 1.7;
      }

      .map-title { display: block; font-size: 13px; font-weight: 700; margin-bottom: 2px; }

      .cta-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        width: 100%;
        padding: 16px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        color: var(--color-text-on-primary);
        font-size: 14px;
        font-weight: 700;
        box-shadow: 0 10px 24px rgba(0,0,0,.16);
      }

      .social-row {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        flex-wrap: wrap;
      }

      .social-row a {
        flex: 1 1 calc(50% - 4px);
        min-width: 120px;
        text-align: center;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: 11px 10px;
        font-size: 11px;
        color: var(--color-text);
        font-weight: 600;
      }

      footer {
        background: rgba(58,31,13,.95);
        color: rgba(255,255,255,.52);
        text-align: center;
        padding: 18px 16px 22px;
        font-size: 10px;
        letter-spacing: .05em;
      }
    `,
    bodyMarkup: `
      <header class="hero">
        ${renderStatusPill(brief.optionalSections.statusLabel)}
        <div class="logo-badge"><img src="${escapeHtml(brief.assets.logoPath)}" alt="${escapeHtml(brief.businessName)} logo" /></div>
        <h1>${escapeHtml(brief.businessName)}</h1>
        <p class="tagline">${escapeHtml(brief.tagline)}</p>
        ${brief.optionalSections.ratingLabel ? `<div class="hero-rating">${escapeHtml(brief.optionalSections.ratingLabel)}</div>` : ''}
      </header>
      ${chips.length > 0 ? `<div class="chips-strip">${chips.map((chip) => `<div class="chip">${escapeHtml(chip)}</div>`).join('')}</div>` : ''}
      <div class="body">
        ${brief.services.length > 0 ? `
          <section aria-labelledby="menu-title">
            <h2 class="sec-title" id="menu-title">Menu Highlights</h2>
            <div class="menu-list">${menuItems}</div>
          </section>` : ''}
        <section aria-labelledby="about-title">
          <h2 class="sec-title" id="about-title">About</h2>
          <div class="map-panel">
            <strong class="map-title">${escapeHtml(brief.businessName)}</strong>
            ${escapeHtml(brief.aboutText)}
          </div>
        </section>
        <section aria-labelledby="hours-title">
          <h2 class="sec-title" id="hours-title">Hours</h2>
          <div class="hours-box">${hoursMarkup}</div>
        </section>
        <section aria-labelledby="visit-title">
          <h2 class="sec-title" id="visit-title">Find Us</h2>
          <div class="map-panel">
            <strong class="map-title">${escapeHtml(brief.location.address)}</strong>
            ${brief.optionalSections.deliveryInfo ? `${escapeHtml(brief.optionalSections.deliveryInfo)}<br /><br />` : ''}
            <a href="${escapeHtml(brief.location.googleMapsLink)}" target="_blank" rel="noreferrer">Open in Google Maps</a>
          </div>
        </section>
        ${renderLink(primaryCta, 'cta-btn')}
        ${secondaryCta && secondaryCta.href !== primaryCta.href ? renderLink(secondaryCta, 'cta-btn') : ''}
        ${renderActionRow(actionLinks, 'social-row', 'social-link', 6)}
      </div>
      <footer>${escapeHtml(brief.businessName)} · ${escapeHtml(brief.location.address)}</footer>
    `
  });
}

function renderAgencyLayout({ brief, theme, themeName }) {
  const primaryCta = buildPrimaryCta(brief);
  const secondaryCta = buildSecondaryCta(brief, primaryCta);
  const proofEntries = buildProofEntries(brief, 4);
  const actionLinks = buildActionLinks(brief);
  const serviceCards = brief.services
    .map(
      (service, index) => `
        <article class="svc-card">
          <div class="svc-index">${String(index + 1).padStart(2, '0')}</div>
          <div class="svc-name">${escapeHtml(service.name)}</div>
          <div class="svc-desc">${escapeHtml(service.description)}</div>
          <div class="svc-price">${escapeHtml(service.price)}</div>
        </article>`
    )
    .join('');
  const techTags = brief.optionalSections.techStack.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('');
  const processSteps = brief.optionalSections.processSteps
    .map(
      (step, index) => `
        <div class="step">
          <div class="step-n">${String(index + 1).padStart(2, '0')}</div>
          <div>
            <div class="step-title">${escapeHtml(step)}</div>
            <div class="step-desc">Built from the locked brief and executed inside the same delivery lane.</div>
          </div>
        </div>`
    )
    .join('');
  const teamCards = brief.team
    .map(
      (member) => `
        <article class="member-card">
          <div class="member-avatar">${escapeHtml(member.initials)}</div>
          <div>
            <div class="member-name">${escapeHtml(member.name)}</div>
            <div class="member-role">${escapeHtml(member.role)}</div>
          </div>
        </article>`
    )
    .join('');

  return buildDocument({
    brief,
    theme,
    themeName,
    layoutName: 'agency-command',
    pageBackground: '#04040f',
    appBackground: theme.colorBg,
    layoutCss: `
      .hero {
        background: ${theme.heroGradient};
        padding: 48px 20px 22px;
        position: relative;
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
        background-size: 28px 28px;
        opacity: .25;
      }

      .hero::after {
        content: '';
        position: absolute;
        top: -80px;
        right: -50px;
        width: 240px;
        height: 240px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,.14) 0%, transparent 68%);
      }

      .hero-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.14);
        color: var(--color-text-on-hero);
        font-size: 10px;
        letter-spacing: .18em;
        text-transform: uppercase;
        position: relative;
      }

      .hero-pill::before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--color-accent);
      }

      .brand-top {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      .hero-logo {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        overflow: hidden;
        background: rgba(255,255,255,.12);
        border: 1px solid rgba(255,255,255,.14);
        box-shadow: 0 8px 24px rgba(0,0,0,.2);
      }

      .hero-logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero h1 {
        position: relative;
        margin-top: 16px;
        font-size: 30px;
        line-height: 1.02;
        color: var(--color-text-on-hero);
      }

      .hero p {
        position: relative;
        margin-top: 10px;
        max-width: 290px;
        font-size: 12px;
        line-height: 1.75;
        color: var(--color-muted-on-hero);
      }

      .hero-actions {
        position: relative;
        display: flex;
        gap: 9px;
        margin-top: 18px;
      }

      .hero-actions a,
      .cta-main,
      .cta-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-weight: 600;
      }

      .hero-actions .primary,
      .cta-main {
        background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        color: var(--color-text-on-primary);
        box-shadow: 0 8px 24px rgba(0,0,0,.22);
      }

      .hero-actions .secondary,
      .cta-secondary {
        background: transparent;
        color: rgba(255,255,255,.78);
        border: 1px solid rgba(255,255,255,.14);
      }

      .hero-actions a {
        padding: 12px 18px;
        border-radius: 12px;
        font-size: 12px;
      }

      .proof-bar {
        display: flex;
        background: #0d1020;
        border-top: 1px solid rgba(255,255,255,.06);
        border-bottom: 1px solid rgba(255,255,255,.06);
      }

      .proof-item {
        flex: 1;
        text-align: center;
        padding: 14px 10px;
        border-right: 1px solid rgba(255,255,255,.06);
      }

      .proof-item:last-child { border-right: none; }
      .proof-value { font-family: var(--font-heading); font-size: 20px; color: var(--color-primary); }
      .proof-label { font-size: 9px; color: rgba(255,255,255,.48); margin-top: 4px; letter-spacing: .14em; text-transform: uppercase; }

      .body { padding: 6px 16px 40px; }
      .sec { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--color-primary); margin: 22px 0 10px; font-weight: 700; }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      .svc-card,
      .stack-box,
      .contact-box,
      .member-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 16px;
      }

      .svc-card { padding: 16px; }
      .svc-index {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 10px;
        background: rgba(17,85,255,.08);
        color: var(--color-primary);
        font-size: 11px;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .svc-name { font-size: 12px; font-weight: 700; color: var(--color-text); }
      .svc-desc { font-size: 10px; color: var(--color-muted); margin-top: 4px; line-height: 1.5; }
      .svc-price { font-size: 11px; font-weight: 700; color: var(--color-primary); margin-top: 8px; }

      .stack-box { padding: 14px; display: flex; flex-wrap: wrap; gap: 6px; }
      .tag { background: rgba(17,85,255,.06); border: 1px solid rgba(17,85,255,.12); border-radius: 10px; padding: 6px 10px; font-size: 10px; color: var(--color-text); }

      .process-list { display: grid; gap: 0; }
      .step { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(10,16,34,.08); }
      .step:last-child { border-bottom: none; }
      .step-n { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 10px; background: rgba(17,85,255,.08); color: var(--color-primary); font-size: 11px; font-weight: 700; flex-shrink: 0; }
      .step-title { font-size: 13px; font-weight: 700; color: var(--color-text); }
      .step-desc { font-size: 10px; color: var(--color-muted); margin-top: 3px; line-height: 1.5; }

      .team-list { display: grid; gap: 8px; }
      .member-card { display: flex; align-items: center; gap: 12px; padding: 14px; }
      .member-avatar { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; background: rgba(17,85,255,.08); color: var(--color-primary); font-weight: 700; }
      .member-name { font-size: 13px; font-weight: 700; color: var(--color-text); }
      .member-role { font-size: 10px; color: var(--color-muted); margin-top: 3px; }

      .contact-box { overflow: hidden; }
      .contact-row { display: flex; gap: 10px; padding: 14px; border-bottom: 1px solid rgba(10,16,34,.08); }
      .contact-row:last-child { border-bottom: none; }
      .contact-label { width: 78px; flex-shrink: 0; font-size: 10px; color: var(--color-muted); text-transform: uppercase; letter-spacing: .12em; }
      .contact-value { font-size: 12px; color: var(--color-text); line-height: 1.55; }

      .contact-actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        flex-wrap: wrap;
      }

      .contact-actions a {
        flex: 1 1 calc(50% - 4px);
        min-width: 120px;
        text-align: center;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        border-radius: 12px;
        padding: 12px 10px;
        font-size: 11px;
      }

      .cta-main,
      .cta-secondary {
        display: block;
        width: 100%;
        margin-top: 14px;
        padding: 16px;
        border-radius: 14px;
        text-align: center;
        font-size: 13px;
      }

      footer { background: #07071a; color: rgba(255,255,255,.3); text-align: center; padding: 22px 16px; font-size: 10px; letter-spacing: .05em; }
    `,
    bodyMarkup: `
      <header class="hero">
        <div class="brand-top">
          <div class="hero-logo"><img src="${escapeHtml(brief.assets.logoPath)}" alt="${escapeHtml(brief.businessName)} logo" /></div>
          <div class="hero-pill">${escapeHtml(brief.optionalSections.statusLabel || labelizeBusinessType(brief.businessType))}</div>
        </div>
        <h1>${escapeHtml(brief.businessName)}</h1>
        <p>${escapeHtml(brief.tagline)}</p>
        <div class="hero-actions">
          ${renderLink(primaryCta, 'primary')}
          ${secondaryCta ? renderLink(secondaryCta, 'secondary') : ''}
        </div>
      </header>
      ${proofEntries.length > 0 ? `<div class="proof-bar">${proofEntries.map((entry) => `<div class="proof-item"><div class="proof-value">${escapeHtml(entry.value)}</div><div class="proof-label">${escapeHtml(entry.label)}</div></div>`).join('')}</div>` : ''}
      <div class="body">
        ${brief.services.length > 0 ? `<section aria-labelledby="services-title"><div class="sec" id="services-title">What We Build</div><div class="services-grid">${serviceCards}</div></section>` : ''}
        ${brief.optionalSections.techStack.length > 0 ? `<section aria-labelledby="stack-title"><div class="sec" id="stack-title">Tech Stack</div><div class="stack-box">${techTags}</div></section>` : ''}
        ${brief.optionalSections.processSteps.length > 0 ? `<section aria-labelledby="process-title"><div class="sec" id="process-title">Delivery Process</div><div class="process-list">${processSteps}</div></section>` : ''}
        ${brief.team.length > 0 ? `<section aria-labelledby="team-title"><div class="sec" id="team-title">Core Team</div><div class="team-list">${teamCards}</div></section>` : ''}
        <section aria-labelledby="about-title">
          <div class="sec" id="about-title">Positioning</div>
          <div class="stack-box"><span class="contact-value">${escapeHtml(brief.aboutText)}</span>${brief.optionalSections.deliveryInfo ? `<span class="tag">${escapeHtml(brief.optionalSections.deliveryInfo)}</span>` : ''}</div>
        </section>
        <section aria-labelledby="contact-title">
          <div class="sec" id="contact-title">Contact</div>
          ${renderContactBox(brief)}
          ${renderActionRow(actionLinks, 'contact-actions', 'contact-action', 6)}
        </section>
        ${renderLink(primaryCta, 'cta-main')}
        ${secondaryCta && secondaryCta.href !== primaryCta.href ? renderLink(secondaryCta, 'cta-secondary') : ''}
      </div>
      <footer>${escapeHtml(brief.businessName)} · ${escapeHtml(brief.location.address)}</footer>
    `
  });
}

function renderEditorialLayout({ brief, theme, themeName }) {
  const primaryCta = buildPrimaryCta(brief);
  const secondaryCta = buildSecondaryCta(brief, primaryCta);
  const proofEntries = buildProofEntries(brief, 3);
  const portfolioEntries = buildPortfolioEntries(brief);
  const actionLinks = buildActionLinks(brief);
  const servicesMarkup = brief.services
    .map(
      (service) => `
        <article class="service-row">
          <div>
            <div class="service-name">${escapeHtml(service.name)}</div>
            <div class="service-detail">${escapeHtml(service.description)}</div>
          </div>
          <div class="service-price">${escapeHtml(service.price)}</div>
        </article>`
    )
    .join('');
  const portfolioMarkup = portfolioEntries
    .map((label) => `<div class="portfolio-card"><span>${escapeHtml(label)}</span></div>`)
    .join('');
  const teamMarkup = brief.team
    .map(
      (member) => `
        <article class="team-card">
          <div class="team-avatar">${escapeHtml(member.initials)}</div>
          <div>
            <div class="team-name">${escapeHtml(member.name)}</div>
            <div class="team-role">${escapeHtml(member.role)}</div>
          </div>
        </article>`
    )
    .join('');

  return buildDocument({
    brief,
    theme,
    themeName,
    layoutName: 'editorial-luxury',
    pageBackground: '#080705',
    appBackground: '#0c0b09',
    layoutCss: `
      .hero {
        min-height: 300px;
        background: ${theme.heroGradient};
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 24px 20px 22px;
        overflow: hidden;
      }

      .hero::before,
      .hero::after {
        content: '';
        position: absolute;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 50%;
      }

      .hero::before {
        top: 18px;
        right: -24px;
        width: 170px;
        height: 170px;
      }

      .hero::after {
        bottom: -34px;
        left: -34px;
        width: 140px;
        height: 140px;
        opacity: .5;
      }

      .hero-eye {
        position: relative;
        font-size: 9px;
        letter-spacing: .38em;
        text-transform: uppercase;
        color: rgba(255,255,255,.72);
        margin-bottom: 16px;
      }

      .hero h1 {
        position: relative;
        font-size: 42px;
        line-height: .92;
        color: var(--color-text-on-hero);
      }

      .hero-sub {
        position: relative;
        margin-top: 12px;
        font-size: 11px;
        letter-spacing: .22em;
        text-transform: uppercase;
        color: var(--color-muted-on-hero);
      }

      .hero-note {
        position: relative;
        margin-top: 10px;
        font-size: 11px;
        line-height: 1.7;
        color: rgba(255,255,255,.72);
      }

      .metrics-bar {
        display: flex;
        border-top: 1px solid rgba(255,255,255,.08);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }

      .metric {
        flex: 1;
        text-align: center;
        padding: 15px 10px;
        border-right: 1px solid rgba(255,255,255,.08);
      }

      .metric:last-child { border-right: none; }
      .metric strong { display: block; font-family: var(--font-heading); font-size: 26px; color: var(--color-primary); }
      .metric span { display: block; margin-top: 4px; font-size: 8px; letter-spacing: .26em; text-transform: uppercase; color: rgba(255,255,255,.36); }

      .body { padding: 4px 18px 40px; color: var(--color-text-on-hero); }
      .sec { font-size: 8px; letter-spacing: .36em; text-transform: uppercase; color: var(--color-primary); margin: 24px 0 12px; display: flex; align-items: center; gap: 12px; }
      .sec::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,.16); }

      .service-row,
      .about-box,
      .contact-box,
      .portfolio-card {
        background: rgba(255,255,255,.02);
        border: 1px solid rgba(255,255,255,.08);
      }

      .service-row {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        padding: 14px;
        margin-bottom: 2px;
      }

      .service-name { font-size: 13px; font-weight: 700; color: var(--color-text-on-hero); }
      .service-detail { font-size: 10px; color: rgba(255,255,255,.55); margin-top: 4px; line-height: 1.6; }
      .service-price { font-family: var(--font-heading); font-size: 22px; color: var(--color-primary); flex-shrink: 0; }

      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 3px;
      }

      .portfolio-card {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 6px;
        padding: 12px;
        color: rgba(255,255,255,.78);
        font-family: var(--font-heading);
        font-size: 16px;
      }

      .about-box {
        border-radius: 6px;
        padding: 18px;
      }

      .about-copy {
        font-size: 15px;
        line-height: 1.8;
        color: rgba(255,255,255,.66);
        font-style: italic;
      }

      .contact-box { border-radius: 6px; overflow: hidden; }
      .contact-row { display: flex; gap: 12px; padding: 13px 14px; border-bottom: 1px solid rgba(255,255,255,.06); }
      .contact-row:last-child { border-bottom: none; }
      .contact-label { width: 78px; flex-shrink: 0; font-size: 10px; color: var(--color-primary); text-transform: uppercase; letter-spacing: .18em; }
      .contact-value { font-size: 12px; color: rgba(255,255,255,.72); line-height: 1.6; }

      .contact-actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        flex-wrap: wrap;
      }

      .contact-actions a {
        flex: 1 1 calc(50% - 4px);
        min-width: 120px;
        text-align: center;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.1);
        color: rgba(255,255,255,.78);
        border-radius: 6px;
        padding: 12px 10px;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: .14em;
      }

      .team-list {
        display: grid;
        gap: 8px;
      }

      .team-card {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 14px;
        background: rgba(255,255,255,.02);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 6px;
      }

      .team-avatar {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: rgba(200,168,86,.12);
        color: var(--color-primary);
        font-weight: 700;
        flex-shrink: 0;
      }

      .team-name { font-size: 13px; font-weight: 700; color: var(--color-text-on-hero); }
      .team-role { font-size: 10px; color: rgba(255,255,255,.55); margin-top: 3px; }

      .cta-primary,
      .cta-secondary {
        display: block;
        width: 100%;
        margin-top: 14px;
        padding: 16px;
        text-align: center;
        text-decoration: none;
        letter-spacing: .18em;
        text-transform: uppercase;
        font-size: 10px;
        border-radius: 6px;
      }

      .cta-primary {
        background: transparent;
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
      }

      .cta-secondary {
        background: rgba(255,255,255,.04);
        color: rgba(255,255,255,.7);
        border: 1px solid rgba(255,255,255,.1);
      }

      footer { background: #080705; color: rgba(255,255,255,.24); text-align: center; padding: 22px 16px; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; }
    `,
    bodyMarkup: `
      <header class="hero">
        <div class="hero-eye">${escapeHtml(brief.optionalSections.statusLabel || labelizeBusinessType(brief.businessType))}</div>
        <h1>${escapeHtml(brief.businessName)}</h1>
        <div class="hero-sub">${escapeHtml(brief.tagline)}</div>
        ${brief.optionalSections.ratingLabel ? `<div class="hero-note">${escapeHtml(brief.optionalSections.ratingLabel)}</div>` : ''}
        ${brief.optionalSections.deliveryInfo ? `<div class="hero-note">${escapeHtml(brief.optionalSections.deliveryInfo)}</div>` : ''}
      </header>
      ${proofEntries.length > 0 ? `<div class="metrics-bar">${proofEntries.map((entry) => `<div class="metric"><strong>${escapeHtml(entry.value)}</strong><span>${escapeHtml(entry.label)}</span></div>`).join('')}</div>` : ''}
      <div class="body">
        ${brief.services.length > 0 ? `<section aria-labelledby="services-title"><div class="sec" id="services-title">Services</div>${servicesMarkup}</section>` : ''}
        ${portfolioEntries.length > 0 ? `<section aria-labelledby="portfolio-title"><div class="sec" id="portfolio-title">Portfolio</div><div class="portfolio-grid">${portfolioMarkup}</div></section>` : ''}
        <section aria-labelledby="about-title"><div class="sec" id="about-title">About</div><div class="about-box"><div class="about-copy">${escapeHtml(brief.aboutText)}</div></div></section>
        ${brief.team.length > 0 ? `<section aria-labelledby="team-title"><div class="sec" id="team-title">Team</div><div class="team-list">${teamMarkup}</div></section>` : ''}
        <section aria-labelledby="contact-title"><div class="sec" id="contact-title">Contact</div>${renderContactBox(brief)}${renderActionRow(actionLinks, 'contact-actions', 'contact-action', 6)}</section>
        ${renderLink(primaryCta, 'cta-primary')}
        ${secondaryCta && secondaryCta.href !== primaryCta.href ? renderLink(secondaryCta, 'cta-secondary') : ''}
      </div>
      <footer>${escapeHtml(brief.businessName)} · ${escapeHtml(brief.location.address)}</footer>
    `
  });
}

function renderRetailLayout({ brief, theme, themeName }) {
  const primaryCta = buildPrimaryCta(brief);
  const highlights = buildRetailHighlights(brief);
  const benefitEntries = buildProofEntries(brief, 3);
  const productsMarkup = brief.services
    .map(
      (service) => `
        <article class="product-card">
          <div class="product-top">
            <span class="product-kicker">${escapeHtml(service.name.split(' ').slice(0, 2).join(' '))}</span>
            <strong>${escapeHtml(service.price)}</strong>
          </div>
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.description)}</p>
        </article>`
    )
    .join('');

  return buildDocument({
    brief,
    theme,
    themeName,
    layoutName: 'retail-shelf',
    pageBackground: `linear-gradient(180deg, ${theme.colorBg}, #e7f7ec)`,
    appBackground: theme.colorBg,
    layoutCss: `
      .hero {
        background: ${theme.heroGradient};
        padding: 24px 18px 20px;
        position: relative;
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        inset: auto -30px -34px auto;
        width: 140px;
        height: 140px;
        border-radius: 28px;
        background: rgba(255,255,255,.12);
        transform: rotate(18deg);
      }

      .hero-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 14px;
      }

      .hero-logo {
        width: 60px;
        height: 60px;
        border-radius: 18px;
        overflow: hidden;
        background: rgba(255,255,255,.14);
        border: 1px solid rgba(255,255,255,.18);
        box-shadow: 0 10px 24px rgba(0,0,0,.2);
      }

      .hero-logo img { width: 100%; height: 100%; object-fit: cover; }

      .status-pill {
        background: var(--color-hero-chip-bg);
        color: var(--color-hero-chip-text);
        border: 1px solid var(--color-hero-chip-border);
        border-radius: 999px;
        padding: 7px 12px;
        font-size: 11px;
      }

      .hero h1 { margin-top: 18px; font-size: 32px; line-height: 1; color: var(--color-text-on-hero); }
      .hero p { margin-top: 10px; font-size: 13px; line-height: 1.6; color: var(--color-muted-on-hero); max-width: 290px; }

      .feature-strip {
        display: flex;
        gap: 8px;
        padding: 14px 16px;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .feature-strip::-webkit-scrollbar { display: none; }

      .feature-pill {
        flex-shrink: 0;
        white-space: nowrap;
        background: rgba(255,255,255,.82);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 11px;
      }

      .body { padding: 4px 16px 40px; }
      .sec { font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--color-primary); margin: 20px 0 10px; font-weight: 700; }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .product-card,
      .benefit-card,
      .delivery-panel,
      .contact-box {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 16px;
      }

      .product-card { padding: 14px; }
      .product-top { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
      .product-kicker { font-size: 10px; text-transform: uppercase; letter-spacing: .12em; color: var(--color-muted); }
      .product-card strong { font-size: 12px; color: var(--color-primary); }
      .product-card h3 { margin-top: 14px; font-size: 15px; color: var(--color-text); }
      .product-card p { margin-top: 8px; font-size: 11px; color: var(--color-muted); line-height: 1.6; }

      .benefit-row {
        display: grid;
        grid-template-columns: repeat(${benefitEntries.length > 1 ? benefitEntries.length : 1}, minmax(0, 1fr));
        gap: 8px;
      }

      .benefit-card { padding: 14px; text-align: center; }
      .benefit-card strong { display: block; font-family: var(--font-heading); font-size: 22px; color: var(--color-primary); }
      .benefit-card span { display: block; margin-top: 4px; font-size: 10px; color: var(--color-muted); }

      .delivery-panel { padding: 16px; }
      .delivery-panel h3 { font-size: 16px; color: var(--color-text); }
      .delivery-panel p { margin-top: 8px; font-size: 12px; color: var(--color-muted); line-height: 1.7; }

      .contact-box { overflow: hidden; }
      .contact-row { display: flex; gap: 10px; padding: 14px; border-bottom: 1px solid rgba(7,54,26,.08); }
      .contact-row:last-child { border-bottom: none; }
      .contact-label { width: 78px; flex-shrink: 0; font-size: 10px; color: var(--color-muted); text-transform: uppercase; letter-spacing: .14em; }
      .contact-value { font-size: 12px; color: var(--color-text); line-height: 1.55; }

      .cta-main {
        display: block;
        width: 100%;
        margin-top: 16px;
        padding: 16px;
        border-radius: 16px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        color: var(--color-text-on-primary);
        text-align: center;
        font-weight: 700;
      }

      .action-row {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }

      .action-row a {
        flex: 1;
        text-align: center;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: 12px 10px;
        font-size: 11px;
        color: var(--color-text);
      }

      footer { color: var(--color-muted); text-align: center; padding: 20px 16px 24px; font-size: 10px; letter-spacing: .05em; }
    `,
    bodyMarkup: `
      <header class="hero">
        <div class="hero-head">
          <div class="hero-logo"><img src="${escapeHtml(brief.assets.logoPath)}" alt="${escapeHtml(brief.businessName)} logo" /></div>
          ${renderStatusPill(brief.optionalSections.statusLabel)}
        </div>
        <h1>${escapeHtml(brief.businessName)}</h1>
        <p>${escapeHtml(brief.tagline)}</p>
      </header>
      ${highlights.length > 0 ? `<div class="feature-strip">${highlights.map((item) => `<div class="feature-pill">${escapeHtml(item)}</div>`).join('')}</div>` : ''}
      <div class="body">
        ${brief.services.length > 0 ? `<section aria-labelledby="products-title"><div class="sec" id="products-title">Top Picks</div><div class="product-grid">${productsMarkup}</div></section>` : ''}
        ${benefitEntries.length > 0 ? `<section aria-labelledby="benefits-title"><div class="sec" id="benefits-title">Why Buyers Return</div><div class="benefit-row">${benefitEntries.map((entry) => `<article class="benefit-card"><strong>${escapeHtml(entry.value)}</strong><span>${escapeHtml(entry.label)}</span></article>`).join('')}</div></section>` : ''}
        <section aria-labelledby="delivery-title"><div class="sec" id="delivery-title">Delivery</div><div class="delivery-panel"><h3>${escapeHtml(brief.optionalSections.deliveryInfo || 'Fast local fulfilment')}</h3><p>${escapeHtml(brief.aboutText)}</p></div></section>
        <section aria-labelledby="contact-title"><div class="sec" id="contact-title">Contact</div>${renderContactBox(brief)}</section>
        ${renderLink(primaryCta, 'cta-main')}
        ${renderSocialRow(brief, 'action-row', 'action-link', 4)}
      </div>
      <footer>${escapeHtml(brief.businessName)} · ${escapeHtml(brief.location.address)}</footer>
    `
  });
}

function renderDefaultLayout({ brief, theme, themeName }) {
  const primaryCta = buildPrimaryCta(brief);
  const secondaryCta = buildSecondaryCta(brief, primaryCta);
  const proofEntries = buildProofEntries(brief, 3);

  return buildDocument({
    brief,
    theme,
    themeName,
    layoutName: 'profile-core',
    pageBackground: `linear-gradient(180deg, ${theme.colorBg}, rgba(255,255,255,.9))`,
    appBackground: theme.colorBg,
    layoutCss: `
      .shell { padding: 24px 16px 40px; }
      .hero { background: ${theme.heroGradient}; color: var(--color-text-on-hero); border-radius: calc(var(--radius) * 1.5); padding: 24px; position: relative; overflow: hidden; }
      .hero::after { content: ''; position: absolute; inset: auto -40px -40px auto; width: 140px; height: 140px; background: rgba(255,255,255,.12); border-radius: 50%; }
      .logo-wrap { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
      .logo-wrap img { width: 64px; height: 64px; object-fit: cover; border-radius: 18px; border: 1px solid var(--color-hero-chip-border); background: var(--color-hero-chip-bg); }
      .status-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; background: var(--color-hero-chip-bg); color: var(--color-hero-chip-text); border: 1px solid var(--color-hero-chip-border); font-size: 13px; }
      .status-pill::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent); }
      h1, h2, h3 { font-family: var(--font-heading); margin: 0; }
      h1 { margin-top: 20px; font-size: 34px; line-height: 1.05; }
      .tagline { margin: 12px 0 0; color: var(--color-muted-on-hero); }
      .quick-info, .contact-links { list-style: none; padding: 0; margin: 20px 0 0; display: flex; flex-wrap: wrap; gap: 10px; }
      .quick-info li, .contact-links a { background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text); border-radius: 999px; padding: 10px 14px; }
      section { margin-top: 28px; }
      .section-heading { margin-bottom: 14px; }
      .eyebrow { margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; color: var(--color-muted); }
      .stack { display: grid; gap: 12px; }
      .card { background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text); border-radius: var(--radius); padding: 16px; }
      .service-card { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
      .service-card p, .contact-box p, footer p { margin: 8px 0 0; color: var(--color-muted); }
      .contact-box { padding: 18px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); }
      .cta { display: block; margin-top: 28px; padding: 16px 20px; border-radius: 999px; background: var(--color-primary); color: var(--color-text-on-primary); text-align: center; font-weight: 700; }
      footer { margin-top: 28px; padding-bottom: 24px; }
    `,
    bodyMarkup: `
      <main class="shell">
        <header class="hero">
          <div class="logo-wrap">
            <img src="${escapeHtml(brief.assets.logoPath)}" alt="${escapeHtml(brief.businessName)} logo" />
            ${renderStatusPill(brief.optionalSections.statusLabel)}
          </div>
          <h1>${escapeHtml(brief.businessName)}</h1>
          <p class="tagline">${escapeHtml(brief.tagline)}</p>
          <ul class="quick-info">${uniqueItems([brief.location.address, brief.optionalSections.deliveryInfo, brief.optionalSections.ratingLabel]).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </header>
        ${proofEntries.length > 0 ? `<section><div class="section-heading"><p class="eyebrow">Highlights</p><h2>Proof</h2></div><div class="stack">${proofEntries.map((entry) => `<article class="card"><strong>${escapeHtml(entry.value)}</strong><p>${escapeHtml(entry.label)}</p></article>`).join('')}</div></section>` : ''}
        ${brief.services.length > 0 ? `<section><div class="section-heading"><p class="eyebrow">Services</p><h2>Main Offering</h2></div><div class="stack">${brief.services.map((service) => `<article class="card service-card"><div><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.description)}</p></div><strong>${escapeHtml(service.price)}</strong></article>`).join('')}</div></section>` : ''}
        <section><div class="section-heading"><p class="eyebrow">About</p><h2>Story</h2></div><div class="contact-box"><p>${escapeHtml(brief.aboutText)}</p></div></section>
        <section><div class="section-heading"><p class="eyebrow">Contact</p><h2>Reach Out</h2></div><div class="contact-box"><p>${escapeHtml(brief.location.address)}</p><div class="contact-links">${buildActionLinks(brief).map((action) => renderLink(action, 'contact-link')).join('')}</div></div></section>
        ${renderLink(primaryCta, 'cta')}
        ${secondaryCta ? renderLink(secondaryCta, 'cta') : ''}
        <footer><p>${escapeHtml(brief.businessName)} profile bundle.</p></footer>
      </main>
    `
  });
}

function resolveLayoutFamily(brief) {
  if (brief.businessType === 'agency') {
    return 'agency-command';
  }

  if (brief.businessType === 'cafe' || brief.businessType === 'restaurant') {
    return 'hospitality-cafe';
  }

  if (brief.businessType === 'photography' || brief.businessType === 'salon') {
    return 'editorial-luxury';
  }

  if (brief.businessType === 'retail') {
    return 'retail-shelf';
  }

  return 'profile-core';
}

function buildDocument({ brief, theme, themeName, layoutName, pageBackground, appBackground, layoutCss, bodyMarkup }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(`${brief.businessName} - ${brief.tagline}`)}</title>
    <meta name="description" content="${escapeHtml(brief.tagline)}" />
    <meta property="og:title" content="${escapeHtml(brief.businessName)}" />
    <meta property="og:description" content="${escapeHtml(brief.tagline)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=${fontQuery(theme.fontHeading, theme.fontHeadingWeights)}&family=${fontQuery(theme.fontBody, theme.fontBodyWeights)}&display=swap" rel="stylesheet" />
    <style>
      :root {
        --color-primary: ${theme.colorPrimary};
        --color-accent: ${theme.colorAccent};
        --color-bg: ${theme.colorBg};
        --color-surface: ${theme.colorSurface};
        --color-text: ${theme.colorText};
        --color-muted: ${theme.colorMuted};
        --color-border: ${theme.colorBorder};
        --color-text-on-primary: ${theme.colorTextOnPrimary};
        --color-text-on-hero: ${theme.colorTextOnHero};
        --color-muted-on-hero: ${theme.colorMutedOnHero};
        --color-hero-chip-bg: ${theme.colorHeroChipBg};
        --color-hero-chip-text: ${theme.colorHeroChipText};
        --color-hero-chip-border: ${theme.colorHeroChipBorder};
        --font-heading: '${theme.fontHeading}', serif;
        --font-body: '${theme.fontBody}', sans-serif;
        --radius: ${theme.borderRadius};
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }

      html,
      body {
        min-height: 100%;
      }

      body {
        font-family: var(--font-body);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        background: ${pageBackground};
        color: var(--color-text);
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      img {
        display: block;
        max-width: 100%;
      }

      .app {
        width: 100%;
        max-width: 420px;
        min-height: 100vh;
        margin: 0 auto;
        background: ${appBackground};
        position: relative;
        overflow-x: hidden;
      }

      h1,
      h2,
      h3 {
        font-family: var(--font-heading);
      }

      ${layoutCss}
    </style>
  </head>
  <body data-theme="${escapeHtml(themeName)}" data-layout="${escapeHtml(layoutName)}">
    <div class="app">${bodyMarkup}
    </div>
  </body>
</html>`;
}

function generateMockHtml({ brief, theme, themeName }) {
  const layoutFamily = resolveLayoutFamily(brief);

  if (layoutFamily === 'hospitality-cafe') {
    return renderHospitalityLayout({ brief, theme, themeName });
  }

  if (layoutFamily === 'agency-command') {
    return renderAgencyLayout({ brief, theme, themeName });
  }

  if (layoutFamily === 'editorial-luxury') {
    return renderEditorialLayout({ brief, theme, themeName });
  }

  if (layoutFamily === 'retail-shelf') {
    return renderRetailLayout({ brief, theme, themeName });
  }

  return renderDefaultLayout({ brief, theme, themeName });
}

export { generateMockHtml };