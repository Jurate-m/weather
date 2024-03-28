import axios from "axios";

export default {
  // getCurrentUserPosition({ commit }) {
  //   if ("geolocation" in navigator) {
  //     return new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           commit("setLatitude", position.coords.latitude);
  //           commit("setLongitude", position.coords.longitude);
  //           resolve();
  //         },
  //         (error) => {
  //           commit("setError", error.code);
  //           reject(error);
  //         },
  //         { enableHighAccuracy: true }
  //       );
  //     });
  //   }
  // },

  async getIpUserLocation({ commit }) {
    return await axios
      .get("https://ipapi.co/json")
      .then((response) => {
        commit("setLatitude", response.data.latitude);
        commit("setLongitude", response.data.longitude);
      })
      .catch((error) => console.error(error));
  },

  assignLocationId({ commit }, data) {
    commit("setLocationId", data);
  },

  assignLocationName({ commit }, data) {
    commit("setLocationName", data);
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

  async getUserLocation({ state, dispatch }, actionName) {
    // await dispatching provided action name
    await dispatch(actionName);

    // if there is not lat and lon due to an ip API error - exit the action
    if (!state.latitude || !state.longitude) return;

    // ^ else - dispacth setLocation action
    await dispatch("setLocation");
  },

  async getLocationId({ state, dispatch }) {
    // Check if locationId exists either in state or is assigned to a sessionStorage
    const location_id =
      state.location.locationId || sessionStorage.getItem("location_id");
    // return location_id if it exists
    if (location_id) return location_id;

    // dispatch location action if location_id doesn't exists
    await dispatch("location/getUserLocation", "getIpUserLocation", {
      root: true,
    });

    // return location id retrieved either from state or sessionStorage or null
    return state.location.locationId || sessionStorage.getItem("location_id");
  },
};
