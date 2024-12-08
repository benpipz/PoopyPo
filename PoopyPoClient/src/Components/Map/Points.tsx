import React, { FC } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect } from "react";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";
import { Point } from "../../Types/Infra";

interface PointsType {
  points: Point[];
  askForRoute: any;
}
const Points: FC<PointsType> = ({ points, askForRoute }) => {
  // const map = useMap();
  // const [markers, setMarkers] = useState({});
  // const clusterer = useRef(null);
  const [isMarkerWindowShowing, setisMarkerWindowShowing] =
    useState<string>("");

  useEffect(() => {
    console.log(isMarkerWindowShowing);
  }, [isMarkerWindowShowing]);
  // useEffect(() => {
  //   if (!map) return;
  //   if (!clusterer.current) {
  //     clusterer.current = new MarkerClusterer({ map });
  //   }
  // }, [map]);

  // useEffect(() => {
  //   clusterer.current?.clearMarkers();
  //   clusterer.current?.addMarkers(Object.values(markers));
  // }, [markers]);

  // const setMarkerRef = (marker, key) => {
  //   if (marker && markers[key]) return;
  //   if (!marker && !markers[key]) return;

  //   setMarkers((prev) => {
  //     if (marker) {
  //       return { ...prev, [key]: marker };
  //     } else {
  //       const newMarkers = { ...prev };
  //       delete newMarkers[key];
  //       return newMarkers;
  //     }
  //   });
  // };

  return (
    <div>
      {points &&
        points.map((point) => {
          return (
            <MarkerWithInfoWindow
              key={point.id}
              point={point}
              askForRoute={askForRoute}
              setisMarkerWindowShowing={setisMarkerWindowShowing}
              isMarkerWindowShowing={isMarkerWindowShowing === point.id}
            />
          );
        })}
    </div>
  );
};

export default Points;
