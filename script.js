'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
	'.btn--show-modal-window',
);
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const navLinks = document.querySelector('.nav__links');
//==================================================

//          Modal window
const openModalWindow = (e) => {
	e.preventDefault();
	modalWindow.classList.remove('hidden');
	overlay.classList.remove('hidden');
};
//-----------------------------------------------------
const closeModalWindow = (e) => {
	e.preventDefault();
	modalWindow.classList.add('hidden');
	overlay.classList.add('hidden');
};
// Add function open modal window for every button
btnsOpenModalWindow.forEach((btn) => {
	btn.addEventListener('click', openModalWindow);
});

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
		closeModalWindow(e);
	}
});
//==================================================

//       Cookie message
// Create
const cookieMessageElement = document.createElement('div');
cookieMessageElement.classList.add('cookie-message');
cookieMessageElement.innerHTML = `Мы используем на этом сайте cookie для улучшения функциональности.
<button class='btn btn--close-cookie'>Ok!</button>`;
header.append(cookieMessageElement);
//-----------------------------------------------------
// Add style
cookieMessageElement.style.height =
	Number.parseFloat(getComputedStyle(cookieMessageElement).height) + 30 + 'px';
cookieMessageElement.style.width = '80%';
cookieMessageElement.style.backgroundColor = '#076785';
cookieMessageElement.style.borderRadius = '15px';
//-----------------------------------------------------
// Close
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
	cookieMessageElement.remove();
});
// Get styles from class
// console.log(getComputedStyle(cookieMessageElement));
// console.log(getComputedStyle(cookieMessageElement).color);

// Change of variable value in :root
// document.documentElement.style.setProperty('variable','value')
//==================================================

//          Scroll to Section1 when press Know more
btnScrollTo.addEventListener('click', (e) => {
	e.preventDefault();
	section1.scrollIntoView({ behavior: 'smooth' });
	// Method for old browsers
	// get coordinates of section1
	// const section1Coordinates = section1.getBoundingClientRect();
	// set new coodinates to show section1
	// window.scrollTo({
	// 	left: section1Coordinates.left,
	// 	top: section1Coordinates.top + window.pageYOffset,
	// 	behavior: 'smooth',
	// });
});
//==================================================

//          Smooth page navigation
// Add event listener on parent
navLinks.addEventListener('click', function (e) {
	e.preventDefault();
	console.log(e.target);
	// Get attribute for cliked element if element is a link
	if (e.target.classList.contains('nav__link')) {
		const href = e.target.getAttribute('href');
		// Smooth scrol to section
		document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
	}
});

