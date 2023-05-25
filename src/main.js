import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// Vue router
import App from "./App.vue";
import router from "./router";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Firebase
import "./firebase.js";

import VueConfetti from "vue-confetti";


const vuetify = createVuetify({
  components,
  directives
});
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueConfetti);

app.mount("#app");
