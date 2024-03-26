export default {
  async getLocationId({ rootState, dispatch }) {
    // Check if locationId exists either in state or is assigned to a sessionStorage
    const location_id =
      rootState.location.locationId || sessionStorage.getItem("location_id");
    // return location_id if it exists
    if (location_id) return location_id;

    // dispatch location action if location_id doesn't exists
    await dispatch("location/getUserLocation", "getIpUserLocation", {
      root: true,
    });

    // return location id retrieved either from state or sessionStorage or null
    return (
      rootState.location.locationId || sessionStorage.getItem("location_id")
    );
  },

  async getWeather({ dispatch, commit }, payload) {
    //exctract commit names form payload object
    const { endpoint, commitName_1, commitName_2 } = payload;

    // assign location_id to returned value from getLocationId action;
    const location_id = await dispatch("getLocationId");

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
