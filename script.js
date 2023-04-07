'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
	'.btn--show-modal-window',
);
const body = document.querySelector('body');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sections = document.querySelectorAll('section');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsTabContents = document.querySelectorAll('.operations__content');
const operationsTabContainer = document.querySelector(
	'.operations__tab-container',
);

const lazyImages = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
//==================================================

//*        Appearance section after scroll
const appearanceSection = (entries, observer) => {
	const entry = entries[0];
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};
const sectionObserverOptions = {
	// element or null (viewport)
	root: null,
	// [] with % visibility of element from .observ()
	threshold: 0.1,
};
const sectionObserver = new IntersectionObserver(
	appearanceSection,
	sectionObserverOptions,
);
sections.forEach((section) => {
	// Hide sections but header
	section.classList.add('section--hidden');
	sectionObserver.observe(section);
});
//==================================================

//*         Sticky navigation
// Intersection Observer API
const getStikyNav = (entries, observer) => {
	const entry = entries[0];
	const method = !entry.isIntersecting ? 'add' : 'remove';
	nav.classList[method]('sticky');
};
const navHeight = nav.getBoundingClientRect().height;
const headerObserverOptions = {
	root: null,
	threshold: 0,
	// before the end of the section
	rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(
	getStikyNav,
	headerObserverOptions,
);
headerObserver.observe(header);
//--------------------------------------------------
// Method using coordinates
// const section1Coordinates = section1.getBoundingClientRect();
// window.addEventListener('scroll', (e) => {
// 	if (window.scrollY > section1Coordinates.top) {
// 		nav.classList.add('sticky');
// 	} else {
// 		nav.classList.remove('sticky');
// 	}
// });
//==================================================

//*          Animation for nav link
const navLinksHoverAnimations = function (e) {
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		const linkOver = e.target;
		const siblingLinks = linkOver
			.closest('.nav__links')
			.querySelectorAll('.nav__link');
		const logo = linkOver.closest('.nav').querySelector('img');
		const navText = linkOver.closest('.nav').querySelector('.nav__text');
		siblingLinks.forEach((link) => {
			if (link !== linkOver) link.style.opacity = this;
		});
		logo.style.opacity = this;
		navText.style.opacity = this;
	}
};

nav.addEventListener('mouseover', navLinksHoverAnimations.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnimations.bind(1));

// if use simply function without bind need to change function
// nav.addEventListener('mouseover', (e) => {
// 	navLinksHoverAnimations(e, 0.4);
// });
//==================================================

//*         Scroll to Section1 when press Know more
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

//*          Smooth page navigation
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
//==================================================

//*         Switching tabs
operationsTabContainer.addEventListener('click', (e) => {
	e.preventDefault();
	const clickedButton = e.target.closest('.operations__tab');
	// If clickedButton === null exit from eventListener (click not a button)
	if (!clickedButton) return;
	// Active tab
	operationsTabs.forEach((tab) => {
		tab.classList.remove('operations__tab--active');
	});
	clickedButton.classList.add('operations__tab--active');
	// Active content
	operationsTabContents.forEach((tab) =>
		tab.classList.remove('operations__content--active'),
	);
	document
		.querySelector(`.operations__content--${clickedButton.dataset.tab}`)
		.classList.add('operations__content--active');
});

//==================================================
//*       Cookie message
// Create
const cookieMessageElement = document.createElement('div');
cookieMessageElement.classList.add('cookie-message');
cookieMessageElement.innerHTML = `Мы используем на этом сайте cookie для улучшения функциональности.
<button class='btn btn--close-cookie'>Ok!</button>`;
body.append(cookieMessageElement);
// Add style
cookieMessageElement.style.height =
	Number.parseFloat(getComputedStyle(cookieMessageElement).height) + 30 + 'px';
cookieMessageElement.style.width = '80%';
cookieMessageElement.style.backgroundColor = '#076785';
cookieMessageElement.style.borderRadius = '15px';
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
//*        Modal window

const openModalWindow = (e) => {
	e.preventDefault();
	modalWindow.classList.remove('hidden');
	overlay.classList.remove('hidden');
};
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

//*         Lazy loading for images

const loadImage = (entries, observer) => {
	const entry = entries[0];

	if (!entry.isIntersecting) return;
	// Change image
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener('load', () => {
		entry.target.classList.remove('lazy-img');
	});
	// Delete observer
	observer.unobserve(entry.target);
};
const loadObserverOptions = {
	root: null,
	threshold: 0.3,
};
const lazyImagesObserver = new IntersectionObserver(
	loadImage,
	loadObserverOptions,
);
lazyImages.forEach((image) => lazyImagesObserver.observe(image));

//*           Slider

let currentSlide = 0;

const moveToSlide = (currentSlide) => {
	slides.forEach((slide, index) => {
		slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
	});
};
const activateCurrentDot = (slide) => {
	document.querySelectorAll('.dots__dot').forEach((dot) => {
		dot.classList.remove('dots__dot--active');
	});
	document
		.querySelector(`.dots__dot[data-slide='${slide}']`)
		.classList.add('dots__dot--active');
};
const nextSlide = () => {
	currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++;
	moveToSlide(currentSlide);
	activateCurrentDot(currentSlide);
};

const previousSlide = () => {
	currentSlide === 0 ? (currentSlide = slides.length - 1) : currentSlide--;
	moveToSlide(currentSlide);
	activateCurrentDot(currentSlide);
};

slides.forEach((slide, index) => {
	slide.style.transform = `translateX(${index * 100}%)`;
	// Create dots
	dotContainer.insertAdjacentHTML(
		'beforeend',
		`<button class="dots__dot" data-slide='${index}'></button>`,
	);
});
// For first show active dot
activateCurrentDot(currentSlide);

btnSliderLeft.addEventListener('click', previousSlide);
btnSliderRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') previousSlide();
	if (e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', (e) => {
	if (!e.target.classList.contains('dots__dot')) return;
	const slideNumer = e.target.dataset.slide;
	moveToSlide(slideNumer);
	activateCurrentDot(slideNumer);
});

