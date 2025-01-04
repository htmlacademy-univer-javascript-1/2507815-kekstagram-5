import { openBigPicture } from './big-picture.js';

function renderPictures(picturesData) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  picturesData.forEach((picture) => {
    const { url, description, likes, comments } = picture;

    const pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    // Добавляем обработчик клика
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(picture); // Открытие полноразмерного изображения
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}

export { renderPictures };
