
        (function () {
      'use strict';

      var $ = function (s, c) { return (c || document).querySelector(s); };
      var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      var STATES = {"NSW":{"name":"New South Wales","zone":3,"psh":4.2},"VIC":{"name":"Victoria","zone":3,"psh":3.8},"QLD":{"name":"Queensland","zone":2,"psh":5.0},"SA":{"name":"South Australia","zone":3,"psh":4.4},"WA":{"name":"Western Australia","zone":3,"psh":4.8},"TAS":{"name":"Tasmania","zone":4,"psh":3.4},"NT":{"name":"Northern Territory","zone":2,"psh":5.6},"ACT":{"name":"Australian Capital Territory","zone":3,"psh":4.3}};
      var ZONE_FACTORS = {1:1.622,2:1.536,3:1.382,4:1.185};
      var DEEMING = 8;
      var STC_PRICE = 38.5;

      var store = {
        get: function (k, d) { try { var v = localStorage.getItem('sunterra_v2_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
        set: function (k, v) { try { localStorage.setItem('sunterra_v2_' + k, JSON.stringify(v)); } catch (e) {} }
      };

      function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }
      function aud(n) { return '\x24' + Math.round(n).toLocaleString('en-AU'); }
      function thousands(n) { return Math.round(n).toLocaleString('en-AU'); }
      function calcSTC(kw, zone) { return Math.floor(kw * DEEMING * ZONE_FACTORS[zone]); }
      function calcGeneration(kw, psh) { return Math.round(kw * psh * 365 * 0.85); }
      function calcSavings(gen, rate, selfPct, fit) {
        var selfUse = gen * (selfPct / 100);
        var exportKwh = gen - selfUse;
        return selfUse * (rate / 100) + exportKwh * (fit / 100);
      }

      function saveLead(type, data) {
        var leads = store.get('leads', []);
        leads.push({ id: Date.now(), type: type, data: data, at: new Date().toISOString() });
        store.set('leads', leads);
      }

      var revealObserver = null;

      function applyInitialTheme() {
        var stored = store.get('theme', null);
        var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      }

      function initThemeToggle() {
        var toggle = $('.theme-toggle');
        if (!toggle) return;
        function sync() {
          var dark = document.documentElement.getAttribute('data-theme') === 'dark';
          toggle.setAttribute('aria-pressed', String(dark));
          toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        }
        toggle.addEventListener('click', function () {
          var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          store.set('theme', next);
          sync();
        });
        sync();
      }

      function initHeaderScroll() {
        var header = $('#header');
        if (!header) return;
        var ticking = false;
        function update() { header.classList.toggle('is-scrolled', window.scrollY > 4); ticking = false; }
        window.addEventListener('scroll', function () {
          if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
      }

      var drawerEl = $('#drawer');
      var drawerTrigger = null;
      var drawerFocusables = [];

      function getFocusables(el) {
        return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', el)
          .filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
      }

      function openDrawer(btn) {
        drawerTrigger = btn;
        drawerEl.classList.add('is-open');
        drawerEl.setAttribute('aria-hidden', 'false');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        drawerFocusables = getFocusables(drawerEl.querySelector('.drawer__panel'));
        var first = drawerFocusables[0];
        if (first) first.focus();
      }

      function closeDrawer() {
        if (!drawerEl) return;
        drawerEl.classList.remove('is-open');
        drawerEl.setAttribute('aria-hidden', 'true');
        $$('[data-action="open-drawer"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        if (drawerTrigger) drawerTrigger.focus();
      }

      function initDrawer() {
        if (!drawerEl) return;
        drawerEl.addEventListener('click', function (e) { if (e.target.closest('a')) closeDrawer(); });
        document.addEventListener('keydown', function (e) {
          if (!drawerEl.classList.contains('is-open')) return;
          if (e.key === 'Escape') { closeDrawer(); return; }
          if (e.key !== 'Tab') return;
          drawerFocusables = getFocusables(drawerEl.querySelector('.drawer__panel'));
          if (!drawerFocusables.length) return;
          var first = drawerFocusables[0];
          var last = drawerFocusables[drawerFocusables.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
      }

      var megaTrigger = null;

      function openMega(btn) {
        megaTrigger = btn || $('[data-action="toggle-mega"]');
        var mega = $('[data-component="mega"]');
        if (mega) mega.classList.add('is-open');
        if (megaTrigger) megaTrigger.setAttribute('aria-expanded', 'true');
        var firstLink = mega && mega.querySelector('.mega__link');
        if (firstLink) firstLink.focus();
      }

      function closeMega() {
        var mega = $('[data-component="mega"]');
        if (mega) mega.classList.remove('is-open');
        var btn = megaTrigger || $('[data-action="toggle-mega"]');
        if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
        megaTrigger = null;
      }

      function initMega() {
        document.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-action="toggle-mega"]');
          if (btn) {
            e.preventDefault();
            var open = $('[data-component="mega"]').classList.contains('is-open');
            if (open) closeMega(); else openMega(btn);
            return;
          }
          if (!e.target.closest('[data-component="mega"]') && !e.target.closest('.navbar__item--mega')) closeMega();
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMega(); });
      }

      function initNav() {
        document.addEventListener('click', function (e) {
          if (e.target.closest('[data-action="open-drawer"]')) {
            e.preventDefault();
            openDrawer(e.target.closest('[data-action="open-drawer"]'));
          }
          if (e.target.closest('[data-action="close-drawer"]')) {
            e.preventDefault();
            closeDrawer();
          }
          if (e.target.closest('[data-action="dismiss-announce"]')) {
            $('#announce').classList.add('is-dismissed');
            store.set('announceDismissed', true);
          }
          if (e.target.closest('[data-action="calc-preview"]')) runCalcPreview();
          if (e.target.closest('[data-action="calc-run"]')) runCalculator();
          if (e.target.closest('[data-action="rebate-check"]')) runRebateCheck();
        });
      }

      function initAnnounce() {
        var bar = $('#announce');
        if (!bar) return;
        if (store.get('announceDismissed', false)) { bar.classList.add('is-dismissed'); return; }
        var msgs = $$('[data-announce-msg]', bar);
        if (msgs.length < 2) return;
        function syncAnnounceAria() {
          msgs.forEach(function (m) {
            var active = m.classList.contains('is-active');
            m.setAttribute('aria-hidden', active ? 'false' : 'true');
          });
        }
        syncAnnounceAria();
        var idx = 0;
        setInterval(function () {
          if (reducedMotion.matches) return;
          msgs[idx].classList.remove('is-active');
          idx = (idx + 1) % msgs.length;
          msgs[idx].classList.add('is-active');
          syncAnnounceAria();
        }, 4500);
      }

      function refreshReveals(scope) {
        var root = scope || document;
        var els = $$('[data-reveal]', root);
        if (!revealObserver) { els.forEach(function (el) { el.classList.add('is-revealed'); }); return; }
        els.forEach(function (el) {
          if (!el.classList.contains('is-revealed') && !el.hasAttribute('data-observed')) {
            el.setAttribute('data-observed', '');
            revealObserver.observe(el);
          }
        });
      }

      function initScrollReveal() {
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
          $$('[data-reveal]').forEach(function (el) { el.classList.add('is-revealed'); });
          return;
        }
        revealObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        refreshReveals(document);
      }

      function initCounters() {
        var els = $$('[data-counter]');
        if (!els.length) return;
        if (reducedMotion.matches) {
          els.forEach(function (el) { el.textContent = thousands(Number(el.getAttribute('data-counter'))); });
          return;
        }
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            var el = entry.target;
            var target = Number(el.getAttribute('data-counter'));
            var start = null;
            var dur = 1400;
            function step(ts) {
              if (!start) start = ts;
              var t = clamp((ts - start) / dur, 0, 1);
              el.textContent = thousands(Math.round(target * (1 - Math.pow(1 - t, 3))));
              if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
        }, { threshold: 0.4 });
        els.forEach(function (el) { io.observe(el); });
      }

      function runCalcPreview() {
        var state = ($('[data-calc-preview] [data-calc-state]') || {}).value || 'NSW';
        var size = Number($('#prev-size').value) || 6.6;
        var rate = Number($('#prev-rate').value) || 32;
        var st = STATES[state];
        if (!st) return;
        var gen = calcGeneration(size, st.psh);
        var save = calcSavings(gen, rate, 65, 5.5);
        var stcs = calcSTC(size, st.zone);
        var stcAud = stcs * STC_PRICE;
        var net = 9500 - stcAud;
        var pay = save > 0 ? (net / save).toFixed(1) : '—';
        var box = $('[data-calc-preview-result]');
        if (!box) return;
        box.hidden = false;
        $('[data-out-gen]').textContent = thousands(gen) + ' kWh';
        $('[data-out-save]').textContent = aud(save) + '/yr';
        $('[data-out-stc]').textContent = aud(stcAud);
        $('[data-out-pay]').textContent = pay + ' years';
        if (!reducedMotion.matches) {
          box.classList.remove('is-visible');
          requestAnimationFrame(function () { box.classList.add('is-visible'); });
        } else {
          box.classList.add('is-visible');
        }
        box.setAttribute('aria-label', 'Estimated annual savings ' + aud(save) + ', STC rebate ' + aud(stcAud) + ', payback ' + pay + ' years');
      }

      function initCalcPreview() {
        var form = $('[data-calc-preview]');
        if (!form) return;
        form.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && e.target.closest('[data-calc-preview]')) {
            e.preventDefault();
            runCalcPreview();
          }
        });
      }

      function validateHeroForm(form) {
        var ok = true;
        var name = $('#hero-name');
        var phone = $('#hero-phone');
        var postcode = $('#hero-postcode');
        var bill = $('#hero-bill');
        function showErr(input, errEl, show) {
          if (!input || !errEl) return;
          input.setAttribute('aria-invalid', show ? 'true' : 'false');
          errEl.hidden = !show;
          if (show) ok = false;
        }
        showErr(name, $('#hero-name-error'), !name.value.trim());
        showErr(phone, $('#hero-phone-error'), phone.value.replace(/\D/g, '').length < 8);
        showErr(postcode, $('#hero-postcode-error'), !/^[0-9]{4}$/.test(postcode.value));
        showErr(bill, $('#hero-bill-error'), bill && !bill.value);
        return ok;
      }

      function initHeroQuote() {
        var form = $('[data-hero-quote]');
        if (!form) return;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var status = $('[data-hero-quote-status]');
          if (!validateHeroForm(form)) {
            status.textContent = 'Please fix the highlighted fields.';
            status.className = 'form__status form__status--err';
            var firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
          }
          var btn = form.querySelector('[type="submit"]');
          var data = {};
          $$('input, select', form).forEach(function (el) { if (el.name) data[el.name] = el.value; });
          btn.disabled = true;
          btn.textContent = 'Sending…';
          setTimeout(function () {
            saveLead('hero-quote', data);
            status.textContent = 'Thanks! A Sunterra specialist will call within 24 hours.';
            status.className = 'form__status form__status--ok';
            form.reset();
            btn.disabled = false;
            btn.textContent = 'Request callback';
          }, 800);
        });
      }

      function initBottomNav() {
        var nav = $('[data-component="bottomnav"]');
        if (!nav) return;
        var lastY = window.scrollY;
        var ticking = false;
        var stopTimer = null;
        window.addEventListener('scroll', function () {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(function () {
            var y = window.scrollY;
            if (y > lastY + 8 && y > 120) { nav.classList.add('is-hidden'); nav.setAttribute('inert', ''); }
            else if (y < lastY - 8) { nav.classList.remove('is-hidden'); nav.removeAttribute('inert'); }
            lastY = y;
            ticking = false;
            clearTimeout(stopTimer);
            stopTimer = setTimeout(function () { nav.classList.remove('is-hidden'); nav.removeAttribute('inert'); }, 600);
          });
        }, { passive: true });
      }

      function initStickyCta() {
        var cta = $('[data-component="sticky-cta"]');
        if (!cta) return;
        var lastY = window.scrollY;
        var ticking = false;
        window.addEventListener('scroll', function () {
          if (window.innerWidth >= 1024) return;
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(function () {
            var y = window.scrollY;
            if (y > lastY + 6 && y > 80) { cta.classList.add('is-hidden'); cta.setAttribute('inert', ''); }
            else if (y < lastY - 6) { cta.classList.remove('is-hidden'); cta.removeAttribute('inert'); }
            lastY = y;
            ticking = false;
          });
        }, { passive: true });
      }

      function closeFab(refocus) {
        var main = $('.fab__main');
        var menu = $('#fab-menu');
        if (!main || !menu) return;
        menu.hidden = true;
        main.setAttribute('aria-expanded', 'false');
        main.setAttribute('aria-label', 'Open quick actions menu');
        if (refocus) main.focus();
      }

      function initFab() {
        var main = $('.fab__main');
        var menu = $('#fab-menu');
        if (!main || !menu) return;
        main.addEventListener('click', function () {
          var open = main.getAttribute('aria-expanded') === 'true';
          if (open) { closeFab(false); return; }
          menu.hidden = false;
          main.setAttribute('aria-expanded', 'true');
          main.setAttribute('aria-label', 'Close quick actions menu');
          var first = menu.querySelector('a');
          if (first) first.focus();
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) closeFab(true); });
        menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeFab(false); });
      }

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
        var postcodeEl = $('#r-postcode');
        var propertyEl = $('#r-property');
        if (!postcodeEl || !/^[0-9]{4}$/.test(postcodeEl.value)) {
          postcodeEl.setAttribute('aria-invalid', 'true');
          return;
        }
        postcodeEl.setAttribute('aria-invalid', 'false');
        if (!propertyEl || !propertyEl.value) {
          propertyEl.setAttribute('aria-invalid', 'true');
          return;
        }
        propertyEl.setAttribute('aria-invalid', 'false');
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
        if (propertyEl.value === 'unit') stateMsg += ' Strata and body corporate approval may be required for apartment installs.';
        stateMsg += ' Postcode ' + postcodeEl.value + ' mapped to STC Zone ' + st.zone + '.';
        var box = $('[data-rebate-result]');
        if (!box) return;
        box.hidden = false;
        $('[data-rebate-stc]').textContent = aud(stcAud) + ' (' + stcs + ' STCs)';
        $('[data-rebate-state]').textContent = stateMsg;
        saveLead('rebate-check', { postcode: postcodeEl.value, property: propertyEl.value, state: state, size: size, battery: battery, stcAud: stcAud, stcs: stcs });
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



      function initFooterYear() {
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
        initFab();
        initBottomNav();
        initStickyCta();
        initRouter();
        initFooterYear();
        runCalculator();
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();

  