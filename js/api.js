const FETCH_ADS = 'https://27.javascript.pages.academy/keksobooking/data';
const SAVE_AD = 'https://27.javascript.pages.academy/keksobooking';

export const getAdsData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(FETCH_ADS);

    if (!response.ok) {
      throw new Error ('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

export const saveAdData = async(onSuccess, onFail, body) => {
  try {
    const response = await fetch(SAVE_AD,
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error ('Не удалось отправить. Попробуйте еще раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};
