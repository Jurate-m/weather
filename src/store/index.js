import { createStore } from "vuex";

import locationModule from "./modules/location/index.js";
import weathreModule from "./modules/weather/index.js";

const store = createStore({
  modules: {
    location: locationModule,
    weather: weathreModule,
  },
});

export default store;
