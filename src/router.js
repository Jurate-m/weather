import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Hourly from "./views/Hourly.vue";
import Daily from "./views/Daily.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/hourly", component: Hourly },
    { path: "/daily", component: Daily },
  ],
});

export default router;
