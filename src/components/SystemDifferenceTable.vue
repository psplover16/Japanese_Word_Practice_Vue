<script setup>
import { ref, computed } from "vue";
import { systemDifference } from "@/constants/systemDifference.js";

const isShow = ref(false);

const props = defineProps({
  title: {
    type: String,
    default: "語法系統差異",
  },
  theadTitle: {
    type: Array,
    default: ["項目", "中文", "日文"],
  },
});

const dataMaxLength = computed(() => {
  let maxLength = 0;
  systemDifference.forEach((element) => {
    const objLength = Object.keys(element).length;
    if (objLength > maxLength) {
      maxLength = objLength;
    }
  });
  return maxLength;
});
</script>

<template>
  <table class="w-full border-separate border-spacing-0">
    <thead v-if="!!title">
      <tr @click="isShow = !isShow">
        <th
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center relative"
          :colspan="dataMaxLength"
        >
          {{ title }}
          <div class="absolute right-1 text-xs top-1/2 -translate-y-1/2">
            {{ isShow ? "▲" : "▼" }}
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-show="isShow">
      <tr>
        <td
          v-for="item in theadTitle"
          :key="item"
          class="bg-neutral-100 font-bold text-base p-0.5 border border-gray-300 text-center"
        >
          {{ item }}
        </td>
      </tr>
      <tr v-for="(row, rowIndex) in systemDifference" :key="rowIndex">
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          {{ row.name }}
        </td>
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          <span>{{ row.cn.content }}</span>
          <div
            v-for="(example, index) in row.cn.example"
            :key="index"
            class="ml-2"
          >
            <span class="text-sm text-gray-500">-{{ example }}</span>
          </div>
        </td>
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          <span>{{ row.jp.content }}</span>
          <div
            v-for="(example, index) in row.jp.example"
            :key="index"
            class="ml-2"
          >
            <span class="text-sm text-gray-500">-{{ example }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
td {
  text-align: left;
}
</style>
