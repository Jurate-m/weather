import apiRequest from "../utils/apiUtils.js";
import axios from "axios";

export default {
  namespaced: true,

  state() {
    return {
      latitude: null,
      longitude: null,
      locationName: null,
      locationId: null,
    };
  },

  mutations: {
    setLatitude(state, payload) {
      state.latitude = payload;
    },

    setLongitude(state, payload) {
      state.longitude = payload;
    },

    setLocationId(state, payload) {
      state.locationId = payload;
      sessionStorage.setItem("LocationId", payload);
    },

    setLocationName(state, payload) {
      state.locationName = payload;
      sessionStorage.setItem("LocationName", payload);
    },
  },

  actions: {
    async getUserLocation({ dispatch, commit }) {
      if (sessionStorage.getItem("LocationId")) {
        return;
      } else {
        await dispatch("getCurrentPosition");
      }
    },

    getCurrentPosition({ commit }) {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              commit("setLatitude", position.coords.latitude);
              commit("setLongitude", position.coords.longitude);

              resolve();
            },
            (error) => {
              reject(error);
            },
            { enableHighAccuracy: true }
          );
        }
      });
    },

    getUserLocationIp({ commit }) {
      return axios
        .get("https://ipapi.co/json")
        .then((response) => {
          commit("setLatitude", response.data.latitude);
          commit("setLongitude", response.data.longitude);
        })
        .catch((error) => console.error(error));
    },

    async setLocation({ state, commit }) {
      const lat = state.latitude || sessionStorage.getItem("Latitude");
      const lon = state.longitude || sessionStorage.getItem("Longitude");
      if (!lat || !lon) return;

      // const nearest_place = await apiRequest("nearest_place", {
      //   lat: lat,
      //   lon: lon,
      // });

      try {
        const params = new URLSearchParams({
          endpoint: "nearest_place",
          lat: lat,
          lon: lon,
        });

        const resp = await fetch(
          `/.netlify/functions/weather?${params.toString()}`
        );

        const data = await resp.json();

        commit("setLocationId", data.place_id);
        commit("setLocationName", data.name);
      } catch (error) {
        console.error(error);
      }

      // commit("setLocationId", nearest_place.data.place_id);
      // commit("setLocationName", nearest_place.data.name);
    },

    async loadLocation({ state, dispatch }) {
      try {
        await dispatch("getUserLocation");
      } catch (error) {
        Error, 429;
        try {
          await dispatch("getUserLocationIp");
        } catch (error) {
          console.error(error);
        }
        console.error(error);
      }

      if (!state.latitude || !state.longitude) return;

      try {
        await dispatch("setLocation");
      } catch (error) {
        console.error(error);
      }
    },

    setUserLocationId({ commit }, data) {
      commit("setLocationId", data);
    },

    setUserLocationName({ commit }, data) {
      commit("setLocationName", data);
    },
  },
};
