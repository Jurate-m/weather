import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Hourly from "./views/Hourly.vue";
import Daily from "./views/Daily.vue";
import notFound from "./views/404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Current", component: Home },
    { path: "/hourly", name: "Hourly", component: Hourly },
    { path: "/daily", name: "Daily", component: Daily },
    { path: "/:catchAll(.*)", component: notFound },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
