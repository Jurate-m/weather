import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Hourly from "./views/Hourly.vue";
import Daily from "./views/Daily.vue";
import notFound from "./views/404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/hourly", name: "Hourly", component: Hourly },
    { path: "/daily", name: "Daily", component: Daily },
    { path: "/:notFound", component: notFound },
  ],
});

export default router;
