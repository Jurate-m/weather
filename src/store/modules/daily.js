import apiRequest from "../utils/apiUtils.js";

export default {
  namespaced: true,

  state() {
    return {
      lastDailyApiTimeStmp: null,
      dailyWeather: [],
    };
  },

  mutations: {
    assignDailyWeather(state, payload) {
      state.dailyWeather = payload.data.daily.data;
      sessionStorage.setItem(
        "DailyWeather",
        JSON.stringify(payload.data.daily.data)
      );
    },

    setDailyTimeStamp(state, payload) {
      state.lastCurrentApiTimeStmp = payload;
      sessionStorage.setItem("lastDailyApiTimeStmp", payload);
    },
  },

  actions: {
    async getDailyWeather({ commit, rootState }) {
      const place_id =
        rootState.locationId || sessionStorage.getItem("LocationId");

      if (!place_id) return;

      await apiRequest(
        "daily",
        { place_id: place_id, units: "metric" },
        commit,
        "assignDailyWeather"
      );

      commit("setDailyTimeStamp", new Date());
    },
  },
};
