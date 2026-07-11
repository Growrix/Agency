(function () {
  function initSwiper() {
    if (typeof Swiper === "undefined" || !document.querySelector(".swiper")) {
      return false;
    }

    new Swiper(".swiper", {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      spaceBetween: 30,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: false,
        clickable: false,
      },
    });

    return true;
  }

  let attempts = 0;
  const maxAttempts = 40;

  function attemptInit() {
    if (initSwiper() || attempts >= maxAttempts) {
      return;
    }

    attempts += 1;
    setTimeout(attemptInit, 100);
  }

  attemptInit();
})();