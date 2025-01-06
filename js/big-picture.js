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

let commentsToShow = [];
let displayedCommentsCount = 0;

const COMMENTS_PER_PAGE = 5;

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

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = commentsToShow.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_PER_PAGE);

  nextComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
  displayedCommentsCount += nextComments.length;

  commentCountBlock.textContent = `${displayedCommentsCount} из ${commentsToShow.length} комментариев`;

  if (displayedCommentsCount >= commentsToShow.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const onEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);

  displayedCommentsCount = 0;
  commentsToShow = [];
};

const openBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  socialComments.innerHTML = '';
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsToShow = comments;
  displayedCommentsCount = 0;

  renderComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeydown);
  closeButton.addEventListener('click', closeBigPicture);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { openBigPicture };
