<script setup>
import { computed } from "vue";
import { youon } from "@/constants/jpText.js";

const DATA_COLS_TOTAL = 6;

const getDistributedColspan = (itemCount, itemIndex) => {
  if (!itemCount || itemCount <= 0) return 1;
  const base = Math.floor(DATA_COLS_TOTAL / itemCount);
  const remainder = DATA_COLS_TOTAL % itemCount;
  return Math.max(1, base + (itemIndex < remainder ? 1 : 0));
};

const combineBasicSoundCombinations = (data) => {
  const result = [];
  data.hiragana.forEach((item, index) => {
    result.push({
      words: `${item}/${data.katakana[index]}`,
      romanization: data.romanization[index],
    });
  });
  return result;
};

const youonTable = computed(() => {
  return youon.filter((item) => item.base !== "長音符");
});
</script>

<template>
  <table class="w-full border-separate border-spacing-0 mt-3">
    <thead>
      <tr>
        <td colspan="7"></td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(row, rowIndex) in youonTable" :key="rowIndex">
        <tr>
          <td
            class="bg-neutral-100 font-bold text-base p-1 border border-gray-30 whitespace-pre-wrap"
            colspan="7"
          >
            {{ row?.base }}：{{ row?.note }}
          </td>
        </tr>
        <tr>
          <td
            class="w-[60px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
          >
            <div
              class="flex flex-col items-center justify-center gap-0.5 text-sm"
            >
              <div class="font-extrabold text-primary text-nowrap">基本音</div>
            </div>
          </td>
          <td class="border border-gray-300 bg-neutral-100" :colspan="DATA_COLS_TOTAL">
            <div class="flex justify-around">
              <div
                class="bg-neutral-100 font-bold p-0.5 flex items-center flex-col justify-center text-xs sm:text-base md:text-lg px-1"
                v-for="value in combineBasicSoundCombinations(
                  row.basicSoundCombinations,
                )"
                :key="value.romanization"
              >
                <div>{{ value.words }}</div>
                <div>{{ value.romanization }}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="border border-gray-300 p-0.5 relative bg-white no-select"
          ></td>
          <td
            v-for="(detailData, colIndex) in row.data"
            :key="colIndex"
            class="border border-gray-300 p-0.5 relative bg-white no-select"
            :colspan="getDistributedColspan(row.data.length, colIndex)"
          >
            <div class="flex flex-col justify-center items-center">
              <div class="font-bold text-nowrap sm:text-xl text-lg">
                {{
                  `${detailData?.hiragana} ${detailData?.katakana && "/"} ${detailData?.katakana}`
                }}
              </div>
              <div class="font-semibold text-xs text-muted">
                {{ detailData?.romanization }}
              </div>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
