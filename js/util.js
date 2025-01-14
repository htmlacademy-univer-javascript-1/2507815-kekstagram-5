import { onEscKeydown } from './form-validation.js';

const ALERT_SHOW_TIME = 55000;
const submitButton = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageCloseElement = errorTemplate.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);
  alertContainer.classList.add('data-error');

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessButtonCLick = () => {
  document.querySelector('.success').remove();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const successElement = document.querySelector('.success');
    if (successElement) {
      successElement.remove();
    } else {
      console.error('Элемент .success не найден в DOM');
    }
  }
};


const onSuccessClickEmpty = (evt) => {
  const successElement = document.querySelector('.success');
  if (!successElement) {
    console.error('Элемент .success не найден в DOM');
    return;
  }
  if (!evt.target.closest('.success__inner')) {
    successElement.remove();
  }
};


const openSuccessMessage = () => {
  document.body.append(successTemplate.cloneNode(true));
  successButton.addEventListener('click', onSuccessButtonCLick);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessClickEmpty);
  submitButton.disabled = false;
};


const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendDataErrorMessage();
  }
};

const onErrorButtonClick = () => {
  closeSendDataErrorMessage();
};

const onErrorClickEmpty = (evt) => {
  if (!(evt.target.closest('.error__inner'))) {
    closeSendDataErrorMessage();
  }
};

const openSendDataErrorMessage = () => {
  document.body.append(errorTemplate);
  document.addEventListener('keydown', onErrorEscKeydown);
  errorMessageCloseElement.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorClickEmpty);
  document.removeEventListener('keydown', onEscKeydown);
  submitButton.disabled = false;
};

function closeSendDataErrorMessage() {
  const errorElement = document.querySelector('.error');
  if (!errorElement) {
    console.error('Элемент .error не найден в DOM');
    return;
  }
  errorElement.remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
  errorMessageCloseElement.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('click', onErrorClickEmpty);
  document.addEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onSuccessClickEmpty);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

const isElementRepeat = (element, array) => {
  if (array.length > 1 && array.indexOf(element, array.indexOf(element) + 1) > 0) {
    return true;
  }
  return false;
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
}

export {
  isEscapeKey,
  openSuccessMessage,
  openSendDataErrorMessage,
  showAlert,
  debounce,
  isElementRepeat
};
