import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import router from "./router";
import quasarConfig from "./plugins/quasar.config";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import { useUserStore } from "./stores/userStore";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const userStore = useUserStore();
userStore.restoreSession();

app.use(Quasar, quasarConfig);
app.use(router);
app.mount("#app");
