import { createStore } from "vuex";

import rootActions from "./actions.js";
import rootGetters from "./getters.js";
import rootMutations from "./mutations.js";

const store = createStore({
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
