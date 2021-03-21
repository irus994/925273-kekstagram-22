import {showAlert, alertMessage} from './utils.js';
import {renderMessageError, renderMessageSuccess} from './message-popup.js'

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
          renderMessageSuccess();
        } else {
          renderMessageError();
          showAlert(alertMessage);
        }
      })
      .catch(() => {
        renderMessageError();
        showAlert(alertMessage);
      })
  });
};

export {userFormSubmit}


