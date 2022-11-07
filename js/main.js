import {
  disableForm,
  enableForm,
} from './utile.js';

import {
  mapInit,
  setOfferPins,
  setOnMapLoad,
} from './map.js';

import { getOffers, MAX_OFFERS } from './data.js';

const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');


const offers = getOffers(MAX_OFFERS);

const COORDINATES = {
  lat: 35.68421,
  lng: 139.75107,
};

setOnMapLoad(() => {
  enableForm(adForm);
  enableForm(filters);
  setOfferPins(offers);
});

disableForm(adForm);
disableForm(filters);
mapInit(COORDINATES);
