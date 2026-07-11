
(() => {

    const wdtTimelineWidgetHandler = function(scope) {
        
        const element = scope instanceof Element ? scope : scope.get(0);

        let wdtTimeline_Items = element.querySelectorAll('.timeline-content-item');

        // for( let i = 0; i < wdtTimeline_Items.length; i++ ) {
        //     let wdtItem = wdtTimeline_Items[i];
        //     let wdtItem_Obj = wdtItem.querySelectorAll('.timeline-title-item');

        //     gsap.utils.toArray('.timeline-title-item').forEach(wdtItem__fit => {
		// 		gsap.set(wdtItem__fit, { height: 'fit-content' });
		// 	});

        //     ScrollTrigger.create({ trigger: wdtItem, start: "top 50%", end: "top top", pin: wdtItem_Obj, pinSpacing: false, markers: true });
            
        // }

        // const wdtSticky__El = element.querySelectorAll('.timeline-title-item');

        // wdtSticky__El.forEach(wdtItem => {

        //     let wdt__Timeline = gsap.timeline({
        //         scrollTrigger: { trigger: wdtItem, start: 'bottom 70%', end: 'bottom 60%', markers: true, toggleActions: 'play none reverse none' }
        //     });

        //     wdt__Timeline.to(wdtItem, {opacity: 0, yPercent: -10 })
        // });

    };

    window.addEventListener('elementor/frontend/init', function() {
        if (typeof elementorFrontend !== 'undefined') {
            elementorFrontend.hooks.addAction('frontend/element_ready/wdt-timeline.default', wdtTimelineWidgetHandler);
        } 
    });


})();

