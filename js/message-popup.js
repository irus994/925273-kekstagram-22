import {editFormImg} from './slider.js'

const main = document.querySelector('main')
const templateSuccessMessage = document.querySelector('#success').content;
const templateErrorMessage = document.querySelector('#error').content;

//Создание сообщения успешной отправки
const renderMessageSuccess = () => {
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

  const onEscMessageSuccess = () => {
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        messageSuccessRoot.remove();
      }
    });
  };
  onEscMessageSuccess();

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
}
export {renderMessageSuccess};

//Создание сообщения ошибки
const renderMessageError = () => {
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

  const onEscMessageSuccess = () => {
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27 ) {
        main.querySelector('.error').remove();
      }
    });
  };
  onEscMessageSuccess();

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
export {renderMessageError};
