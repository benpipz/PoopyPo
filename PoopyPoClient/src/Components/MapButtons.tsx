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
import { useMap } from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { addPointToStore, resetLocation } from "../store/mapSlice";
import { ApiUtils } from "../Utils/ApiUtil";
import { Location } from "../Types/Infra";

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

  useEffect(() => {
    if (lastPoint && map) {
      map.setCenter(lastPoint);
    }
  }, [lastPoint, map]);

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
    navigator.geolocation.getCurrentPosition((position) => {
      let point = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      dispatch(resetLocation(point));
    });
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
