const ALERT_SHOW_TIME = 5;

const errorMessageTemplate = document.querySelector('#error').content;
const successMessageTemplate = document.querySelector('#success').content;
const body = document.querySelector('body');

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};

const onEmptySpaceClick = () => hideMessage();

export const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onEmptySpaceClick);
  body.append(successMessage);
  body.style.overflow = 'hidden';
};

export const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  errorMessage.querySelector('.error__button').addEventListener('click', () => hideMessage());
  body.append(errorMessage);
  body.style.overflow = 'hidden';
};

function hideMessage () {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onEmptySpaceClick);
  body.style.overflow = 'auto';
}

export const showAlertMessage = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.classList.add('alert-message');
  alertMessage.textContent = message;
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME );
};
