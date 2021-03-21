import {createRandomNumber} from './utils.js';

const names = ['Петя', 'Ваня', 'Оля', 'Лена', 'Маша', 'Ира', 'Люба'];

//   id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
const createRandomId = function () {
  return createRandomNumber(1, 25);
};

//   url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
const createImageUrl = function (imageNumber) {
  return 'photos/'+ imageNumber + '.jpg';
}

//   description, строка — описание фотографии. Описание придумайте самостоятельно.
const description = 'Нормальная фотография';

//   likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
const createRandomLike = function () {
  return createRandomNumber(15, 200);
}

//   Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
const createRandomАvatar = function () {
  return 'img/avatar-' + createRandomNumber(1, 6) + '.svg';
}

// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']

const createRandomMessage = function () {
  return messages[createRandomNumber(0, messages.length - 1)];
}

const createRandomName = function () {
  return names[createRandomNumber(0, names.length - 1)];
}

const createComments = function () {
  return [ {
    id: createRandomId(),
    avatar: createRandomАvatar().toString(),
    message: createRandomMessage().toString(),
    name: createRandomName().toString(),
  } ];
}

// Генерация отдельного объекта
const createImage = function () {
  let idNumber = createRandomId();
  return {
    id: idNumber,
    url: createImageUrl(idNumber),
    description: description,
    likes: createRandomLike(),
    comments: createComments(),
  }
}

// Создание массива из случайно генерируемых объектов, с уникальными id
const createImages = function () {
  const Imageslist = [];
  const usedId = [];
  let quantityImage = 25;
  while (Imageslist.length < quantityImage) {
    const object = createImage();
    if (!usedId.includes(object.id)) {
      Imageslist.push(object);
      usedId.push(object.id);
    }
  }
  return Imageslist;
}
createImages();
export {createImages};
