import axios from "axios";
import apiRequest from "./utils/apiUtils.js";

export default {
  async setUserLocation({ commit }) {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
          (position) => {
            commit("enableLocation");
            commit("setLatitude", position.coords.latitude);
            commit("setLongitude", position.coords.longitude);
            resolve();
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          { enableHighAccuracy: true }
        );
      }
    });
  },

  getUserLocation({ commit }) {
    return axios
      .get("https://ipapi.co/json")
      .then((response) => {
        commit("setLatitude", response.data.latitude);
        commit("setLongitude", response.data.longitude);
      })
      .catch((error) => console.error(error));
  },

  async getLocationId({ state, commit }) {
    const lat = state.latitude || sessionStorage.getItem("Latitude");
    const lon = state.longitude || sessionStorage.getItem("Longitude");
    if (!lat || !lon) return;

    await apiRequest(
      "nearest_place",
      { lat: lat, lon: lon },
      commit,
      "setLocationId"
    );
  },

  async loadLocationId({ state, dispatch }) {
    try {
      await dispatch("setUserLocation");
    } catch (error) {
      try {
        await dispatch("getUserLocation");
      } catch (error) {
        console.log(error);
      }
    }

    if (!state.latitude || !state.longitude) return;

    try {
      await dispatch("getLocationId");
    } catch (error) {
      console.log(error);
    }
  },
};
