import {
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
} from './utile.js';

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
export const MAX_OFFERS = 10;

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

const createOffer = (id, lng, lat) => ({
  author: {
    avatar: `img/avatars/user${id.toString().padStart(2, '0')}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${lat}, ${lng}`,
    price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX),
    type: getRandomArrayElement(TYPE_APPARTMENTS),
    rooms: getRandomPositiveInteger(1, MAX_ROOMS),
    guests: getRandomPositiveInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHEKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(CHEKIN_CHECKOUT_TIME),
    features: FEATURES.slice(0, getRandomPositiveInteger(1, FEATURES.length)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: PHOTOS.slice(0, getRandomPositiveInteger(1, PHOTOS.length)),
  },
  location: {
    lat,
    lng,
  }
});

export const getOffers = (maxOffers) => Array.from({ length: maxOffers }, (_, id) => {
  const lat = getRandomPositiveFloat(LOCATION_DATA.MIN_LATITUDE, LOCATION_DATA.MAX_LATITUDE, 5);
  const lng = getRandomPositiveFloat(LOCATION_DATA.MIN_LONGITUDE, LOCATION_DATA.MAX_LONGITUDE, 5);

  return createOffer(id + 1, lng, lat);
});

export const offers = getOffers(MAX_OFFERS);
