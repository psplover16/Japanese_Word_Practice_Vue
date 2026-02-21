<script setup>
import { longToneRule } from "@/constants/jpText.js";
</script>

<template>
  <table class="w-full border-separate border-spacing-0 mt-3">
    <thead>
      <tr>
        <th
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-30 whitespace-pre-wrap text-left"
          colspan="4"
        >
          長音規則
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tableData, index) in longToneRule" :key="index">
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          <div class="flex flex-col justify-center items-center text-primary">
            <div class="font-bold text-nowrap sm:text-xl text-lg">
              {{ tableData?.condition }}
            </div>
          </div>
          <div
            v-for="(item, index) in tableData.example"
            :key="index"
            class="text-base font-medium"
          >
            {{ item.word }}: {{ item.meaning }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
