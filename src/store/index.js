import { createStore } from "vuex";

import locationModule from "./modules/location.js";
import dailyModule from "./modules/daily.js";
import hourlyModule from "./modules/hourly.js";

const store = createStore({
  modules: {
    location: locationModule,
    hourly: hourlyModule,
    daily: dailyModule,
  },
});

export default store;
