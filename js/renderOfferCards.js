import {getOffers, MAX_OFFERS} from './data.js';

const cardTemplate = document.querySelector('#card').content;
const similarOffers = getOffers(MAX_OFFERS);
const offerType = {
  flat: 'Квартира' ,
  bungalow:'Бунгало',
  house:'Дом',
  palace:'Дворец',
  hotel:'Отель',
} ;
export const addHiddenClass = (parent) => {
  const elements = parent.children;
  for (let i = 0; i < elements.length; i++){
    if(elements[i].tagName !== 'IMG') {
      if (elements[i].textContent === ''){
        elements[i].classList.add('hidden');
      }
    }
  }
};

const similarListOffers = document.createDocumentFragment();

similarOffers.forEach((ad) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerType[ad.offer.type];
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;

  const featureList = cardElement.querySelectorAll('.popup__feature');
  featureList.forEach((featureItem) => {
    const isNecessary = ad.offer.features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`));
    if(!isNecessary) {
      featureItem.remove();
    }
  });

  cardElement.querySelector('.popup__photo').src = ad.offer.photos[0];

  for(let i = 1; i < ad.offer.photos.length; i++) {
    const imgElement = cardElement.querySelector('.popup__photo').cloneNode(true);

    imgElement.src = ad.offer.photos[i];

    cardElement.querySelector('.popup__photos').appendChild(imgElement);
  }

  addHiddenClass(cardElement.querySelector('.popup'));

  similarListOffers.appendChild(cardElement);
});

const offerElem = similarListOffers.querySelector('.popup');
document.querySelector('#map-canvas').appendChild(offerElem);
