<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseBtn from "@/components/BaseBtn.vue";

const route = useRoute();
const router = useRouter();

const title = computed(() => route.meta.title || "Japanese Word Practice");
</script>

<template>
  <div class="container">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <div class="flex gap-2">
        <BaseBtn
          label="字母練習"
          theme="default"
          @click="router.push({ name: 'LetterPractice' })"
        />
        <BaseBtn
          label="單字練習"
          theme="default"
          @click="router.push({ name: 'WordPractice' })"
        />
      </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg px-3 py-4 mt-3">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 24px auto 60px;
  padding: 0 12px;
}
</style>
