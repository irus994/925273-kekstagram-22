// import {createImages} from './data.js';
import {body} from './slider.js';
// import {commentTextInput, hashtagsInput} from './validation.js';

//Находим шаблон

let templatePicture = document.querySelector('#picture').content;
// console.log(templatePicture);

//Контейнер, куда будем добавлять изображения
let userPhotoContainer = document.querySelector('.pictures');
export {userPhotoContainer};

//Список фото пользователей = массиву случайно сгенирированных объектов - функции которую экспортировали
// const userPhotos = createImages(); // работающий код до подключения данных с сервера
// console.log(userPhotos)

//удаление загруженных ранее комментариев
const oldCommentRemove = () => {
  const userCommentАLL = document.querySelectorAll('.social__comment')
  for (let i = 0; i < userCommentАLL.length; i++) {
    userCommentАLL[i].remove();
  }
}

// новый код
const fullPhoto = document.querySelector('.big-picture');
const moreCommentButton = document.querySelector('.comments-loader');

const renderUserPhoto = function (userPhotos) {

  const userPhotosFragment = document.createDocumentFragment();

  userPhotos.forEach(({url, likes, comments}) => {
    const userPhoto = templatePicture.cloneNode(true);

    const Photo = userPhoto.querySelector('.picture');
    Photo.addEventListener('click', function (evt) {
      evt.preventDefault();
      fullPhoto.classList.remove('hidden');
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

moreCommentButton.addEventListener('click', function () {

  const hiddenComments = document.querySelectorAll('.social__comment.hidden')

  if (hiddenComments.length <= 5) {
    moreCommentButton.classList.add('hidden')
    for (let i = 0; i < hiddenComments.length; i++) {
      const hiddenComment = hiddenComments[i];
      hiddenComment.classList.remove('hidden');
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      const hiddenComment = hiddenComments[i];
      hiddenComment.classList.remove('hidden');
    }
  }
});


