const offerForm = document.querySelector('.ad-form');
const pristine = new Pristine( offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
}, true);

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(offerForm.querySelector('#title'), validateTitle, 'от 30 до 100 символов');

const validatePrice = (value) => value <= 100000;

pristine.addValidator(offerForm.querySelector('#price'), validatePrice, 'Максимальное значение — 100000');

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
  if (roomsField.value === '1'){
    return '1 комната для 1 гостя';
  } else if (roomsField.value === '2') {
    return 'для 1 гостя или 2 гостей';
  } else if (roomsField.value === '3') {
    return 'для 1, 2 или 3 гостей';
  } else {
    return 'не для гостей';
  }
};

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
