import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { PoopSpot } from "./Components/Poopspot";
import PoopPopup from "./Components/PoopUp";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const poopSpots: PoopSpot[] = [
  {
    id: 1,
    position: [32.07, 34.78],
    description: "Fresh poop reported at 9:00 AM",
    reporter: "User123",
    photoUrl: "https://example.com/photo1.jpg",
  },
  {
    id: 2,
    position: [32.08, 34.77],
    description: "Old poop, beware!",
    reporter: "User456",
    photoUrl: null,
  },
  // You can add more spots here to see the clustering effect
];

export const App: React.FC = () => {
  return (
    <MapContainer
      center={[32.07, 34.78]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {poopSpots.map((spot) => (
          <Marker key={spot.id} position={spot.position}>
            <Popup>
              <PoopPopup spot={spot} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
