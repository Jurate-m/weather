import data from "../../../data.json";

export default {
  getData({ state, commit }) {
    let hourly = data.hourly.data;

    commit("transformDataDates", hourly);

    if (state.hourlyWeather.length) {
      commit("separateDataByDay", state.hourlyWeather);
    }
  },
};
