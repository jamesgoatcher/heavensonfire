console.dir('= script--blog_article.js initalized =');

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

JPG.fns.VIEW_ALL_ARTICLES_WITH_TAG = () => {
	console.log('hi');
};

// Load and separate tags
JPG.fns.CREATE_TAGS = () => {
	for (let i = 0; i < uid_json.tags.length; i++) {
		let div = document.createElement('div');

		// Divide them up
		if (i == (uid_json.tags.length - 1)) {
			div.innerHTML = uid_json.tags[i];
		} else {
			div.innerHTML = uid_json.tags[i] + ',&nbsp;';
		}

		div.setAttribute('class', 'tag--div');
		div.addEventListener('click', JPG.fns.VIEW_ALL_ARTICLES_WITH_TAG);

		JPG.util.EL('#article--tags').appendChild(div);
	}
};

// Load Title, Date and Tags
JPG.fns.LOAD_TEXT_CONTENT = () => {
	JPG.util.EL('#article--title').innerHTML = uid_json.title;
	JPG.util.EL('#article--date').innerHTML = uid_json.date;
	JPG.fns.CREATE_TAGS();
};

/*===========================================
=            On Scroll Functions            =
===========================================*/

JPG.util.CHECK_VISABLE = (elm) => {
	let rect = elm.getBoundingClientRect();
	let viewHeight = Math.max( document.documentElement.clientHeight, window.innerHeight );
  
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

// Scroll down functions
window.onscroll = function () { 
    'use strict';

    //Computed div heights
    let bannerHeight   = parseInt( window.getComputedStyle( JPG.util.EL('#header_bottom'), null ).getPropertyValue('height'), 10 );

    console.log(bannerHeight)
    
    /* Locks the window */
    if ( window.scrollY >= (bannerHeight) && !JPG.util.CHECK_VISABLE( JPG.util.EL('#split_bottom') ) && !JPG.util.CHECK_VISABLE( JPG.util.EL('#zoom_bottom') ) ) {
        JPG.util.addClass( JPG.util.EL('.slideshow')[0], 'to-fixed' );
        JPG.util.addClass( JPG.util.EL('.slideshow')[0], 'active' );
        JPG.util.removeClass( JPG.util.EL('.slideshow')[0], 'to-bottom' );
    } else {
    	JPG.util.removeClass( JPG.util.EL('.slideshow')[0], 'to-fixed' );
    	JPG.util.removeClass( JPG.util.EL('.slideshow')[0], 'active' );
    	JPG.util.addClass( JPG.util.EL('.slideshow')[0], 'to-bottom' );
    }

    /* Changes the photos */
    if ( window.scrollY >= (bannerHeight + 300 ) && !JPG.util.CHECK_VISABLE( JPG.util.EL('#split_bottom') ) && !JPG.util.CHECK_VISABLE( JPG.util.EL('#zoom_bottom') ) ) {
        JPG.util.addClass( JPG.util.EL('.slideshow')[0].children[0], 'none' );
        JPG.util.removeClass( JPG.util.EL('.slideshow')[0].children[1], 'none' );
    } 

    if ( window.scrollY >= (bannerHeight + 400 ) && !JPG.util.CHECK_VISABLE( JPG.util.EL('#split_bottom') ) && !JPG.util.CHECK_VISABLE( JPG.util.EL('#zoom_bottom') ) ) {
    	JPG.util.addClass( JPG.util.EL('.slideshow')[0].children[1], 'none' );
        JPG.util.removeClass( JPG.util.EL('.slideshow')[0].children[2], 'none' );
    }

    // else if ( window.scrollY >= (bannerHeight) && JPG.util.CHECK_VISABLE( JPG.util.EL('#article--tags') ) ) {
    // 	JPG.util.removeClass( JPG.util.EL('.slideshow')[0], 'to-fixed' );
    // } else if ( window.scrollY >= (bannerHeight) && JPG.util.CHECK_VISABLE( JPG.util.EL('#split_bottom') ) ) {
    // 	JPG.util.removeClass( JPG.util.EL('.slideshow')[0], 'to-fixed' );
    // 	JPG.util.addClass( JPG.util.EL('.slideshow')[0], 'to-bottom' );
    // } else {
    // 	JPG.util.removeClass( JPG.util.EL('.slideshow')[0], 'to-fixed' );
    // }

    // Element becomes visible
 	// if ( JPG.util.CHECK_VISABLE( JPG.util.EL('#') ) ) {
  //       JPG.util.addClass( JPG.util.EL('#'), 'scroll' );
  //   }
};

/*
// Utility functions
*/
JPG.fns.eventListeners = () => {
	// Remove Nav hide
	JPG.fns.SHOW_HEADER();
	JPG.fns.FIND_ARTICLE('path_images', uid); // Find UID
	JPG.fns.LOAD_IMG_SRC(); // Load image srcs
	JPG.fns.LOAD_TEXT_CONTENT(); // Load the title, date, and tags
};

JPG.fns.initFns = () => {
	JPG.fns.eventListeners();
};

window.onload = function () {
	JPG.fns.initFns();
};

console.dir('= script--blog_article.js successful =');