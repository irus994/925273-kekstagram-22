import {body} from './slider.js';

const templatePicture = document.querySelector('#picture').content; //Находим шаблон
export const userPhotoContainer = document.querySelector('.pictures'); //Контейнер, куда будем добавлять изображения
const fullPhoto = document.querySelector('.big-picture'); //Отрисовка миниатюр и полноразмерного фото
const moreCommentButton = document.querySelector('.comments-loader');
const likeButton = document.querySelector('.likes-count')
const buttonCloseFullPhoto = document.querySelector('.big-picture__cancel')

//удаление загруженных ранее комментариев
const oldCommentRemove = () => {
  const userCommentАLL = document.querySelectorAll('.social__comment')
  for (let i = 0; i < userCommentАLL.length; i++) {
    userCommentАLL[i].remove();
  }
}

//Отрисовка фото на странице
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
const closeFullPhoto = function () {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
}
closeFullPhoto();

const onFullPhotoClose = function () {
  buttonCloseFullPhoto.addEventListener('click', function () {
    closeFullPhoto();
  });
};
onFullPhotoClose();

const onFullPhotoEscClose = function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closeFullPhoto()
    }
  });
};
onFullPhotoEscClose();

//кнопка "Загрузить еще", подгружающая по 5 новых комментов

const onButtonLoadMoreClick = function () {
  const allHiddenComments = document.querySelectorAll('.social__comment.hidden');
  const hiddenComments = Array.prototype.slice.call(document.querySelectorAll('.social__comment.hidden'), 0, 5);

  moreCommentButton.addEventListener('click', function () {
    if (allHiddenComments.length <= 5) {
      moreCommentButton.classList.add('hidden')
    }
    for (let i = 0; i < hiddenComments.length; i++) {
      const hiddenComment = hiddenComments[i];
      hiddenComment.classList.remove('hidden');
    }
  });
};
onButtonLoadMoreClick();


//добавление лайка при нажатии на кнопку
const onLikeButtonClick = function () {
  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('.like-pressed')) {
      likeButton.textContent = Number(likeButton.textContent) - 1;
      likeButton.classList.remove('.like-pressed');
    } else {
      likeButton.textContent = Number(likeButton.textContent) + 1;
      likeButton.classList.add('.like-pressed');
    }
  });
};
onLikeButtonClick();
