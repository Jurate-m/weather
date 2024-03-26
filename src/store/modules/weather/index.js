import weatherMutations from "./mutations.js";
import weatherActions from "./actions.js";

export default {
  namespaced: true,

  state() {
    return {
      place_id: null,
      hourlyTimeStmp: null,
      dailyTimeStmp: null,
      dailyWeather: [],
      hourlyWeather: [],
    };
  },

  mutations: weatherMutations,

  actions: weatherActions,
};
