import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueTextAreaAutosize from "vue-textarea-autosize";
import router from "./router/index.js";

loadFonts();

createApp(App).use(vuetify).use(VueTextAreaAutosize).use(router).mount("#app");
