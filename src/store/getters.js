export default {
  getLatitude(state) {
    return state.latitude;
  },

  getLongitude(state) {
    return state.longitude;
  },

  getPlaceId(state) {
    return state.place_id;
  },

  checkIfLocationEnabled(state) {
    return state.locationEnabled;
  },
};

// Redundant
