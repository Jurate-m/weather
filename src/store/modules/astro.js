import apiRequest from "../utils/apiUtils.js";

export default {
  namespaced: true,

  state() {
    return {
      astroData: null,
    };
  },

  mutations: {
    setAstroData(state, payload) {
      state.astroData = payload.astro.data;
      localStorage.setItem("AstroData", JSON.stringify(payload.astro.data));
    },
  },

  actions: {
    async getAstroData({ rootState, commit }) {
      const place_id =
        rootState.locationId || sessionStorage.getItem("LocationId");

      if (!place_id) return;

      await apiRequest(
        "astro",
        { place_id: rootState.locationId },
        commit,
        "setAstroData"
      );
    },
  },
};
