import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import currentModule from "./modules/current.js";
import dailyModule from "./modules/daily.js";
import hourlyModule from "./modules/hourly.js";
import astroModule from "./modules/astro.js";

const store = createStore({
  modules: {
    current: currentModule,
    hourly: hourlyModule,
    daily: dailyModule,
    astro: astroModule,
  },

  state() {
    return {
      latitude: null,
      longitude: null,
      locationEnabled: false,
      locationId: null,
    };
  },

  mutations: rootMutations,

  actions: rootActions,
});

export default store;
