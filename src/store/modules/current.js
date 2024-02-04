import apiRequest from "../utils/apiUtils.js";

export default {
  namespaced: true,

  state() {
    return {
      lastCurrentApiTimeStmp: null,
      currentWeather: null,
    };
  },

  mutations: {
    assignCurrentWeather(state, payload) {
      state.currentWeather = payload.data.current;
      sessionStorage.setItem(
        "CurrentWeather",
        JSON.stringify(payload.data.current)
      );
    },

    setCurrentTimeStamp(state, payload) {
      state.lastCurrentApiTimeStmp = payload;
      sessionStorage.setItem("lastCurrentApiTimeStmp", payload);
    },
  },

  actions: {
    async getCurrentWeather({ rootState, commit }) {
      const place_id =
        rootState.locationId || sessionStorage.getItem("LocationId");

      if (!place_id) return;

      await apiRequest(
        "current",
        { place_id: place_id, units: "metric" },
        commit,
        "assignCurrentWeather"
      );

      commit("setCurrentTimeStamp", new Date());
    },
  },
};
