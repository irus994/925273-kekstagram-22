import {commentTextInput, hashtagsInput} from './validation.js'

//Найдем поле для загрузки изображения
const imgUploadInput = document.querySelector('#upload-file');
export const editFormImg = document.querySelector('.img-upload__overlay'); //Найдем всплывающее окно с формой редактирования добавленного фото
export const body = document.querySelector('body');
const closeFormButton = document.querySelector('#upload-cancel');
//Найдем кнопки для изменения масштаба картинки и поле значения
const imgSmallerButton = document.querySelector('.scale__control--smaller');
const imgBiggerButton = document.querySelector('.scale__control--bigger');
const scaleImgValue = document.querySelector('.scale__control--value');
const imgPhoto = document.querySelector('.img-upload__img');
//Иконки фильтров
const effectOrigin = document.querySelector('.effects__preview--none');
const effectChrome = document.querySelector('.effects__preview--chrome');
const effectSepia = document.querySelector('.effects__preview--sepia');
const effectMarvin = document.querySelector('.effects__preview--marvin');
const effectPhobos = document.querySelector('.effects__preview--phobos');
const effectHeat = document.querySelector('.effects__preview--heat');
const effectLevelSlider = document.querySelector('.effect-level');
//Слайдер
const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
let startValue = scaleImgValue.value //берем значение из HTML разметки
let scaleStep = 25;
let minScaleValue = 25;
let maxScaleValue = 100;

// 1) Загрузка изображения

//Открытие формы редактирование при выборе изображения
const onOpenForm = () => {
  imgUploadInput.addEventListener('input', function () {
    effectLevelSlider.classList.add('hidden');
    editFormImg.classList.remove('hidden');
    body.classList.add('modal-open');
  });
};
onOpenForm();

//Универсальная функция закрытия формы
const closeForm = () => {
  const effectOriginInput = document.querySelector('#effect-none');
  editFormImg.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashtagsInput.value = '';
  commentTextInput.value = '';
  imgPhoto.style.transform = 'scale(1)';
  scaleImgValue.value = '100%';
  startValue = '100%';
  effectOriginInput.checked = true;
  imgPhoto.style.filter = 'none';
}
export {closeForm}

const onCloseFormButtonClick = () => {
  closeFormButton.addEventListener('click', function () {
    closeForm()
  });
};
onCloseFormButtonClick()

const onCloseFormButtonEckClick = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && commentTextInput !== document.activeElement && hashtagsInput !== document.activeElement) {
      closeForm()
    }
  });
}
onCloseFormButtonEckClick();

// 2) Редактирование изображения

// Реализуем функциональность кнопок изменяющих масштаб фото (уменьшмющих и увеличивающих)
scaleImgValue.value = '100%'; // т.к. в ТЗ указано значение по умолчанию = 100%

const onImgSmallerButtonClick = () => {
  imgSmallerButton.addEventListener('click', function () {
    if (startValue <= minScaleValue || (parseInt(startValue) - parseInt(scaleStep)) <= minScaleValue) {
      startValue = minScaleValue + '%';
      scaleImgValue.value = startValue;
      imgPhoto.style.transform = 'scale(' + minScaleValue / 100 + ')';
    } else {
      startValue = parseInt(startValue) - parseInt(scaleStep);
      scaleImgValue.value = startValue + '%';
      imgPhoto.style.transform = 'scale(' + startValue / 100 + ')';
    }
  });
};
onImgSmallerButtonClick();

const onImgBiggerButtonClick = () => {
  imgBiggerButton.addEventListener('click', function () {
    if (startValue >= maxScaleValue || (parseInt(startValue) + parseInt(scaleStep)) >= maxScaleValue) {
      startValue = maxScaleValue + '%';
      scaleImgValue.value = startValue;
      imgPhoto.style.transform = 'scale(' + maxScaleValue / 100 + ')';
    } else {
      startValue = parseInt(startValue) + parseInt(scaleStep);
      scaleImgValue.value = startValue + '%';
      imgPhoto.style.transform = 'scale(' + startValue / 100 + ')';
    }
  });
};
onImgBiggerButtonClick();

//Слайдер
window.noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
});

// handle - имя продвинутого бегунка,
// unencoded - все значения

slider.noUiSlider.on('update', (_, handle, unencoded) => {
  sliderInput.value = unencoded[handle];
  const effects = document.querySelector('.effects__radio:checked');
  const switchEffects = (effect) => {
    switch (effect) {
      case 'none':
        imgPhoto.style.filter = 'none';
        break;
      case 'chrome':
        imgPhoto.style.filter = 'grayscale( ' +  sliderInput.value / 100 + ')';
        break;
      case 'sepia':
        imgPhoto.style.filter = 'sepia( ' +  sliderInput.value / 100 + ')';
        break;
      case 'marvin':
        imgPhoto.style.filter = 'invert( ' + Math.round(sliderInput.value) + '%)';
        break;
      case 'phobos':
        imgPhoto.style.filter = 'blur( ' +  Math.round(sliderInput.value / 3.3) / 10 + 'px)';
        break;
      case 'heat':
        imgPhoto.style.filter = 'brightness( ' +  Math.round(sliderInput.value / 3.3) / 10 + ')';
        break;
    }
  };
  switchEffects(effects.value);
});


//Наложение эффектов
const addPhotoEffects = () => {
  effectOrigin.classList.add('effects__radio:checked');

  const onEffectOriginClick = function () {
    effectOrigin.addEventListener('click', function () {
      effectLevelSlider.classList.add('hidden');
      slider.noUiSlider.set(100);
      imgPhoto.style.filter = 'none';
    });
  };
  onEffectOriginClick();

  const onEffectChromeClick = () => {
    effectChrome.addEventListener('click', function () {
      effectLevelSlider.classList.remove('hidden');
      slider.noUiSlider.set(100);
      imgPhoto.style.filter = 'grayscale( ' + sliderInput.value / 100 + ')';
    });
  }
  onEffectChromeClick();

  const onEffectSepiaClick = () => {
    effectSepia.addEventListener('click', function () {
      effectLevelSlider.classList.remove('hidden');
      slider.noUiSlider.set(100);
      imgPhoto.style.filter = 'sepia( ' + sliderInput.value / 100 + ')';
    });
  };
  onEffectSepiaClick();

  const onEffectMarvinClick = () => {
    effectMarvin.addEventListener('click', function () {
      effectLevelSlider.classList.remove('hidden');
      slider.noUiSlider.set(100)
      imgPhoto.style.filter = 'invert( ' + Math.round(sliderInput.value) + '%)';
    });
  };
  onEffectMarvinClick();

  const onEffectPhobosClick = () => {
    effectPhobos.addEventListener('click', function () {
      effectLevelSlider.classList.remove('hidden');
      slider.noUiSlider.set(100)
      imgPhoto.style.filter = 'blur( ' + Math.round(sliderInput.value / 3.3) / 10 + 'px)';
    });
  };
  onEffectPhobosClick();

  const onEffectHeatClick = () => {
    effectHeat.addEventListener('click', function () {
      effectLevelSlider.classList.remove('hidden');
      slider.noUiSlider.set(100)
      imgPhoto.style.filter = 'brightness( ' + Math.round(sliderInput.value / 3.3) / 10 + ')';
    });
  };
  onEffectHeatClick();
};
addPhotoEffects();
