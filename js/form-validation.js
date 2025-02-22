import { isEscapeKey, openSuccessMessage, openSendDataErrorMessage } from './util.js';
import { postData } from './api.js';
import { pristine } from './data.js';
import { resetImage } from './effect.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCloseButton = form.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const isTextFieldFocused = () =>
  document.activeElement === hashtags ||
  document.activeElement === comment;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};
const openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};
const onSendDataSuccess = () => {
  closeUploadOverlay();
  resetImage();
  openSuccessMessage();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    postData(onSendDataSuccess, 'POST', new FormData(form), openSendDataErrorMessage);
  }
};


function closeUploadOverlay () {
  form.reset();
  pristine.reset();
  resetImage();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}


uploadFile.addEventListener('change', openUploadOverlay);
uploadCloseButton.addEventListener('click', closeUploadOverlay);

form.addEventListener('submit', onFormSubmit);

export { onEscKeydown };