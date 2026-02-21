<script setup>
import { computed } from "vue";
const props = defineProps({
  title: {
    type: String,
  },
  rules: {
    type: Array,
    required: true,
  },
});

const dataMaxLength = computed(() => {
  let maxLength = 0;
  props.rules.forEach((rule) => {
    const ruleLength = rule?.examples?.length || 0;
    if (ruleLength > maxLength) {
      maxLength = ruleLength;
    }
  });
  return maxLength;
});
</script>

<template>
  <table class="w-full border-separate border-spacing-0">
    <thead v-if="!!title">
      <tr>
        <th
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center"
          :colspan="dataMaxLength"
        >
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rules" :key="rowIndex">
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          <div class="flex items-start">
            <span class="shrink-0 w-5 text-left">{{ rowIndex + 1 }}.</span>
            <span class="flex-1 whitespace-normal break-words">
              {{ row.rules }}
            </span>
          </div>
          <div
            v-for="(rowExamole, rowInIndex) in row.examples"
            :key="rowInIndex"
            class="ml-5"
          >
            {{ rowExamole.verb }}：{{ rowExamole.meaning }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss"></style>
