import { createStore } from "vuex";

import rootActions from "./actions.js";
// import rootGetters from "./getters.js";
import rootMutations from "./mutations.js";
import locationModule from "./modules/location/index.js";
import dailyModule from "./modules/weather/daily/index.js";
import hourlyModule from "./modules/weather/hourly/index.js";

const store = createStore({
  modules: {
    location: locationModule,
    hourly: hourlyModule,
    daily: dailyModule,
  },

  state() {
    return {
      latitude: null,
      longitude: null,
      locationEnabled: false,
    };
  },

  actions: rootActions,

  // getters: rootGetters,

  mutations: rootMutations,
});

export default store;
