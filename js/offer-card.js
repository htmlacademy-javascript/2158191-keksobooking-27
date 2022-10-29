import {getOffers, MAX_OFFERS} from './data.js';

const cardTemplate = document.querySelector('#card').content;
const similarOffers = getOffers(MAX_OFFERS);
const placeToRender = document.querySelector('#map-canvas');

const offerType = {
  flat: 'Квартира' ,
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderOfferCard = (Card) => {
  placeToRender.appendChild(Card);
};

const createOfferCards = (offersData, templateContent) => {
  const similarListOffers = document.createDocumentFragment();

  offersData.forEach((ad) => {
    const cardElement = templateContent.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('[data-price]').textContent = ad.offer.price;
    cardElement.querySelector('.popup__type').textContent = offerType[ad.offer.type];
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;

    const descriptions = cardElement.querySelector('.popup__description');

    if(ad.offer.description && ad.offer.description.length) {
      descriptions.textContent = ad.offer.description;
    } else {
      descriptions.remove();
    }

    const featureList = cardElement.querySelector('.popup__features');

    if(ad.offer.features && ad.offer.features.length) {
      featureList.innerHTML = '';

      ad.offer.features.forEach((featureItem) => {
        const featureElem = document.createElement('li');
        featureElem.classList.add('popup__feature' ,`popup__feature--${featureItem}`);
        featureList.appendChild(featureElem);
      }
      );
    } else {
      featureList.remove();
    }

    const photos = cardElement.querySelector('.popup__photos');
    const photo = photos.querySelector('.popup__photo');

    if(ad.offer.photos && ad.offer.photos.length) {
      photo.remove();

      for(const elem of ad.offer.photos) {
        const imgElem = photo.cloneNode(true);
        imgElem.src = elem;
        photos.appendChild(imgElem);
      }
    } else {
      photos.remove();
    }
    similarListOffers.appendChild(cardElement);
  }
  );

  return similarListOffers;
};

const offerCard = createOfferCards(similarOffers, cardTemplate).querySelector('.popup');

renderOfferCard(offerCard);
