const FILTER_PRICE_VALUES = {
  low: 10000,
  middle: 50000,
};

const filtersForm = document.querySelector('.map__filters');
const housingTypeField = document.getElementById('housing-type');
const housingPriceField = document.getElementById('housing-price');
const housingRoomsField = document.getElementById('housing-rooms');
const housingGuestsField = document.getElementById('housing-guests');
const housingCheckboxFeatures = filtersForm.querySelectorAll('.map__checkbox');

const filterByType = (offer, housingField) => {
  if (housingField.value === 'any') {
    return true;
  }

  return offer.offer.type === housingField.value;
};

const filterByPrice = (offer, housingField) => {
  switch (housingField.value) {
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

const filterByRooms = (offer, housingField) => {
  if (housingField.value === 'any') {
    return true;
  }

  return offer.offer.rooms === Number(housingField.value);
};

const filterByGuests = (offer, housingField) => {
  if (housingField.value === 'any') {
    return true;
  }

  return offer.offer.guests === Number(housingField.value);
};

const filterByFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const filterAds = (offers, maxAds) => {
  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length >= maxAds) {
      break;
    }

    const selectedFeatures = [];

    housingCheckboxFeatures.forEach((feature) => {
      if (feature.checked) {
        selectedFeatures.push(feature.value);
      }
    });

    if (filterByType(offer, housingTypeField) &&
      filterByPrice(offer, housingPriceField) &&
      filterByGuests(offer, housingGuestsField) &&
      filterByRooms(offer, housingRoomsField) &&
      filterByFeatures(offer, selectedFeatures)) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

export const SetFilter = (offers, maxAds, cb) => {
  filtersForm.addEventListener('change', () => {
    const filteredOffers = filterAds(offers, maxAds);

    cb(filteredOffers);
  });
};
