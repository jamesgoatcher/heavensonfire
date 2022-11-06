console.dir('= detect-ie.js initialized =');

// NOTE: - Conditional commenting in index needed for this function
// 		 - Traditional JS used for legacy browsing

// IE Detection :: Executes on conditional comment
var detectBrowser = function () {
	JPG.util.detectUserAgent();
	JPG.util.detectPlatform();
	JPG.util.detectMobileTablet();

	if (ie_lte9 == false) {
		console.dir('= compatabile browser detected =');
	} else {
		var iePage = document.createElement('div');
		var body   = document.querySelector('body');

		body.style.overflow = 'hidden';
		body.style.backgroundColor = '#000'; // VARIABLE

		iePage.style.position  = 'absolute';
		iePage.style.backgroundColor = '#000'; // VARIABLE
		iePage.style.width     = '100%';
		iePage.style.height    = '100%';
		iePage.style.top       = '0';
		iePage.style.left      = '0';
		iePage.style.color     = '#fff'; // VARIABLE
		iePage.style.zIndex    = '5000000000000000';
		iePage.style.fontSize  = '2em';
		iePage.style.textAlign = 'center';
		iePage.innerHTML =  '<p>This page doesn\'t support Internet Explorer browsers.  Consider downloading a different browser here and trying again:</p>' +
							'<a href="https://www.google.com/chrome/" target="_blank" style="color: #808080;">Google Chrome</a><br>' + 
							'<a href="https://www.mozilla.org/en-US/firefox/products/" target="_blank" style="color: #808080;">Mozilla Firefox</a>';

		document.body.appendChild(iePage);

		console.dir('= ' + JPG.vars.ms + ' = false =');
		throw 'Invalid browser.';
	}

	console.dir('= detect-ie.js successful =')
};

detectBrowser();