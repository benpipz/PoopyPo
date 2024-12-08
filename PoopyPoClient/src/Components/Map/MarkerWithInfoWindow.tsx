import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
import poop from "../../assets/face-base-poop.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import MyInfoWindow from "./MyInfoWindow";
import { FC } from "react";
import { Point, Location } from "../../Types/Infra";

const image = (
  <img
    className="ball"
    src={poop}
    style={{ width: "30px", height: "30px" }}
  ></img>
);
interface MarkeWithInfoWindowType {
  point: Point;
  askForRoute: (location: Location) => void;
  isMarkerWindowShowing: any;
  setisMarkerWindowShowing: any;
}
const MarkerWithInfoWindow: FC<MarkeWithInfoWindowType> = ({
  point,
  askForRoute,
  isMarkerWindowShowing,
  setisMarkerWindowShowing,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = () => {
    setisMarkerWindowShowing(point.id);
  };

  const getRoute = () => {
    askForRoute({ lat: point.latitude, lng: point.longitude });
  };

  const handleClose = () => {
    setisMarkerWindowShowing("");
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: point.latitude, lng: point.longitude }}
        onClick={handleMarkerClick}
      >
        {image}
      </AdvancedMarker>
      {isMarkerWindowShowing && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <MyInfoWindow point={point} getRoute={getRoute} />
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
