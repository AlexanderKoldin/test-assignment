document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('modal');
    const modalForm = document.getElementById('modalForm');
    const submitBtn = document.getElementById('submitBtn');
    const directionSelect = document.getElementById('direction');
    const phoneInput = document.getElementById('phone');
    const organizationInput = document.getElementById('organization');
    const emailInput = document.getElementById('email');
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarPreview = document.getElementById('avatarPreview');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const removeAvatar = document.getElementById('removeAvatar');
    const selectFileText = document.getElementById('selectFileText');
    const avatarError = document.getElementById('avatarError');
    const phoneError = document.getElementById('phoneError');

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
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    phoneInput.addEventListener('input', () => {
        let input = phoneInput.value.replace(/\D/g, '');
        if (!input.startsWith('7')) {
            input = '7' + input;
        }
        phoneInput.value = formatPhoneNumber(`+${input}`);
    });

    function formatPhoneNumber(value) {
        const parts = value.match(/(\+\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
        if (!parts) return value;

        let formattedValue = parts[1];
        if (parts[2]) formattedValue += ` (${parts[2]}`;
        if (parts[3]) formattedValue += `) ${parts[3]}`;
        if (parts[4]) formattedValue += `-${parts[4]}`;

        return formattedValue;
    }

    let phoneStatusLogged = false;

    modalForm.addEventListener('input', () => {
        const organization = organizationInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const direction = directionSelect.value;

        const isPhoneValid =
            /^\+7\s*\(\d{3}\)\s*\d{3}-\d{2}-\d{2}$/.test(phone) ||
            /^\+7\s*\(\d{3}\)\s*\d{3}-\d{4}$/.test(phone) ||
            /^7\s*\d{10}$/.test(phone);
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isFormValid = organization && isPhoneValid && isEmailValid && direction;

        submitBtn.disabled = !isFormValid;
        submitBtn.classList.toggle('modal__button--submit--disabled', submitBtn.disabled);

        if (!isPhoneValid || phone.length < 16) {
            phoneError.textContent = 'Введите полный номер телефона';
            phoneError.style.display = 'block';
        } else {
            phoneError.style.display = 'none';
        }
    });

    modalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const organization = organizationInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const direction = directionSelect.value;

        const isPhoneValid = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone) || /^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(phone);
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isFormValid = organization && isPhoneValid && isEmailValid && direction;

        if (isFormValid) {
            alert('Форма успешно отправлена!');
            closeModal();
        } else {
            console.log('Форма не отправлена. Проверьте заполнение полей.');
        }
    });

    avatarPreview.addEventListener('click', () => {
        avatarUpload.click();
    });

    selectFileText.addEventListener('click', () => {
        avatarUpload.click();
    });

    loadingIndicator.addEventListener('click', () => {
        avatarUpload.click();
    });

    avatarUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            loadingIndicator.style.display = 'block';
            selectFileText.style.display = 'none';
            avatarError.style.display = 'none';

            reader.onload = (e) => {
                avatarPreview.src = e.target.result;
                loadingIndicator.style.display = 'none';
                removeAvatar.querySelector('.modal__close-icon').classList.remove('hidden');
                removeAvatar.style.backgroundColor = '#fff';
            };

            reader.readAsDataURL(file);
        } else {
            avatarError.textContent = 'Пожалуйста, загрузите аватар';
            avatarError.style.display = 'block';
        }
    });

    removeAvatar.addEventListener('click', () => {
        avatarPreview.src = './img/face.svg';
        avatarUpload.value = '';
        selectFileText.style.display = 'block';
        loadingIndicator.style.display = 'block';

        removeAvatar.querySelector('.modal__close-icon').classList.add('hidden');
        removeAvatar.style.backgroundColor = '';

        avatarError.textContent = 'Пожалуйста, загрузите аватар';
        avatarError.style.display = 'block';
    });
});
