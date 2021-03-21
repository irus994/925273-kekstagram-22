
const main = document.querySelector('main')
const templateSuccessMessage = document.querySelector('#success').content;


const renderMessageSuccess = function () {
  const messageSuccess = templateSuccessMessage.cloneNode(true);
  const messageSuccessButton = messageSuccess.querySelector('.success__button');

  main.appendChild(messageSuccess);

  messageSuccessButton.addEventListener('click', function () {
    main.querySelector('.success').remove();
  });
}

export {renderMessageSuccess};
