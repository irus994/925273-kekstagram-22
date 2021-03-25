import {editFormImg} from './slider.js'

const main = document.querySelector('main')
const templateSuccessMessage = document.querySelector('#success').content;
const templateErrorMessage = document.querySelector('#error').content;

export const AddCloseOnEscHandler = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      const errorWindow = document.querySelector('.error');
      const successWindow = document.querySelector('.success');
      if (errorWindow) {
        errorWindow.remove();
      } else if (successWindow) {
        successWindow.remove();
      }
    }
  });
};

export const renderMessageSuccess = () => {
  const messageSuccess = templateSuccessMessage.cloneNode(true);
  const messageSuccessButton = messageSuccess.querySelector('.success__button');
  const messageSuccessRoot = messageSuccess.querySelector('.success');
  const messageSuccessInner = messageSuccess.querySelector('.success__inner');

  const onMessageSuccessButtonClick = () => {
    messageSuccessButton.addEventListener('click', () => {
      messageSuccessRoot.remove();
    });
  };
  onMessageSuccessButtonClick();

  const onMessageSuccessRoot = () => {
    messageSuccessRoot.addEventListener('click', () => {
      messageSuccessRoot.remove();
    });
  };
  onMessageSuccessRoot();

  const onMessageSuccessInner = () => {
    messageSuccessInner.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  };
  onMessageSuccessInner();
  main.appendChild(messageSuccess);
};

//Создание сообщения ошибки отправки

export const renderMessageError = () => {
  const messageError = templateErrorMessage.cloneNode(true);
  const messageErrorButton = messageError.querySelector('.error__button');
  const messageErrorRoot = messageError.querySelector('.error');
  const messageErrorInner = messageError.querySelector('.error__inner');

  editFormImg.classList.add('hidden');

  const onMessageErrorButtonClick = () => {
    messageErrorButton.addEventListener('click', () => {
      main.querySelector('.error').remove();
    });
  };
  onMessageErrorButtonClick();

  const onMessageErrorRoot = () => {
    messageErrorRoot.addEventListener('click', () => {
      messageErrorRoot.remove();
    });
  };
  onMessageErrorRoot();

  const onMessageErrorInner = () => {
    messageErrorInner.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  };
  onMessageErrorInner();
  main.appendChild(messageError);
}
