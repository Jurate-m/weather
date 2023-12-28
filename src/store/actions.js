export default {
  setClientLocation({ commit, dispatch }) {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          commit("setLatitude", position.coords.latitude);
          commit("setLongitude", position.coords.longitude);
          commit("enableLocation");
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert(
            "Enable location permission to get results based on more accurate coordinates"
          );
          dispatch("getClientLocation");
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  },

  async getClientLocation({ commit }) {
    await fetch("https://ipapi.co/json/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        commit("setLatitude", data.latitude);
        commit("setLongitude", data.longitude);
      })
      .catch((error) => console.error("Error:", error));
  },
};
