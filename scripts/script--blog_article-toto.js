console.dir('= script--blog_article.js initalized =');

JPG.vars.BASE_URL = '../../../'; // Three directories back

// UID object variable
let uid_json,
	uid_val;

// Read URL for path_image as UID
let uid = window.location.pathname.split('/blog/').pop().substr(0,10);

// Find JSON object to load content
JPG.fns.FIND_ARTICLE = (attribute, value) => {
	for (let i = 0; i < blog_articles.length; i++) {
		if (blog_articles[i][attribute] == value + '/') {
			uid_val  = i;
			uid_json = blog_articles[i];
			JPG.fns.NEXT_PREVIOUS_LINKS(uid_val);
		}
	}

	return null;
};

// Load the next and previous links
JPG.fns.NEXT_PREVIOUS_LINKS = (uid_val) => {
	if (uid_val == 0) {
		JPG.util.addClass( JPG.util.EL('#article--previous'), 'none' );
		JPG.util.EL('#article--next').href = '../../' + blog_articles[uid_val + 1].path + blog_articles[uid_val + 1].url;
	} else if (uid_val == (blog_articles.length - 1)) {
		JPG.util.EL('#article--previous').href = '../../' + blog_articles[uid_val - 1].path + blog_articles[uid_val - 1].url;
		JPG.util.addClass( JPG.util.EL('#article--next'), 'none' );
	} else {
		JPG.util.EL('#article--previous').href = '../../' + blog_articles[uid_val - 1].path + blog_articles[uid_val - 1].url;
		JPG.util.EL('#article--next').href     = '../../' + blog_articles[uid_val + 1].path + blog_articles[uid_val + 1].url;
	}
};

// Load IMG src
JPG.fns.LOAD_IMG_SRC = () => {
	let img = document.querySelectorAll('.article--image');

	for (let i = 0; i < uid_json.images; i++) {
		try {
			img[i].src = '../../../assets/blog/' + uid_json.path_images + (i + 1) + '.jpg';
		} catch (e) {
			console.error(e);
		}
	}
};

// Load and separate tags
JPG.fns.CREATE_TAGS = () => {
	for (let i = 0; i < uid_json.tags.length; i++) {
		let div = document.createElement('div');

		// Divide them up
		if (i == (uid_json.tags.length - 1)) {
			div.innerHTML = uid_json.tags[i]; // Write tag value minus the ','
		} else {
			div.innerHTML = `${uid_json.tags[i]}, `; // Write tag value
		}

		div.setAttribute('class', 'tag--div'); // Add tag class
		div.setAttribute('data-tag', uid_json.tags[i]); // Data tag == tag value
		div.addEventListener('click', JPG.fns.VIEW_ALL_ARTICLES_WITH_TAG, false);

		JPG.util.EL('#article--tags').appendChild(div);
	}
};

// Open new page with filtered JSON results
JPG.fns.VIEW_ALL_ARTICLES_WITH_TAG = (tag) => {
	let matchedPosts = []; // Variable to store the matched posts array values
	tag = tag.target.dataset.tag; // Reassign tag to the tag value

	for (let i = 0; i < blog_articles.length; i++) {
		for (let j = 0; j < blog_articles[i].tags.length; j++) {
			if (blog_articles[i].tags[j] !== tag) { 
				continue; // Ignore and continue
			} else {
				matchedPosts.push(i); // Push the matched post to the array
			}
		}
	}

	JPG.fns.CREATE_SORTED_BLOG_PAGE(matchedPosts, tag); // Pass the data to the new page
};

JPG.fns.CREATE_SORTED_BLOG_PAGE = (matchedPosts, tag) => {
	window.open(`${JPG.vars.BASE_URL}blog/?tag=${tag}&posts=${matchedPosts}`, '_self'); // Open search in the same window
};

// Load Title, Date and Tags
JPG.fns.LOAD_TEXT_CONTENT = () => {
	JPG.util.EL('#article--title').innerHTML = uid_json.title;
	JPG.util.EL('#article--date').innerHTML = uid_json.date;
	JPG.fns.CREATE_TAGS();
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
			FOOTER(); // Creates 3 stacked divs
		}, 200);
	}
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

/*
// Utility functions
*/
JPG.fns.eventListeners = () => {
	JPG.util.EL('#toTop').addEventListener('click', JPG.fns.SCROLL_TO); // Scroll to top
};

JPG.fns.initFns = () => {
	JPG.fns.MOBILE_FNS(); // Mobile?
	JPG.fns.FIND_ARTICLE('path_images', uid); // Find UID
	JPG.fns.LOAD_IMG_SRC(); // Load image srcs
	JPG.fns.LOAD_TEXT_CONTENT(); // Load the title, date, and tags
	JPG.fns.eventListeners();
};

window.onload = function () {
	JPG.fns.initFns();
};

console.dir('= script--blog_article.js successful =');