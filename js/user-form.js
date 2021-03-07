import {showAlert} from './utils.js';

const userForm = document.querySelector('.img-upload__form');

const userFormSubmit = function (onSuccess) {

  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch('https://22.javascript.pages.academy/kekstagram/',
      {
        method: 'POST',
        body: formData, //  определяем тело запроса - данные из формы (FormData)
      })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          showAlert('Не удалось отправить форму. Попробуйте еще раз');
        }
      })
      .catch(() => {
        showAlert('Не удалось отправить форму. Попробуйте еще раз');
      })
  });
};

export {userFormSubmit}


