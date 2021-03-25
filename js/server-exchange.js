import {renderUserPhoto} from './miniature.js';
import {closeForm} from './slider.js';
import {userFormSubmit} from './user-form.js';
import {showAlert, ALTER_MESSAGE} from './utils.js';

const PHOTO_COUNT = 25;

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
    })

export const getData = (() => {
  getGeneralData()
    .then((userPhotos) => {
      renderUserPhoto(userPhotos.slice(0, PHOTO_COUNT));
    });
});

//Сразу после загрузки изображений с сервера, открываем блок с фильтрами
export const openFilterBlock = () => {
  const filterBlock = document.querySelector('.img-filters');
  filterBlock.classList.remove('img-filters--inactive');
};

userFormSubmit(closeForm);
