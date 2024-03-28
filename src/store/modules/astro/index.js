import astroMutations from "./mutations.js";
import astroActions from "./actions.js";

export default {
  namespaced: true,

  state() {
    return {
      astro: null,
    };
  },

  mutations: astroMutations,

  actions: astroActions,
};
