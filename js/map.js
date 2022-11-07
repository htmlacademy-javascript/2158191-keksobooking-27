import { offerForm } from './form.js';
import { createCard } from './offer-card.js';

const map = L.map('map-canvas');

const markerGroup = L.layerGroup().addTo(map);

const addressField = offerForm.querySelector('#address');

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
    draggable:true,
    icon: mainPinIcon,
  }
);

export const mapInit = (coordinates) => {
  map.setView(coordinates, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  mainPinMarker.setLatLng(coordinates);
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {

    const {lat, lng} = evt.target.getLatLng();

    addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

const createOfferPinMarkers = (offers) => {
  offers.forEach((offer) => {
    const {location:{lat,lng}} = offer;

    const marker = L.marker(
      {
        lat,
        lng
      },

      {
        icon: pinIcon
      }
    );

    marker.addTo(markerGroup)
      .bindPopup(createCard(offer));
  });
};

export const setOfferPins = (offers) => {
  markerGroup.clearLayers();
  createOfferPinMarkers(offers);
};

export const setOnMapLoad = (fn) => {
  map.on('load', fn);
};
