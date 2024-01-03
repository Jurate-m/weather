import weatherActions from "./actions.js";
import weatherMutations from "./mutations.js";
import weatherGetters from "./getters.js";
import data from "../../../data.json";

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

  getters: weatherGetters,
};
