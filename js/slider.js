import {commentTextInput} from './validation.js'
import {hashtagsInput} from './validation.js'

//Найдем поле для загрузки изображения
const imgUploadInput = document.querySelector('#upload-file');
//Найдем всплывающее окно с формой редактирования добавленного фото
const editFormImg = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeFormButton = document.querySelector('#upload-cancel');

// 1) Загрузка изображения

//Открытие формы редактирование при выборе изображения
imgUploadInput.addEventListener('input', function () {
  editFormImg.classList.remove('hidden');
  body.classList.add('modal-open');
});

//Универсальная функция закрытия формы
const closeForm = function () {
  editFormImg.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
}

export {closeForm}

//Закрытие формы редактирования нажатием на крестик
closeFormButton.addEventListener('click', function () {
  closeForm()
});

//Закрытие формы редактирования нажатием на esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 && commentTextInput !== document.activeElement && hashtagsInput !== document.activeElement) {
    closeForm()
  }
});




// 2) Редактирование изображения

//Найдем кнопки для изменения масштаба картинки и поле значения

const imgSmallerButton = document.querySelector('.scale__control--smaller');
const imgBiggerButton = document.querySelector('.scale__control--bigger');
const scaleImgValue = document.querySelector('.scale__control--value');
const imgPhoto = document.querySelector('.img-upload__img');

// Реализуем функциональность кнопок изменяющих масштаб фото (уменьшмющих и увеличивающих)

scaleImgValue.value = '100%'; // т.к. в ТЗ указано значение по умолчанию = 100%
let startValue = scaleImgValue.value //берем значение из HTML разметки
let scaleStep = 25;
let minScaleValue = 25;
let maxScaleValue = 100;

imgSmallerButton.addEventListener('click', function () {
  if (startValue <= minScaleValue || (parseInt(startValue) - parseInt(scaleStep)) <= minScaleValue) {
    startValue = minScaleValue + '%';
    scaleImgValue.value = startValue;
    imgPhoto.style.transform = 'scale('+ minScaleValue / 100 + ')';
  } else {
    startValue = parseInt(startValue) - parseInt(scaleStep);
    scaleImgValue.value = startValue + '%';
    imgPhoto.style.transform = 'scale('+ startValue / 100 + ')';
  }
});

imgBiggerButton.addEventListener('click', function () {
  if (startValue >= maxScaleValue || (parseInt(startValue) + parseInt(scaleStep)) >= maxScaleValue) {
    startValue = maxScaleValue + '%';
    scaleImgValue.value = startValue;
    imgPhoto.style.transform = 'scale('+ maxScaleValue / 100 + ')';
  } else {
    startValue = parseInt(startValue) + parseInt(scaleStep);
    scaleImgValue.value = startValue + '%';
    imgPhoto.style.transform = 'scale('+ startValue / 100 + ')';
  }
});


//Слайдер

const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');

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
  // console.log(effects.value);
  const switchEffects = function (effect) {
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
  // console.log(switchEffects(effects.value))
});



//Наложение эффектов
const effectChrome = document.querySelector('.effects__preview--chrome');
const effectOrigin = document.querySelector('.effects__preview--none');
const effectSepia = document.querySelector('.effects__preview--sepia');
const effectMarvin = document.querySelector('.effects__preview--marvin');
const effectPhobos = document.querySelector('.effects__preview--phobos');
const effectHeat = document.querySelector('.effects__preview--heat');


effectChrome.addEventListener('click', function () {
  slider.noUiSlider.set(100)
  imgPhoto.style.filter = 'grayscale( ' +  sliderInput.value / 100 + ')';

})

effectOrigin.addEventListener('click', function () {
  slider.noUiSlider.set(100);
  imgPhoto.style.filter = 'none';
})

effectSepia.addEventListener('click', function () {
  slider.noUiSlider.set(100);
  imgPhoto.style.filter = 'sepia( ' +  sliderInput.value / 100 + ')';
  // console.log(imgPhoto.style.filter);
})

effectMarvin.addEventListener('click', function () {
  slider.noUiSlider.set(100)
  imgPhoto.style.filter = 'invert( ' + Math.round(sliderInput.value) + '%)';
  // console.log(imgPhoto.style.filter);
})

effectPhobos.addEventListener('click', function () {
  slider.noUiSlider.set(100)
  imgPhoto.style.filter = 'blur( ' +  Math.round(sliderInput.value / 3.3) / 10 + 'px)';
  // console.log(imgPhoto.style.filter);
})

effectHeat.addEventListener('click', function () {
  slider.noUiSlider.set(100)
  imgPhoto.style.filter = 'brightness( ' +  Math.round(sliderInput.value / 3.3) / 10 + ')';
  // console.log(imgPhoto.style.filter);
})

