import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Hourly from "./views/Hourly.vue";
import Daily from "./views/Daily.vue";
import notFound from "./views/404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Current weather", component: Home },
    { path: "/hourly", name: "Hourly weather", component: Hourly },
    { path: "/daily", name: "Daily weather", component: Daily },
    { path: "/:catchAll(.*)", component: notFound },
  ],
});

export default router;
