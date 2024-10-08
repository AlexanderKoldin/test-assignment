document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	const openModalBtn = document.getElementById('openModal');
	const closeModalBtn = document.getElementById('closeModal');
	const modal = document.getElementById('modal');
	const modalForm = document.getElementById('modalForm');
	const submitBtn = document.getElementById('submitBtn');
	const directionSelect = document.getElementById('direction');

	function openModal() {
		modal.classList.add('modal--visible');
		modal.setAttribute('aria-hidden', 'false');
		openModalBtn.style.display = 'none';
	}

	function closeModal() {
		modal.classList.remove('modal--visible');
		modal.setAttribute('aria-hidden', 'true');
		openModalBtn.style.display = 'block';
	}

	openModalBtn.addEventListener('click', openModal);
	closeModalBtn.addEventListener('click', closeModal);
	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			closeModal();
		}
	});

	modalForm.addEventListener('input', function () {
		const organization = document.getElementById('organization').value.trim();
		const phone = document.getElementById('phone').value.trim();
		const email = document.getElementById('email').value.trim();
		const direction = directionSelect.value;

		const isPhoneValid = /^[\d\s+()-]*$/.test(phone);
		const isFormValid = organization && isPhoneValid && email && direction;

		submitBtn.disabled = !isFormValid;

		if (submitBtn.disabled) {
			submitBtn.classList.add('modal__button--submit--disabled');
		} else {
			submitBtn.classList.remove('modal__button--submit--disabled');
		}
	});

	modalForm.addEventListener('submit', function (event) {
		event.preventDefault();
		alert('Форма успешно отправлена!');
		closeModal();
	});
});
