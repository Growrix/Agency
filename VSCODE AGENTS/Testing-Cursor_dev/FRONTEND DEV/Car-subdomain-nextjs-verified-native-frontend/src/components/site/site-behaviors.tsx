"use client";

import { useEffect } from "react";

const MOBILE_BREAKPOINT = 992;

const parseNumber = (value: string | null | undefined) => {
  if (!value) {
    return 0;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export function SiteBehaviors() {
  useEffect(() => {
    const body = document.body;
    const header = document.querySelector("header");
    const menuButton = document.getElementById("menu-btn");
    const mainMenu = document.getElementById("mainmenu");
    const backToTop = document.getElementById("back-to-top") as HTMLAnchorElement | null;
    const extraWrap = document.getElementById("extra-wrap");
    const extraOpenButton = document.getElementById("btn-extra");
    const extraCloseButton = document.getElementById("btn-close");
    const loader = document.getElementById("de-loader");

    const hideLoader = () => {
      if (!loader) {
        return;
      }
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      window.setTimeout(() => {
        loader.style.display = "none";
      }, 250);
    };

    const setMenuOpen = (open: boolean) => {
      if (!mainMenu) {
        return;
      }

      body.classList.toggle("menu-open", open);
      menuButton?.classList.toggle("menu-open", open);

      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        mainMenu.style.display = open ? "block" : "none";
      } else {
        mainMenu.style.display = "";
      }
    };

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => {
      const currentlyOpen = body.classList.contains("menu-open");
      setMenuOpen(!currentlyOpen);
    };

    const submenuBindings: Array<{ link: HTMLAnchorElement; handler: (event: Event) => void }> = [];

    const setupMobileSubmenus = () => {
      if (!mainMenu) {
        return;
      }

      const items = Array.from(mainMenu.querySelectorAll(":scope > li"));
      items.forEach((item) => {
        const link = item.querySelector(":scope > a") as HTMLAnchorElement | null;
        const submenu = item.querySelector(":scope > ul") as HTMLElement | null;

        if (!link || !submenu) {
          return;
        }

        item.classList.add("has-submenu");

        const onItemClick = (event: Event) => {
          if (window.innerWidth > MOBILE_BREAKPOINT) {
            return;
          }

          event.preventDefault();
          item.classList.toggle("submenu-open");
        };

        link.addEventListener("click", onItemClick);
        submenuBindings.push({
          link,
          handler: onItemClick,
        });
      });
    };

    const onScroll = () => {
      const shouldShowBackTop = window.scrollY > 250;
      backToTop?.classList.toggle("show", shouldShowBackTop);
      header?.classList.toggle("scrolled", window.scrollY > 30);
    };

    const onBackToTopClick = (event: Event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const setExtraOpen = (open: boolean) => {
      if (!extraWrap) {
        return;
      }
      extraWrap.classList.toggle("open", open);
      body.classList.toggle("extra-open", open);
    };

    const openExtraPanel = () => setExtraOpen(true);
    const closeExtraPanel = () => setExtraOpen(false);

    const syncHeaderMode = () => {
      header?.classList.toggle("header-mobile", window.innerWidth <= MOBILE_BREAKPOINT);
    };

    const onResize = () => {
      syncHeaderMode();
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeMenu();
      }
    };

    const applyBackgroundImages = () => {
      document.querySelectorAll<HTMLElement>("[data-bgimage]").forEach((element) => {
        const bgImage = element.getAttribute("data-bgimage");
        if (!bgImage) {
          return;
        }

        // Match legacy theme behavior: apply the full background shorthand value.
        element.style.background = bgImage;
        element.style.backgroundSize = "cover";
        element.style.backgroundRepeat = "no-repeat";
      });
    };

    const animateCounters = () => {
      const counterNodes = Array.from(document.querySelectorAll<HTMLElement>(".timer[data-to]"));
      if (counterNodes.length === 0) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const node = entry.target as HTMLElement;
            const target = parseNumber(node.getAttribute("data-to"));
            const speed = Math.max(parseNumber(node.getAttribute("data-speed")), 1);
            const started = node.dataset.countStarted === "true";

            if (started || target <= 0) {
              observer.unobserve(node);
              return;
            }

            node.dataset.countStarted = "true";
            const startTime = performance.now();

            const step = (now: number) => {
              const progress = Math.min((now - startTime) / speed, 1);
              const currentValue = Math.floor(target * progress);
              node.textContent = String(currentValue);

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                node.textContent = String(target);
              }
            };

            requestAnimationFrame(step);
            observer.unobserve(node);
          });
        },
        { threshold: 0.4 },
      );

      counterNodes.forEach((node) => observer.observe(node));
    };

    hideLoader();
    applyBackgroundImages();
    setupMobileSubmenus();
    animateCounters();
    syncHeaderMode();
    onScroll();

    menuButton?.addEventListener("click", toggleMenu);
    backToTop?.addEventListener("click", onBackToTopClick);
    extraOpenButton?.addEventListener("click", openExtraPanel);
    extraCloseButton?.addEventListener("click", closeExtraPanel);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      menuButton?.removeEventListener("click", toggleMenu);
      backToTop?.removeEventListener("click", onBackToTopClick);
      extraOpenButton?.removeEventListener("click", openExtraPanel);
      extraCloseButton?.removeEventListener("click", closeExtraPanel);
      submenuBindings.forEach(({ link, handler }) => {
        link.removeEventListener("click", handler);
      });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}