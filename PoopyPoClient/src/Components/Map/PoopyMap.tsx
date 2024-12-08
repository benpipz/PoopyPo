import React, { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Points from "./Points";
import MapButtons from "../MapButtons";
import Directions from "./Directions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../util/firebase";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Location, Point } from "../../Types/Infra";
import PoopForm from "./PoopForm";

const googleMapsApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
  const [askForRoute, setAskForRoute] = useState();
  const [formOpen, SetformOpen] = useState(false);
  const pointsFromStore = useSelector<any>((state) => state.map.points) as [
    Point
  ];
  const localLocation = useSelector<any>(
    (state) => state.map.localLocation
  ) as Location;

  const updateRoute = (location) => {
    setAskForRoute(location);
  };

  return (
    <div className="container2">
      <APIProvider apiKey={googleMapsApi}>
        <Map
          defaultCenter={localLocation}
          defaultZoom={14}
          gestureHandling={"greedy"}
          mapId={"53511ab25062212b"}
          fullscreenControl={false}
        >
          <Loader />
          {askForRoute && <Directions from={localLocation} to={askForRoute} />}
          <Points points={pointsFromStore} askForRoute={updateRoute} />
          {user && (
            <div style={overlayStyle}>
              <MapButtons
                SetformOpen={() => {
                  SetformOpen(!formOpen);
                }}
              />
            </div>
          )}
          {
            <PoopForm
              isOpen={formOpen}
              onClose={() => {
                SetformOpen(false);
              }}
            />
          }
        </Map>
      </APIProvider>
    </div>
  );
};

export default PoopyMap;
