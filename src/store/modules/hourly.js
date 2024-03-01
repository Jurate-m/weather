import apiRequest from "../utils/apiUtils.js";

export default {
  namespaced: true,

  state() {
    return {
      place_id: null,
      lastHourlyApiTimeStmp: null,
      hourlyWeather: [],
    };
  },

  mutations: {
    separateDays(state, payload) {
      let dateIndex = new Date().getDate();
      let day = [];
      let loopIndex = 0;

      payload.map((item) => {
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

    setHourlyTimeStamp(state, payload) {
      state.lastCurrentApiTimeStmp = payload;
      sessionStorage.setItem("lastHourlyApiTimeStmp", payload);
    },
  },

  actions: {
    async getHourlyWeather({ rootState, state, commit, dispatch }) {
      if (
        !rootState.location.locationId ||
        !sessionStorage.getItem("LocationId")
      ) {
        try {
          await dispatch("location/loadLocation", "", { root: true });
        } catch (error) {
          console.log(error);
        }
      }

      state.place_id =
        rootState.location.locationId || sessionStorage.getItem("LocationId");

      if (!state.place_id) return;

      const hourly = await apiRequest("hourly", {
        place_id: state.place_id,
        units: "metric",
      });

      commit("separateDays", hourly.data.hourly.data);

      commit("setHourlyTimeStamp", new Date());
    },
  },
};
