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

      /* Phase 2 route titles — expand router in Phase 2 */
      var VIEW_TITLES = {
        home: "Sunterra Solar — Power your home with Australia's solar experts",
        placeholder: 'Coming Soon — Sunterra Solar',
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
        cookies: 'Cookies — Sunterra Solar'
      };

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
        return $('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', el)
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
        drawerEl.classList.remove('is-open');
        drawerEl.setAttribute('aria-hidden', 'true');
        $('[data-action="open-drawer"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
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

      function openMega() {
        var mega = $('[data-component="mega"]');
        if (mega) mega.classList.add('is-open');
        var btn = $('[data-action="toggle-mega"]');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }

      function closeMega() {
        var mega = $('[data-component="mega"]');
        if (mega) mega.classList.remove('is-open');
        var btn = $('[data-action="toggle-mega"]');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }

      function initMega() {
        document.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-action="toggle-mega"]');
          if (btn) {
            e.preventDefault();
            var open = $('[data-component="mega"]').classList.contains('is-open');
            if (open) closeMega(); else openMega();
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
        });
      }

      function initAnnounce() {
        var bar = $('#announce');
        if (!bar) return;
        if (store.get('announceDismissed', false)) { bar.classList.add('is-dismissed'); return; }
        var msgs = $('[data-announce-msg]', bar);
        if (msgs.length < 2) return;
        var idx = 0;
        setInterval(function () {
          if (reducedMotion.matches) return;
          msgs[idx].classList.remove('is-active');
          idx = (idx + 1) % msgs.length;
          msgs[idx].classList.add('is-active');
        }, 4500);
      }

      function refreshReveals(scope) {
        var root = scope || document;
        var els = $('[data-reveal]', root);
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
          $('[data-reveal]').forEach(function (el) { el.classList.add('is-revealed'); });
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
        var els = $('[data-counter]');
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
        if (bill && !bill.value) { bill.setAttribute('aria-invalid', 'true'); ok = false; }
        else if (bill) bill.setAttribute('aria-invalid', 'false');
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
          $('input, select', form).forEach(function (el) { if (el.name) data[el.name] = el.value; });
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
            if (y > lastY + 8 && y > 120) nav.classList.add('is-hidden');
            else if (y < lastY - 8) nav.classList.remove('is-hidden');
            lastY = y;
            ticking = false;
            clearTimeout(stopTimer);
            stopTimer = setTimeout(function () { nav.classList.remove('is-hidden'); }, 600);
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
            if (y > lastY + 6 && y > 80) cta.classList.add('is-hidden');
            else if (y < lastY - 6) cta.classList.remove('is-hidden');
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

      function parseHash() {
        var raw = location.hash.replace(/^#\/?/, '');
        return raw.split('/').filter(Boolean);
      }

      function updateNavCurrent(view) {
        var navKey = view;
        if (view === 'placeholder') navKey = null;
        var serviceViews = ['residential','commercial','batteries','ev-chargers','off-grid','maintenance'];
        $$('[data-nav]').forEach(function (a) {
          var key = a.getAttribute('data-nav');
          var match = key === navKey || (key === 'services' && serviceViews.indexOf(parseHash()[0]) !== -1);
          if (match) a.setAttribute('aria-current', 'page');
          else a.removeAttribute('aria-current');
        });
      }

      function initRouter() {
        function handleRoute() {
          var parts = parseHash();
          var isHome = !parts.length;
          var homeView = $('[data-route="home"]');
          var placeholder = $('[data-route="placeholder"]');
          if (homeView) homeView.hidden = !isHome;
          if (placeholder) placeholder.hidden = isHome;
          document.title = isHome ? VIEW_TITLES.home : (VIEW_TITLES[parts[0]] || VIEW_TITLES.placeholder);
          updateNavCurrent(isHome ? 'home' : 'placeholder');
          window.scrollTo(0, 0);
          if (!isHome) {
            var h1 = placeholder && placeholder.querySelector('h1');
            if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
          }
          refreshReveals(isHome ? homeView : placeholder);
          closeMega();
          closeDrawer();
        }
        window.addEventListener('hashchange', handleRoute);
        handleRoute();
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
        initFab();
        initBottomNav();
        initStickyCta();
        initRouter();
        initFooterYear();
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();

  