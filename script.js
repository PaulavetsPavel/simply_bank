'use strict';

// Modal window
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
	'.btn--show-modal-window',
);
//-----------------------------------------------------
const openModalWindow = function (e) {
	e.preventDefault();
	modalWindow.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

//-----------------------------------------------------
const closeModalWindow = function (e) {
	e.preventDefault();
	modalWindow.classList.add('hidden');
	overlay.classList.add('hidden');
};
// add function open modal window for every button
btnsOpenModalWindow.forEach((btn) => {
	btn.addEventListener('click', openModalWindow);
});

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
		closeModalWindow();
	}
});
//==================================================

// Cookie message
// Create
const cookieMessageElement = document.createElement('div');
const header = document.querySelector('.header');
cookieMessageElement.classList.add('cookie-message');
cookieMessageElement.innerHTML = `Мы используем на этом сайте cookie для улучшения функциональности.
<button class='btn btn--close-cookie'>Ok!</button>`;
header.append(cookieMessageElement);
// Add style
cookieMessageElement.style.height =	Number.parseFloat(getComputedStyle(cookieMessageElement).height) + 30 + 'px';
cookieMessageElement.style.width='80%'
cookieMessageElement.style.backgroundColor='#076785'
cookieMessageElement.style.borderRadius='15px'
// Close
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
	cookieMessageElement.remove();
});
//==================================================

