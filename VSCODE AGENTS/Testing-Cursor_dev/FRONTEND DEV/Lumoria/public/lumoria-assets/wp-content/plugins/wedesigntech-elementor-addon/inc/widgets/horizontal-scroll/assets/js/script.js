(function ($) {

    const wdthorizontalscrollWidgetHandler = function ($scope, $) {


        const $scrolloption = $scope.find('.wdt-horizontal-scroll-holder');
        const $moduleId = $scrolloption.data('id');
        if (jQuery('.wdt-horizontal-scroll-holder').hasClass("wdt-horizontal-scroll-holder")) {
            gsap.registerPlugin(ScrollTrigger);
            let horisections = gsap.utils.toArray(".wdt-panel-" + $moduleId);

            gsap.to(horisections, {
                xPercent: -100 * (horisections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontalscrollcontainer-" + $moduleId,
                    pin: true,
                    scrub: 1.5,
                    // snap: 1 / (horisections.length - 1),
                    start: "top top",
                    end: () => "+=" + document.querySelector(".horizontalscrollcontainer-" + $moduleId).offsetWidth
                }
            });
        }
    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-horizontal-scroll.default', wdthorizontalscrollWidgetHandler);
    });

})(jQuery);