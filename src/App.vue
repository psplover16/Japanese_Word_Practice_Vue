<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import BaseBtn from "@/components/BaseBtn.vue";

const status = ref();
// 讓模板可以存取版本號，同時提供開發時的 fallback
const APP_VERSION =
  typeof __APP_VERSION__ === "undefined" ? "dev" : __APP_VERSION__;

function handler(e) {
  alert("e.detail", e.detail);
  alert("e.detail.status", e.detail.status);
  const detail = e.detail;
  status.value = detail.status;
}

onMounted(() => {
  globalThis.addEventListener("pwa-status", handler);
});

onUnmounted(() => {
  globalThis.removeEventListener("pwa-status", handler);
});

function reload() {
  globalThis.location.reload();
}
</script>

<template>
  <router-view />
  <div class="banner" v-if="status === 'downloading' || status === 'ready'">
    <div
      v-if="status === 'downloading'"
      class="banner flex flex-col items-center"
    >
      <div class="text-nowrap">正在下載應用資源</div>
      <div class="text-nowrap">完成後可離線使用</div>
    </div>

    <div
      v-if="status === 'ready'"
      class="banner flex flex-col items-center gap-y-1"
    >
      <div class="text-nowrap">✅ 下載完成</div>
      <BaseBtn label="重新載入" theme="default" @click="reload" />
    </div>
  </div>
  <div class="h-8 text-right px-3">版本號: {{ APP_VERSION }}</div>
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
