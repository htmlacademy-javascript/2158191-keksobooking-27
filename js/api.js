export const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking/data');

    if(!response.ok) {
      throw new Error ('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

export const sendData = async(onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      }
    );

    if(!response.ok) {
      throw new Error ('Не удалось отправить. Попробуйте еще раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};
