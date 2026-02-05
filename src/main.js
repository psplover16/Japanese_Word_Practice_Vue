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
      //
      // Service Worker 的生命週期中，每個 worker 會依序經過
      // installing → installed → activating → activated。
      //
      // registration.waiting（常簡稱 waiting worker）是指已經被「安裝（installed）」但還沒有成為控制頁面的那個 worker。
      // 它通常會在「有新版本可用」時出現，瀏覽器把新的 worker 放在 waiting 階段，以免立刻中斷目前受 control 的頁面（避免突如其來的資源不一致）。
      //
      // waiting 出現的典型原因：你部署了新的 sw.js；瀏覽器下載並安裝完新的 worker，但現有頁面仍由舊的 worker 控制，所以新 worker 先等候（waiting）直到舊的 worker 釋放控制權。
      //
      // 若頁面載入時已存在 waiting worker，代表有更新可用
      if (reg.waiting && navigator.serviceWorker.controller) {
        globalThis.dispatchEvent(
          new CustomEvent("pwa-status", { detail: { status: "ready" } }),
        );
      }

      // 🔔 有新版本 / 開始下載
      reg.addEventListener("updatefound", () => {
        const worker = reg.installing;
        if (!worker) return;

        globalThis.dispatchEvent(
          new CustomEvent("pwa-status", {
            detail: { status: "downloading" },
          }),
        );

        worker.addEventListener("statechange", () => {
          if (worker.state === "installed") {
            // 有 controller 表示是「更新」，沒有則是首次安裝
            const isUpdate = !!navigator.serviceWorker.controller;
            if (isUpdate) {
              globalThis.dispatchEvent(
                new CustomEvent("pwa-status", { detail: { status: "ready" } }),
              );
            } else {
              // 首次安裝：可選擇不顯示 ready
            }
          }
        });
      });
    });
}
