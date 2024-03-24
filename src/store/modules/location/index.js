import locationMutations from "./mutations.js";
import locationActions from "./actions.js";

export default {
  namespaced: true,

  state() {
    return {
      latitude: null,
      longitude: null,
      locationName: null,
      locationId: null,
      error: null,
    };
  },

  mutations: locationMutations,

  actions: locationActions,
};
