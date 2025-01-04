import { getPictures } from './data.js';
import { renderPictures } from './picture.js';

// Генерация данных
const pictures = getPictures();

// Отрисовка миниатюр
renderPictures(pictures);


