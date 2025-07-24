import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { randomLocation } from "../Logic/PoopyMapLogic";
import "../Styles.css";
import Poopy2 from "../assets/poopyEmojy2.png";
import Add from "../assets/addd.png";
import Center from "../assets/centerr.png";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPointToStore, resetLocation } from "../store/mapSlice";
import { ApiUtils } from "../Utils/ApiUtil";
import { Location } from "../Types/Infra";
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const MapButtons = ({ SetformOpen }) => {
  const map = useMap();
  const [user, loading] = useAuthState(auth);
  const [buttonInfo, setButtonInfo] = useState(true);
  const lastPoint: Location = useSelector<MapSlice>(
    (state) => state.map.lastPoint
  ) as Location;
  const location: Location = useSelector<MapSlice>(
    (state) => state.map.localLocation
  ) as Location;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (lastPoint && map) {
  //     map.setCenter(lastPoint);
  //   }
  // }, [lastPoint, map]);


  useEffect(() => {
    setTimeout(() => {
      setButtonInfo(false);
    }, 5000);
  }, []);

  const makeRealPoint = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      var newPoint = {
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
        UserId: user?.uid,
      };
      await addPoint(newPoint);
    });
  };

  
  const onResetLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported!');
    return;
  }

  const onLocationFound = (e) => {
    console.log('Location found:', e.latlng);
    map.panTo(e.latlng);
    map.off('locationfound', onLocationFound);
  };

  const onLocationError = (e) => {
    console.error('Leaflet location error:', e.message);
    alert(`Error: ${e.message}`);
    map.off('locationerror', onLocationError);
  };

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.locate({ watch: false, setView: false, enableHighAccuracy: true });
};


  const makeRandomPoint = async () => {
    const point = randomLocation(location.lat, location.lng, "");
    point["UserId"] = user?.uid;

    await addPoint(point);
  };

  const addPoint = async (point) => {
    const result = await ApiUtils.Post("points", point);
    if (result.status === 201) {
      dispatch(addPointToStore(result.data));
    }
  };

  return (
    <div className="buttons">
      <img
        src={Center}
        style={{ width: "60px", height: "60px", marginBottom: "5px" }}
        alt="poopy"
        onClick={onResetLocation}
      />

      <img
        src={Add}
        style={{ width: "60px", height: "60px", marginBottom: "5px" }}
        alt="poopy"
        onClick={SetformOpen}
      />
      <img
        src={Poopy2}
        style={{ width: "60px", height: "60px", marginBottom: "5px" }}
        alt="poopy"
        onClick={makeRandomPoint}
      />
    </div>
  );
};

export default MapButtons;
