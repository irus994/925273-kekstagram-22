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
};

const renderCommentsCount = (shownCount, totalCount) => {
  const startCommentsQuantity = document.querySelector('.social__comment-count');
  startCommentsQuantity.innerHTML = shownCount + ' из <span class="comments-count">' + totalCount + '</span> комментариев';
};


//Отрисовка фото на странице
export const renderUserPhoto = (userPhotos) => {

  const userPhotosFragment = document.createDocumentFragment();

  userPhotos.forEach(({url, likes, comments, description}) => {
    const userPhoto = templatePicture.cloneNode(true);

    const Photo = userPhoto.querySelector('.picture');
    Photo.addEventListener('click', (evt) => {
      const userFullPhotoBlock = document.querySelector('.big-picture');
      const userFullPhoto = userFullPhotoBlock.querySelector('img');
      const userFullPhotoLike = userFullPhotoBlock.querySelector('.likes-count');
      const userPhotoDescription = userFullPhotoBlock.querySelector('.social__caption');
      const startQuantity = comments.length < 5 ? comments.length : 5; //вывод количества комментариев к полноразмерному фото
      evt.preventDefault();
      fullPhoto.classList.remove('hidden');
      body.classList.add('modal-open');

      //вывод полноразмеоного фото
      userFullPhoto.src = url;

      //вывод количества лайков к полноразмерному фото
      userFullPhotoLike.textContent = likes;

      renderCommentsCount(startQuantity, comments.length);

      //вывод описания полноразмерного фото
      userPhotoDescription.textContent = description;

      oldCommentRemove()

      moreCommentButton.classList.toggle('hidden', comments.length <= 5);

      for (let i = 0; i < comments.length; i++) {
        const userCommentsBlock = document.querySelector('.social__comments');
        const userComment = document.createElement('li');
        const userCommentText = document.createElement('p');
        const userCommentImg = document.createElement('img');

        userCommentText.classList.add('social__text');
        userCommentText.textContent = comments[i].message;

        userCommentImg.classList.add('social__picture');
        userCommentImg.src = comments[i].avatar;
        userCommentImg.alt = comments[i].name;

        userComment.classList.add('social__comment');
        if (i >= 5) {
          userComment.classList.add('hidden');
        }
        userComment.appendChild(userCommentImg);
        userComment.appendChild(userCommentText);
        userCommentsBlock.appendChild(userComment);
      }
    });

    userPhoto.querySelector('.picture__img').src = url;
    userPhoto.querySelector('.picture__likes').textContent = likes;
    userPhoto.querySelector('.picture__comments').textContent = comments.length;

    userPhotosFragment.appendChild(userPhoto);
  });

  userPhotoContainer.appendChild(userPhotosFragment);
};

//Закрытие полноразмерного фото
export const closeFullPhoto = () => {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
}

export const addFullPhotoCloseHandler = () => {
  buttonCloseFullPhoto.addEventListener('click', () => {
    closeFullPhoto();
  });
};

export const addFullPhotoEscHandler = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeFullPhoto()
    }
  });
};

//кнопка "Загрузить еще", подгружающая по 5 новых комментов
export const addButtonLoadMoreHandler = () => {
  moreCommentButton.addEventListener('click', () => {
    const allComments = document.querySelectorAll('.social__comment');
    const allHiddenComments = document.querySelectorAll('.social__comment.hidden');
    const hiddenComments = Array.prototype.slice.call(document.querySelectorAll('.social__comment.hidden'), 0, 5);
    if (allHiddenComments.length <= 5) {
      moreCommentButton.classList.add('hidden');
    }
    for (let i = 0; i < hiddenComments.length; i++) {
      const hiddenComment = hiddenComments[i];
      hiddenComment.classList.remove('hidden');
    }
    renderCommentsCount(allComments.length - allHiddenComments.length + hiddenComments.length, allComments.length);
  });
};

//добавление лайка при нажатии на кнопку
export const addLikeHandler = () => {
  likeButton.addEventListener('click', () => {
    const isLikePressed = likeButton.classList.contains('.like-pressed')
    isLikePressed ? likeButton.textContent = Number(likeButton.textContent) - 1 : likeButton.textContent = Number(likeButton.textContent) + 1;
    likeButton.classList.toggle('.like-pressed');
  });
};


