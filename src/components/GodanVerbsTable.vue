<script setup>
import { computed } from "vue";
import { letters } from "@/constants/jpText.js";
import {
  grammarParts,
  godanVerbConjugationRules,
  godanVerbPaiSenRules,
  soundChangeRules,
} from "@/constants/changeRules.js";
import { useVerbsData } from "@/composable/useVerbsData";

const {
  changeGrammarParts,
  dataTotalLength,
  paisenRules,
  targetLettersMotherVoiceGroup,
} = useVerbsData();

const props = defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  verbs: {
    type: String,
    required: true,
  },
});

const firstVerbChar = computed(() => props.verbs?.[0] || "");

const dealRuleData = computed(() => {
  const lastChar = props.verbs?.slice(-1);
  const targetLetters = targetLettersMotherVoiceGroup(lastChar);
  return godanVerbConjugationRules.map((item, index) => {
    return {
      ...item,
      base: changeGrammarParts(item.base),
      baseEnding: targetLetters[index]?.hiragana || "",
    };
  });
});

const dealRulePaisenData = computed(() => {
  const lastChar = props.verbs?.slice(-1);
  return godanVerbPaiSenRules?.map((item, index) => {
    return {
      ...item,
      base: changeGrammarParts(item.base),
      baseEnding: paisenRules(lastChar, item.base),
    };
  });
});

const soundChangeRulesKeys = computed(() => {
  return Object.keys(soundChangeRules[0]);
});

const tbodyTitle = (key, value) => {
  if (key === "PREFIX") {
    return "形態";
  }
  if (key === "STEM") {
    return "詞幹\n範例";
  }
  return value;
};
</script>

<template>
  <table class="w-full border-separate border-spacing-0">
    <thead class="">
      <tr>
        <td
          :colspan="dealRuleData?.length"
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center"
        >
          {{ title }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th
          v-for="(value, index) in grammarParts"
          :key="index"
          class="bg-neutral-100 font-bold text-sm p-0.5 border border-gray-300 text-center whitespace-pre-wrap"
        >
          {{ tbodyTitle(index, value) }}
        </th>
      </tr>

      <template v-for="(row, rowIndex) in dealRuleData" :key="rowIndex">
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
            v-if="rowIndex === 0 && suffixIndex === 0"
            :rowspan="
              dataTotalLength(godanVerbConjugationRules, 'suffixAndMeaning')
            "
            class="border border-gray-300 p-0.5 relative bg-white no-select"
          >
            {{ firstVerbChar }}
          </td>
          <td
            v-if="suffixIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="border border-gray-300 p-0.5 relative bg-white no-select"
          >
            {{ row.baseEnding }}
          </td>
          <td
            class="border border-gray-300 p-0.5 relative bg-white no-select"
            :class="{
              '!bg-red-900 text-white':
                rowIndex === 1 && (suffixIndex === 1 || suffixIndex === 2),
            }"
          >
            {{ suffixAndMeaning.suffix }}
          </td>
          <td class="border border-gray-300 p-0.5 relative bg-white no-select">
            {{ suffixAndMeaning.meaning }}
          </td>
        </tr>
      </template>
    </tbody>

    <tfoot>
      <template v-for="(row, rowIndex) in dealRulePaisenData" :key="rowIndex">
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
            v-if="rowIndex === 0 && suffixIndex === 0"
            :rowspan="
              dataTotalLength(godanVerbConjugationRules, 'suffixAndMeaning')
            "
            class="border border-gray-300 p-0.5 relative no-select"
          >
            {{ firstVerbChar }}
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

  <table class="w-full border-separate border-spacing-0">
    <thead class="">
      <tr>
        <td
          :colspan="soundChangeRules.length + 1"
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center"
        >
          {{ subTitle }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th
          v-for="(value, index) in soundChangeRulesKeys"
          :key="index"
          class="bg-neutral-100 font-bold text-sm p-0.5 border border-gray-300 text-center"
        >
          {{ value !== "base" ? changeGrammarParts(value) : "" }}
        </th>
      </tr>

      <template v-for="(row, rowIndex) in soundChangeRules" :key="rowIndex">
        <template
          v-for="(JISHOData, JISHOIndex) in row.JISHO"
          :key="JISHOIndex"
        >
          <tr
            v-for="(JISHODetailData, JISHODetailIndex) in JISHOData"
            :key="JISHODetailIndex"
          >
            <td
              v-if="JISHODetailIndex === 0 && JISHOIndex === 0"
              :rowspan="row.JISHO.flat().length"
              class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
            >
              {{ row.base }}
            </td>
            <td
              class="border border-gray-300 p-0.5 relative bg-white no-select"
              :class="{
                '!bg-red-700 text-white':
                  rowIndex === 1 && JISHOIndex === 0 && JISHODetailIndex === 0,
              }"
            >
              {{ JISHODetailData }}
            </td>
            <td
              v-if="JISHODetailIndex === 0"
              :rowspan="JISHOData.length"
              class="border border-gray-300 p-0.5 relative bg-white no-select"
              :class="{
                '!bg-red-700 text-white':
                  rowIndex === 1 && JISHOIndex === 0 && JISHODetailIndex === 0,
              }"
            >
              {{ row.RENYOUTE[JISHOIndex] }}
            </td>
            <td
              v-if="JISHODetailIndex === 0"
              :rowspan="JISHOData.length"
              class="border border-gray-300 p-0.5 relative bg-white no-select"
              :class="{
                '!bg-red-700 text-white':
                  rowIndex === 1 && JISHOIndex === 0 && JISHODetailIndex === 0,
              }"
            >
              {{ row.RENYOUTA[JISHOIndex] }}
            </td>
          </tr>
        </template>
      </template>
    </tbody>

    <tfoot class="">
      <tr>
        <td
          :colspan="soundChangeRules.length + 1"
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-300 text-center"
        >
          以「す」做辭書型詞尾的五段動詞，不發生音便。ex.探す
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped lang="scss">
td {
  text-align: center;
}
</style>
