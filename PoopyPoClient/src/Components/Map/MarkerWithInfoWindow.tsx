// import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
// import { AdvancedMarker } from "@vis.gl/react-google-maps";
// import { InfoWindow } from "@vis.gl/react-google-maps";
import poop from "../../assets/face-base-poop.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import MyInfoWindow from "./MyInfoWindow";
import { FC } from "react";
import { Point, Location } from "../../Types/Infra";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";

const image = (
  <img
    className="ball"
    src={poop}
    style={{ width: "30px", height: "30px" }}
  ></img>
);
const poopIcon = L.icon({
  iconUrl: poop,
  iconSize: [30, 30],       // match your style
  iconAnchor: [15, 30],     // center-bottom for accurate placement
  popupAnchor: [0, -30],
});

interface MarkeWithInfoWindowType {
  point: Point;
  isMarkerWindowShowing: any;
  setisMarkerWindowShowing: any;
}
const MarkerWithInfoWindow: FC<MarkeWithInfoWindowType> = ({
  point,
  isMarkerWindowShowing,
  setisMarkerWindowShowing,
}) => {
  // const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = () => {
    setisMarkerWindowShowing(point.id);
  };



  const handleClose = () => {
    setisMarkerWindowShowing("");
  };

  return (
    <Marker key={point.id} position={[point.latitude, point.longitude]} icon={poopIcon} >
      <Popup>
        <MyInfoWindow point={point}/>
      </Popup>
    </Marker>
    // <>
    //   <AdvancedMarker
    //     ref={markerRef}
    //     position={{ lat: point.latitude, lng: point.longitude }}
    //     onClick={handleMarkerClick}
    //   >
    //     {image}
    //   </AdvancedMarker>
    //   {isMarkerWindowShowing && (
    //     <InfoWindow anchor={marker} onClose={handleClose}>
    //       <MyInfoWindow point={point} />
    //     </InfoWindow>
    //   )}
    // </>
  );
};

export default MarkerWithInfoWindow;
