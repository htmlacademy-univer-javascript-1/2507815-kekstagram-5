import { isEscapeKey } from './util.js';

const POSSIBLE_COMMENTS_GROUP = 5;

const body = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comment-count');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

let commentsShown = 0;
let comments = [];

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const createComment = ({ name, avatar, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.appendChild(img);
  comment.appendChild(text);

  return comment;
};

const renderComments = () => {
  commentsShown += POSSIBLE_COMMENTS_GROUP;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < commentsShown; index++) {
    fragment.append(createComment(comments[index]));
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  socialComments.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  commentsShown = 0;
}

commentsLoader.addEventListener('click', () => {
  renderComments();
});

const onCloseButtonClick = () => {
  closeBigPicture();
};

closeButton.addEventListener('click', onCloseButtonClick);

export { openBigPicture };
