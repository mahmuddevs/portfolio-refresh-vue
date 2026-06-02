import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";
import "./style.css";

import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");
