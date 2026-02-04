<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseBtn from "@/components/BaseBtn.vue";
import wordPracticeText from "@/constants/jpWords.js";

import useWordsMemoryStore from "@/stores/wordsMemory.js";
import useChooseTestAreaStore from "@/stores/chooseTestArea.js";
import { storeToRefs } from "pinia";

const wordsMemory = useWordsMemoryStore();
const chooseTestAreaStore = useChooseTestAreaStore();
const { setOldStorageData, setWordsStorage, clearWordsStorage } = wordsMemory;
const { kanaWithDakutenAndSokuonData } = storeToRefs(chooseTestAreaStore);
const { getNoticeWords } = storeToRefs(wordsMemory);

const isShowWords = ref(true);
const isShowPracticeWords = ref(false);
const isShowRomanization = ref(false);
const isShowMeaning = ref(false);
const wantNoteId = ref({});
const isShowAllWords = ref(false);

// 平假名轉片假名 + 片假名轉平假名
function swapKana(str) {
  return str
    .normalize("NFKC") // 處理半形片假名等情況
    .split("")
    .map((char) => {
      const code = char.codePointAt(0);
      // 平假名 → 片假名
      if (code >= 0x3041 && code <= 0x3096) {
        return String.fromCodePoint(code + 0x60);
      }
      // 片假名 → 平假名
      if (code >= 0x30a1 && code <= 0x30f6) {
        return String.fromCodePoint(code - 0x60);
      }
      // 其他字元原樣回傳
      return char;
    })
    .join("");
}

// 流程，將允許的字串放入 Set，然後過濾單字
// 將單字表的每一個字拆解，將拆解的字依依放入 Set 中比對
// 將假名set，方便後續過濾用
function buildAllowedKanaSet(kanaWithDakutenAndSokuonData) {
  const set = new Set();
  for (const item of kanaWithDakutenAndSokuonData) {
    set.add(item.hiragana);
    set.add(item.katakana);
  }
  return set;
}
// 假名的判斷
function isKana(char) {
  const code = char.codePointAt(0);
  return (
    (code >= 0x3040 && code <= 0x309f) || // 平假名
    (code >= 0x30a0 && code <= 0x30ff) // 片假名（含 ー）
  );
}
// 判斷單字是否能顯示
function canShowWord(text, allowedKanaSet) {
  for (const char of text) {
    if (isKana(char)) {
      if (!allowedKanaSet.has(char)) {
        return false;
      }
    }
  }
  return true;
}

// 過濾單字
function filterWordPracticeText(
  wordPracticeText,
  kanaWithDakutenAndSokuonData,
) {
  const allowedKanaSet = buildAllowedKanaSet(kanaWithDakutenAndSokuonData);
  return wordPracticeText.filter((item) =>
    canShowWord(item.text, allowedKanaSet),
  );
}

// 替wordPracticeText 加上 id 欄位，localStorage用
// note欄位 若localStorage有id，則特別註記true
const addIdwordPracticeText = computed(() => {
  return wordPracticeText.map((item, index) => ({
    id: index,
    note: getNoticeWords.value.some((val) => val === index),
    ...item,
  }));
});

const resultData = computed(() => {
  if (isShowAllWords.value) {
    return addIdwordPracticeText.value;
  }
  return filterWordPracticeText(
    addIdwordPracticeText.value,
    kanaWithDakutenAndSokuonData.value,
  );
});

watch(
  () => getNoticeWords.value,
  (newVal) => {
    newVal.forEach((valId) => {
      wantNoteId.value[valId] = true;
    });
  },
  { deep: true },
);

// 把物件內值為true的key抽出來
const trueKeys = (o) =>
  Object.entries(wantNoteId.value)
    .filter(([, v]) => v === true)
    .map(([k]) => Number(k));

const saveNote = () => {
  if (confirm("確定要註記嗎？")) {
    // wantNoteId.value 已經在watch把所有的id狀態存在裡面了
    setWordsStorage(trueKeys(wantNoteId.value));
  }
};
const deleteNote = () => {
  if (confirm("確定要刪除全部註記嗎？")) {
    clearWordsStorage();
    wantNoteId.value = {};
  }
};

const onRowClick = (id) => {
  wantNoteId.value[id] = !wantNoteId.value[id];
};

onMounted(() => {
  setOldStorageData();
});
</script>

<template>
  <div
    class="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg px-3 py-4 mt-3"
  >
    <div class="flex justify-between">
      <span>{{ resultData.length }}個單字</span>
      <BaseCheckbox label="顯示全部" v-model="isShowAllWords" />
    </div>
    <div class="flex justify-between" v-if="resultData.length > 0">
      <BaseBtn label="儲存註記" theme="default" @click="saveNote" />
      <BaseBtn label="刪除全部註記" theme="reset" @click="deleteNote" />
    </div>
    <div class="overflow-y-auto tableMaxHeight">
      <table class="w-full border-separate border-spacing-0">
        <thead class="sticky top-0 bg-neutral-100 z-10">
          <tr>
            <th
              class="bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
            >
              <BaseCheckbox label="單字" v-model="isShowWords" />
            </th>
            <th
              class="bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
            >
              <BaseCheckbox label="練習" v-model="isShowPracticeWords" />
            </th>
            <th
              class="bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
            >
              <BaseCheckbox label="拼音" v-model="isShowRomanization" />
            </th>
            <th
              class="bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
            >
              <BaseCheckbox label="中文" v-model="isShowMeaning" />
            </th>
            <th
              class="w-8 bg-neutral-100 font-bold text-xs p-2 border border-gray-300"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, index) in resultData"
            :key="index"
            :class="{ 'bg-red-200': value.note }"
            @click="onRowClick(value.id)"
          >
            <td class="tdStyle no-select">
              <span :class="{ invisible: !isShowWords }">
                {{ value.text }}
              </span>
            </td>
            <td class="tdStyle no-select">
              <span :class="{ invisible: !isShowPracticeWords }">
                {{ swapKana(value.text) }}
              </span>
            </td>
            <td class="tdStyle no-select">
              <span :class="{ invisible: !isShowRomanization }">
                {{ value.romanization }}
              </span>
            </td>
            <td class="tdStyle no-select">
              <span :class="{ invisible: !isShowMeaning }">
                {{ value.meaning }}
              </span>
            </td>
            <td class="border border-gray-300 p-2 relative bg-white no-select">
              <BaseCheckbox
                label=""
                v-model="wantNoteId[value.id]"
                @click.stop
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tdStyle {
  border: 1px solid #d1d5db;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  padding: 2px;
  > span {
    text-wrap: wrap;
  }
}
.tableMaxHeight {
  // 儲存按鈕 32 + 儲存按鈕與表格間距 8 + 按鈕父層容器padding 16 + border 1px + 按鈕父層容器margin-top 12
  // title 32，title上方margin 24
  // 125px
  //
  // 按鈕父層容器padding 16 + border 1px + layout底部margin 24 + 版本號32px
  // 113
  max-height: calc(100dvh - 198px);
}
</style>
