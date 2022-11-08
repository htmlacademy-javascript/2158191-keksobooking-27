import { offers } from './data.js';
import { adForm, filters, setAddressField } from './form.js';
import { createCard } from './offer-card.js';
import { enableForm } from './utile.js';

const COORDINATES = {
  lat: 35.68421,
  lng: 139.75107,
};
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

const addPinMarkers = (ads) => {
  markerGroup.clearLayers();

  ads.forEach((ad) => {
    const {location:{lat,lng}} = ad;

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
      .bindPopup(createCard(ad));
  });
};

map.on('load', () => {
  enableForm(adForm);
  enableForm(filters);
  addPinMarkers(offers);
});

map.setView(COORDINATES, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

mainPinMarker.setLatLng(COORDINATES);
mainPinMarker.addTo(map);
mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();

  setAddressField(lat, lng);
});
