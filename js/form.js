import { setStartView } from './map.js';
import { saveAdData } from './api.js';
import { showSuccessDialog, showErrorDialog } from './dialogs.js';
import { enableForm, disableForm } from './utile.js';

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
const DEFAULT_PRICE_VALUE = 0;

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
const filter = document.querySelector('.map__filters');

const disablePage = () => {
  disableForm(offerForm);
  disableForm(filter);
};

export const enablePage = () => {
  enableForm(offerForm);
  enableForm(filter);
};

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
  connect: 'lower',
  format: {
    to(value) {
      return value.toFixed(0);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

sliderElem.noUiSlider.on('end', () => {
  pristine.validate(priceField);
});

sliderElem.noUiSlider.on('update', () => {
  priceField.value = sliderElem.noUiSlider.get();
});

export const setAddressField = (lat, lng) => {
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const blockSubmitButton = () => {
  submitBut.disabled = true;
  submitBut.textContent = 'Публикую';
};
const unblockSubmitButton = () => {
  submitBut.disabled = false;
  submitBut.textContent = 'Опубликовать';
};

export const resetForm = () => {
  offerForm.reset();
  sliderElem.noUiSlider.set(DEFAULT_PRICE_VALUE);
  priceField.value = DEFAULT_PRICE_VALUE;
};


offerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    await saveAdData(() => {
      showSuccessDialog();
      resetForm();
      setStartView();
    }, showErrorDialog, new FormData(evt.target));
    unblockSubmitButton();
  }
});

disablePage();
