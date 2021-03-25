
export const commentTextInput = document.querySelector('.text__description');
export const hashtagsInput = document.querySelector('.text__hashtags');
const validHashtagSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', 'a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const onFormValidation = () => {
  hashtagsInput.addEventListener('input', () => {
    const hashtags = hashtagsInput.value.trim().toLowerCase().split(' ');
    hashtagsInput.setCustomValidity('')
    hashtagsInput.classList.remove('text__hashtags--error');
    hashtagsInput.reportValidity();
    if (hashtagsInput.value === '') {
      return;
    }
    if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('не более 5 хэш-тегов');
      hashtagsInput.reportValidity()
      return;
    }
    if (!((new Set(hashtags)).size === hashtags.length)) {
      hashtagsInput.setCustomValidity('хэш-тег не должены повторяться');
      hashtagsInput.reportValidity()
      return;
    }
    for (let i = 0; i < hashtags.length; i++) {
      const hashtag = hashtags[i];
      if (!(hashtag[0] === '#')) {
        hashtagsInput.setCustomValidity('хэш-тег должен начинаться с #');
        hashtagsInput.reportValidity()
        return;
      }
      if (hashtag.length === 1) {
        hashtagsInput.setCustomValidity('хэш-тег не должен быть пустым');
        hashtagsInput.reportValidity()
        return;
      }
      if (hashtag.length >= 20) {
        hashtagsInput.setCustomValidity('длинна хэш-тега не более 20 символов');
        hashtagsInput.reportValidity()
        return;
      }
      for (let j = 1; j < hashtag.length; j++) {
        if (!validHashtagSymbols.includes(hashtag[j])) {
          hashtagsInput.setCustomValidity('недопустимые символы')
          hashtagsInput.reportValidity()
          return;
        }
      }
    }
    hashtagsInput.reportValidity();
  });
};

