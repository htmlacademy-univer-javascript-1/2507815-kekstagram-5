const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// Закрытие полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  // Удаляем обработчики
  document.removeEventListener('keydown', onEscapeKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
};

// Закрытие по клавише Escape
const onEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture(); // Теперь closeBigPicture уже объявлена
  }
};

// Используем готовую функцию createComment
const createCommentElement = ({ avatar, message, name }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  `;
  return commentElement;
};

// Открытие полноразмерного изображения
const openBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  // Очистка и вставка комментариев
  socialComments.innerHTML = '';
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.appendChild(createCommentElement(comment));
  });
  socialComments.appendChild(commentFragment);

  // Скрываем ненужные элементы
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Показываем модальное окно
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Добавляем обработчики закрытия
  document.addEventListener('keydown', onEscapeKeydown);
  closeButton.addEventListener('click', closeBigPicture);
};

export { openBigPicture };
