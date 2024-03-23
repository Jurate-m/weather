import axios from "axios";

export default {
  getCurrentUserLocation({ commit }) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          commit("setLatitude", position.coords.latitude);
          commit("setLongitude", position.coords.longitude);
        },
        (error) => {
          commit("setError", error.code);
        },
        { enableHighAccuracy: true }
      );
    }
  },

  getIpUserLocation({ commit }) {
    return axios
      .get("https://ipapi.co/json")
      .then((response) => {
        commit("setLatitude", response.data.latitude);
        commit("setLongitude", response.data.longitude);
      })
      .catch((error) => console.error(error));
  },

  async getUserLocation({ state, dispatch }) {
    await dispatch("getIpUserLocation");

    // if there is not lat and lon due to an ip API error - exit the action
    if (!state.latitude || !state.longitude) return;

    // ^ else - dispacth setLocation action
    await dispatch("setLocation");
  },

  async setLocation({ state, dispatch }) {
    // retrieve lat and lon either from store or session storage if set
    const lat = state.latitude || sessionStorage.getItem("lat") || null;
    const lon = state.longitude || sessionStorage.getItem("lon") || null;

    // if not lat or lon - exit
    if (!lat || !lon) return;

    // query params that are passed to natlify functions
    const params = new URLSearchParams({
      endpoint: "nearest_place",
      lat: lat,
      lon: lon,
    });

    await axios
      .get(`/.netlify/functions/weather?${params.toString()}`)
      .then((response) => {
        dispatch("assignLocationId", response.data.place_id);
        dispatch("assignLocationName", response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  assignLocationId({ commit }, data) {
    commit("setLocationId", data);
  },

  assignLocationName({ commit }, data) {
    commit("setLocationName", data);
  },
};
