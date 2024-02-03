import apiRequest from "../utils/apiUtils.js";

export default {
  namespaced: true,

  state() {
    return {
      hourlyWeather: [],
    };
  },

  mutations: {
    separateDays(state, payload) {
      let dateIndex = new Date().getDate();
      let day = [];
      let loopIndex = 0;

      payload.data.hourly.data.map((item) => {
        if (dateIndex == new Date(item.date).getDate()) {
          day.push(item);
        } else {
          day = [];
          dateIndex = new Date(item.date).getDate();
          loopIndex += 1;
          day.push(item);
        }

        state.hourlyWeather[loopIndex] = day;
      });

      sessionStorage.setItem(
        "HourlyWeather",
        JSON.stringify(state.hourlyWeather)
      );
    },
  },

  actions: {
    async getHourlyWeather({ rootState, commit }) {
      const place_id =
        rootState.locationId || sessionStorage.getItem("LocationId");

      if (!place_id) return;

      await apiRequest(
        "hourly",
        { place_id: place_id, units: "metric" },
        commit,
        "separateDays"
      );
    },
  },
};
