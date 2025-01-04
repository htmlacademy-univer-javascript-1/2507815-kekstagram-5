export function initializeFormValidation() {
  const uploadForm = document.getElementById('upload-form');
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__error',
    successClass: 'img-upload__success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  });

  // Валидация формы перед отправкой
  uploadForm.addEventListener('submit', (e) => {
    const isValid = pristine.validate();
    if (!isValid) {
      e.preventDefault();
    }
  });

  // Сброс формы и закрытие
  const cancelButton = document.getElementById('upload-cancel');
  cancelButton.addEventListener('click', () => {
    uploadForm.reset();
    pristine.reset();
  });

  // Отменить обработчик ESC при фокусе на поле
  const inputFields = uploadForm.querySelectorAll('input, textarea');
  inputFields.forEach((field) => {
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
      }
    });
  });

  // Инициализация библиотеки Pristine для валидации
  pristine.addValidator(
    uploadForm.querySelector('.text__hashtags'),
    (value) => {
      const hashtags = value.split(/\s+/);
      for (const tag of hashtags) {
        if (!/^#[a-zA-Z0-9_]{1,20}$/.test(tag)) {
          return false;
        }
      }
      return true;
    },
    'Хэш-теги должны начинаться с "#" и быть длиной до 20 символов.'
  );
}
