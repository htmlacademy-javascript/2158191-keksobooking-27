const MAX_LENGTH_TITLE = 100;
const MIN_LENGTH_TITLE = 30;
const MAX_VALUE_PRICE = 100000;
const MIN_VALUE_PRICE = 0;

const offerForm = document.querySelector('.ad-form');
const pristine = new Pristine( offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
}, true);

const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;

pristine.addValidator(offerForm.querySelector('#title'), validateTitle, `от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`);

const validatePrice = (value) => value >= MIN_VALUE_PRICE && value <= MAX_VALUE_PRICE;

const getPriceErrorMessage = () => `Максимальная цена — ${MAX_VALUE_PRICE} руб, минимальная цена — ${MIN_VALUE_PRICE} руб`;

pristine.addValidator(offerForm.querySelector('#price'), validatePrice, getPriceErrorMessage);

const roomsField = offerForm.querySelector('#room_number');
const guestsField = offerForm.querySelector('#capacity');

const rooms = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2' , '1'],
  100: ['0'],
};

const validateRooms = () => rooms[roomsField.value].includes(guestsField.value);

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

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
