import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/style/scss/main.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

//
// PWA Service Worker 註冊
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${import.meta.env.BASE_URL}sw.js`)
    .then((reg) => {
      // 🔔 有新版本 / 開始下載
      reg.addEventListener("updatefound", () => {
        const worker = reg.installing;
        if (!worker) return;

        window.dispatchEvent(
          new CustomEvent("pwa-status", {
            detail: { status: "downloading" },
          }),
        );

        worker.addEventListener("statechange", () => {
          if (worker.state === "installed") {
            window.dispatchEvent(
              new CustomEvent("pwa-status", {
                detail: { status: "ready" },
              }),
            );
          }
        });
      });
    });
}
