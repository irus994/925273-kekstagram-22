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
export const addOpenFormHandler = () => {
  imgUploadInput.addEventListener('input', () => {
    effectLevelSlider.classList.add('hidden');
    editFormImg.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', addCloseEckHandler);
  });
};

//Универсальная функция закрытия формы
export const closeForm = () => {
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
  document.removeEventListener('keydown', addCloseEckHandler);
}

export const addCloseFormButtonHandler = () => {
  closeFormButton.addEventListener('click', () => {
    closeForm()
  });
};

const addCloseEckHandler = (evt) => {
  if (evt.keyCode === 27 && commentTextInput !== document.activeElement && hashtagsInput !== document.activeElement) {
    closeForm()
  }
}


// 2) Редактирование изображения

// Реализуем функциональность кнопок изменяющих масштаб фото (уменьшмющих и увеличивающих)
scaleImgValue.value = '100%'; // т.к. в ТЗ указано значение по умолчанию = 100%

export const addReduceButtonHandler = () => {
  imgSmallerButton.addEventListener('click', () => {
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

export const addIncreaseButtonHandler = () => {
  imgBiggerButton.addEventListener('click', () => {
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

//Слайдер
export const addSliderEffect = () => {
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
          imgPhoto.style.filter = 'grayscale( ' + sliderInput.value / 100 + ')';
          break;
        case 'sepia':
          imgPhoto.style.filter = 'sepia( ' + sliderInput.value / 100 + ')';
          break;
        case 'marvin':
          imgPhoto.style.filter = 'invert( ' + Math.round(sliderInput.value) + '%)';
          break;
        case 'phobos':
          imgPhoto.style.filter = 'blur( ' + Math.round(sliderInput.value / 3.3) / 10 + 'px)';
          break;
        case 'heat':
          imgPhoto.style.filter = 'brightness( ' + Math.round(sliderInput.value / 3.3) / 10 + ')';
          break;
      }
    };
    switchEffects(effects.value);
  });
};


//Наложение эффектов
export const addPhotoEffects = () => {
  effectOrigin.classList.add('effects__radio:checked');

  effectOrigin.addEventListener('click', () => {
    effectLevelSlider.classList.add('hidden');
    slider.noUiSlider.set(100);
    imgPhoto.style.filter = 'none';
  });

  effectChrome.addEventListener('click', () => {
    effectLevelSlider.classList.remove('hidden');
    slider.noUiSlider.set(100);
    imgPhoto.style.filter = 'grayscale( ' + sliderInput.value / 100 + ')';
  });

  effectSepia.addEventListener('click', () => {
    effectLevelSlider.classList.remove('hidden');
    slider.noUiSlider.set(100);
    imgPhoto.style.filter = 'sepia( ' + sliderInput.value / 100 + ')';
  });

  effectMarvin.addEventListener('click', () => {
    effectLevelSlider.classList.remove('hidden');
    slider.noUiSlider.set(100)
    imgPhoto.style.filter = 'invert( ' + Math.round(sliderInput.value) + '%)';
  });

  effectPhobos.addEventListener('click', () => {
    effectLevelSlider.classList.remove('hidden');
    slider.noUiSlider.set(100)
    imgPhoto.style.filter = 'blur( ' + Math.round(sliderInput.value / 3.3) / 10 + 'px)';
  });

  effectHeat.addEventListener('click', () => {
    effectLevelSlider.classList.remove('hidden');
    slider.noUiSlider.set(100)
    imgPhoto.style.filter = 'brightness( ' + Math.round(sliderInput.value / 3.3) / 10 + ')';
  });
};
