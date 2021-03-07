import {renderUserPhoto} from './miniature.js';
import {closeForm} from './slider.js';
import {userFormSubmit} from './user-form.js';
import {showAlert} from './utils.js';

const photoCount = 25;

const getData = (() => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        showAlert('Ошибка, попробуйте еще раз');
      }
    })
    .catch(() => {
      showAlert('Ошибка, попробуйте еще раз');
    })
    .then((userPhoto) => {
      renderUserPhoto(userPhoto.slice(0, photoCount));
    });
  //Сразу после загрузки изображений с сервера, открываем блок с фильтрами
  const filterBlock = document.querySelector('.img-filters');
  filterBlock.classList.remove('img-filters--inactive');
});


getData();
export {getData};
userFormSubmit(closeForm);

