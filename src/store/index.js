import { createStore } from "vuex";

import locationModule from "./modules/location/index.js";
import weathreModule from "./modules/weather/index.js";
import astroModule from "./modules/astro/index.js";

const store = createStore({
  modules: {
    location: locationModule,
    weather: weathreModule,
    astro: astroModule,
  },
});

export default store;
