import weatherActions from "./actions.js";
import weatherMutations from "./mutations.js";
// import weatherGetters from "./getters.js";

export default {
  namespaced: true,

  state() {
    return {
      hourlyWeather: [],
      days: [],
    };
  },

  mutations: weatherMutations,

  actions: weatherActions,

  // getters: weatherGetters,
};
