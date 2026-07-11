(function ($) {
  const wdtHotspotWidgetHandler = function ($scope, $) {
    const $this_holder = $scope.find('.wdt-hotspot-holder');
    const $settings = $this_holder.data('settings');
    const $hotspot_items = $this_holder.find('.wdt-hotspot-repeater-item');
    const $deviceMode = elementorFrontend.getCurrentDeviceMode();
    $hotspot_items.each(function () {
      const $this_hotspot = $(this);
      const hotspotEl = this;

      let $tooltipPlacement = $this_hotspot.data('tooltip-position');
      if ($tooltipPlacement === 'global' || !$tooltipPlacement) {
        $tooltipPlacement = $settings['tooltipPlacement'];
      }

      let $tooltipContent = $this_hotspot.data('tooltip-content') || '';
      let $tooltipImage = $this_hotspot.data('tooltip-image') || '';
      let finalContent = $tooltipImage ? $tooltipImage + $tooltipContent : $tooltipContent;

      if (hotspotEl._tippy) {
        hotspotEl._tippy.destroy();
      }

      const $tooltipTrigger =
        $settings.tooltipResponsive?.tooltip_trigger?.[$deviceMode] ||
        ($deviceMode === 'desktop' ? 'mouseenter focus' : 'click');

      const $options = {
        content: finalContent,
        placement: $tooltipPlacement,
        trigger: $tooltipTrigger,
        arrow: $settings['tooltipArrow'],
        appendTo: document.body,
        allowHTML: true,
        theme: 'wdt-hotspot',
        interactive: true,
        hideOnClick: $tooltipTrigger !== 'manual',
        popperOptions: {
          strategy: 'absolute',
          modifiers: [
            { name: 'preventOverflow', options: { boundary: 'viewport' } },
            { name: 'flip', options: { fallbackPlacements: ['top', 'right', 'bottom', 'left'] } },
          ],
        },
        onShow() {
          $this_hotspot.addClass('wdt-hotspot-item-active');
        },
        onHidden() {
          $this_hotspot.removeClass('wdt-hotspot-item-active');
        },
      };

      if ($tooltipTrigger !== 'manual') {
        $options.animation = $settings['tooltipAnimation'];
        $options.delay = $settings['tooltipDelay'];
      }

      tippy(hotspotEl, $options);

      if ($tooltipTrigger === 'manual' && hotspotEl._tippy) {
        hotspotEl._tippy.show();
      }
    });
    const updateTooltips = () => {
      $hotspot_items.each(function () {
        if (this._tippy && this._tippy.popperInstance) {
          this._tippy.popperInstance.update();
        }
      });
    };

    $this_holder.on('scroll', updateTooltips);
    $(window).on('resize', updateTooltips);
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(updateTooltips);
      ro.observe($this_holder[0]);
    }

    if (window.MutationObserver) {
      const mo = new MutationObserver(updateTooltips);
      mo.observe($this_holder[0], { childList: true, subtree: true });
    }
  };

  $(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction(
      'frontend/element_ready/wdt-hotspot.default',
      wdtHotspotWidgetHandler
    );
  });
})(jQuery);
