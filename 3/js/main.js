const getRandomPositiveInteger = (n1, n2) => {

  if(n1 >= 0 && n2 >= 0 && n1 !== n2 && Number.isFinite(n1) && Number.isFinite(n2)) {
    const lower = Math.ceil(Math.min(n1, n2));
    const upper = Math.floor(Math.max(n1, n2));

    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  return NaN;
};

const getRandomPositiveFloat = (n1, n2, digits) => {

  if(n1 >= 0 && n2 >= 0 && n1 !== n2 && digits > 0 && Number.isFinite(n1) && Number.isFinite(n2)) {
    const lower = Math.min(n1, n2);
    const upper = Math.max(n1, n2);
    const result = Math.random() * (upper - lower) + lower;

    return Number(result.toFixed(digits));
  }

  return NaN;
};

const locationData = {
  MIN_LATITUDE: 35.65,
  MAX_LATITUDE: 35.7,
  MIN_LONGITUDE: 139.7,
  MAX_LONGITUDE: 139.8,
};

const latitude = getRandomPositiveFloat(locationData.MIN_LATITUDE, locationData.MAX_LATITUDE,5);

const longitude = getRandomPositiveFloat(locationData.MIN_LONGITUDE, locationData.MAX_LONGITUDE,5);

const price = {
  MIN: 1000,
  MAX: 100000,
};

const titles = ['Просто ДВОРЕЦ!', 'Уютный хостел', 'Шикарный отель',
  'Загородный дом', 'Квартира для молодых', 'Не дом, а мечта', 'Зачетный домик'];

const description = ['Красиво и уютно', 'Все что нужно для ночлега',
  'Место со всеми Удобствами', 'Для ценителей комфорта',
  'Одно из лучших мест, где можно провести время'];

const MAX_GUESTS = 6;

const MAX_ROOMS = 10;

const OFFERS_COUNT = 10;

const typeAppartments = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const chekinCheckoutTime = ['12:00', '13:00', '14:00'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createAuthorData = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
});

const createOfferData = () => ({
  title: getRandomArrayElement(titles),
  address: `${latitude}, ${longitude}`,
  price: getRandomPositiveInteger(price.MIN, price.MAX),
  type: getRandomArrayElement(typeAppartments),
  rooms: getRandomPositiveInteger(1,MAX_ROOMS),
  guests: getRandomPositiveInteger(1,MAX_GUESTS),
  chekin: getRandomArrayElement(chekinCheckoutTime),
  chekout: getRandomArrayElement(chekinCheckoutTime),
  features: features.slice(0, getRandomPositiveInteger(0, features.length - 1)),
  description: getRandomArrayElement(description),
  photos: photos.slice(0, getRandomPositiveInteger(0, photos.length - 1)),
});

const createLocation = () => ({
  lat: latitude,
  lng: longitude,
});

const createOffer = (index) => ({
  author: createAuthorData(index),
  offer: createOfferData(),
  location: createLocation(),
});

const offers = Array.from({length: OFFERS_COUNT}, (_, indexOffer) => createOffer(indexOffer + 1));
