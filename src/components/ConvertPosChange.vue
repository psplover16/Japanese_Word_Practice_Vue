<script setup>
import { ref } from "vue";
import { convertedPos } from "@/constants/changeRules.js";
import { numToZh } from "@/helper/helper.js";
const props = defineProps({
  title: {
    type: String,
  },
});

const isShow = ref(false);
</script>

<template>
  <table class="w-full border-separate border-spacing-0">
    <thead v-if="!!title">
      <tr>
        <th
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center relative"
          @click="isShow = !isShow"
        >
          {{ title }}
          <div class="absolute right-1 text-xs top-1/2 -translate-y-1/2">
            {{ isShow ? "▲" : "▼" }}
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-show="isShow">
      <tr v-for="(row, rowIndex) in convertedPos" :key="rowIndex">
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          <div>{{ numToZh(rowIndex + 1) }}. {{ row.title }}</div>
          <ol class="list-[upper-alpha] list-inside pl-2">
            <li
              v-for="(content, contentIndex) in row.contents"
              :key="contentIndex"
              class="pl-0"
            >
              {{ content.subTitle }}
              <ul class="list-inside ml-1 list-[square]">
                <li v-for="value in content.subContents">{{ value }}</li>
                <div class="font-bold">範例：</div>
                <ul class="list-inside ml-1 list-disc">
                  <li v-for="value in content.examples" class="">
                    {{ value }}
                  </li>
                </ul>
              </ul>
            </li>
          </ol>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss"></style>
