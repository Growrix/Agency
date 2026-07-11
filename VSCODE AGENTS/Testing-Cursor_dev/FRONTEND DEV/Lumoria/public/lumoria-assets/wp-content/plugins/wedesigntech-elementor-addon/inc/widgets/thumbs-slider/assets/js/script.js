 (function ($) {

    const wdtThumbSliderWidgetHandler = function($scope, $) {
        

      const $thumb_slider_option = $scope.find('.wdt-thumb-carousel-holder');
      const $thumb_content_option = $thumb_slider_option.data('settings');
      const $swiperItem = $thumb_slider_option.find('.swiper');
      const $moduleId = $swiperItem.data('wrapper-class');
      const $modulethumbId = $swiperItem.data('id');
      const $swiperThumbItem = $thumb_slider_option.find('.wdt-thumbnail-carousel');
      const $moduleThumbId = $swiperThumbItem.data('wrapper-thumb-class');
    

        const $slides_to_show	 	= ($thumb_content_option['slides_to_show_opts'] !== undefined) ? parseInt($thumb_content_option['slides_to_show_opts']) : 1;
        const $loop				  	  = ($thumb_content_option['loop'] !== undefined) ? ($thumb_content_option['loop'] == 'yes') : false;
        const $freemode				  = ($thumb_content_option['freemode'] !== undefined) ? ($thumb_content_option['freemode'] == 'yes') : false;
        const $slides_to_scroll = ($thumb_content_option['slides_to_scroll'] !== undefined) ? parseInt($thumb_content_option['slides_to_scroll']) : 1;
        const $arrows			  	  = ($thumb_content_option['arrows'] !== undefined) ? ($thumb_content_option['arrows'] == 'yes') : false;
        // const $space_between	 	= ($thumb_content_option['space_between'] !== undefined) ? parseInt($thumb_content_option['space_between']) : 10;
        const $space_between_gaps = $thumb_content_option['space_between_gaps'];
        var $deviceMode = elementorFrontend.getCurrentDeviceMode();
        
        const $space_between = $space_between_gaps[$deviceMode] ? $space_between_gaps[$deviceMode] : 0;
        
        if($thumb_content_option === undefined) {
          return;
        }
        var swiper = {
          // initialSlide: 0,
          simulateTouch: true,
          // roundLengths: true,
          keyboardControl: true,
          clickable: true,
          // autoHeight: false,
          grabCursor: true,

          loop: $loop,
          spaceBetween: $space_between,
          slidesPerView: $slides_to_show,
          slidesPerGroup: $slides_to_scroll,
          freeMode: $freemode,
          watchSlidesProgress: true,
        }

        // Update breakpoints
        const $thumbresponsiveSettings = $thumb_content_option['responsive'];
        const $thumbresponsiveData = {};
        $.each($thumbresponsiveSettings, function (index, value) {
          $thumbresponsiveData[value.breakpoint] = {
            slidesPerView: value.toshow,
            slidesPerGroup: value.toscroll
          };
        });
        swiper['breakpoints'] = $thumbresponsiveData;

        const swiperGallery = new Swiper('.'+$moduleThumbId, swiper);

        var swiper2 = {
          simulateTouch: true,
          clickable: true,
          loop: $loop,
          effect: "fade",
          spaceBetween: 0,
          navigation: {
            prevEl: '.wdt-arrow-thumb-pagination-prev-' + $modulethumbId,
            nextEl: '.wdt-arrow-thumb-pagination-next-' + $modulethumbId
          },
          thumbs: {
            swiper: swiperGallery,
          },
          pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
          }
        }
        const swiperThumbGallery = new Swiper('.'+$moduleId, swiper2);

    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-thumbs-slider.default', wdtThumbSliderWidgetHandler);
    });

  })(jQuery);