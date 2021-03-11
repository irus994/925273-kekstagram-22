/*global _*/

import {renderUserPhoto} from './miniature.js';
import {showAlert, alertMassege} from './utils.js';
import {getData} from './server-exchange.js'

//находим кнопки фильтров
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

//функция для рандомного перемешивания массива
const shuffle = function (array) {
  return array.sort(() => Math.random() - 0.5);
}

//удаление загруженных ранее фото
const oldDataRemove = () => {
  const pictureImgAll = document.querySelectorAll('.picture');
  for (let i = 0; i < pictureImgAll.length; i++) {
    pictureImgAll[i].remove();
  }
}

const RERENDER_DELAY = 500; //задержка отрисовки (устранение дребезга)

//фильтр - случайные 10 фото
filterRandom.addEventListener('click', _.debounce(function () {
  oldDataRemove();
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        showAlert(alertMassege);
      }
    })
    .catch(() => {
      showAlert(alertMassege);
    })
    .then((userPhotos) => {
      renderUserPhoto(shuffle(userPhotos).slice(0, 10));
    });
}, RERENDER_DELAY));

//фильтр - по умолчанию, сбрасывает к изначальной сортировке
filterDefault.addEventListener('click', _.debounce(function () {
  oldDataRemove();
  getData();
}, RERENDER_DELAY));


//фильтр - сортировка по обсуждаемости
filterDiscussed.addEventListener('click', _.debounce(function () {
  oldDataRemove();
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        showAlert(alertMassege);
      }
    })
    .catch(() => {
      showAlert(alertMassege);
    })
    .then((userPhotos) => {
      renderUserPhoto(userPhotos.slice().sort(sortComments));
    });
}, RERENDER_DELAY));

//расчет длинны коммента
const getCommentRank = (userPhoto) => {
  return userPhoto.comments.length;
};

//функция для сортировки комментов
const sortComments = (userPhotoA, userPhotoB) => {
  const commentLengthA = getCommentRank(userPhotoA);
  const commentLengthB = getCommentRank(userPhotoB);

  return commentLengthB - commentLengthA; //сортировка от большего к меньшему
}
