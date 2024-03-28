export default {
  async getWeather({ dispatch, commit }, payload) {
    //exctract commit names form payload object
    const { endpoint, commitName_1, commitName_2 } = payload;

    // assign location_id to returned value from getLocationId action;
    const location_id = await dispatch("getLocationId", "", { root: true });

    // if location_id is false - return;
    if (!location_id) return;

    // if location_id exists retrieve data
    try {
      // and pass it as one of the params for the request
      const params = new URLSearchParams({
        endpoint: endpoint,
        place_id: location_id,
        units: "metric",
      });

      const resp = await fetch(
        `/.netlify/functions/weather?${params.toString()}`
      );

      const data = await resp.json();

      console.log("passdasd");

      commit(commitName_1, data[endpoint].data);
      commit(commitName_2, new Date());
    } catch (error) {
      console.error(error);
    }
  },
};
