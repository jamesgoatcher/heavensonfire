console.dir('= script--blog.js initalized =');

JPG.vars.BASE_URL = '../'; // One directory back

// All content
JPG.fns.CREATE_ARTICLE_TILES = () => {
	let div = document.createElement('div');

	div.setAttribute('class', 'blog--thumb_container');

	JPG.util.EL('#container').insertBefore( div, JPG.util.EL('#home--footer') );

	for (let i = (blog_articles.length - 1); i > -1; i--) {
		let article = document.createElement('div'),
			link    = document.createElement('a'),
			thumb   = document.createElement('img'),
			date    = document.createElement('div'),
			title   = document.createElement('div');

		// Container
		article.setAttribute('class', 'blog--article');

		// Link
		link.setAttribute('class', 'blog--link');
		link.href = JPG.vars.BASE_URL + 'blog/' + blog_articles[i].path + blog_articles[i].url;

		// Thumbnail image
		thumb.setAttribute('class', 'blog--thumb');
		thumb.src = JPG.vars.BASE_URL + 'assets/blog/' + blog_articles[i].path_images + blog_articles[i].thumb;

		// Day/Date
		date.setAttribute('class', 'blog--date');
		if (blog_articles[i].path_images)
		date.innerHTML  = `${blog_articles[i].date} (${blog_articles[i].day})`;

		// Article Title
		title.setAttribute('class', 'blog--title');
		title.innerHTML = blog_articles[i].title;

		div.appendChild(article);
		article.appendChild(link);
		link.appendChild(thumb);
		link.appendChild(title);
		link.appendChild(date);

		// New class added
		if (blog_articles[i].new == true) {
			let 
			newDiv = document.createElement('div'),
			newBox = document.createElement('div');

			newBox.innerHTML = 'New';

			JPG.util.addClass(newDiv, 'new');
			JPG.util.addClass(newBox, 'new--box');

			link.appendChild(newDiv).appendChild(newBox);
		}
	}
};

// Filtered content
JPG.fns.WRITE_FILTERED_POSTS = () => {
	let jsonValues = window.location.href.split('posts=')[1].split(','), // Split the filtered posts params by comma
		tagValue   = window.location.href.split('tag=')[1].split('&')[0], // Split the tag param and end at the ampersand
		div   = document.createElement('div'), // Div for post container
		aside = document.createElement('aside'); // Aside for tag name

	aside.setAttribute('class', 'blog--sorted_tag');  // Class for tag name container
	aside.innerHTML = `Results for posts sorted by: ${tagValue}`; // Write the searched tag value
	div.setAttribute('class', 'blog--thumb_container_sorted'); // Class for post container

	JPG.util.EL('#container').insertBefore( div, JPG.util.EL('#home--footer') ); // Insert into container above the footer
	JPG.util.EL('#container').insertBefore( aside, JPG.util.EL('.blog--thumb_container_sorted')[0] ); // Insert into container above the post container

	for (let i = (blog_articles.length - 1); i > -1; i--) {
		for (let j = 0; j < jsonValues.length; j++) {
			if (i == jsonValues[j]) {
				let article = document.createElement('div'),
					link    = document.createElement('a'),
					thumb   = document.createElement('img'),
					date    = document.createElement('div'),
					title   = document.createElement('div');

				// Container
				article.setAttribute('class', 'blog--article');

				// Link
				link.setAttribute('class', 'blog--link');
				link.href = JPG.vars.BASE_URL + 'blog/' + blog_articles[i].path + blog_articles[i].url;

				// Thumbnail image
				thumb.setAttribute('class', 'blog--thumb');
				thumb.src = JPG.vars.BASE_URL + 'assets/blog/' + blog_articles[i].path_images + blog_articles[i].thumb;

				// Day/Date
				date.setAttribute('class', 'blog--date');
				date.innerHTML  = blog_articles[i].date;

				// Article Title
				title.setAttribute('class', 'blog--title');
				title.innerHTML = blog_articles[i].title;

				div.appendChild(article);
				article.appendChild(link);
				link.appendChild(thumb);
				link.appendChild(title);
				link.appendChild(date);
			}
		}
	}

	// JPG.util.EL('header')[0].innerHTML = `Tag: ${tagValue}`; // Write the searched tag to the header
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
	JPG.fns.MOBILE_FNS(); // Mobile or not
	if (JPG.util.has(window.location.href, '?tag=', true)) {
		JPG.fns.WRITE_FILTERED_POSTS(); // Generate filtered posts
	} else {
		JPG.fns.CREATE_ARTICLE_TILES(); // Generate all blog posts
	}
	JPG.util.EL('#header--backBlog').href = `${JPG.vars.BASE_URL}blog`;
	JPG.fns.eventListeners();
};

window.onload = function () {
	JPG.fns.initFns();
};

console.dir('= script--blog.js successful =');