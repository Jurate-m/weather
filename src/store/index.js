import { createStore } from "vuex";

import rootActions from "./actions.js";
import rootGetters from "./getters.js";
import rootMutations from "./mutations.js";
import weatherModule from "./modules/weather/index.js";

const store = createStore({
  modules: {
    weather: weatherModule,
  },

  state() {
    return {
      latitude: null,
      longitude: null,
      locationEnabled: false,
    };
  },

  actions: rootActions,

  getters: rootGetters,

  mutations: rootMutations,
});

export default store;
