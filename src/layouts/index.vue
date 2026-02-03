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
    <div class="flex justify-between items-center flex-wrap gap-y-2">
      <h1 class="text-xl font-bold text-nowrap">{{ title }}</h1>
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
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 24px auto 60px;
  padding: 0 12px;
}
</style>
