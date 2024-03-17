export default {
  setLocationPermissionStatus(state, payload) {
    state.locationPermissionStatus;
    sessionStorage.setItem("locationPermissionStatus", payload);
  },

  setLatitude(state, payload) {
    state.latitude = payload;
    sessionStorage.setItem("lat", payload);
  },

  setLongitude(state, payload) {
    state.longitude = payload;
    sessionStorage.setItem("lon", payload);
  },

  setLocationId(state, payload) {
    state.locationId = payload;
    sessionStorage.setItem("LocationId", payload);
  },

  setLocationName(state, payload) {
    state.locationName = payload;
    sessionStorage.setItem("locationName", payload);
  },
};
