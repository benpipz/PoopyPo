import React, { FC } from "react";
import PoopyMap from "./PoopyMap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocalLocation, setInitialPoints } from "../../store/mapSlice";
import { ApiUtils } from "../../Utils/ApiUtil";

const MapComponent: FC<any> = () => {
  const [permissionState, setPermissionState] = useState<string>("");
  const localLocation = useSelector<MapSlice>(
    (state) => state.map.localLocation
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket("ws://localhost:5000/api/Notification/ws");
    setSocket(ws);

    // Save the WebSocket instance

    // Listen for messages
    ws.onmessage = (event: MessageEvent<string>) => {
      console.log(`recieved wescoket message ${event.data}`);
      setFlag(Math.random());
    };

    // Handle WebSocket closure
    ws.onclose = () => {
      console.log("WebSocket connection closed");
      socket?.close();
    };

    // Handle errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket?.close();
    };

    return () => {
      socket?.close();
      console.log("web socket closed localy");
    };
  }, []);

  const dispatch = useDispatch();

  const geolocationPremission = () => {
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((permission) => {
        setPermissionState(permission.state);
        if (permission.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            dispatch(
              setLocalLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            );
          });
        }
      });
  };

  useEffect(() => {
  const fetchPoints = async () => {
    try {
      const result = await ApiUtils.Get("points");
      console.log("Fetched points:", result.data); // <-- should be an array
      dispatch(setInitialPoints(result.data));
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  fetchPoints();
}, []);


  useEffect(() => {
    geolocationPremission();
  }, []);

  return (
    <div>
      <div className="app">
        {localLocation != undefined && <PoopyMap />}

        {permissionState == "prompt" && !localLocation && (
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  dispatch(
                    setLocalLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    })
                  );
                },
                (error) => {
                  geolocationPremission();
                }
              );
            }}
            className="text-white bg-gray-700 p-4 w-half font-medium rounded-lg flex align-middle gap-2 mt-5"
          >
            Click me for the map
          </button>
        )}
        {permissionState == "denied" && (
          <h3 className="text-black bg-gray-100 p-4 w-half font-bold  rounded-lg flex align-middle gap-2 mt-5 ">
            Geolocation premisson required...
          </h3>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
