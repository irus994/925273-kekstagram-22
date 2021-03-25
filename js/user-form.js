import {showAlert, ALTER_MESSAGE} from './utils.js';
import {renderMessageError, renderMessageSuccess} from './message-popup.js'

const userForm = document.querySelector('.img-upload__form');

export const userFormSubmit = (onSuccess) => {

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
          showAlert(ALTER_MESSAGE);
        }
      })
      .catch(() => {
        renderMessageError();
        showAlert(ALTER_MESSAGE);
      })
  });
};
