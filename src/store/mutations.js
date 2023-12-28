export default {
  setLatitude(state, latitude) {
    state.latitude = latitude;
  },
  setLongitude(state, longitude) {
    state.longitude = longitude;
  },
  enableLocation(state) {
    state.locationEnabled = true;
  },
};
