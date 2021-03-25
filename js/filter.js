/*global _*/

import {renderUserPhoto} from './miniature.js';
import {getData, getGeneralData} from './server-exchange.js'

//находим кнопки фильтров
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const RERENDER_DELAY = 500; //задержка отрисовки (устранение дребезга)

//функция для рандомного перемешивания массива
const shuffle = (array) => {
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
export const addFilterRandomHandler = () => {
  filterRandom.addEventListener('click', _.debounce(() => {
    oldDataRemove();
    getGeneralData()
      .then((userPhotos) => {
        renderUserPhoto(shuffle(userPhotos).slice(0, 10));
      });
  }, RERENDER_DELAY));
};

//фильтр - по умолчанию, сбрасывает к изначальной сортировке
export const addFilterDefaultHandler = () => {
  filterDefault.addEventListener('click', _.debounce(() => {
    oldDataRemove();
    getData();
  }, RERENDER_DELAY));
};

//фильтр - сортировка по обсуждаемости
export const addFilterDiscussedHandler = () => {
  filterDiscussed.addEventListener('click', _.debounce(() => {
    oldDataRemove();
    getGeneralData()
      .then((userPhotos) => {
        renderUserPhoto(userPhotos.slice().sort(sortComments));
      });
  }, RERENDER_DELAY));
};

//функция для сортировки комментов
const sortComments = (userPhotoA, userPhotoB) => userPhotoB.comments.length - userPhotoA.comments.length; //сортировка от большего к меньшему

