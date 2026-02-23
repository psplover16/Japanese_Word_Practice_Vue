<script setup>
import { ref, computed } from "vue";
import { useVerbsData } from "@/composable/useVerbsData";

const { changeGrammarParts, dataTotalLength } = useVerbsData();

const props = defineProps({
  title: {
    type: String,
  },
  prefix: {
    type: String,
  },
  verbs: {
    type: String,
  },
  theadTitle: {
    type: Array,
  },
  values: {
    type: Array,
  },
  subValues: {
    type: Array,
  },
});

const isShow = ref(false);
const dealValFuc = (data) => {
  return (
    data?.map((item) => {
      return {
        ...item,
        base: changeGrammarParts(item.base),
      };
    }) || []
  );
};

const dealValues = computed(() => {
  return dealValFuc(props.values);
});

const dealSubValues = computed(() => {
  return dealValFuc(props.subValues);
});
</script>

<template>
  <table class="w-full border-separate border-spacing-0">
    <thead class="">
      <tr>
        <td
          :colspan="dealValues?.length + (prefix ? 1 : 0)"
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center text-nowrap whitespace-pre-wrap relative px-3"
          @click="isShow = !isShow"
        >
          {{ title }}
          <div class="absolute right-1 text-xs top-1/2 -translate-y-1/2">
            {{ isShow ? "▲" : "▼" }}
          </div>
        </td>
      </tr>
    </thead>
    <tbody v-show="isShow">
      <tr>
        <th
          v-for="(value, index) in theadTitle"
          :key="index"
          class="bg-neutral-100 font-bold text-sm p-0.5 border border-gray-300 text-center text-nowrap whitespace-pre-wrap"
        >
          {{ value }}
        </th>
      </tr>

      <template v-for="(row, rowIndex) in dealValues" :key="rowIndex">
        <tr
          v-for="(suffixAndMeaning, suffixIndex) in row.suffixAndMeaning"
          :key="suffixIndex"
        >
          <td
            v-if="suffixIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
          >
            {{ row.base }}
          </td>
          <td
            v-if="suffixIndex === 0 && rowIndex === 0 && prefix"
            :rowspan="dataTotalLength(values, 'suffixAndMeaning')"
            class="w-[80px] bg-white font-bold text-xs p-0.5 border border-gray-300"
          >
            {{ prefix }}
          </td>

          <td
            v-if="rowIndex === 0 && suffixIndex === 0 && verbs"
            :rowspan="dataTotalLength(values, 'suffixAndMeaning')"
            class="border border-gray-300 p-0.5 relative bg-white no-select text-nowrap"
          >
            {{ verbs }}
          </td>
          <td
            v-if="suffixIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="border border-gray-300 p-0.5 relative bg-white no-select text-nowrap"
          >
            {{ row.baseEnding }}
          </td>
          <td
            class="border border-gray-300 p-0.5 relative bg-white no-select text-nowrap whitespace-pre-wrap"
          >
            {{ suffixAndMeaning.suffix }}
          </td>
          <td
            class="border border-gray-300 p-0.5 relative bg-white no-select whitespace-pre-wrap"
          >
            {{ suffixAndMeaning.meaning }}
          </td>
        </tr>
      </template>
    </tbody>

    <tfoot v-if="dealSubValues.length" v-show="isShow">
      <template v-for="(row, rowIndex) in dealSubValues" :key="rowIndex">
        <tr
          v-for="(suffixAndMeaning, suffixIndex) in row.suffixAndMeaning"
          :key="suffixIndex"
          class="bg-neutral-200"
        >
          <td
            v-if="suffixIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="w-[80px] font-bold text-xs p-0.5 border border-gray-300"
          >
            {{ row.base }}
          </td>
          <td
            v-if="rowIndex === 0 && suffixIndex === 0 && verbs"
            :rowspan="dataTotalLength(subValues, 'suffixAndMeaning')"
            class="border border-gray-300 p-0.5 relative no-select"
          >
            {{ verbs }}
          </td>
          <td
            v-if="suffixIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="border border-gray-300 p-0.5 relative no-select"
          >
            {{ row.baseEnding }}
          </td>
          <td class="border border-gray-300 p-0.5 relative no-select">
            {{ suffixAndMeaning.suffix }}
          </td>
          <td class="border border-gray-300 p-0.5 relative no-select">
            {{ suffixAndMeaning.meaning }}
          </td>
        </tr>
      </template>
    </tfoot>
  </table>
</template>

<style scoped lang="scss">
td {
  text-align: center;
}
</style>
