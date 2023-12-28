export default {
  getLatitude(state) {
    return state.latitude;
  },
  getLongitude(state) {
    return state.longitude;
  },
  checkIfLocationEnabled(state) {
    return state.locationEnabled;
  },
};
