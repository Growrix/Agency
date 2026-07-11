(function ($) {
  
    const wdtInteractiveShowcaseWidgetHandler = function($scope, $) {

        const $showcaseItem = $scope.find('.wdt-showcase-container');
        const $hover_and_click = $showcaseItem.data('click');

        var hover_content_section = $showcaseItem.find('ul.wdt-showcase-list > li');
        var image_content_section = $showcaseItem.find('.wdt-showcase-content-wrapper > div');
        
        $showcaseItem.find('ul li:first-child').addClass('wdt-active');
        $showcaseItem.find('.wdt-showcase-content-wrapper > div:first-child').addClass('wdt-active');

        if( $hover_and_click ) {
            // Content on click
            hover_content_section.click( function() {

                var content_id_name = $(this).attr('id');
                if( ! ($(this).hasClass('wdt-active')) ) {
                    $showcaseItem.find('ul > li').removeClass('wdt-active');
                    $showcaseItem.find('.wdt-showcase-content-wrapper > div').removeClass('wdt-active');
                    $(this).addClass('wdt-active');
    
                    image_content_section.each(function() {
                        var $this       = $(this);
                        var image_id_name    = $this.attr('id');                
                        if( image_content_section.is('#' + content_id_name) ) {
                            if( image_id_name == content_id_name ) {
                                $this.addClass('wdt-active');
                            } else {
                                $this.removeClass('wdt-active');
                            }
                        }
                    });
                }
            });
        } else {
            // Content on hover
            hover_content_section.mouseover( function() {

                var content_id_name = $(this).attr('id');
                if( ! ($(this).hasClass('wdt-active')) ) {
                    $showcaseItem.find('ul > li').removeClass('wdt-active');
                    $showcaseItem.find('.wdt-showcase-content-wrapper > div').removeClass('wdt-active');
                    $(this).addClass('wdt-active');
    
                    image_content_section.each(function() {
                        var $this       = $(this);
                        var image_id_name    = $this.attr('id');                
                        if( image_content_section.is('#' + content_id_name) ) {
                            if( image_id_name == content_id_name ) {
                                $this.addClass('wdt-active');
                            } else {
                                $this.removeClass('wdt-active');
                            }
                        }
                    });
                }
            });
        }
  
    };
  
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-interactive-showcase.default', wdtInteractiveShowcaseWidgetHandler);
    });
  
  })(jQuery);