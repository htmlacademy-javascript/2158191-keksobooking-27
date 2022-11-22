export const disableForm = (formEl) => {
  const formElems = formEl.children;

  formEl.classList.add(`${formEl.classList[0]}--disabled`);

  for (const child of formElems) {
    child.disabled = true;
  }
};

export const enableForm = (formEl) => {
  const formElems = formEl.children;

  formEl.classList.remove(`${formEl.classList[0]}--disabled`);

  for (const child of formElems) {
    child.disabled = false;
  }
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
