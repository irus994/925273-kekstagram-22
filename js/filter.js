/*global _*/

import {renderUserPhoto} from './miniature.js';
import {showAlert, alertMessage} from './utils.js';
import {getData} from './server-exchange.js'

//находим кнопки фильтров
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const RERENDER_DELAY = 500; //задержка отрисовки (устранение дребезга)

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

//фильтр - случайные 10 фото
const onFilterRandomClick = function () {
  filterRandom.addEventListener('click', _.debounce(function () {
    oldDataRemove();
    fetch('https://22.javascript.pages.academy/kekstagram/data')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          showAlert(alertMessage);
        }
      })
      .catch(() => {
        showAlert(alertMessage);
      })
      .then((userPhotos) => {
        renderUserPhoto(shuffle(userPhotos).slice(0, 10));
      });
  }, RERENDER_DELAY));
};
onFilterRandomClick();

//фильтр - по умолчанию, сбрасывает к изначальной сортировке
const onFilterDefaultClick = function () {
  filterDefault.addEventListener('click', _.debounce(function () {
    oldDataRemove();
    getData();
  }, RERENDER_DELAY));
};
onFilterDefaultClick();

//фильтр - сортировка по обсуждаемости
const onFilterDiscussedClick = function () {
  filterDiscussed.addEventListener('click', _.debounce(function () {
    oldDataRemove();
    fetch('https://22.javascript.pages.academy/kekstagram/data')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          showAlert(alertMessage);
        }
      })
      .catch(() => {
        showAlert(alertMessage);
      })
      .then((userPhotos) => {
        renderUserPhoto(userPhotos.slice().sort(sortComments));
      });
  }, RERENDER_DELAY));
};
onFilterDiscussedClick();

//функция для сортировки комментов
const sortComments = (userPhotoA, userPhotoB) => {
  const commentLengthA = userPhotoA.comments.length;
  const commentLengthB = userPhotoB.comments.length;

  return commentLengthB - commentLengthA; //сортировка от большего к меньшему
}
