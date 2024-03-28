export default {
  async getAstro({ dispatch, commit }) {
    // assign location_id to returned value from getLocationId action;
    const location_id = await dispatch("location/getLocationId", "", {
      root: true,
    });

    // if location_id is false - return;
    if (!location_id) return;

    // if location_id exists retrieve data
    try {
      // and pass it as one of the params for the request
      const params = new URLSearchParams({
        endpoint: "astro",
        place_id: location_id,
        units: "metric",
      });

      const resp = await fetch(
        `/.netlify/functions/weather?${params.toString()}`
      );

      const data = await resp.json();

      commit("setAstro", data.astro.data[0]);
    } catch (error) {
      console.error(error);
    }
  },
};
