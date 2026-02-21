<script setup>
import { ref, onMounted } from "vue";
import { registerSW } from "virtual:pwa-register";
import BaseBtn from "@/components/BaseBtn.vue";

const APP_VERSION =
  typeof __APP_VERSION__ === "undefined" ? "dev" : __APP_VERSION__;

const status = ref("");

let updateSW;
let statusTimer = null;

const setStatus = (text, autoClearMs) => {
  // 取消舊的 timer
  if (statusTimer) {
    clearTimeout(statusTimer);
    statusTimer = null;
  }
  status.value = text;
  if (autoClearMs) {
    statusTimer = setTimeout(() => {
      status.value = "";
      statusTimer = null;
    }, autoClearMs);
  }
};

onMounted(() => {
  // PWA Service Worker 註冊
  updateSW = registerSW({
    // onNeedRefresh之後，新 SW 是不是立刻接管目前頁面
    immediate: false,

    // 第一次可離線
    onOfflineReady() {
      setStatus("✅ 可離線使用", 1500);
    },

    // SW 已成功註冊（但不代表已啟用）- 沒整個刪掉，通常SW期限很久
    onRegistered(registration) {
      console.log(registration);
      // 只有在有 installing worker（代表有新版本正在下載）時才顯示「下載中」訊息。
      // registerSW 會在每次頁面載入時呼叫註冊流程，onRegistered 不代表正在下載新資源，
      // 因此直接顯示訊息會導致每次開頁都看到提示。
      if (registration && registration.installing) {
        setStatus("正在下載應用資源\n完成後可離線使用", 2000);
      }
    },

    // 新 Service Worker 已下載完成，但正在 waiting，還沒套用
    onNeedRefresh() {
      const time = 2000;
      setStatus("✅資源下載完成", time);
      setTimeout(() => {
        updateSW(true);
      }, time);
    },

    // 錯誤
    onRegisterError(error) {
      console.error("[PWA] SW registration error", error);
    },
  });
});
</script>

<template>
  <router-view />
  <div class="banner" v-if="!!status">
    <div class="whitespace-pre-wrap break-words">{{ status }}</div>
  </div>
  <div class="h-10 flex justify-end items-center px-3 max-w-[1100px] mx-auto">
    {{ APP_VERSION }}
  </div>
</template>

<style lang="scss" scoped>
.banner {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: #111;
  color: white;
  padding: 12px 12px;
  border-radius: 8px;
}
</style>
