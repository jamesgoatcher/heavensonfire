console.dir('= script--global.js initalized =');

JPG.vars.version = '1.1.1'; // Official_Release.Feature_Update.Bug_Fix
JPG.vars.BASE_URL = './';

/*======================================================
=            Variables, Arrays, and Objects            =
======================================================*/
let body = document.querySelector('body'),
	cont = document.getElementById('container'),
	array =[],
	object = {};

// NOT IN USE
JPG.fns.MOBILE_MENU = (el) => {
	let elem = el.target.id;

	if (elem == '') {
		JPG.util.EL('#').style.display = 'flex';
		JPG.util.addClass(body, 'hidden');
	} else {
		JPG.util.EL('#').style.display = 'none';
		JPG.util.removeClass(body, 'hidden');
	}	
};

// NOT IN USE
JPG.fns.MOBILE_ANCHOR = (el) => {
	let elem = el.target.id;

	JPG.util.EL('#').style.display = 'none';
	JPG.util.removeClass(body, 'hidden');

	if (elem.indexOf('') > -1) {
		JPG.util.EL('#').scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	} else if (elem.indexOf('') > -1) {
		JPG.util.EL('#').scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	} else if (elem.indexOf('') > -1) {
		JPG.util.EL('#').scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	}
};

console.dir('= script--global.js successful =');