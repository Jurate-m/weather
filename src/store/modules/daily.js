export default {
  namespaced: true,

  state() {
    return {
      place_id: null,
      lastDailyApiTimeStmp: null,
      dailyWeather: [],
    };
  },

  mutations: {
    assignDailyWeather(state, payload) {
      state.dailyWeather = payload;
      sessionStorage.setItem("DailyWeather", JSON.stringify(payload));
    },

    setDailyTimeStamp(state, payload) {
      state.lastCurrentApiTimeStmp = payload;
      sessionStorage.setItem("lastDailyApiTimeStmp", payload);
    },
  },

  actions: {
    async getDailyWeather({ rootState, state, dispatch, commit }) {
      if (
        !rootState.location.locationId ||
        !sessionStorage.getItem("LocationId")
      ) {
        try {
          await dispatch("location/loadLocation", "", { root: true });
        } catch (error) {
          console.error(error);
        }
      }

      state.place_id =
        rootState.location.locationId || sessionStorage.getItem("LocationId");

      if (!state.place_id) return;

      try {
        const params = new URLSearchParams({
          endpoint: "daily",
          place_id: state.place_id,
          units: "metric",
        });

        const resp = await fetch(
          `/.netlify/functions/weather?${params.toString()}`
        );

        const data = await resp.json();

        commit("assignDailyWeather", data.daily.data);
        commit("setDailyTimeStamp", new Date());
      } catch (error) {
        console.error(error);
      }
    },
  },
};
