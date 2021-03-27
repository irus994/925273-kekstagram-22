import './utils.js';
import './miniature.js';
import './slider.js';
import './validation.js';
import './filter.js';
import './server-exchange.js';
import './user-form.js';
import './message-popup.js';
import {addFilterRandomHandler, addFilterDefaultHandler, addFilterDiscussedHandler} from './filter.js';
import {
  closeFullPhoto,
  addButtonLoadMoreHandler,
  addFullPhotoCloseHandler,
  addLikeHandler,
  renderUserPhoto
} from './miniature.js';
import {PHOTO_COUNT, getGeneralData, openFilterBlock} from './server-exchange.js';
import {
  addOpenFormHandler,
  addCloseFormButtonHandler,
  addReduceButtonHandler,
  addIncreaseButtonHandler,
  addSliderEffect,
  addPhotoEffects,
  closeForm
} from './slider.js';
import {validateForm} from './validation.js';
import {userFormSubmit} from './user-form.js';

addFilterRandomHandler();
addFilterDefaultHandler();
addFilterDiscussedHandler();
closeFullPhoto();
addFullPhotoCloseHandler();
addButtonLoadMoreHandler();
addLikeHandler();
getGeneralData().then((userPhotos) => {
  renderUserPhoto(userPhotos.slice(0, PHOTO_COUNT));
});
openFilterBlock();
addOpenFormHandler();
addCloseFormButtonHandler();
addReduceButtonHandler();
addIncreaseButtonHandler();
addSliderEffect();
addPhotoEffects();
validateForm();
userFormSubmit(closeForm);
