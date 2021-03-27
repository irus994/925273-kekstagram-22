import {editFormImg} from './slider.js'

const main = document.querySelector('main')
const templateSuccessMessage = document.querySelector('#success').content;
const templateErrorMessage = document.querySelector('#error').content;

export const renderMessageSuccess = () => {
  const messageSuccess = templateSuccessMessage.cloneNode(true);
  const messageSuccessButton = messageSuccess.querySelector('.success__button');
  const messageSuccessRoot = messageSuccess.querySelector('.success');
  const messageSuccessInner = messageSuccess.querySelector('.success__inner');

  const addEscClickHandler = (evt) => {
    if (evt.keyCode === 27) {
      messageSuccessRoot.remove();
      document.removeEventListener('keydown', addEscClickHandler)
    }
  };

  const  closeMessage = () => {
    messageSuccessRoot.remove();
    document.removeEventListener('keydown', addEscClickHandler)
  }

  document.addEventListener('keydown', addEscClickHandler)

  messageSuccessButton.addEventListener('click', () => {
    closeMessage();
  });

  messageSuccessRoot.addEventListener('click', () => {
    closeMessage();
  });

  messageSuccessInner.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  main.appendChild(messageSuccess);
};

//Создание сообщения ошибки отправки

export const renderMessageError = () => {
  const messageError = templateErrorMessage.cloneNode(true);
  const messageErrorButton = messageError.querySelector('.error__button');
  const messageErrorRoot = messageError.querySelector('.error');
  const messageErrorInner = messageError.querySelector('.error__inner');

  editFormImg.classList.add('hidden');

  const addEscClickHandler = (evt) => {
    if (evt.keyCode === 27) {
      messageErrorRoot.remove();
      document.removeEventListener('keydown', addEscClickHandler)
    }
  };

  const  closeMessage = () => {
    messageErrorRoot.remove();
    document.removeEventListener('keydown', addEscClickHandler)
  }

  document.addEventListener('keydown', addEscClickHandler)

  messageErrorButton.addEventListener('click', () => {
    closeMessage();
  });

  messageErrorRoot.addEventListener('click', () => {
    closeMessage();
  });

  messageErrorInner.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  main.appendChild(messageError);
}
