export default {
  setLatitude(state, payload) {
    state.latitude = payload;
  },

  setLongitude(state, payload) {
    state.longitude = payload;
  },

  enableLocation(state) {
    state.locationEnabled = true;
  },

  setLocationId(state, payload) {
    state.locationId = payload.data.place_id;
    sessionStorage.setItem("LocationId", payload.data.place_id);
  },
};
