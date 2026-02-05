import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/style/scss/main.scss";
import { registerSW } from "virtual:pwa-register";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

//
// PWA Service Worker 註冊
registerSW({
  immediate: true,

  // ✅ 第一次可離線
  onOfflineReady() {
    console.log("[PWA] Offline ready");
    globalThis.dispatchEvent(
      new CustomEvent("pwa-status", {
        detail: { status: "offline-ready" },
      }),
    );
  },

  // 🔄 新版本「下載完成，等待更新」
  onNeedRefresh() {
    console.log("[PWA] New version downloaded");

    globalThis.dispatchEvent(
      new CustomEvent("pwa-status", {
        detail: { status: "ready" },
      }),
    );
  },

  // ❌ 錯誤
  onRegisterError(error) {
    console.error("[PWA] SW registration error", error);
  },
});
