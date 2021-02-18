
const slider = document.querySelector('.effect-level__slider');
// console.log(slider);

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});

