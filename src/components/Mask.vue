<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
// 當遮罩開啟時鎖定頁面捲動，關閉時恢復
import { watch, onUnmounted } from 'vue';

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      // 傳統做法：設定 body overflow hidden
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 mask-bg flex items-center justify-center"
    v-if="modelValue"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.mask-bg {
  background-color: rgba(15, 23, 42, 0.55);
  /* 攔截點擊，避免穿透底下元素 */
  pointer-events: auto;
}
</style>
