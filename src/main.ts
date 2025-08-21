import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import router from "./router";
import quasarConfig from "./plugins/quasar.config";
import '@quasar/extras/material-icons/material-icons.css'
import "quasar/src/css/index.sass";


const app = createApp(App);
app.use(createPinia());
app.use(Quasar, quasarConfig);
app.use(router);
app.mount("#app");
