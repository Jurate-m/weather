import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";

const store = createStore({
  state() {
    return {
      latitude: null,
      longitude: null,
    };
  },
  getters: {
    getLatitude: (state) => state.latitude,
    getLongitude: (state) => state.longitude,
  },

  actions: {
    async getClientLocation({ commit }) {
      await fetch("https://ipapi.co/json/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setLatitude", data.latitude);
          commit("setLongitude", data.longitude);
        })
        .catch((error) => console.error("Error:", error));
    },

    getPreciseClientLocation({ commit, dispatch }) {
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
          (position) => {
            commit("setLatitude", position.coords.latitude);
            commit("setLongitude", position.coords.longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
            dispatch("getClientLocation");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
  },

  mutations: {
    setLatitude(state, latitude) {
      state.latitude = latitude;
    },
    setLongitude(state, longitude) {
      state.longitude = longitude;
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
