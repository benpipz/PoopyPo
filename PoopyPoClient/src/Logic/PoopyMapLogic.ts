const Random = (minRange: number, maxRange: number) => {
  const min = Math.ceil(minRange);
  const max = Math.floor(maxRange);
  return Math.random() * (max - min + 1) + min;
};

export const RandonPoopLocationRishonLetsion = (name: string) => {
  const minLat = 31.95;
  const maxLat = 31.99;
  const minLng = 34.75;
  const maxLng = 34.83;

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  const key = JSON.stringify({ lat, lng }).toString();
  return { key: key, lat: lat, lng: lng, name: name };
};

// Function to generate a random location within a radius of 1 km from a given lat/lng
export const randomLocation = (lat: number, lng: number, reporter: string) => {
  // Earth's radius in kilometers
  const earthRadius = 6371;

  // Convert latitude and longitude from degrees to radians
  const radLat = (Math.PI / 180) * lat;
  const radLng = (Math.PI / 180) * lng;

  // Generate a random distance within the radius (in kilometers)
  const randomDistance = Math.random() * 1; // Maximum distance of 1 km

  // Generate a random bearing (direction) in radians
  const randomBearing = Math.random() * 2 * Math.PI;

  // Calculate the new latitude and longitude
  const newLat = Math.asin(
    Math.sin(radLat) * Math.cos(randomDistance / earthRadius) +
      Math.cos(radLat) *
        Math.sin(randomDistance / earthRadius) *
        Math.cos(randomBearing)
  );

  const newLng =
    radLng +
    Math.atan2(
      Math.sin(randomBearing) *
        Math.sin(randomDistance / earthRadius) *
        Math.cos(radLat),
      Math.cos(randomDistance / earthRadius) -
        Math.sin(radLat) * Math.sin(newLat)
    );

  // Convert new latitude and longitude from radians to degrees
  const newLatDeg = (newLat * 180) / Math.PI;
  const newLngDeg = (newLng * 180) / Math.PI;

  return { Latitude: newLatDeg, Longitude: newLngDeg, name: reporter };
};

export const RetreiveLocalLocation = (setLocalLocation) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setLocalLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
};

export const requestGeolocation = (setPosition) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
};

export const checkGeolocationPermission = async () => {
  const permission = await navigator.permissions.query({
    name: "geolocation",
  });

  if (permission.state === "granted") {
    return true;
  }
  return false;
};
