
import {showAlert, ALTER_MESSAGE} from './utils.js';
const filterBlock = document.querySelector('.img-filters');

export const PHOTO_COUNT = 25;

let data = null;

export const getGeneralData = () => {
  if (data) {
    return data;
  }
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        data = response.json()
        return data
      } else {
        showAlert(ALTER_MESSAGE);
      }
    })
    .catch(() => {
      showAlert(ALTER_MESSAGE);
    });
}
//Сразу после загрузки изображений с сервера, открываем блок с фильтрами
export const openFilterBlock = () => {
  filterBlock.classList.remove('img-filters--inactive');
};
