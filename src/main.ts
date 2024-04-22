import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Camera from "simple-vue-camera";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.component("camera", Camera);
app.mount("#app");
