import {renderUserPhoto} from './miniature.js';
import {closeForm} from './slider.js';
import {userFormSubmit} from './user-form.js';
import {showAlert, alertMessage} from './utils.js';

const PHOTO_COUNT = 25;

const getData = (() => {
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
      renderUserPhoto(userPhotos.slice(0, PHOTO_COUNT));
    });
});

//Сразу после загрузки изображений с сервера, открываем блок с фильтрами
const openFilterBlock = function () {
  const filterBlock = document.querySelector('.img-filters');
  filterBlock.classList.remove('img-filters--inactive');
};
openFilterBlock();

getData();
export {getData};
userFormSubmit(closeForm);

