import { resetView } from './map.js';
import { saveAdData } from './api.js';
import { showSuccessDialog, showErrorDialog } from './dialogs.js';
import { disableForm } from './utile.js';

const MAX_LENGTH_TITLE = 100;
const MIN_LENGTH_TITLE = 30;
const MAX_VALUE_PRICE = 100000;
const DEFAULT_PRICE_VALUE = 0;
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
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
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export const offerForm = document.querySelector('.ad-form');
export const filters = document.querySelector('.map__filters');
const titleField = document.getElementById('title');
const checkFieldset = offerForm.querySelector('.ad-form__element--time');
const checkinField = document.getElementById('timein');
const checkoutField = document.getElementById('timeout');
const roomsField = document.getElementById('room_number');
const guestsField = document.getElementById('capacity');
const typeField = document.getElementById('type');
const priceField = document.getElementById('price');
const sliderElem = offerForm.querySelector('.ad-form__slider');
const addressField = document.getElementById('address');
const submitButton = offerForm.querySelector('.ad-form__submit');
const avatarChooser = document.getElementById('avatar');
const avatarPreview = offerForm.querySelector('.ad-form-header__image');
const imageChooser = document.getElementById('images');
const imagePreview = offerForm.querySelector('.ad-form__photo');
const resetButton = offerForm.querySelector('.ad-form__reset');

const disablePage = () => {
  disableForm(offerForm);
  disableForm(filters);
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

guestsField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

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
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export const resetForm = () => {
  filters.reset();
  offerForm.reset();
  sliderElem.noUiSlider.set(DEFAULT_PRICE_VALUE);
  priceField.value = DEFAULT_PRICE_VALUE;
  imagePreview.innerHTML = '';
  avatarPreview.src = DEFAULT_AVATAR;
  pristine.reset();
  resetView();
};

resetButton.addEventListener('click', () => resetForm());

const onSuccessSaveAdData = () => {
  showSuccessDialog();
  resetForm();
  resetView();
};

offerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    await saveAdData(onSuccessSaveAdData, showErrorDialog, new FormData(evt.target));
    unblockSubmitButton();
  }
});

const isValidImage = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((it) => fileName.endsWith(it));

};

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];

  if (file && isValidImage(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imageChooser.addEventListener('change', () => {
  const file = imageChooser.files[0];

  if (file && isValidImage(file)) {
    imagePreview.innerHTML = '';
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.classList.add('ad-form__photo');
    imagePreview.append(image);
  }
});

disablePage();
