import { createApp } from "vue";
import store from "./store/index.js";
import router from "./router.js";
import App from "./App.vue";
import ClickOut from "./directives/ClickOut.js";

const app = createApp(App);
app.directive("click-out", ClickOut);
app.use(store);
app.use(router);
app.mount("#app");
