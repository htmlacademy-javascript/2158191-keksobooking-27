const TITLES = [
  'Просто ДВОРЕЦ!', 'Уютный хостел', 'Шикарный отель',
  'Загородный дом', 'Квартира для молодых', 'Не дом, а мечта', 'Зачетный домик'
];
const DESCRIPTIONS = [
  'Красиво и уютно', 'Все что нужно для ночлега',
  'Место со всеми Удобствами', 'Для ценителей комфорта',
  'Одно из лучших мест, где можно провести время'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MAX_GUESTS = 6;
const MAX_ROOMS = 10;
const MAX_OFFERS = 10;

const TYPE_APPARTMENTS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHEKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const LOCATION_DATA = {
  MIN_LATITUDE: 35.65,
  MAX_LATITUDE: 35.7,
  MIN_LONGITUDE: 139.7,
  MAX_LONGITUDE: 139.8,
};
const PRICE = {
  MIN: 1000,
  MAX: 100000,
};

const getRandomPositiveInteger = (n1, n2) => {
  if (n1 >= 0 && n2 >= 0 && n1 !== n2) {
    const lower = Math.ceil(Math.min(n1, n2));
    const upper = Math.floor(Math.max(n1, n2));

    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  return NaN;
};

const getRandomPositiveFloat = (n1, n2, digits) => {
  if (n1 >= 0 && n2 >= 0 && n1 !== n2 && digits > 0) {
    const lower = Math.min(n1, n2);
    const upper = Math.max(n1, n2);
    const result = Math.random() * (upper - lower) + lower;

    return Number(result.toFixed(digits));
  }

  return NaN;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createOffer = (id, longitude, latitude) => ({
  author: {
    avatar: `img/avatars/user${id.toString().padStart(2, '0')}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${latitude}, ${longitude}`,
    price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX),
    type: getRandomArrayElement(TYPE_APPARTMENTS),
    rooms: getRandomPositiveInteger(1, MAX_ROOMS),
    guests: getRandomPositiveInteger(1, MAX_GUESTS),
    chekin: getRandomArrayElement(CHEKIN_CHECKOUT_TIME),
    chekout: getRandomArrayElement(CHEKIN_CHECKOUT_TIME),
    features: FEATURES.slice(0, getRandomPositiveInteger(1, FEATURES.length - 1)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: PHOTOS.slice(0, getRandomPositiveInteger(1, PHOTOS.length - 1)),
  },
  location: {
    lat: latitude,
    lng: longitude,
  }
});

const getOffers = (maxOffers) => Array.from({ length: maxOffers }, (_, id) => {
  const latitude = getRandomPositiveFloat(LOCATION_DATA.MIN_LATITUDE, LOCATION_DATA.MAX_LATITUDE, 5);
  const longitude = getRandomPositiveFloat(LOCATION_DATA.MIN_LONGITUDE, LOCATION_DATA.MAX_LONGITUDE, 5);

  return createOffer(id + 1, longitude, latitude);
});

getOffers(MAX_OFFERS);
