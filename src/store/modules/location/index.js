// import locationGetters from "./getters.js";
import locationActions from "./actions.js";
import locationMutations from "./mutations.js";

// retrieving location id using state.latitude and state.longitude from API
// ( passing it further to daily and hourly weather requests )

export default {
  namespaced: true,

  state() {
    return {
      place: null,
    };
  },

  // getters: locationGetters,
  actions: locationActions,
  mutations: locationMutations,
};
