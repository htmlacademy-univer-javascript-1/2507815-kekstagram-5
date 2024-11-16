const PICTURE_COUNT = 25;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 30;

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_PHOTO = [
  'Лес, тишина, гладь воды — чистый дзен',
  'Круассан и кофе – завтрак мечты.',
  'Архитектура, от которой реально кайфуешь.',
  'Красиво поданный эспрессо с пенкой, мечта кофемана!',
  'Сочный бургер, от которого слюнки текут. Ням!'
];
const NAMES = ['Андрей', 'Антон', 'Анастасия', 'Рузиль', 'Cтепан', 'Елизавета'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createGeneratorId = () =>{
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};

const generateCommentId = createGeneratorId();

const createMessage = () => getRandomInteger(0, 1)
  ? getRandomArrayElement(COMMENT_MESSAGE)
  : `${getRandomArrayElement(COMMENT_MESSAGE)} ${getRandomArrayElement(COMMENT_MESSAGE)}`;

const createComment = () =>({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) =>({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_PHOTO),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from(
    {length: getRandomInteger(0,COMMENT_COUNT)},
    createComment,
  ),
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, indexPicture) => createPicture(indexPicture + 1),
);

getPictures();
