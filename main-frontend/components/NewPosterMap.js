import { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function ChangeView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default function Map({
  style,
  zoom = 16.5,
  lat,
  lng,
  setLatLong,
  district,
}) {
  //   const [geoData, setGeoData] = useState({ lat: 35.683111, lng: 51.439189 });
  const [map, setMap] = useState(null);
  let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  const center = [lat, lng];

  useEffect(() => {
    if (map) {
      map.target.on("click", (e) => {
        console.log(e.latlng);
        // setGeoData({ lat: e.latlng.lat, lng: e.latlng.lng });
        setLatLong({ lat: e.latlng.lat, lng: e.latlng.lng });
      });
    }
  }, [map]);

  useEffect(() => {
    if (district) {
      setLatLong({
        lat: district.centroid.latitude,
        lng: district.centroid.longitude,
      });
    }
  }, [district]);
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "200px", ...style }}
      whenReady={(map) => setMap(map)}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle radius={50} center={[lat, lng]}></Circle>
      {/* <Marker position={[geoData.lat, geoData.lng]}></Marker> */}
      <ChangeView coords={center} />
    </MapContainer>
  );
}
