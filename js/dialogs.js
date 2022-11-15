const ALERT_SHOW_TIME = 5000;

const errorDialogTemplate = document.querySelector('#error').content;
const successDialogTemplate = document.querySelector('#success').content;
const body = document.querySelector('body');
let activeDialog = null;

const onDialogEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideDialog();
  }
};

const onEmptySpaceClick = () => hideDialog();

export const showSuccessDialog = () => {
  activeDialog = successDialogTemplate.firstElementChild.cloneNode(true);
  document.addEventListener('keydown', onDialogEscKeydown);
  document.addEventListener('click', onEmptySpaceClick);
  body.append(activeDialog);
  body.style.overflow = 'hidden';
};

export const showErrorDialog = () => {
  activeDialog = errorDialogTemplate.firstElementChild.cloneNode(true);
  document.addEventListener('keydown', onDialogEscKeydown);
  activeDialog.querySelector('.error__button').addEventListener('click', () => hideDialog());
  body.append(activeDialog);
  body.style.overflow = 'hidden';
};

function hideDialog () {
  activeDialog.remove();
  document.removeEventListener('keydown', onDialogEscKeydown);
  document.removeEventListener('click', onEmptySpaceClick);
  body.style.overflow = 'auto';
  activeDialog = null;
}

export const showAlertDialog = (message) => {
  const alertDialog = document.createElement('div');
  alertDialog.classList.add('alert-message');
  alertDialog.textContent = message;
  document.body.append(alertDialog);

  setTimeout(() => {
    alertDialog.remove();
  }, ALERT_SHOW_TIME );
};
