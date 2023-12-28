import { createApp } from "vue";
import store from "./store/index.js";
import App from "./App.vue";
import ClickOutsideDirective from "./directives/ClickOutsideDirective.js";

const app = createApp(App);
app.directive("click-out", ClickOutsideDirective);
app.use(store);
app.mount("#app");
