const disableForm = (parentElem) => {
  const formElems = parentElem.children;

  parentElem.classList.add(`${parentElem.classList[0]}--disabled`);
  for (const child of formElems) {
    child.setAttribute('disabled', 'disabled');
  }
};

const enableForm = (parentElem) => {
  const formElems = parentElem.children;

  parentElem.classList.remove(`${parentElem.classList[0]}--disabled`);
  for (const child of formElems) {
    child.removeAttribute('disabled', 'disabled');

  }
};

const fieldsetElem = document.querySelector('.ad-form');

disableForm(fieldsetElem);
enableForm(fieldsetElem);
