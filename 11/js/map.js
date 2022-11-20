import { filters, offerForm, setAddressField } from './form.js';
import { showAlertDialog } from './dialogs.js';
import { createCard } from './offer-card.js';
import { getAdsData } from './api.js';
import { SetFilter } from './filter.js';
import { debounce, enableForm } from './utile.js';

const MAX_ADS = 10;
const COORDINATES = {
  lat: 35.68421,
  lng: 139.75107,
};
const ZOOM = 13;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [25,52],
});
const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
});
const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const createPin = (ad) => {
  const {location: {lat, lng}} = ad;

  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      icon: pinIcon
    }
  );

  return marker;
};

export const setStartView = () =>{
  mainPinMarker.setLatLng(COORDINATES);

  const {lat, lng} = mainPinMarker.getLatLng();

  setAddressField(lat, lng);
  map.setView(COORDINATES, ZOOM);
};

export const addPinsToMap = (ads) => {
  markerGroup.clearLayers();

  const maxAds = ads.slice(0, MAX_ADS);

  maxAds.forEach((ad) => {
    createPin(ad).addTo(markerGroup)
      .bindPopup(createCard(ad));
  });
};

const onSuccessGetData = (offers) => {
  addPinsToMap(offers);
  SetFilter(offers, MAX_ADS, debounce(addPinsToMap));
  enableForm(filters);
};

map.on('load', () => {
  setStartView();
  enableForm(offerForm);
  getAdsData(onSuccessGetData, showAlertDialog);
}).setView(COORDINATES, ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

mainPinMarker.addTo(map);
mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();

  setAddressField(lat, lng);
});
