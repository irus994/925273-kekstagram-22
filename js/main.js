import './utils.js';
import './miniature.js';
import './slider.js';
import './validation.js';
import './filter.js';
import './server-exchange.js';
import './user-form.js';
import './message-popup.js';

import {
  addFilterRandomHandler,
  addFilterDefaultHandler,
  addFilterDiscussedHandler
} from './filter.js';
addFilterRandomHandler();
addFilterDefaultHandler();
addFilterDiscussedHandler();

import {
  closeFullPhoto,
  addButtonLoadMoreHandler,
  addFullPhotoCloseHandler,
  addFullPhotoEscHandler,
  addLikeHandler
} from './miniature.js';
closeFullPhoto();
addFullPhotoCloseHandler();
addFullPhotoEscHandler();
addButtonLoadMoreHandler();
addLikeHandler();

import {
  getData,
  openFilterBlock
} from './server-exchange.js';
getData();
openFilterBlock();

import {
  addOpenFormHandler,
  addCloseFormButtonHandler,
  addCloseFormEckHandler,
  addReduceButtonHandler,
  addIncreaseButtonHandler,
  addSliderEffect,
  addPhotoEffects
} from './slider.js';

addOpenFormHandler();
addCloseFormButtonHandler();
addCloseFormEckHandler();
addReduceButtonHandler();
addIncreaseButtonHandler();
addSliderEffect();
addPhotoEffects();

import {onFormValidation} from './validation.js';
onFormValidation();

import {AddCloseOnEscHandler} from './message-popup.js';
AddCloseOnEscHandler();
