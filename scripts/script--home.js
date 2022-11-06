console.dir('= script--home.js initalized =');

/*
// Write input animation
*/
JPG.fns.INPUT_FORM_ANIM = () => {
	JPG.util.addClass(JPG.util.EL('.wc')[0], 'anim');
};

/*===========================================
=            On Scroll Functions            =
===========================================*/
// Scroll to top
JPG.fns.SCROLL_TO = (destination) => {
	let scrollIncr = -window.scrollY / (200/15); // 200ms is the duration

	if (destination.target.id == 'toTop' || destination.target.id == 'toTop_mobile') { // Scroll to top
		let scrollInterval = setInterval( function() {
	        if (window.scrollY != 0) {
	            window.scrollBy(0, scrollIncr);
	        } else {
	        	clearInterval(scrollInterval);
	        }
	    }, 15);
	} 
};

let photoChanged = false;

JPG.util.CHECK_VISABLE = (elm) => {
	let rect = elm.getBoundingClientRect();
	let viewHeight = Math.max( document.documentElement.clientHeight, window.innerHeight );
  
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

// Scroll down functions
window.onscroll = function () { 
    'use strict';

    /* Computed div heights */
    let whatHeight   = parseInt( window.getComputedStyle( JPG.util.EL('#home--what'), null ).getPropertyValue('height'), 10 ),
    	whoHeight    = parseInt( window.getComputedStyle( JPG.util.EL('#home--who'), null ).getPropertyValue('height'), 10 ),
    	aliceHeight  = parseInt( window.getComputedStyle( JPG.util.EL('#content--alice'), null ).getPropertyValue('height'), 10 );
    
    // Disable for mobile
    if (JPG.user.mobile == false) {
    	/* Locks the window */
	    if ( window.scrollY >= (whatHeight) ) {
	        JPG.util.removeClass( JPG.util.EL('#home--who'), 'addTransZ' );
	        JPG.util.removeClass( JPG.util.EL('#who--aj'), 'toTop' );
	        JPG.util.addClass( JPG.util.EL('#who--aj'), 'toFixed' );
	    } else {
	    	JPG.util.addClass( JPG.util.EL('#home--who'), 'addTransZ' );
	    	JPG.util.addClass( JPG.util.EL('#who--aj'), 'toTop' );
	        JPG.util.removeClass( JPG.util.EL('#who--aj'), 'toFixed' );
	    }

	    	/* Change photos */
	    	if ( window.scrollY >= (whatHeight + aliceHeight) && photoChanged == false ) {
	    		JPG.util.removeClass( JPG.util.EL('#aj--img'), 'opacity' );
	    		JPG.util.removeClass( JPG.util.EL('#aj--img'), 'alice', 100 );
	    		JPG.util.addClass( JPG.util.EL('#aj--img'), 'jimmy', 101 );
	    		JPG.util.addClass( JPG.util.EL('#aj--img'), 'opacity', 152 );

	    		photoChanged = true;
	    	} else if ( window.scrollY < (whatHeight + aliceHeight) && photoChanged == true ) {
	    		JPG.util.removeClass( JPG.util.EL('#aj--img'), 'opacity' );
	    		JPG.util.removeClass( JPG.util.EL('#aj--img'), 'jimmy', 100 );
	    		JPG.util.addClass( JPG.util.EL('#aj--img'), 'alice', 101 );
	    		JPG.util.addClass( JPG.util.EL('#aj--img'), 'opacity', 152 );

	    		photoChanged = false;
	    	}

	    /* Remove the lock */
	    if ( window.scrollY >= (whoHeight) ) {
	    	JPG.util.addClass( JPG.util.EL('#home--who'), 'addTransZ' );
	        JPG.util.removeClass( JPG.util.EL('#who--aj'), 'toFixed' );	
	    }

	    /* Element becomes visible */
	 	if ( JPG.util.CHECK_VISABLE( JPG.util.EL('#home--blog') ) ) {
	        JPG.util.addClass( JPG.util.EL('#home--who'), 'addTransZ' );
	        JPG.util.addClass( JPG.util.EL('#who--aj'), 'toBottom' );
	    } else {
	    	JPG.util.removeClass( JPG.util.EL('#who--aj'), 'toBottom' );
	    }
    }
};

/*========================================
=            Mobile Functions            =
========================================*/
JPG.fns.MOBILE_FNS = () => {
	// Replace Home video if mobile
	if (JPG.user.mobile == true) {

		HEADER = () => {
			let stylesheet = document.createElement('link');

			stylesheet.rel = 'stylesheet';
			stylesheet.href = JPG.vars.BASE_URL + 'styles/css--mobile.css';
			document.head.appendChild(stylesheet);
		},

		WHAT = () => {
			// Hide the video div
			JPG.util.EL('#what--video').style.display = 'none';
			JPG.util.EL('#what--curtain').style.display = 'none';

			//Create the new div and assign content
			let bannerSectionDv = document.createElement('div');
				bannerSectionDv.setAttribute('id', 'what--mobile');

			//Insert new div to the What home before the content section
			JPG.util.EL('#home--what').insertBefore( bannerSectionDv, JPG.util.EL('#what--content') );
		},

		WHO = () => {
			let j_cont = document.createElement('div'),
				j_img  = document.createElement('div'),
				j_img2 = document.createElement('div'),
				j_move = document.getElementById('content--jimmy');

				j_cont.setAttribute('id', 'who--content-m');

				j_img.setAttribute('id', 'who--aj-m');

				j_img2.setAttribute('id', 'aj--img-m')
				j_img2.setAttribute('class', 'jimmy');
				JPG.util.addClass(j_img2, 'opacity');

				JPG.util.EL('#home--who').appendChild(j_cont).appendChild(j_move);
				JPG.util.EL('#home--who').appendChild(j_img).appendChild(j_img2);
		},

		FOOTER = () => {
			// Hide the toTop div
			JPG.util.EL('#toTop').style.display = 'none';

			// Create the new div and assign content
			let bannerSectionDv = document.createElement('div');
				bannerSectionDv.setAttribute('id', 'toTop_mobile');
				bannerSectionDv.innerHTML = 'Scroll to top';
				bannerSectionDv.addEventListener('click', JPG.fns.SCROLL_TO);

			//Insert new div to the Main Div before the Highlights section
			JPG.util.EL('#home--footer').insertBefore( bannerSectionDv, JPG.util.EL('#footer--bottom') );
		};

		setTimeout(function() {		
			HEADER(); // Mobile stylesheet	
			WHAT(); // Replaces video
			WHO(); // Removes scroll functionality
			FOOTER(); // Creates 3 stacked divs
		}, 200);
	} else { // Load video
		JPG.util.EL('#what--video').src = './assets/home/vid/what_web.mp4';
		JPG.util.EL('#what--video').play();
	}
};

// Desktop small browser window curtain
let divExists = false;
JPG.fns.DESKTOP_CURTAIN = () => {
	let cont    = document.querySelector('body'),
		main    = document.querySelector('#container'),
		curtain = document.querySelector('#curtain--bg');

	if (JPG.user.mobile != true && window.innerWidth < 900 && divExists == false) {
		JPG.util.addClass(cont, 'lock');
		JPG.util.addClass(curtain, 'active');
		JPG.util.addClass(main, 'none');

		divExists = true;
	} else if (JPG.user.mobile != true && window.innerWidth >= 900 && divExists == true) {
		JPG.util.removeClass(cont, 'lock');
		JPG.util.removeClass(curtain, 'active');
		JPG.util.removeClass(main, 'none');

		divExists = false;
	} else {
		// no curtain
	}
};

/*
// Utility functions
*/
JPG.fns.eventListeners = () => {	
	// Contact form anim
	JPG.util.EL('.wc')[0].addEventListener('click', JPG.fns.INPUT_FORM_ANIM);

	// Scroll to top
	JPG.util.EL('#toTop').addEventListener('click', JPG.fns.SCROLL_TO);

	// Email submit form
	JPG.util.EL('#contactForm-form').addEventListener('submit', function (e) {
		// POST
	 	JPG.util.ajax("#contactForm-form", "POST", "./com/email_form.php", true, "#contactForm-output");
	 	// Don't allow it to refresh
		e.preventDefault();
		// Clear fields only if successful
		setTimeout(function () {
			if (JPG.util.has(JPG.util.EL('#contactForm-output').textContent, 'Received', false) == true) {
				// JPG.util.EL('#contactForm-email').value = ''; // Just clears the input
				JPG.util.addClass(JPG.util.EL('.wc')[0], 'none');
			}
		}, 700);
		e.preventDefault();
	}, false);

	window.addEventListener('resize', JPG.fns.DESKTOP_CURTAIN);
};

JPG.fns.initFns = () => {
	JPG.fns.DESKTOP_CURTAIN(); // Desktop browser width resize
	JPG.fns.MOBILE_FNS(); // Mobile
	JPG.fns.eventListeners();
};

window.onload = function () {
	JPG.fns.initFns();
};

console.dir('= script--home.js successful =');