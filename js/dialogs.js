const ALERT_SHOW_TIME = 5000;

const errorDialogTemplate = document.getElementById('error').content;
const successDialogTemplate = document.getElementById('success').content;
const body = document.body;
let activeDialog = null;

const onDialogKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideDialog();
  }
};

const onDialogClick = () => hideDialog();

export const showSuccessDialog = () => {
  activeDialog = successDialogTemplate.firstElementChild.cloneNode(true);
  document.addEventListener('keydown', onDialogKeydown);
  document.addEventListener('click', onDialogClick);
  body.append(activeDialog);
  body.classList.add('overflow-hidden');
};

export const showErrorDialog = () => {
  activeDialog = errorDialogTemplate.firstElementChild.cloneNode(true);
  document.addEventListener('keydown', onDialogKeydown);
  activeDialog.querySelector('.error__button').addEventListener('click', () => hideDialog());
  body.append(activeDialog);
  body.classList.add('overflow-hidden');
};

/* Используется function declaration так как функцию необходимо использовать до объявления и она содержит
ссылки на функции onDialogKeydown и onDialogClick, которые в свою очередь имеют ссылки на функцию hideDialog */
function hideDialog() {
  activeDialog.remove();
  document.removeEventListener('keydown', onDialogKeydown);
  document.removeEventListener('click', onDialogClick);
  body.classList.remove('overflow-hidden');
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
