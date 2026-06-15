#!/usr/bin/env python3
"""Build Phase 2 for Sunterra Solar v2 — inner views from site 02, Phase 1 shell preserved."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PHASE1 = ROOT / "sites" / "03. sunterra-solar-v2-website.html"
SITE02 = ROOT / "sites" / "02. sunterra-solar-website.html"
OUT = PHASE1

CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="m5 13 4 4L19 7"/></svg>'

PHASE2_CSS = """
    /* ========== PHASE 2: Upgraded page hero + inner page components ========== */
    .page-hero { padding-block: var(--space-16); background: var(--color-band-bg); color: var(--color-on-dark); border-bottom: 1px solid rgb(255 255 255 / 0.08); position: relative; overflow: hidden; }
    .page-hero::before { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 20% 0%, rgb(56 189 248 / 0.15), transparent 55%); pointer-events: none; }
    .page-hero .container { position: relative; z-index: 1; }
    .page-hero__title { font-size: var(--text-h1); font-weight: var(--font-black); color: var(--color-on-dark); }
    .page-hero__lede { margin-top: var(--space-3); color: rgb(248 250 252 / 0.88); max-width: 58ch; }
    .page-hero__crumbs { font-size: var(--text-sm); color: rgb(248 250 252 / 0.72); margin-bottom: var(--space-4); }
    .page-hero__crumbs a { color: var(--color-accent); text-decoration: none; }
    .page-hero__crumbs a:hover { text-decoration: underline; }
    .page-hero__crumbs [aria-current="page"] { color: rgb(248 250 252 / 0.95); }
    .content { padding-block: var(--space-12); }
    .content__prose { max-width: 48rem; }
    .content__prose h2 { font-size: var(--text-h2); font-weight: var(--font-extrabold); margin-top: var(--space-10); margin-bottom: var(--space-4); }
    .content__prose p { margin-bottom: var(--space-4); color: var(--color-text-muted); }
    .content__prose ul:not([class]) { margin-bottom: var(--space-4); padding-left: var(--space-6); list-style: disc; color: var(--color-text-muted); }
    .content--narrow { max-width: 40rem; margin-inline: auto; }
    .content--faq { max-width: 48rem; margin-inline: auto; }
    .content__actions { display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-8); }
    .content__subhead { font-size: var(--text-h3); font-weight: var(--font-extrabold); margin-bottom: var(--space-4); }
    .content__contact-meta { margin: var(--space-4) 0; color: var(--color-text-muted); line-height: 1.7; }
    .content__contact-meta a { font-weight: var(--font-semibold); }
    .content__areas { margin-top: var(--space-4); }
    .info-box { background: var(--color-primary-soft); border-left: 4px solid var(--color-secondary); padding: var(--space-5); border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-block: var(--space-6); font-size: var(--text-sm); color: var(--color-text-muted); }
    .info-box--spaced { margin-top: var(--space-8); }
    .table-wrap { overflow-x: auto; margin-block: var(--space-6); }
    .data-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
    .data-table th, .data-table td { padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); text-align: left; }
    .data-table th { background: var(--color-surface); font-weight: var(--font-bold); }
    .form__check { display: flex; align-items: flex-start; gap: var(--space-2); font-size: var(--text-sm); margin-bottom: var(--space-4); }
    .form__check input { width: 1.1rem; height: 1.1rem; margin-top: 0.2rem; accent-color: var(--color-secondary); flex: none; }
    .form__optional { font-weight: var(--font-regular); color: var(--color-text-muted); font-size: var(--text-caption); }
    .form__req { font-weight: var(--font-regular); color: var(--color-text-muted); font-size: var(--text-caption); }
    .form__note { margin-top: var(--space-4); font-size: var(--text-caption); color: var(--color-text-muted); padding: var(--space-3); background: var(--color-surface); border-left: 3px solid var(--color-accent); border-radius: var(--radius-sm); }
    .form__steps { display: flex; gap: var(--space-2); margin-bottom: var(--space-8); flex-wrap: wrap; }
    .form__step { flex: 1; min-width: 5rem; text-align: center; padding: var(--space-3); border-radius: var(--radius-md); background: var(--color-surface); font-size: var(--text-caption); font-weight: var(--font-semibold); color: var(--color-text-muted); border: 2px solid transparent; }
    .form__step.is-active { border-color: var(--color-secondary); color: var(--color-primary); background: var(--color-primary-soft); }
    .form__step.is-done { border-color: var(--color-success); color: var(--color-success); }
    .form__panel[hidden] { display: none; }
    .form__actions { display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-4); }
    .calc-page__results-title { font-size: var(--text-h3); font-weight: var(--font-extrabold); margin-bottom: var(--space-4); }
    .rebate-result { background: var(--color-success-soft); border: 1px solid var(--color-success); border-radius: var(--radius-lg); padding: var(--space-6); margin-top: var(--space-6); }
    .rebate-result[hidden] { display: none; }
    .rebate-result__label { font-size: var(--text-sm); color: var(--color-text-muted); }
    .rebate-result__amount { font-size: var(--text-h2); font-weight: var(--font-black); color: var(--color-success); margin-top: var(--space-2); }
    .rebate-result__state { margin-top: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); }
    .review { padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-bottom: var(--space-4); background: var(--color-bg); }
    .review__stars { color: var(--color-accent-strong); display: flex; gap: 2px; margin-bottom: var(--space-2); }
    .review__stars svg { width: 0.9rem; height: 0.9rem; }
    .review__meta { font-size: var(--text-caption); color: var(--color-text-muted); margin-bottom: var(--space-2); }
    .review__text { font-size: var(--text-sm); color: var(--color-text-muted); }
    .cert-grid { display: grid; gap: var(--space-6); }
    @media (min-width: 640px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
    .cert { display: flex; gap: var(--space-4); padding: var(--space-5); background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border); }
    .cert__icon { width: 3rem; height: 3rem; display: grid; place-items: center; background: var(--color-primary-soft); color: var(--color-secondary); border-radius: var(--radius-md); flex: none; }
    .cert__icon svg { width: 1.5rem; height: 1.5rem; }
    .cert__title { font-weight: var(--font-bold); margin-bottom: var(--space-1); }
    .cert__text { font-size: var(--text-sm); color: var(--color-text-muted); }
    .empty-404 { text-align: center; padding-block: var(--space-24); }
    .empty-404__code { font-size: clamp(4rem, 12vw, 8rem); font-weight: var(--font-black); color: var(--color-primary-soft); line-height: 1; }
    .empty-404__title { font-size: var(--text-h2); font-weight: var(--font-black); margin-top: var(--space-4); }
    .empty-404__lede { color: var(--color-text-muted); margin: var(--space-4) 0 var(--space-8); max-width: 42ch; margin-inline: auto; }
    .empty-404__actions { display: flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center; }
    .toast-region { position: fixed; bottom: calc(var(--bottomnav-height) + var(--sticky-cta-height) + var(--space-4)); left: 50%; transform: translateX(-50%); z-index: 120; width: min(92vw, 24rem); pointer-events: none; }
    @media (min-width: 1024px) { .toast-region { bottom: var(--space-6); } }
    .toast { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--color-primary); color: var(--color-on-primary); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); font-size: var(--text-sm); opacity: 0; transform: translateY(8px); transition: opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out); }
    .toast.is-visible { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { .toast { transition: none; transform: none; } }
    .view.is-loading { opacity: 0.6; transition: opacity var(--duration-fast) var(--ease-out); }
    @media (prefers-reduced-motion: reduce) { .view.is-loading { opacity: 1; transition: none; } }
    .feature-list--prose { list-style: none; padding: 0; }
"""

PHASE2_JS = r'''
      var BLOG = [{"id": "stc-rebates-2026", "title": "STC Rebates in 2026: What Australian Homeowners Need to Know", "date": "4 Jun 2026", "read": "7 min", "author": "Maya Chen", "excerpt": "How Small-scale Technology Certificates work under the RET, and why acting before the deeming period drops matters.", "body": ["<p>Australia's Small-scale Renewable Energy Scheme (SRES) provides upfront discounts on rooftop solar through STCs — certificates your installer trades on your behalf at the point of sale.</p>", "<p>In 2026, the deeming period for residential systems continues to step down annually. A 6.6 kW system in Sydney (Zone 3) typically generates enough STCs to reduce your out-of-pocket cost by $2,400–$2,900 AUD depending on the spot STC price.</p>", "<h2>CEC accreditation matters</h2><p>Only Clean Energy Council (CEC) accredited installers can claim STCs and connect systems under AS/NZS 4777. Sunterra Solar maintains full CEC accreditation and uses only CEC-approved modules and inverters.</p>", "<h2>State overlays</h2><p>Some states add battery rebates or interest-free loans on top of federal STCs. We model both federal and state incentives in every quote.</p>"]}, {"id": "nem-feed-in-tariffs", "title": "NEM Feed-in Tariffs: Maximising Export Value in 2026", "date": "22 May 2026", "read": "6 min", "author": "James Okonkwo", "excerpt": "Retailers across the National Electricity Market offer widely different feed-in rates — here's how to pick the right plan.", "body": ["<p>The National Electricity Market (NEM) connects Queensland, NSW, Victoria, SA and Tasmania. Your retailer sets the feed-in tariff (FiT) for surplus solar exported to the grid.</p>", "<p>In 2026, competitive plans range from 4\u00a2 to 12\u00a2 per kWh depending on state and retailer. Self-consumption plus a modest battery often beats chasing the highest FiT alone.</p>", "<h2>Time-of-use alignment</h2><p>Pairing solar with controlled loads during peak generation lifts self-consumption above 65% without oversizing your array.</p>"]}, {"id": "battery-backup-guide", "title": "Battery Backup During Grid Outages: A Practical Guide", "date": "8 May 2026", "read": "8 min", "author": "Priya Nair", "excerpt": "Not every battery provides true backup. Learn whole-home vs essential-circuit islanding.", "body": ["<p>When storms or bushfire risk trigger outages, a correctly configured battery keeps lights, refrigeration and communications online.</p>", "<p>Whole-home backup requires adequate capacity and a gateway that isolates your home from the grid — mandatory under AS/NZS 4777.</p>", "<h2>Sizing for backup</h2><p>Essential-circuit backup typically needs 10–15 kWh usable storage. We map critical loads during your free site inspection.</p>"]}, {"id": "commercial-solar-roi", "title": "Commercial Solar ROI: Demand Charges and Depreciation", "date": "15 Apr 2026", "read": "9 min", "author": "James Okonkwo", "excerpt": "How Australian businesses cut demand charges and leverage temporary full expensing.", "body": ["<p>Commercial sites on NEM tariffs often pay demand charges based on peak kW draw. Solar plus load shifting can trim peaks by 20–40%.</p>", "<p>Eligible businesses may access temporary full expensing for solar assets, improving after-tax payback to under four years in high-irradiance states.</p>"]}, {"id": "ev-solar-charging", "title": "Charging Your EV with Solar", "date": "2 Apr 2026", "read": "5 min", "author": "Maya Chen", "excerpt": "Three ways to ensure your EV draws from rooftop generation before the grid.", "body": ["<p>Smart EV chargers with CT clamp monitoring throttle charge rate to match real-time solar export.</p>", "<p>Sunterra installs CEC-approved chargers with solar diversion modes compatible with major inverter brands.</p>"]}, {"id": "panel-degradation", "title": "Solar Panel Degradation: 25-Year Warranties Explained", "date": "19 Mar 2026", "read": "6 min", "author": "Priya Nair", "excerpt": "Tier-one modules degrade roughly 0.5% per year. How linear performance warranties protect your investment.", "body": ["<p>Reputable manufacturers guarantee at least 80–84% of nameplate output after 25 years. Sunterra only specifies panels with independent testing and Australian warranty support.</p>"]}];
      var CASES = [{"id": "penrith-family", "title": "Penrith Family Cuts Bills 78% with 8.8 kW + Powerwall", "loc": "Penrith, NSW", "size": "8.8 kW", "save": "$2,840/yr", "sum": "Four-bedroom home on time-of-use tariff paired tier-one panels with Tesla Powerwall 3.", "body": ["<p>The Harrington family faced summer bills exceeding $620 per quarter on Ausgrid time-of-use.</p>", "<p>Sunterra installed 22× 400 W REC Alpha Pure panels (8.8 kW) with Tesla Powerwall 3. STCs reduced upfront cost by $2,680.</p>", "<p>Twelve months post-commissioning, grid imports fell 78%. Self-consumption reached 71%.</p>"]}, {"id": "adelaide-warehouse", "title": "Adelaide Warehouse Saves $48k on Demand Charges", "loc": "Gillman, SA", "size": "99 kW", "save": "$48,200/yr", "sum": "Commercial array targeting peak demand between 2–8 PM on SAPN business tariff.", "body": ["<p>A logistics operator paid significant demand charges on their SAPN business tariff.</p>", "<p>Sunterra engineered a 99 kW rooftop system with Sungrow inverters and export limiting per DNSP requirements.</p>", "<p>Year-one savings: $48,200 AUD with 3.9-year simple payback after STCs and depreciation.</p>"]}, {"id": "brisbane-offgrid", "title": "Off-Grid Property Near Noosa", "loc": "Sunshine Coast, QLD", "size": "12 kW hybrid", "save": "Diesel cut 92%", "sum": "Hybrid solar-diesel-battery for rural property outside Ergon grid extension.", "body": ["<p>12 kW ground-mount with 30 kWh lithium and backup diesel gen-set replaced nightly generator runs.</p>", "<p>Zone 2 irradiance delivers strong winter performance. CEC-compliant islanding protects onsite machinery.</p>"]}, {"id": "melbourne-townhouse", "title": "Melbourne Strata Adds Shared Solar", "loc": "Footscray, VIC", "size": "15.2 kW", "save": "$6,100/yr", "sum": "Solar Victoria battery rebate stacked with STCs for six townhouses.", "body": ["<p>Six-unit strata shared roof space with individual smart meters and Solar Victoria eligibility verified.</p>"]}, {"id": "perth-retail", "title": "Perth Retail Strip Tenancy Solar", "loc": "Joondalup, WA", "size": "22 kW", "save": "$11,400/yr", "sum": "Synergy tariff optimisation with west-facing tilt for afternoon load matching.", "body": ["<p>West-facing tilt maximised generation during retail peak hours. Western Power approval in 10 business days.</p>"]}];

      function escapeHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

      var toastRegion = $('[data-toast-region]');
      function toast(msg) {
        if (!toastRegion) return;
        var el = document.createElement('div');
        el.className = 'toast';
        el.innerHTML = '<span>' + escapeHtml(msg) + '</span>';
        toastRegion.appendChild(el);
        requestAnimationFrame(function () { el.classList.add('is-visible'); });
        setTimeout(function () { el.classList.remove('is-visible'); setTimeout(function () { el.remove(); }, 300); }, 2800);
      }

      function genRef() {
        return 'ST-' + Date.now().toString(36).toUpperCase().slice(-8);
      }

      var VIEW_TITLES = {
        home: "Sunterra Solar — Power your home with Australia's solar experts",
        about: 'About — Sunterra Solar',
        'why-solar': 'Why Solar — Sunterra Solar',
        'why-us': 'Why Us — Sunterra Solar',
        contact: 'Contact — Sunterra Solar',
        faq: 'FAQ — Sunterra Solar',
        blog: 'Blog — Sunterra Solar',
        'blog-article': 'Article — Sunterra Solar',
        residential: 'Residential Solar — Sunterra Solar',
        commercial: 'Commercial Solar — Sunterra Solar',
        batteries: 'Batteries — Sunterra Solar',
        'ev-chargers': 'EV Chargers — Sunterra Solar',
        'off-grid': 'Off-Grid — Sunterra Solar',
        maintenance: 'Maintenance — Sunterra Solar',
        quote: 'Free Quote — Sunterra Solar',
        calculator: 'Calculator — Sunterra Solar',
        inspection: 'Book Inspection — Sunterra Solar',
        rebates: 'Rebates — Sunterra Solar',
        finance: 'Finance — Sunterra Solar',
        'case-studies': 'Case Studies — Sunterra Solar',
        'case-study': 'Case Study — Sunterra Solar',
        reviews: 'Reviews — Sunterra Solar',
        certifications: 'Certifications — Sunterra Solar',
        warranty: 'Warranty — Sunterra Solar',
        privacy: 'Privacy — Sunterra Solar',
        terms: 'Terms — Sunterra Solar',
        cookies: 'Cookies — Sunterra Solar',
        404: 'Not Found — Sunterra Solar'
      };
      var VALID = Object.keys(VIEW_TITLES);
      var currentRoute = { view: 'home', params: [], query: {} };
      var skeletonTimer = null;
      var firstRoute = true;

      function parseHash() {
        var raw = location.hash.replace(/^#\/?/, '');
        var qIdx = raw.indexOf('?');
        var query = {};
        if (qIdx !== -1) {
          raw.slice(qIdx + 1).split('&').forEach(function (p) {
            if (!p) return;
            var kv = p.split('=');
            query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
          });
          raw = raw.slice(0, qIdx);
        }
        return { parts: raw.split('/').filter(Boolean), query: query };
      }

      function getArticle(id) { return BLOG.find(function (a) { return a.id === id; }); }
      function getCase(id) { return CASES.find(function (c) { return c.id === id; }); }

      function resolveRoute() {
        var h = parseHash();
        var p = h.parts;
        if (!p.length) return { view: 'home', params: [], query: h.query };
        var head = p[0];
        if (head === 'blog' && p[1]) return getArticle(p[1]) ? { view: 'blog-article', params: [p[1]], query: h.query } : { view: '404', params: [], query: {} };
        if (head === 'case-studies' && p[1]) return getCase(p[1]) ? { view: 'case-study', params: [p[1]], query: h.query } : { view: '404', params: [], query: {} };
        if (VALID.indexOf(head) !== -1 && head !== 'blog-article' && head !== 'case-study') return { view: head, params: p.slice(1), query: h.query };
        return { view: '404', params: [], query: {} };
      }

      function renderBlogArticle(route) {
        var a = getArticle(route.params[0]);
        if (!a) return;
        document.title = a.title + ' — Sunterra Solar';
        $('[data-article-title]').textContent = a.title;
        $('[data-article-crumb]').textContent = a.title;
        $('[data-article-meta]').textContent = 'By ' + a.author + ' · ' + a.date + ' · ' + a.read;
        $('[data-article-body]').innerHTML = a.body.join('');
      }

      function renderCaseStudy(route) {
        var c = getCase(route.params[0]);
        if (!c) return;
        document.title = c.title + ' — Sunterra Solar';
        $('[data-cs-title]').textContent = c.title;
        $('[data-cs-crumb]').textContent = c.title;
        $('[data-cs-meta]').textContent = c.loc + ' · ' + c.size + ' · ' + c.save;
        $('[data-cs-body]').innerHTML = c.body.join('');
      }

      var VIEW_RENDERERS = {
        'blog-article': renderBlogArticle,
        'case-study': renderCaseStudy
      };

      function updateNavCurrent(route) {
        var navKey = route.view;
        if (route.view === 'blog-article') navKey = 'blog';
        if (route.view === 'case-study') navKey = 'case-studies';
        if (route.view === '404') navKey = null;
        var serviceViews = ['residential','commercial','batteries','ev-chargers','off-grid','maintenance'];
        if (serviceViews.indexOf(route.view) !== -1) navKey = 'services';
        $$('[data-nav]').forEach(function (a) {
          var key = a.getAttribute('data-nav');
          var match = key === navKey || (key === 'services' && serviceViews.indexOf(route.view) !== -1);
          if (match) a.setAttribute('aria-current', 'page');
          else a.removeAttribute('aria-current');
        });
      }

      function handleRoute() {
        var route = resolveRoute();
        currentRoute = route;
        var target = null;
        $$('.view').forEach(function (s) {
          var match = s.getAttribute('data-route') === route.view;
          s.hidden = !match;
          if (match) target = s;
        });
        if (!target) return;
        document.title = VIEW_TITLES[route.view] || VIEW_TITLES.home;
        if (VIEW_RENDERERS[route.view]) VIEW_RENDERERS[route.view](route);
        updateNavCurrent(route);
        window.scrollTo(0, 0);
        if (!firstRoute && !reducedMotion.matches) {
          clearTimeout(skeletonTimer);
          $$('.view.is-loading').forEach(function (v) { v.classList.remove('is-loading'); });
          target.classList.add('is-loading');
          skeletonTimer = setTimeout(function () { target.classList.remove('is-loading'); }, 260);
        }
        if (!firstRoute) {
          var heading = target.querySelector('h1');
          if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
        }
        firstRoute = false;
        refreshReveals(target);
        closeMega();
        closeDrawer();
      }

      function initRouter() {
        window.addEventListener('hashchange', handleRoute);
        handleRoute();
      }

      function runCalculator() {
        var stateEl = $('#calc-state');
        if (!stateEl) return;
        var state = stateEl.value;
        var st = STATES[state];
        if (!st) return;
        var size = Number($('#calc-size').value) || 6.6;
        var rate = Number($('#calc-rate').value) || 32;
        var selfPct = Number($('#calc-self').value) || 65;
        var fit = Number($('#calc-fit').value) || 5.5;
        var cost = Number($('#calc-cost').value) || 9500;
        var gen = calcGeneration(size, st.psh);
        var save = calcSavings(gen, rate, selfPct, fit);
        var stcs = calcSTC(size, st.zone);
        var stcAud = stcs * STC_PRICE;
        var net = cost - stcAud;
        var pay = save > 0 ? (net / save).toFixed(1) : '—';
        $('[data-calc-zone]').textContent = 'Zone ' + st.zone + ' (' + ZONE_FACTORS[st.zone] + ')';
        $('[data-calc-stcs]').textContent = thousands(stcs);
        $('[data-calc-stc-aud]').textContent = aud(stcAud);
        $('[data-calc-gen]').textContent = thousands(gen);
        $('[data-calc-save]').textContent = aud(save) + '/yr';
        $('[data-calc-net]').textContent = aud(net);
        $('[data-calc-pay]').textContent = pay + ' years';
        $('[data-calc-lifetime]').textContent = aud(save * 25);
      }

      function runRebateCheck() {
        var state = $('#r-state').value;
        var st = STATES[state];
        var size = Number($('#r-size').value) || 6.6;
        var battery = $('#r-battery').value === 'yes';
        var stcs = calcSTC(size, st.zone);
        var stcAud = stcs * STC_PRICE;
        var stateMsg = '';
        if (state === 'VIC' && battery) stateMsg = 'You may be eligible for the Solar Victoria battery rebate (subject to eligibility criteria).';
        else if (state === 'NSW' && battery) stateMsg = 'NSW battery incentive may apply — our team will verify eligibility.';
        else if (state === 'ACT' && battery) stateMsg = 'ACT Sustainable Household Scheme may offer additional support.';
        else stateMsg = 'Check state government websites for current battery and solar programs in ' + st.name + '.';
        var box = $('[data-rebate-result]');
        if (!box) return;
        box.hidden = false;
        $('[data-rebate-stc]').textContent = aud(stcAud) + ' (' + stcs + ' STCs)';
        $('[data-rebate-state]').textContent = stateMsg;
      }

      var quoteStep = 1;
      function showQuoteStep(n) {
        quoteStep = n;
        $$('[data-quote-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-quote-panel') !== String(n); });
        $$('[data-quote-steps] .form__step').forEach(function (s) {
          var sn = Number(s.getAttribute('data-step'));
          s.classList.toggle('is-active', sn === n);
          s.classList.toggle('is-done', sn < n);
        });
        $('[data-quote-prev]').hidden = n === 1;
        $('[data-quote-next]').hidden = n === 4;
        $('[data-quote-submit]').hidden = n !== 4;
      }

      function saveQuoteDraft() {
        var form = $('[data-quote-form]');
        if (!form) return;
        var data = {};
        $$('input, select, textarea', form).forEach(function (el) {
          if (el.name) data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
        });
        data._step = quoteStep;
        store.set('quote_draft', data);
      }

      function loadQuoteDraft() {
        var data = store.get('quote_draft', null);
        if (!data) return;
        var form = $('[data-quote-form]');
        if (!form) return;
        Object.keys(data).forEach(function (k) {
          if (k === '_step') return;
          var el = form.elements[k];
          if (!el) return;
          if (el.type === 'checkbox') el.checked = !!data[k];
          else el.value = data[k];
        });
        if (data._step) showQuoteStep(data._step);
      }

      function validateQuoteStep(n) {
        var panel = $('[data-quote-panel="' + n + '"]');
        if (!panel) return true;
        var ok = true;
        $$('input, select, textarea', panel).forEach(function (el) {
          if (!el.required) return;
          var invalid = el.type === 'checkbox' ? !el.checked : !String(el.value).trim();
          el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
          if (invalid) ok = false;
        });
        if (!ok) {
          var status = $('[data-quote-status]');
          status.textContent = 'Please complete all required fields before continuing.';
          status.className = 'form__status form__status--err';
          var first = panel.querySelector('[aria-invalid="true"]');
          if (first) first.focus();
        }
        return ok;
      }

      function initQuoteForm() {
        var form = $('[data-quote-form]');
        if (!form) return;
        loadQuoteDraft();
        $('[data-quote-next]').addEventListener('click', function () {
          if (!validateQuoteStep(quoteStep)) return;
          saveQuoteDraft();
          showQuoteStep(Math.min(4, quoteStep + 1));
          $('[data-quote-status]').textContent = '';
        });
        $('[data-quote-prev]').addEventListener('click', function () {
          showQuoteStep(Math.max(1, quoteStep - 1));
          $('[data-quote-status]').textContent = '';
        });
        form.addEventListener('input', saveQuoteDraft);
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (!validateQuoteStep(4)) return;
          var data = {};
          $$('input, select, textarea', form).forEach(function (el) { if (el.name) data[el.name] = el.type === 'checkbox' ? el.checked : el.value; });
          data.reference = genRef();
          saveLead('quote', data);
          store.set('quote_draft', null);
          $('[data-quote-status]').textContent = 'Quote submitted! Reference ' + data.reference + '. A Sunterra specialist will call within 24 hours.';
          $('[data-quote-status]').className = 'form__status form__status--ok';
          toast('Quote submitted — reference ' + data.reference);
          form.reset();
          showQuoteStep(1);
        });
      }

      function initContactForm() {
        var contact = $('[data-contact-form]');
        if (!contact) return;
        contact.addEventListener('submit', function (e) {
          e.preventDefault();
          var data = {};
          $$('input, select, textarea', contact).forEach(function (el) { if (el.name) data[el.name] = el.value; });
          saveLead('contact', data);
          var status = contact.querySelector('.form__status');
          status.textContent = 'Message sent — we reply within one business day.';
          status.className = 'form__status form__status--ok';
          contact.reset();
        });
      }

      function initInspectionForm() {
        var insp = $('[data-inspection-form]');
        if (!insp) return;
        var dateEl = $('#i-date');
        if (dateEl) {
          var min = new Date();
          min.setDate(min.getDate() + 1);
          dateEl.min = min.toISOString().slice(0, 10);
        }
        insp.addEventListener('submit', function (e) {
          e.preventDefault();
          var data = {};
          $$('input, select, textarea', insp).forEach(function (el) { if (el.name) data[el.name] = el.value; });
          data.reference = genRef();
          saveLead('inspection', data);
          var status = insp.querySelector('.form__status');
          status.textContent = 'Inspection booked! Confirmation ' + data.reference + '. We will call to confirm your slot.';
          status.className = 'form__status form__status--ok';
          toast('Inspection booked — ' + data.reference);
          insp.reset();
        });
      }

      function initRebatesChecker() {
        var form = $('[data-rebate-checker]');
        if (!form) return;
        form.addEventListener('submit', function (e) { e.preventDefault(); runRebateCheck(); });
      }

      function initCalculatorPage() {
        var form = $('[data-calculator]');
        if (!form) return;
        form.addEventListener('submit', function (e) { e.preventDefault(); runCalculator(); });
      }

      function initLeadGenActions() {
        document.addEventListener('click', function (e) {
          if (e.target.closest('[data-action="calc-run"]')) runCalculator();
          if (e.target.closest('[data-action="rebate-check"]')) runRebateCheck();
        });
      }
'''


def strip_inline_styles(html: str) -> str:
    html = re.sub(r'\sstyle="[^"]*"', '', html)
    html = html.replace("style='margin-top:2rem'", '')
    html = html.replace("<ul class='feature-list'>", '<ul class="feature-list feature-list--prose">')
    html = html.replace('<ul class=\'feature-list\'>', '<ul class="feature-list feature-list--prose">')
    return html


def fix_service_ctas(html: str) -> str:
    html = re.sub(
        r"<p\s*><a class='btn btn--accent'",
        '<div class="content__actions"><a class="btn btn--accent"',
        html
    )
    html = re.sub(
        r"</a>\s*<a class='btn btn--secondary' href='#/inspection'>Book inspection</a></p>",
        '</a><a class="btn btn--secondary" href="#/inspection">Book inspection</a></div>',
        html
    )
    html = re.sub(
        r"<p style='margin-top:2rem'><a class='btn btn--accent'",
        '<div class="content__actions"><a class="btn btn--accent"',
        html
    )
    html = re.sub(
        r"</a></p>\s*</div></div>\s*</section>\s*<section class=\"view\" data-route=\"contact\"",
        '</a></div></div></div></section>\n  <section class="view" data-route="contact"',
        html,
        count=1
    )
    return html


def fix_contact_page(html: str) -> str:
    html = html.replace(
        '<h2 class="section-head__title" style="font-size:1.25rem">Get in touch</h2>',
        '<h2 class="content__subhead">Get in touch</h2>'
    )
    html = html.replace(
        '<p style="margin:1rem 0;color:var(--color-text-muted)">',
        '<p class="content__contact-meta">'
    )
    html = html.replace(
        '<h2 class="section-head__title" style="font-size:1.25rem">State offices</h2>',
        '<h2 class="content__subhead">State offices</h2>'
    )
    html = html.replace(
        '<div class="areas" style="margin-top:1rem">',
        '<div class="areas content__areas">'
    )
    return html


def fix_faq_page(html: str) -> str:
    html = html.replace(
        '<div class="container" style="max-width:48rem">',
        '<div class="container content--faq">'
    )
    return html


def fix_quote_page(html: str) -> str:
    html = html.replace('<div class="container" style="max-width:40rem">', '<div class="container content--narrow">')
    html = html.replace(
        '<div style="display:flex;gap:1rem;margin-top:1rem;flex-wrap:wrap">',
        '<div class="form__actions">'
    )
    html = html.replace(
        '<p class="form__note" style="margin-top:1rem;font-size:0.8125rem;color:var(--color-text-muted);padding:0.75rem;background:var(--color-surface);border-left:3px solid var(--color-accent);border-radius:6px">Demo template — connects to your CRM in production.</p>',
        '<p class="form__note">Draft saved automatically to your browser. Reference number issued on submit.</p>'
    )
    return html


def fix_calculator_page(html: str) -> str:
    html = html.replace(
        '<h2 style="font-size:1.1rem;font-weight:800;margin-bottom:1rem">Your estimated results</h2>',
        '<h2 class="calc-page__results-title">Your estimated results</h2>'
    )
    html = html.replace(
        '<div class="info-box" style="margin-top:1.5rem">',
        '<div class="info-box info-box--spaced">'
    )
    return html


def fix_rebates_page(html: str) -> str:
    html = html.replace('<div class="container" style="max-width:40rem">', '<div class="container content--narrow">')
    html = html.replace(
        '<p style="font-size:.9rem;color:var(--color-text-muted)">Estimated federal STC rebate</p>',
        '<p class="rebate-result__label">Estimated federal STC rebate</p>'
    )
    html = html.replace(
        '<p style="margin-top:1rem;font-size:.9rem" data-rebate-state></p>',
        '<p class="rebate-result__state" data-rebate-state></p>'
    )
    return html


def fix_inspection_page(html: str) -> str:
    return html.replace('<div class="container" style="max-width:40rem">', '<div class="container content--narrow">')


def fix_reviews_page(html: str) -> str:
    return html.replace('<div class="container" style="max-width:40rem">', '<div class="container content--narrow">')


def fix_404_page(html: str) -> str:
    html = html.replace(
        '<p style="color:var(--color-text-muted);margin:1rem 0">That route doesn\'t exist. Try our calculator or request a quote.</p>',
        '<p class="empty-404__lede">That route doesn\'t exist. Try our calculator or request a quote.</p>'
    )
    html = html.replace(
        '<div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">',
        '<div class="empty-404__actions">'
    )
    return html


def add_crumbs_to_marketing(html: str) -> str:
    """Add breadcrumbs to pages missing them."""
    replacements = [
        ('data-route="why-solar"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Why Solar</span></nav>\n        <h1'),
        ('data-route="why-us"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Why Us</span></nav>\n        <h1'),
        ('data-route="finance"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Finance</span></nav>\n        <h1'),
        ('data-route="certifications"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Certifications</span></nav>\n        <h1'),
        ('data-route="warranty"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Warranty</span></nav>\n        <h1'),
        ('data-route="privacy"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Privacy</span></nav>\n        <h1'),
        ('data-route="terms"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Terms</span></nav>\n        <h1'),
        ('data-route="cookies"', '<nav class="page-hero__crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <span aria-current="page">Cookies</span></nav>\n        <h1'),
    ]
    for route, crumb in replacements:
        pattern = rf'(<section class="view" {route}[^>]*>\s*<div class="page-hero"><div class="container">)\s*(<h1)'
        html = re.sub(pattern, r'\1' + crumb.replace('<h1', r'\2'), html)
    return html


def extract_inner_views(site02: str) -> str:
    start = site02.index('<section class="view" data-route="residential"')
    end = site02.index('</main>', start)
    views = site02[start:end].strip()
    views = strip_inline_styles(views)
    views = fix_service_ctas(views)
    views = fix_contact_page(views)
    views = fix_faq_page(views)
    views = fix_quote_page(views)
    views = fix_calculator_page(views)
    views = fix_rebates_page(views)
    views = fix_inspection_page(views)
    views = fix_reviews_page(views)
    views = fix_404_page(views)
    views = add_crumbs_to_marketing(views)
    views = views.replace('<section class="view"', '<div class="view"')
    views = re.sub(r'</section>\s*(?=<div class="view")', '</div>\n', views)
    views = re.sub(r'</section>\s*$', '</div>', views.strip())
    views = re.sub(
        r'(<div class="view" data-route="([^"]+)")',
        r'<!-- ========== VIEW: \2 ========== -->\n    \1',
        views
    )
    return views


def patch_css(content: str) -> str:
    # Remove old minimal page-hero block and placeholder CSS
    content = re.sub(
        r'    /\* Phase 2 page template hooks \(unused in Phase 1 — no dead selectors applied\) \*/\n'
        r'    \.page-hero \{ padding-block: var\(--space-16\); background: var\(--color-surface\); border-bottom: 1px solid var\(--color-border\); \}\n'
        r'    \.page-hero__title \{ font-size: var\(--text-h1\); font-weight: var\(--font-black\); \}\n'
        r'    \.page-hero__lede \{ margin-top: var\(--space-3\); color: var\(--color-text-muted\); max-width: 58ch; \}\n'
        r'    \.page-hero__crumbs \{ font-size: var\(--text-sm\); color: var\(--color-text-muted\); margin-bottom: var\(--space-4\); \}\n'
        r'    \.page-hero__crumbs a \{ color: var\(--color-secondary\); text-decoration: none; \}\n'
        r'    \.page-hero__crumbs a:hover \{ text-decoration: underline; \}\n'
        r'    \.content \{ padding-block: var\(--space-12\); \}\n'
        r'    \.content__prose \{ max-width: 48rem; \}\n'
        r'    \.content__prose h2 \{ font-size: var\(--text-h2\); font-weight: var\(--font-extrabold\); margin-top: var\(--space-10\); margin-bottom: var\(--space-4\); \}\n'
        r'    \.content__prose p \{ margin-bottom: var\(--space-4\); color: var\(--color-text-muted\); \}\n'
        r'    \.content__prose ul \{ margin-bottom: var\(--space-4\); padding-left: var\(--space-6\); list-style: disc; color: var\(--color-text-muted\); \}\n',
        PHASE2_CSS,
        content,
        count=1
    )
    # Remove placeholder-view CSS block
    content = re.sub(
        r'    /\* ========== SECTION: Placeholder view ========== \*/\n'
        r'    \.placeholder-view \{[^}]+\}\n'
        r'    \.placeholder-view__icon \{[^}]+\}\n'
        r'    \.placeholder-view__title \{[^}]+\}\n'
        r'    \.placeholder-view__lede \{[^}]+\}\n'
        r'    \.placeholder-view__actions \{[^}]+\}\n',
        '',
        content
    )
    content = content.replace('.placeholder-view { isolation: isolate; }\n', '')
    content = content.replace('.placeholder-view a:focus-visible, .placeholder-view button:focus-visible { outline-offset: 2px; }\n', '')
    content = re.sub(r'      \.placeholder-view \{ padding-block: var\(--space-24\); \}\n', '', content)
    content = re.sub(
        r'      \.placeholder-view__actions \{ flex-direction: column; width: 100%; \}\n'
        r'      \.placeholder-view__actions \.btn \{ width: 100%; \}\n',
        '',
        content
    )
    return content


def patch_html_views(content: str, inner_views: str) -> str:
    placeholder_start = content.index('    <!-- PLACEHOLDER VIEW (Phase 2) -->')
    main_end = content.index('  </main>', placeholder_start)
    return content[:placeholder_start] + inner_views + '\n\n  ' + content[main_end:]


def patch_js(content: str) -> str:
    marker_start = '      /* Phase 2 route titles — expand router in Phase 2 */'
    marker_end = '      function initFooterYear() {'
    si = content.find(marker_start)
    ei = content.find(marker_end)
    if si == -1 or ei == -1:
        raise ValueError('JS markers not found for Phase 2 patch')
    content = content[:si] + PHASE2_JS.lstrip('\n') + '\n\n' + content[ei:]

    # Fix initFooterYear missing brace and expand init()
    content = content.replace(
        """      function initFooterYear() {
        var el = $('[data-year]');
        if (el) el.textContent = String(new Date().getFullYear());
        var newsletter = $('.footer__newsletter');
        if (newsletter) {
          newsletter.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = $('#footer-email');
            if (!input || !input.value) return;
            saveLead('newsletter', { email: input.value });
            input.value = '';
          });
        }

      function init() {
        applyInitialTheme();
        initThemeToggle();
        initHeaderScroll();
        initNav();
        initDrawer();
        initMega();
        initAnnounce();
        initScrollReveal();
        initCounters();
        initCalcPreview();
        initHeroQuote();
        initFab();
        initBottomNav();
        initStickyCta();
        initRouter();
        initFooterYear();
      }""",
        """      function initFooterYear() {
        var el = $('[data-year]');
        if (el) el.textContent = String(new Date().getFullYear());
        var newsletter = $('.footer__newsletter');
        if (newsletter) {
          newsletter.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = $('#footer-email');
            if (!input || !input.value) return;
            saveLead('newsletter', { email: input.value });
            input.value = '';
          });
        }
      }

      function init() {
        applyInitialTheme();
        initThemeToggle();
        initHeaderScroll();
        initNav();
        initDrawer();
        initMega();
        initAnnounce();
        initScrollReveal();
        initCounters();
        initCalcPreview();
        initHeroQuote();
        initQuoteForm();
        initContactForm();
        initInspectionForm();
        initRebatesChecker();
        initCalculatorPage();
        initLeadGenActions();
        initFab();
        initBottomNav();
        initStickyCta();
        initRouter();
        initFooterYear();
        runCalculator();
      }"""
    )

    # Add toast region before script if missing
    if 'data-toast-region' not in content:
        content = content.replace(
            '  <script>\n        (function () {',
            '  <div class="toast-region" data-toast-region aria-live="polite"></div>\n\n  <script>\n        (function () {'
        )

    # Extend initNav for calc-run and rebate-check (remove duplicate from initLeadGenActions overlap - keep in initLeadGenActions)
    content = content.replace(
        "          if (e.target.closest('[data-action=\"calc-preview\"]')) runCalcPreview();\n        });",
        "          if (e.target.closest('[data-action=\"calc-preview\"]')) runCalcPreview();\n          if (e.target.closest('[data-action=\"calc-run\"]')) runCalculator();\n          if (e.target.closest('[data-action=\"rebate-check\"]')) runRebateCheck();\n        });"
    )
    # Remove duplicate handlers from initLeadGenActions if we added to initNav
    content = content.replace(
        """      function initLeadGenActions() {
        document.addEventListener('click', function (e) {
          if (e.target.closest('[data-action="calc-run"]')) runCalculator();
          if (e.target.closest('[data-action="rebate-check"]')) runRebateCheck();
        });
      }
""",
        ""
    )
    content = content.replace("        initLeadGenActions();\n", "")

    return content


def main():
    phase1 = PHASE1.read_text(encoding='utf-8')
    site02 = SITE02.read_text(encoding='utf-8')
    inner = extract_inner_views(site02)
    out = patch_css(phase1)
    out = patch_html_views(out, inner)
    out = patch_js(out)
    OUT.write_text(out, encoding='utf-8')
    lines = out.count('\n') + 1
    print(f'Written {OUT} ({lines} lines)')


if __name__ == '__main__':
    main()
