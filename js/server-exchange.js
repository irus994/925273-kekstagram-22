
import {showAlert, ALTER_MESSAGE} from './utils.js';
const filterBlock = document.querySelector('.img-filters');

export const PHOTO_COUNT = 25;

export const getGeneralData = () =>
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        showAlert(ALTER_MESSAGE);
      }
    })
    .catch(() => {
      showAlert(ALTER_MESSAGE);
    });

//Сразу после загрузки изображений с сервера, открываем блок с фильтрами
export const openFilterBlock = () => {
  //зачем ее выносить, если она используется 1 раз
  // const filterBlock = document.querySelector('.img-filters');
  filterBlock.classList.remove('img-filters--inactive');
};
