import React, { FC } from "react";
import { useState, useRef, useEffect } from "react";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";
import { Point } from "../../Types/Infra";
import MarkerClusterGroup from 'react-leaflet-cluster';



interface PointsType {
  points: Point[];
}
const Points: FC<PointsType> = ({ points }) => {
  // const map = useMap();
  // const [markers, setMarkers] = useState({});
  // const clusterer = useRef(null);
  const [isMarkerWindowShowing, setisMarkerWindowShowing] =
    useState<string>("");

  useEffect(() => {
    console.log("points in points", points);
  }, [points]);
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
  <MarkerClusterGroup>
  {points &&
    points.map((point) => (
      <MarkerWithInfoWindow
        key={point.id}
        point={point}
        setisMarkerWindowShowing={setisMarkerWindowShowing}
        isMarkerWindowShowing={isMarkerWindowShowing === point.id}
      />
    ))}
</MarkerClusterGroup>
  );
};

export default Points;
