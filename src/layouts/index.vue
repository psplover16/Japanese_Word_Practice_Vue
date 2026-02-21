<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseBtn from "@/components/BaseBtn.vue";

const route = useRoute();
const router = useRouter();

const title = computed(() => route.meta.title || "Japanese Word Practice");
const routeBtnTheme = (btnRouteName) => {
  const currentRouteName = route.name;
  if (btnRouteName === currentRouteName) {
    return "selected";
  } else {
    return "default";
  }
};
</script>

<template>
  <div class="container">
    <div class="flex justify-between items-center flex-wrap gap-y-2">
      <h1 class="text-xl font-bold text-nowrap">{{ title }}</h1>
      <div class="flex gap-2">
        <BaseBtn
          label="字母練習"
          :theme="routeBtnTheme('LetterPractice')"
          @click="router.push({ name: 'LetterPractice' })"
        />
        <BaseBtn
          label="變化規則"
          :theme="routeBtnTheme('ChangeRules')"
          @click="router.push({ name: 'ChangeRules' })"
        />
        <BaseBtn
          label="單字練習"
          :theme="routeBtnTheme('WordPractice')"
          @click="router.push({ name: 'WordPractice' })"
        />
      </div>
    </div>

    <div
      class="w-full flex flex-col gap-2 bg-white border border-gray-200 rounded-lg px-2 py-3 mt-2"
    >
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 12px auto 0px;
  padding: 0 12px;
}
</style>
