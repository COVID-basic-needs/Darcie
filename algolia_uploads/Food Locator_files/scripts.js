/**
 * Food Locator Application - Misc Scripts.
 *
 * @author Joshua R. Thomas
 * @version 2.0
 */

(function () {
	'use strict';
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style')
		msViewportStyle.appendChild(
			document.createTextNode('@-ms-viewport{width:auto!important}')
		)
		document.querySelector('head').appendChild(msViewportStyle)
	}
})();
$(document).ready(function () {
	$(window).scroll(function () {
		$(this).scrollTop() > 200 ? $('.scrollup').fadeIn() : $('.scrollup').fadeOut() ;
	});
	$('.scrollup').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
});

    
try{
	Typekit.load({ async: true });
}catch(e){
	console.log('Failed to load TypeKit');
}

/**
 * GA 2018-05-24
 */

window['ga-disable-UA-47359503-1'] = window.location.hostname == 'foodlocator.sfmfoodbank.org' ? false : true;
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47359503-1', 'auto', {'allowLinker': true});
ga('require', 'linker');
ga('linker:autoLink', ['sfmfoodbank.org','volunteer.sfmfoodbank.org', 'volunteermarin.sfmfoodbank.org', 'hackhungertogether.org','calfresh.sfmfoodbank.org'] );
ga('send', 'pageview');

