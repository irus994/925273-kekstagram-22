// import {createImages} from './data.js';
import {body} from './slider.js';

//Находим шаблон
let templatePicture = document.querySelector('#picture').content;
// console.log(templatePicture);

//Контейнер, куда будем добавлять изображения
let userPhotoContainer = document.querySelector('.pictures');
export {userPhotoContainer};

//Список фото пользователей = массиву случайно сгенирированных объектов - функции которую экспортировали
// const userPhotos = createImages(); // работающий код до подключения данных с сервера

//удаление загруженных ранее комментариев
const oldCommentRemove = () => {
  const userCommentАLL = document.querySelectorAll('.social__comment')
  for (let i = 0; i < userCommentАLL.length; i++) {
    userCommentАLL[i].remove();
  }
}

//Отрисовка миниатюр и полноразмерного фото
const fullPhoto = document.querySelector('.big-picture');
const moreCommentButton = document.querySelector('.comments-loader');

const renderUserPhoto = function (userPhotos) {

  const userPhotosFragment = document.createDocumentFragment();

  userPhotos.forEach(({url, likes, comments, description}) => {
    const userPhoto = templatePicture.cloneNode(true);

    const Photo = userPhoto.querySelector('.picture');
    Photo.addEventListener('click', function (evt) {
      evt.preventDefault();
      fullPhoto.classList.remove('hidden');
      body.classList.add('modal-open');

      //вывод полноразмеоного фото
      const userFullPhotoBlock = document.querySelector('.big-picture');
      const userFullPhoto = userFullPhotoBlock.querySelector('img');
      userFullPhoto.src = url;

      //вывод количества лайков к полноразмерному фото
      const userFullPhotoLike = userFullPhotoBlock.querySelector('.likes-count');
      userFullPhotoLike.textContent = likes;

      //вывод количества комментариев к полноразмерному фото
      const userFullPhotoComments = userFullPhotoBlock.querySelector('.comments-count');
      userFullPhotoComments.textContent = comments.length;

      //вывод описания полноразмерного фото
      const userPhotoDescription = userFullPhotoBlock.querySelector('.social__caption');
      userPhotoDescription.textContent = description;

      oldCommentRemove()

      if (comments.length <= 5) {
        moreCommentButton.classList.add('hidden');
      } else {
        moreCommentButton.classList.remove('hidden');
      }

      for (let i = 0; i < comments.length; i++) {
        const userCommentsBlock = document.querySelector('.social__comments');
        const userComment = document.createElement('li');
        const userCommentText = document.createElement('p');
        const userCommentImg = document.createElement('img');
        userComment.classList.add('social__comment');
        if (i >= 5) {
          userComment.classList.add('hidden');
        }
        userCommentText.classList.add('social__text');
        userCommentImg.classList.add('social__picture');
        userCommentText.textContent = comments[i].message;
        userCommentImg.src = comments[i].avatar;
        userCommentImg.alt = comments[i].name;

        userComment.appendChild(userCommentImg);
        userComment.appendChild(userCommentText);
        userCommentsBlock.appendChild(userComment);
      }
    })

    userPhoto.querySelector('.picture__img').src = url;
    userPhoto.querySelector('.picture__likes').textContent = likes;
    userPhoto.querySelector('.picture__comments').textContent = comments.length;

    userPhotosFragment.appendChild(userPhoto);
  });

  userPhotoContainer.appendChild(userPhotosFragment);
};

export {renderUserPhoto};

//Закрытие полноразмерного фото
const buttonCloseFullPhoto = document.querySelector('.big-picture__cancel')

const closeFullPhoto = function () {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
}

buttonCloseFullPhoto.addEventListener('click', function () {
  closeFullPhoto();
})

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 ) {
    closeFullPhoto()
  }
});

closeFullPhoto();

//кнопка "Загрузить еще", подгружающая по 5 новых комментов
moreCommentButton.addEventListener('click', function () {
  const allHiddenComments = document.querySelectorAll('.social__comment.hidden');
  const hiddenComments = Array.prototype.slice.call(document.querySelectorAll('.social__comment.hidden'), 0, 5);
  if (allHiddenComments.length <= 5) {
    moreCommentButton.classList.add('hidden')
  }
  for (let i = 0; i < hiddenComments.length; i++) {
    const hiddenComment = hiddenComments[i];
    hiddenComment.classList.remove('hidden');
  }
});

//добавление лайка при нажатии на кнопку
const likeButton = document.querySelector('.likes-count')

likeButton.addEventListener('click', function () {
  if (likeButton.classList.contains('.like-pressed')) {
    likeButton.textContent = Number(likeButton.textContent) - 1;
    likeButton.classList.remove('.like-pressed');
  } else {
    likeButton.textContent = Number(likeButton.textContent) + 1;
    likeButton.classList.add('.like-pressed');
  }
})
