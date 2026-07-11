(function ($) {
    const wdtTeamWidgetHandler = function ($scope, $) {
        const $teamHolderClick = $scope.find('.wdt-team-holder.wdt-rc-template-default.wdt-rc-template-click');
        const $teamHolderHover = $scope.find('.wdt-team-holder.wdt-rc-template-default.wdt-rc-template-hover');
        const toggleIconSVG = `
            <div class="wdt-team-icon-toggle"><span class="wdt-team-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<path d="M76,63.9c-5.2,0-9.7,2.3-12.8,5.9L39.2,57.5c1.1-2.3,1.7-4.8,1.7-7.5s-0.7-5.2-1.7-7.5l23.9-12.4c3.1,3.7,7.7,5.9,12.8,5.9  c9.3,0,17-7.6,17-17c0-9.3-7.6-17-17-17s-17,8-17,17.3c0,2.3,0.4,4.2,1.1,6.2L35.7,38c-3.1-3.1-7.3-4.9-12-4.9  c-9.2,0-16.9,7.7-16.9,17s7.6,17,17,17c4.6,0,8.9-1.8,12-4.9l24.4,12.5c-0.7,2-1.1,3.9-1.1,6.2c0,9.3,7.6,17,17,17s17-7.6,17-17  S85.3,63.9,76,63.9z M76,8c6.2,0,11.4,5.1,11.4,11.4c0,6.2-5.1,11.4-11.4,11.4s-11.4-5.2-11.4-11.5C64.6,13.1,69.6,8,76,8z   M23.9,61.5c-6.2,0-11.4-5.1-11.4-11.4c0-6.2,5.1-11.4,11.4-11.4c6.2,0,11.4,5.1,11.4,11.4C35.3,56.3,30.1,61.5,23.9,61.5z M76,92.3  c-6.2,0-11.4-5.1-11.4-11.4S69.6,69.4,76,69.4s11.4,5.1,11.4,11.4S82.2,92.3,76,92.3z"/>
</svg>
            </span></div>
        `;

        if ($teamHolderClick.length) {
            $teamHolderClick.find('.wdt-social-icons-container').each(function () {
                const $container = $(this);
                if (!$container.find('.wdt-team-toggle').length) {
                    $container.append(toggleIconSVG);
                }
                $container.find('.wdt-team-toggle').on('click', function () {
                    $container.find('.wdt-social-icons-list').toggleClass('active');
                });
            });
        } else if ($teamHolderHover.length) {
            $teamHolderHover.find('.wdt-social-icons-container').each(function () {
                const $container = $(this);
                if (!$container.find('.wdt-team-toggle').length) {
                    $container.append(toggleIconSVG);
                }
                // Hover effects
                $container.on('mouseenter', function () {
                    $container.find('.wdt-social-icons-list').addClass('active');
                }).on('mouseleave', function () {
                    $container.find('.wdt-social-icons-list').removeClass('active');
                });
            });
        } else {
            console.warn('WDT Team Holder not found in the scope.');
        }
    };

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-team.default', wdtTeamWidgetHandler);
    });

})(jQuery);
