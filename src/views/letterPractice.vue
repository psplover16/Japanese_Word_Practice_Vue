<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";

import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseBtn from "@/components/BaseBtn.vue";
import { letters } from "@/constants/jpText.js";
import NoticeCard from "@/components/NoticeCard.vue";

import useLettersMemoryStore from "@/stores/lettersMemory.js";
import useChooseTestAreaStore from "@/stores/chooseTestArea.js";
import { storeToRefs } from "pinia";

const lettersMemory = useLettersMemoryStore();
const chooseTestAreaStore = useChooseTestAreaStore();
const { setRecord, setOldRecords, clearRecordAndLocalStorage } = lettersMemory;
const { getOldRecord } = storeToRefs(lettersMemory);
const { testNum, includeHiragana, includeKatakana } =
  storeToRefs(chooseTestAreaStore);

// `allChoose` 作為 computed getter/setter，避免額外的 watch 迴圈
const allChoose = computed({
  get() {
    return (
      includeHiragana.value && includeKatakana.value && isFullSelection.value
    );
  },
  set(val) {
    if (val) {
      letters.forEach((row, r) => {
        row.cells.forEach((cell, c) => {
          if (cell?.hiragana && cell?.katakana)
            chooseTestAreaStore.selectedLetters[`${r}-${c}`] = true;
        });
      });
    } else {
      Object.keys(chooseTestAreaStore.selectedLetters).forEach(
        (k) => (chooseTestAreaStore.selectedLetters[k] = false),
      );
    }
    includeHiragana.value = val;
    includeKatakana.value = val;
  },
});

const lettersSelectedCount = computed(() => {
  return Object.values(chooseTestAreaStore.selectedLetters).filter((v) => v)
    .length;
});

const isFullSelection = computed(() => {
  const totalLetters = letters.reduce((total, row) => {
    return (
      total +
      row.cells.filter((cell) => cell?.hiragana && cell?.katakana).length
    );
  }, 0);
  //
  return lettersSelectedCount.value === totalLetters;
});

const noticeCardVisible = ref(false);

const instinateTest = () => {
  if (!includeHiragana.value && !includeKatakana.value) {
    alert("請至少選擇平假名或片假名其中一項才能開始出題！");
    return;
  }
  if (testNum.value <= 0) {
    alert("題數必須大於 0 才能開始出題！");
    return;
  }
  if (lettersSelectedCount.value === 0) {
    alert("請至少選擇一個音節才能開始出題！");
    return;
  }
  noticeCardVisible.value = true;
};

watch(
  getOldRecord,
  async (val) => {
    if (val.length > 0) {
      await nextTick();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  },
  { immediate: true },
);

const clearRecord = () => {
  if (confirm("確定要清除所有「我不清楚的音節」記錄嗎？")) {
    clearRecordAndLocalStorage();
  }
};

onMounted(() => {
  setOldRecords();
});
</script>

<template>
  <div
    class="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg px-3 py-4 mt-3"
  >
    <form
      class="flex flex-col gap-2 justify-center flex-wrap"
      @submit.prevent="instinateTest"
      @reset.prevent="chooseTestAreaStore.resetForm"
    >
      <div class="flex gap-1 flex-wrap">
        <div class="flex items-center gap-x-2 gap-y-1 flex-wrap">
          <BaseCheckbox label="題目包含：平假名" v-model="includeHiragana" />
          <BaseCheckbox label="題目包含：片假名" v-model="includeKatakana" />
          <BaseCheckbox label="全選 / 全不選（音節）" v-model="allChoose" />
          <label
            class="flex gap-2 items-center text-sm cursor-pointer text-nowrap"
          >
            <span>題數</span>
            <input
              type="number"
              min="1"
              step="1"
              value="5"
              inputmode="numeric"
              class="w-[120px] px-2 py-1 border border-gray-300 rounded-md outline-none focus:border-gray-500"
              v-model="testNum"
            />
          </label>
        </div>
        <div class="flex gap-1 items-center justify-between w-full">
          <div class="flex gap-1">
            <BaseBtn label="送出" type="submit" theme="submit" />
            <BaseBtn label="重置" type="reset" theme="reset" />
          </div>
          <BaseBtn label="清除結果" theme="default" @click="clearRecord" />
        </div>
      </div>

      <div class="text-sm">
        ✅ 每個音節左上角可勾選要不要出題。<br />
        ✅
        題目會「盡量讓每個你勾的音節都至少出現一次」，不足再隨機補齊到指定題數。<br />
        <span>⚠️ 若平/片兩個都取消，將無法開始出題。</span>
      </div>

      <div class="text-sm">
        <div>已選音節：{{ lettersSelectedCount }}</div>
        <div>目前題目腳本：平假名＋片假名</div>
      </div>
      <div>
        <table
          class="w-full border-separate border-spacing-0"
          aria-label="五十音表"
        >
          <thead>
            <tr>
              <th
                class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
              >
                行 / 段
              </th>
              <th
                v-for="(value, index) in letters[0].cells"
                :key="index"
                class="bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
              >
                {{ value.hiragana }}段
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in letters" :key="rowIndex">
              <th
                class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
              >
                <div
                  class="min-h-[60px] flex flex-col items-center justify-center gap-0.5 text-sm"
                >
                  <div class="font-extrabold text-primary">
                    {{ row?.rowLabel?.jp }}
                  </div>
                  <div class="font-bold text-muted">
                    {{ row?.rowLabel?.romanization }}
                  </div>
                </div>
              </th>
              <td
                v-for="(detailData, colIndex) in row.cells"
                :key="colIndex"
                class="border border-gray-300 p-0.5 relative bg-white no-select"
              >
                <label
                  v-if="detailData?.hiragana && detailData?.katakana"
                  class="flex flex-col gap-0.5"
                >
                  <input
                    type="checkbox"
                    v-model="
                      chooseTestAreaStore.selectedLetters[
                        `${rowIndex}-${colIndex}`
                      ]
                    "
                  />
                  <div class="flex flex-col justify-center items-center">
                    <div class="font-bold text-nowrap sm:text-xl text-lg">
                      {{ `${detailData?.hiragana} / ${detailData?.katakana}` }}
                    </div>
                    <div class="font-semibold text-xs text-muted">
                      {{ detailData?.romanization }}
                    </div>
                  </div>
                </label>
                <div class="text-center" v-else>—</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <NoticeCard v-model="noticeCardVisible" />
  </div>
  <!--  -->
  <div
    class="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg px-3 py-4 mt-3"
    v-if="getOldRecord.length > 0"
  >
    <h2 class="text-base">我不清楚的音節</h2>
    <div class="text-xs text-gray-400">
      你按下「我不清楚」的音節如下（顯示：平 / 片 / romaji）：
    </div>
    <div class="flex flex-wrap gap-1">
      <div
        class="flex gap-2 border border-gray-300 font-bold rounded-2xl px-2 py-1 items-center text-sm"
        v-for="(item, index) in getOldRecord"
        :key="index"
      >
        <span
          >{{ item.originalText.hiragana }} /
          {{ item.originalText.katakana }}</span
        >
        <span class="font-medium">{{ item.originalText.romanization }}</span>
        <span class="bg-black rounded-full text-white px-3 py-0.5">{{
          item.count
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pick {
  position: absolute;
  left: 8px;
  top: 8px;
  transform: scale(1.05);
}
@media (max-width: 800px) {
  .pick {
    left: 0px;
    top: 0px;
  }
}
</style>
