export const MAX_OFFER_PINS = 10;

let offers = [];

export const saveLocalData = (value) => {
  offers = value;
};

export const getLocalData = () => offers;

export const getMaxLocalData = () => offers.slice(0, MAX_OFFER_PINS);
