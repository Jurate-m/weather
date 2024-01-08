export default {
  setLatitude(state, latitude) {
    state.latitude = latitude;
  },

  setLongitude(state, longitude) {
    state.longitude = longitude;
  },

  setPlaceId(state, id) {
    state.place_id = id;
  },

  enableLocation(state) {
    state.locationEnabled = true;
  },
};
