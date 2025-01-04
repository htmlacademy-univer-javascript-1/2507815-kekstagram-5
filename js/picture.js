function renderPictures(picturesData) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture'); // Шаблон
  const fragment = document.createDocumentFragment();

  picturesData.forEach(({ url, description, likes, comments }) => {
    const pictureElement = template.cloneNode(true); // Клонируем содержимое шаблона

    // Заполнение данных
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    fragment.appendChild(pictureElement); // Добавляем в DocumentFragment
  });

  picturesContainer.appendChild(fragment); // Вставляем в контейнер
}

export { renderPictures };

