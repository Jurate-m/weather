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
          console.error(error);
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

  async getUserLocation({ state, dispatch, commit }) {
    // check location permission status
    const locationPermissionQuery = await navigator.permissions.query({
      name: "geolocation",
    });

    commit("setLocationPermissionStatus", locationPermissionQuery.state);

    if (state.locationPermissionStatus != "granted") {
      // if user denied location permissions - get estimated location using ip
      await dispatch("getIpUserLocation");
    } else {
      // dispatches geolocation action if:
      // 1. user didn't grant the location permission yet - triggers the popup and retrieves location information
      // 2. permisson is granted - retrieves location information
      dispatch("getCurrentUserLocation");
    }

    await dispatch("setLocation");
  },

  async setLocation({ state, commit }) {
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

    try {
      const response = await axios.get(
        `/.netlify/functions/weather?${params.toString()}`
      );

      commit("setLocationId", response.data.place_id);
      commit("setLocationName", response.data.name);
    } catch (error) {
      console.error(error);
    }
  },
};
