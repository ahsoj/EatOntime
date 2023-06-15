import { LatLngExpression, Layer } from "leaflet";
import { useState } from "react";
import { MapContainer, Popup, Marker, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useAppDispatch } from "../redux/hook";
import { getAddress } from "../redux/address";

// const mymap = Layer.map("mapid").setView([51.213826, 4.453636], 16);

// function onMapClick(e: any) {
// user clicked on a map
// fetch(
//   `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=YOUR_API_KEY`
// )
//   .then((response) => response.json())
//   .then((result) => {
//     if (result.features.length) {
// const address = result.features[0].properties.formatted;
// L.popup().setLatLng(e.latlng).setContent(address).openOn(mymap);
// }
//  else {
// L.popup()
//   .setLatLng(e.latlng)
//   .setContent("No address found")
//   .openOn(mymap);
// }
// });

// mymap.on("click", onMapClick);

function LocationMarker({ ...props }) {
  const { handleStepUP, activeStep } = props;
  const [position, setPosition] = useState(null);
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=dca04a41cfb04353a490964e5fc16971`
      )
        .then((response) => response.json())
        .then((result) => {
          setTimeout(() => {
            handleStepUP(activeStep + 1);
          }, 2000);
          dispatch(getAddress(result.features[0].properties));
        });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are around here</Popup>
    </Marker>
  );
}

export default function FindCurrentLocation({ ...props }) {
  const { handleStepUP, activeStep } = props;
  const position: LatLngExpression = [51.505, -0.09];
  return (
    <MapContainer
      style={{ height: "50vh", width: "100%", marginBlock: "2em" }}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker handleStepUP={handleStepUP} activeStep={activeStep} />
    </MapContainer>
  );
}
