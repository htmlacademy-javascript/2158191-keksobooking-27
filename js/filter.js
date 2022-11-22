import { getLocalData, MAX_OFFER_PINS } from './data.js';
import { addPinsToMap } from './map.js';
import { debounce } from './utile.js';

const FILTER_PRICE_VALUES = {
  low: 10000,
  middle: 50000,
};

const filtersForm = document.querySelector('.map__filters');
const housingTypeField = document.getElementById('housing-type');
const housingPriceField = document.getElementById('housing-price');
const housingRoomsField = document.getElementById('housing-rooms');
const housingGuestsField = document.getElementById('housing-guests');

const filterByType = (offer) => housingTypeField.value === 'any' || offer.offer.type === housingTypeField.value;

const filterByRooms = (offer) => housingRoomsField.value === 'any' || offer.offer.rooms === Number(housingRoomsField.value);

const filterByGuests = (offer) => housingGuestsField.value === 'any' || offer.offer.guests === Number(housingGuestsField.value);

const filterByPrice = (offer) => {
  switch (housingPriceField.value) {
    case 'any':
      return true;

    case 'low':
      return offer.offer.price < FILTER_PRICE_VALUES.low;

    case 'middle':
      return offer.offer.price >= FILTER_PRICE_VALUES.low && offer.offer.price <= FILTER_PRICE_VALUES.middle;

    default:
      return offer.offer.price > FILTER_PRICE_VALUES.middle;
  }
};

const filterByFeatures = (offer) => {
  const checkedCheckboxes = Array.from(document.querySelectorAll('input[name = "features"]:checked'));

  if (!offer.offer.features) {
    return false;
  }

  return !checkedCheckboxes.length || checkedCheckboxes.every((feature) => offer.offer.features.includes(feature.value));
};

const filterAds = () => {
  const localData = getLocalData();
  const filteredOffers = [];

  for (const offer of localData) {
    if (filteredOffers.length >= MAX_OFFER_PINS) {
      break;
    }

    if (filterByType(offer) &&
      filterByPrice(offer) &&
      filterByGuests(offer) &&
      filterByRooms(offer) &&
      filterByFeatures(offer)) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const onFilterChange = debounce(()=> addPinsToMap(filterAds()));

filtersForm.addEventListener('change', onFilterChange);
