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
      let dateIndex = new Date().getUTCDate();
      let day = [];
      let loopIndex = 0;

      payload.map((item) => {
        if (dateIndex == new Date(item.date).getUTCDate()) {
          day.push(item);
        } else {
          day = [];
          dateIndex = new Date(item.date).getUTCDate();
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
          await dispatch("location/getUserLocation", "", { root: true });
        } catch (error) {
          console.error(error);
        }
      }

      state.place_id =
        rootState.location.locationId || sessionStorage.getItem("LocationId");

      if (!state.place_id) return;

      try {
        const params = new URLSearchParams({
          endpoint: "hourly",
          place_id: state.place_id,
          units: "metric",
        });

        const resp = await fetch(
          `/.netlify/functions/weather?${params.toString()}`
        );

        const data = await resp.json();

        commit("separateDays", data.hourly.data);
        commit("setHourlyTimeStamp", new Date());
      } catch (error) {
        console.error(error);
      }
    },
  },
};
