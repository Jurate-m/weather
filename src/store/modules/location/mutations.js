export default {
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
    sessionStorage.setItem("location_id", payload);
  },

  setLocationName(state, payload) {
    state.locationName = payload;
    sessionStorage.setItem("location", payload);
  },

  setError(state, payload) {
    switch (payload) {
      case 1:
        state.error =
          "Please enable location permission to view weater for your current location.";
        break;
      case 2:
        state.error = "Location information is unavailable.";
        break;
      case 3:
        state.error = "The request to get current location timed out.";
        break;
      default:
        state.error = "An unknown error occurred.";
    }
  },
};
