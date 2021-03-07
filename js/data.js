import {randomNumber} from './utils.js';

//   id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
const randomId = function () {
  return randomNumber(1, 25);
};
// console.log(randomId());


//   url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
const imageUrl = function (imageNumber) {
  return 'photos/'+ imageNumber + '.jpg';
}
imageUrl(3);
// console.log(imageNumber(3));


//   description, строка — описание фотографии. Описание придумайте самостоятельно.
const description = 'Нормальная фотография';


//   likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
const randomLike = function () {
  return randomNumber(15, 200);
}
// console.log(randomLike());


//   Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
const randomАvatar = function () {
  return 'img/avatar-' + randomNumber(1, 6) + '.svg';
}
// console.log(randomАvatar());


// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']

const randomMessage = function () {
  return messages[randomNumber(0, messages.length - 1)];
}
// console.log(randomMessage());

const names = ['Петя', 'Ваня', 'Оля', 'Лена', 'Маша', 'Ира', 'Люба'];

const randomName = function () {
  return names[randomNumber(0, names.length - 1)];
}
// console.log(randomName());


const createComments = function () {
  return [ {
    id: randomId(),
    avatar: randomАvatar().toString(),
    message: randomMessage().toString(),
    name: randomName().toString(),
  } ];
}
// console.log(createComments());


// Генерация отдельного объекта
const createImage = function () {
  let idNumber = randomId();
  return {
    id: idNumber,
    url: imageUrl(idNumber),
    description: description,
    likes: randomLike(),
    comments: createComments(),
  }
}
// console.log(createImage());


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

