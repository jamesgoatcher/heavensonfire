/***
***
**
** jpg.js
** 
** a lightweight vanilla js utility library
**
***
***/

console.dir('= jpg_util.js initialized =');

/*======================================
=            PRIMARY OBJECT            =
======================================*/
let JPG      = {}; // JPG!

	JPG.util = {}, // Utility functions; contained here
	JPG.fns  = {}, // App functions; contained in library.js
	JPG.vars = {}, // Transient variables
	JPG.user = {}; // User specific data

	JPG.util.regex = []; // Regex array

	JPG.vars.ua    	  = window.navigator.userAgent; // User agent from window
	JPG.vars.platform = window.navigator.platform; // User platform from window
	JPG.vars.ms; // MS browser boolean

	JPG.user.ua; // User agent
	JPG.user.os; // User OS
	JPG.user.mobile; // Mobile boolean

/*=============================================
=            JPG UTILITY FUNCTIONS            =
=============================================*/

// DOM element selector
JPG.util.EL = (el) => {
	switch (el.slice(0, 1)) {
		case '#':
			JPG.vars.$el = document.getElementById(el.slice(1, el.length));
		break;

		case '.':
			JPG.vars.$el = document.getElementsByClassName(el.slice(1, el.length));
		break;

		default:
			JPG.vars.$el = document.getElementsByTagName(el);
		break;
	}

	return JPG.vars.$el;
};

// Add class to element
JPG.util.addClass = (el, className, delay) => {
	setTimeout(function() {
		if (document.body.classList) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}, delay || 0);
};

// Remove class from element
JPG.util.removeClass = (el, className, delay) => {
	setTimeout(function() {
		if (document.body.classList) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(' ' + className, '');
		}
	}, delay || 0);
};

// Forward/backward lookup regex
JPG.util.regex[0] = /(\d)(?=(\d{3})+(?!\d))/g;
JPG.util.regex[1] = /\B(?=(\d{3})+(?!\d))/g;

// Number formatter, US standard 3 digit ',' w/ $USD option
JPG.util.numFormat = (num, currencyBool, currencySymbol) => {
	Number.prototype.format = function () {
		return this.toString().replace(JPG.util.regex[0], "$1,");
	};

	// OPTIONAL: $ formatting
	if (currencyBool === true) {
		return currencySymbol + num.format();
	} else {
		return num.format();
	}
};

// Random number generator, mutable
JPG.util.randomNumber = (limit, limiter) => {
	// limiter = 0 for arrays, 1 for standard, n for custom
	return Math.floor( (Math.random() * limit) + limiter );
};

// Quick Sort algorithm
JPG.util.quickSort = (data) => {
  	// If only 1 piece of data, return that
  	if (data.length < 2) {
    	return data;
  	}
  	// Declare first value as pivot and the left/right temp arrays
  	let pivot = data[0],
    	left  = [],
    	right = [];
  	// Lump sort > / < value to pivot
  	for (let i = 1; i < data.length; i++) {
  		if (data[i] < pivot) {
      		left.push(data[i]);
  		} else {
      		right.push(data[i]);
  		}
 	}

  // Recursively sort left of pivot and right of pivot using spread operator
  	return [ ...JPG.util.quickSort(left), pivot, ...JPG.util.quickSort(right) ];
};

// Detect User Agent
JPG.util.detectUserAgent = () => {
	let msie 	= JPG.vars.ua.indexOf('MSIE '),
    	trident = JPG.vars.ua.indexOf('Trident/');

    // Boolean for MS browser
    (msie > 0 || trident > 0) ? JPG.vars.ms = true : JPG.vars.ms = false;

    // Temporary
    JPG.user.ua = JPG.vars.ua;

	console.dir('USER AGENT: ' + JPG.user.ua);
};

// Detect OS
JPG.util.detectPlatform = () => {
	let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    	windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    	iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    // Check for platform
    if (macosPlatforms.indexOf(JPG.vars.platform) !== -1) {
    	JPG.user.os = 'Mac OS';
  	} else if (iosPlatforms.indexOf(JPG.vars.platform) !== -1) {
   		JPG.user.os = 'iOS';
  	} else if (windowsPlatforms.indexOf(JPG.vars.platform) !== -1) {
    	JPG.user.os = 'Windows';
  	} else if (/Android/.test(JPG.vars.ua)) {
    	JPG.user.os = 'Android';
  	} else if (!JPG.user.os && /Linux/.test(JPG.vars.platform)) {
    	JPG.user.os = 'Linux';
  	}

  	console.dir('OPERATING SYSTEM: ' + JPG.user.os);
};

// Detect Mobile, returns boolean
JPG.util.detectMobileTablet = () => {
	JPG.user.mobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// Page reload
JPG.util.reloadPage = () => {
	window.location.reload();
};

// String truncator
JPG.util.truncateString = (text, textLength) => {
    if (text.length > textLength) {
        return text.substring(0, textLength) + '...';
    } else {
        return text;
    }
};

// Fake page destruction
JPG.util.destroyPage = (bgColor) => {
	let all = document.querySelectorAll('body *:not(script):not(style):not(link)');

	document.querySelector('html').style.background = bgColor;
	document.querySelector('body').style.background = bgColor;
	document.querySelector('body').style.overflow = 'hidden';

	for (let el of all) {
 		let dur = (Math.random() * 3 + 1).toFixed(3),
 			del = Math.round(Math.random() * 3000 + 1);

    	el.style.transition = 'transform ' + dur + 's';
		setTimeout( ()=> { el.style.transform += ' translateY(100vh)'; }, del );
	}
};

// Node, array, or string includes a child or value
JPG.util.has = (input, n, strict, inputPosition) => { 
	/*
	* input: Parent node || array || string
	* n: Child node || value
	* strict: true || false, init false
	* inputPosition: number (starting position), init 0
	*/

	// If value inits null, return and log
	if (input == null || n == null) {
		console.dir('JPG.util.has: input || n is null');
		return;
	}

	// Strict check
	if (!strict && n.nodeType < 1) { // strict === false || undefined
		input = input.toLowerCase();
		n     = n.toLowerCase();
	}

	// Array, String, DOM Element check
	if (Array.isArray(input) == true && typeof input == 'object') {
		console.dir('JPG.util.has: array');

		return input.includes(n); // output: true || false

	} else if (typeof input == 'string' || typeof input == 'number') {
		console.dir('JPG.util.has: string');

		return input.includes(n, inputPosition); // output: true || false
		
	} else if (n.nodeType > 0) {
		console.dir('JPG.util.has: DOM element');

		return input.contains(n); // output: true || false

	} else {
		throw 'JPG.util.has: else';
		return;
	}
};

// Returns array with all elements
JPG.util.siblings = (element, filterEl, script) => {
	/*
	* element: node to search for siblings
	* filterEl: only return elements that match this
	* script: init false, if true will omit script tags as children
	*/
	let siblings = [];

	// Filter function
	function filterWillOnlyReturnThis(element, filteredEl) {
		return element.nodeName.toLowerCase() == filteredEl;
	};

	// Sets up the algorithm sequentially
    element = element.parentNode.firstChild;

    // Do and when while becomes false quit
    do { 
    	if ( !filterEl || filterWillOnlyReturnThis(element, filterEl) ) { // filterEl == undefined || filtering for element
    		if (!script) { // script == undefined || null || false
    			if (element.nodeType === 1) {
	    			siblings.push(element);
	    		}
    		} else { // script == true
    			if (element.nodeType === 1 && element.nodeName != 'SCRIPT') {
	    			siblings.push(element);
	    		}
    		}
    	}
    } while (element = element.nextSibling);

    return siblings;
};

// AJAX utility
JPG.util.ajax = (element, requestType, filePath, formDataElement, outputElement) => {
	let oData; // In case of form data
	let xhr = new XMLHttpRequest();

	if (!formDataElement) { // GET
		xhr.onreadystatechange = function () { 
	    	if (this.readyState == 4 && this.status == 200) {
	     		JPG.util.EL(element).innerHTML = this.responseText;
	   		}
		};

		xhr.open(requestType, filePath, true);
		// xhr.setRequestHeader('Content-type', 'text/html'); // OPTIONAL: If type is atypical.  Content-type is for files.
		xhr.send();
	} else { // POST, Form
		oData = new FormData(JPG.util.EL(element));

		xhr.onload = function () { 
	    	if (this.status == 200) {
	     		JPG.util.EL(outputElement).innerHTML = this.responseText;
	   		}
		};

		xhr.open(requestType, filePath, true);
		xhr.send(oData);
	}
};

console.dir('= jpg_util.js successfully executed =');