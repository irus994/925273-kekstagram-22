import {renderUserPhoto} from './miniature.js';
import {closeForm} from './slider.js';
import {userFormSubmit} from './user-form.js';
import {showAlert} from './utils.js';

const photoCount = 25;

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

userFormSubmit(closeForm);
