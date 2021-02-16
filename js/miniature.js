import {createImages} from './data.js';

//Находим шаблон
let templatePicture = document.querySelector('#picture').content;
// console.log(templatePicture);

//Контейнер, куда будем добавлять изображения
let userPhotoContainer = document.querySelector('.pictures');
// console.log(userPhotoContainer);

//Список фото пользователей = массиву случайно сгенирированных объектов - функции которую экспортировали
const userPhotos = createImages();
// console.log(userPhotos)

const userPhotosFragment = document.createDocumentFragment();

userPhotos.forEach(({url, likes, comments}) => {
  const userPhoto = templatePicture.cloneNode(true);

  userPhoto.querySelector('.picture__img').src = url;
  userPhoto.querySelector('.picture__likes').textContent = likes;
  userPhoto.querySelector('.picture__comments').textContent = comments.length;
  userPhotosFragment.appendChild(userPhoto);
});

userPhotoContainer.appendChild(userPhotosFragment);
