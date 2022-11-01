export const getRandomPositiveInteger = (n1, n2) => {
  if (n1 >= 0 && n2 >= 0 && n1 !== n2) {
    const lower = Math.ceil(Math.min(n1, n2));
    const upper = Math.floor(Math.max(n1, n2));

    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  return NaN;
};

export const getRandomPositiveFloat = (n1, n2, digits) => {
  if (n1 >= 0 && n2 >= 0 && n1 !== n2 && digits > 0) {
    const lower = Math.min(n1, n2);
    const upper = Math.max(n1, n2);
    const result = Math.random() * (upper - lower) + lower;

    return Number(result.toFixed(digits));
  }

  return NaN;
};

export const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export const disableForm = (parentElem) => {
  const formElems = parentElem.children;

  parentElem.classList.add(`${parentElem.classList[0]}--disabled`);

  for (const child of formElems) {
    child.setAttribute('disabled', 'disabled');
  }
};

export const enableForm = (parentElem) => {
  const formElems = parentElem.children;

  parentElem.classList.remove(`${parentElem.classList[0]}--disabled`);

  for (const child of formElems) {
    child.removeAttribute('disabled', 'disabled');
  }
};

const fieldsetElem = document.querySelector('.ad-form');

disableForm(fieldsetElem);
enableForm(fieldsetElem);
