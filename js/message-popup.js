import {editFormImg} from './slider.js'

const main = document.querySelector('main')
const templateSuccessMessage = document.querySelector('#success').content;
const templateErrorMessage = document.querySelector('#error').content;

//Создание сообщения успешной отправки
const renderMessageSuccess = function () {
  const messageSuccess = templateSuccessMessage.cloneNode(true);
  const messageSuccessButton = messageSuccess.querySelector('.success__button');
  const messageSuccessRoot = messageSuccess.querySelector('.success');
  const messageSuccessInner = messageSuccess.querySelector('.success__inner');

  messageSuccessButton.addEventListener('click', function () {
    messageSuccessRoot.remove();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 ) {
      messageSuccessRoot.remove();
    }
  });

  messageSuccessRoot.addEventListener('click', function() {
    messageSuccessRoot.remove();
  });

  messageSuccessInner.addEventListener('click', function(evt) {
    evt.stopPropagation();
  });

  main.appendChild(messageSuccess);
}
export {renderMessageSuccess};

//Создание сообщения ошибки
const renderMessageError = function () {
  const messageError = templateErrorMessage.cloneNode(true);
  const messageErrorButton = messageError.querySelector('.error__button');
  const messageErrorRoot = messageError.querySelector('.error');
  const messageErrorInner = messageError.querySelector('.error__inner');

  editFormImg.classList.add('hidden');

  messageErrorButton.addEventListener('click', function () {
    main.querySelector('.error').remove();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 ) {
      main.querySelector('.error').remove();
    }
  });

  messageErrorRoot.addEventListener('click', function() {
    messageErrorRoot.remove();
  });

  messageErrorInner.addEventListener('click', function(evt) {
    evt.stopPropagation();
  });

  main.appendChild(messageError);
}
export {renderMessageError};
