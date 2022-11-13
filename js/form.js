import { sendData } from './api.js';
import { disablePage } from './utile.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { setStartView } from './map.js';

const MAX_LENGTH_TITLE = 100;
const MIN_LENGTH_TITLE = 30;
const MAX_VALUE_PRICE = 100000;
const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const ROOMS = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2' , '1'],
  100: ['0'],
};

const offerForm = document.querySelector('.ad-form');
const titleField = offerForm.querySelector('#title');
const checkFieldset = offerForm.querySelector('.ad-form__element--time');
const checkinField = offerForm.querySelector('#timein');
const checkoutField = offerForm.querySelector('#timeout');
const roomsField = offerForm.querySelector('#room_number');
const guestsField = offerForm.querySelector('#capacity');
const typeField = offerForm.querySelector('#type');
const priceField = offerForm.querySelector('#price');
const sliderElem = offerForm.querySelector('.ad-form__slider');
const addressField = offerForm.querySelector('#address');
const submitBut = offerForm.querySelector('.ad-form__submit');

const pristine = new Pristine( offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
}, true);


const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;


pristine.addValidator(titleField, validateTitle, `от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`);

const onTypeChange = () => {
  priceField.placeholder = MIN_PRICES[typeField.value];
  pristine.validate(priceField);
};

typeField.addEventListener('change', onTypeChange);

const validatePrice = (value) => value >= MIN_PRICES[typeField.value] && value <= MAX_VALUE_PRICE;

const getPriceErrorMessage = () => `Максимальная цена — ${MAX_VALUE_PRICE} руб, минимальная цена — ${MIN_PRICES[typeField.value]} руб`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const validateRooms = () => ROOMS[roomsField.value].includes(guestsField.value);

const getRoomsErrorMessage = () => {
  switch (roomsField.value) {
    case '1':
      return '1 комната для 1 гостя';

    case '2':
      return 'для 1 гостя или 2 гостей';

    case '3':
      return 'для 1, 2 или 3 гостей';

    default:
      return 'не для гостей';
  }
};

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

const onCheckChange = (evt) => {
  if (evt.target.id === 'timein') {
    checkoutField.value = checkinField.value;
  } else {
    checkinField.value = checkoutField.value;
  }
};

checkFieldset.addEventListener('change', onCheckChange);

noUiSlider.create(sliderElem,{
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  coonect: 'lower',
  format: {
    to(value) {
      return value.toFixed(0);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

sliderElem.noUiSlider.on('update', () => {
  pristine.validate(priceField);
  priceField.value = sliderElem.noUiSlider.get();
});

export const setAddressField = (lat, lng) => {
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const blockSubmitBut = () => {
  submitBut.disabled = true;
  submitBut.textContent = 'Публикую';
};
const unblockSubmitBut = () => {
  submitBut.disabled = false;
  submitBut.textContent = 'Опубликовать';
};

const resetForm = () => {
  offerForm.reset();
  sliderElem.noUiSlider.set(0);
  priceField.value = 0;
};

const setOnFormSubmit = (cb) => {
  offerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if(pristine.validate()){
      blockSubmitBut();
      await cb(new FormData(evt.target));
      unblockSubmitBut();
      resetForm();
      setStartView();
    }
  });
};

disablePage();

setOnFormSubmit(async (data) => {
  sendData(showSuccessMessage, showErrorMessage, data);
});
