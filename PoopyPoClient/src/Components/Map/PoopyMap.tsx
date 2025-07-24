import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Points from "./Points";
import MapButtons from "../MapButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../util/firebase";
import { useSelector } from "react-redux";
import { Location, Point } from "../../Types/Infra";
import PoopForm from "./PoopForm";

const overlayStyle: object = {
  position: "absolute",
  top: "72%",
  left: "8px",
  transform: "translateY(-50%)",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  zIndex: 100,
};

const PoopyMap = () => {
  const [user, loading] = useAuthState(auth);
  const [formOpen, SetformOpen] = useState(false);
  const pointsFromStore = useSelector<any>((state) => state.map.points) as Point[];
  const localLocation = useSelector<any>((state) => state.map.localLocation) as Location;
useEffect(() => {
  console.log("MapButtons mounted");
}, []);
useEffect(() => {

    console.log("storte points ",pointsFromStore);
}, [pointsFromStore]);

  return (
    <div className="container2" style={{ height: "100%", width: "100%" }}>
     <MapContainer center={[localLocation.lat, localLocation.lng]} zoom={14} style={{ height: "100%", width: "100%" }}>
  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Points points={pointsFromStore} />

  {user && <MapButtons SetformOpen={() => SetformOpen(!formOpen)} />}

  <PoopForm
    isOpen={formOpen}
    onClose={() => SetformOpen(false)}
  />
</MapContainer>

    </div>
  );
};

export default PoopyMap;
