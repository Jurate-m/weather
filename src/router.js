import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Hourly from "./views/Hourly.vue";
import Daily from "./views/Daily.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/hourly", name: "Hourly", component: Hourly },
    { path: "/daily", name: "Daily", component: Daily },
  ],
});

export default router;
