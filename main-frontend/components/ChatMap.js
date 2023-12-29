import { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap, Circle, Marker } from "react-leaflet";
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
  setLatLong,
  latLong,
  radius = 50,
  unClickable,
}) {
  const [map, setMap] = useState(null);

  let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  const center = [latLong.lat, latLong.lng];

  useEffect(() => {
    if (map) {
      if (!unClickable) {
        map.target.on("click", (e) => {
          setLatLong(e.latlng);
        });
      }
    }
  }, [map]);

  return (
    <MapContainer
      center={[latLong.lat, latLong.lng]}
      zoom={13}
      style={style}
      whenReady={(map) => setMap(map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[latLong.lat, latLong.lng]}></Marker>
      <ChangeView coords={[latLong.lat, latLong.lng]} />
    </MapContainer>
  );
}
