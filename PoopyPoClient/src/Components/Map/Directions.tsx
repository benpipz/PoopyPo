// import React, { useEffect, useState, FC } from "react";
// import { Location } from "../../Types/Infra";
// interface DirectionsType {
//   from: Location;
//   to: Location;
// }

// const Directions: FC<DirectionsType> = ({ from, to }) => {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");

//   useEffect(() => {
//     if (!map || !routesLibrary) return;
//     setDirectionsService(new routesLibrary.DirectionsService());
//     setDirectionsRenderer(new routesLibrary.DirectionsRenderer());
//   }, [map, routesLibrary]);

//   useEffect(() => {
//     if (!directionsService || !directionsRenderer) return;
//     directionsRenderer.setMap(map);
//     directionsService.route(
//       {
//         origin: from,
//         destination: to,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (response, status) => {
//         if (status === "OK") {
//           directionsRenderer.setDirections(response);
//         } else {
//           console.error("Directions request failed due to " + status);
//         }
//       }
//     );
//   }, [directionsService, directionsRenderer, to]);

//   return null;
// };

// export default Directions;
