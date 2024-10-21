document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// Элементы модального окна
	const openModalBtn = document.getElementById('openModal');
	const closeModalBtn = document.getElementById('closeModal');
	const modal = document.getElementById('modal');
	const modalForm = document.getElementById('modalForm');
	const submitBtn = document.getElementById('submitBtn');
	const phoneInput = document.getElementById('phone');
	
	// Элементы для загрузки аватара
	const avatarUpload = document.getElementById('avatar-upload');
	const avatarPreview = document.getElementById('avatar-preview');
	const loadingImage = document.querySelector('.modal__image--loading');
	const closeIcon = document.querySelector('.modal__image--close');

	// Форматирование номера телефона
	function formatPhoneNumber(value) {
			const digits = value.replace(/\D/g, '');
			let formattedNumber = '+7 (';

			if (digits.length > 1) {
					formattedNumber += digits.slice(1, 4);
			}
			if (digits.length >= 5) {
					formattedNumber += ') ' + digits.slice(4, 7);
			}
			if (digits.length >= 8) {
					formattedNumber += '-' + digits.slice(7, 9);
			}
			if (digits.length >= 10) {
					formattedNumber += '-' + digits.slice(9, 11);
			}

			return formattedNumber;
	}

	// Обработчик для ввода телефона
	phoneInput.addEventListener('input', function () {
			this.value = formatPhoneNumber(this.value);
	});

	// Функции открытия и закрытия модального окна
	function openModal() {
			modal.classList.add('modal--visible');
			modal.setAttribute('aria-hidden', 'false');
			openModalBtn.style.display = 'none';
	}

	function closeModal() {
			modal.classList.remove('modal--visible');
			modal.setAttribute('aria-hidden', 'true');
			openModalBtn.style.display = 'block';
			modalForm.reset();
			submitBtn.disabled = true;
			avatarPreview.src = './img/face.svg'; // Сбросить аватар к исходному изображению
			closeIcon.style.display = 'none'; // Скрыть иконку закрытия
	}

	openModalBtn.addEventListener('click', openModal);
	closeModalBtn.addEventListener('click', closeModal);
	window.addEventListener('click', function (event) {
			if (event.target === modal) {
					closeModal();
			}
	});

	// Валидация формы
	modalForm.addEventListener('input', function () {
			const organization = document.getElementById('organization').value.trim();
			const phone = phoneInput.value.trim();
			const email = document.getElementById('email').value.trim();

			const isPhoneValid = phone.length === 18;
			const isFormValid = organization && isPhoneValid && email;

			submitBtn.disabled = !isFormValid;

			if (submitBtn.disabled) {
					submitBtn.classList.add('modal__button--submit--disabled');
			} else {
					submitBtn.classList.remove('modal__button--submit--disabled');
			}
	});

	// Обработчик отправки формы
	modalForm.addEventListener('submit', function (event) {
			event.preventDefault();
			alert('Форма успешно отправлена!');
			closeModal();
	});

	// Обработчик для выбора файла аватара
	avatarPreview.addEventListener('click', function () {
			avatarUpload.click(); // Открываем диалоговое окно выбора файла
	});

	avatarUpload.addEventListener('change', function () {
			const file = this.files[0];

			// Проверка, что файл является изображением
			if (file && file.type.startsWith('image/')) {
					const reader = new FileReader();

					// Показать индикатор загрузки
					loadingImage.style.display = 'block';

					reader.onload = function (e) {
							avatarPreview.src = e.target.result; // Устанавливаем превью аватара
							avatarPreview.style.display = 'block';
							loadingImage.style.display = 'none'; // Скрыть индикатор загрузки
							closeIcon.style.display = 'block'; // Показать иконку закрытия
					};

					reader.readAsDataURL(file); // Преобразуем файл в Data URL для предварительного просмотра
			} else {
					alert('Пожалуйста, выберите файл изображения (jpeg или png).');
					avatarPreview.src = './img/face.svg'; // Сбрасываем изображение к исходному
					avatarUpload.value = ''; // Очищаем выбор файла
					loadingImage.style.display = 'none';
					closeIcon.style.display = 'none';
			}
	});

	// Обработчик для удаления аватара
	closeIcon.addEventListener('click', function () {
			avatarPreview.src = './img/face.svg'; // Возвращаем исходное изображение
			avatarUpload.value = ''; // Очищаем выбор файла
			closeIcon.style.display = 'none'; // Скрыть иконку закрытия
	});
});
