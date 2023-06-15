import React from "react";
import maplibregl from "maplibre-gl";
const myAPIKey = "dca04a41cfb04353a490964e5fc16971";

export default function GetLocation() {
  const mapContainer = React.useRef(null);
  React.useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current?.id,
      style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${myAPIKey}`,
    });

    fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${myAPIKey}`)
      .then((response) => response.json())
      .then((positionData) => {
        console.log(
          `Lat: ${positionData.location.latitude}, lon: ${positionData.location.longitude}`
        );

        // Locate the map to the city level
        map.flyTo({
          center: [
            positionData.location.longitude,
            positionData.location.latitude,
          ],
          zoom: 10,
        });
      });

    // Create the geolocate control.
    const geolocate = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
    });

    // Add the control to the map
    map.addControl(geolocate, "bottom-right");

    // Listen for the geolocate event
    geolocate.on(
      "geolocate",
      function (positionData: { coords: { latitude: any; longitude: any } }) {
        // get address by coordinates with Geoapify Reverse Geocoding API
        console.log(
          `Lat: ${positionData.coords.latitude}, lon: ${positionData.coords.longitude}`
        );
        getAddress(
          positionData.coords.latitude,
          positionData.coords.longitude
        ).then((address) => {
          console.log(address);
        });
      }
    );

    async function getAddress(lat: any, lon: any) {
      const result = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${myAPIKey}`
      );
      const result_2 = await result.json();
      if (result_2 && result_2.results.length) {
        return result_2.results[0].formatted;
      }
      return null;
    }
  }, [myAPIKey]);
  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "80vh" }}
    ></div>
  );
}
