import { getPictures } from './data.js';
import { renderPictures } from './picture.js';
import { initializeFormValidation } from './form-validation.js';

// Генерация данных
const pictures = getPictures();

// Отрисовка миниатюр
renderPictures(pictures);


document.addEventListener('DOMContentLoaded', () => {
  initializeFormValidation();
});
