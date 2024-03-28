import { formatDateTime } from "@/utils.js";

export default {
  setAstro(state, payload) {
    state.astro = {
      sunrise: {
        hours: new Date(payload.sun.rise).getHours(),
        minutes: new Date(payload.sun.rise).getMinutes(),
      },
      sunset: {
        hours: new Date(payload.sun.set).getHours(),
        minutes: new Date(payload.sun.set).getMinutes(),
      },
    };
    sessionStorage.setItem("astro_today", JSON.stringify(state.astro));
  },
};
