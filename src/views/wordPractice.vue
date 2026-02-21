<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseBtn from "@/components/BaseBtn.vue";

import useWordsMemoryStore from "@/stores/wordsMemory.js";
import useChooseTestAreaStore from "@/stores/chooseTestArea.js";
import { storeToRefs } from "pinia";
import longPress from "@/directives/longPress";

defineOptions({
  directives: { longPress },
});

const wordsMemory = useWordsMemoryStore();
const chooseTestAreaStore = useChooseTestAreaStore();
const { setOldStorageData, setWordsStorage, clearWordsStorage } = wordsMemory;
const { kanaWithDakutenAndSokuonData } = storeToRefs(chooseTestAreaStore);
const { getNoticeWords, addIdwordPracticeText } = storeToRefs(wordsMemory);

const isLongPress = ref({});

const isShowWords = ref(true);
const isShowPracticeWords = ref(false);
const isShowRomanization = ref(false);
const isShowHanji = ref(true);
const isShowMeaning = ref(false);
const wantNoteId = ref({});
const isShowAllWords = ref(true);
const isOnlyShowNotedWords = ref(false);
const isDeleteAllNote = ref(false);
const searchText = ref("");

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

const filterSearchText = (text, searchText) => {
  const searchLower = searchText.toLowerCase();
  return text.toLowerCase().includes(searchLower);
};

const resultData = computed(() => {
  let sendData;
  // 顯示全部文字的話，就不過濾
  if (isShowAllWords.value) {
    sendData = addIdwordPracticeText.value;
  } else {
    sendData = filterWordPracticeText(
      addIdwordPracticeText.value,
      kanaWithDakutenAndSokuonData.value,
    );
  }
  // 過濾只顯示註記的單字
  if (isOnlyShowNotedWords.value) {
    sendData = sendData.filter((item) => item.note);
  }
  // 搜尋功能，過濾掉不包含搜尋字串的單字
  if (searchText.value.trim() !== "") {
    // 轉成英文小寫，讓大小寫不分
    console.log(sendData);
    sendData = sendData.filter(
      (item) =>
        filterSearchText(item.text, searchText.value) ||
        filterSearchText(item.romanization, searchText.value) ||
        filterSearchText(item.meaning, searchText.value) ||
        filterSearchText(item.kanji, searchText.value),
    );
  }
  return sendData;
});

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

const onDeleteAllChange = (e) => {
  // 避免點擊刪除全部註記後，checkbox變成勾選狀態
  if (!e.target.checked) return;
  if (confirm("確定要刪除全部註記嗎？")) {
    isDeleteAllNote.value = false;
    if (!confirm("刪除後，無法復原，確定要刪除嗎？")) return;
    clearWordsStorage();
    wantNoteId.value = {};
  } else {
    isDeleteAllNote.value = false;
  }
};

const onRowClick = (id) => {
  wantNoteId.value[id] = !wantNoteId.value[id];
};

function onRowLongPress(id) {
  isLongPress.value[id] = true;
}

function onRowLongPressRelease(id) {
  // 長按放開時的範例：切換註記並關閉長按狀態
  isLongPress.value[id] = false;
}

watch(
  () => getNoticeWords.value,
  (newVal) => {
    newVal.forEach((valId) => {
      wantNoteId.value[valId] = true;
    });
  },
  { deep: true },
);

onMounted(() => {
  setOldStorageData();
  window.scrollTo(0, 0);

  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="flex justify-between items-center gap-5">
    <div class="flex flex-col flex-1">
      <input
        type="text"
        class="w-full h-10 px-2 py-1 border border-gray-300 rounded-md outline-none focus:border-gray-500"
        placeholder="搜尋"
        v-model="searchText"
      />
      <BaseCheckbox label="練習" v-model="isShowPracticeWords" />
    </div>
    <div class="w-[90px]">
      <BaseCheckbox label="全部字音" v-model="isShowAllWords" />
      <BaseCheckbox label="漢字" v-model="isShowHanji" />
      <BaseCheckbox
        label="只顯示註記"
        v-model="isOnlyShowNotedWords"
        class="ml-0.5"
      />
    </div>
  </div>
  <div class="flex justify-between items-center">
    <span>{{ resultData.length }}個單字</span>
    <BaseBtn
      label="儲存註記"
      theme="default"
      @click="saveNote"
      :class="{
        invisible: resultData.length === 0,
      }"
    />
  </div>
  <div class="overflow-y-auto tableMaxHeight">
    <table class="w-full border-separate border-spacing-0">
      <thead class="sticky top-0 bg-neutral-100 z-10">
        <tr>
          <th class="thStyle">
            <BaseCheckbox label="單字" v-model="isShowWords" />
          </th>
          <th class="thStyle flex gap-2">
            <BaseCheckbox
              :label="isShowHanji ? '漢字' : '拼音'"
              v-model="isShowRomanization"
            />
          </th>
          <th class="thStyle">
            <BaseCheckbox label="中文" v-model="isShowMeaning" />
          </th>
          <th class="thStyle" width="22">
            <div class="flex justify-center p-1">
              <input
                type="checkbox"
                v-model="isDeleteAllNote"
                @change="onDeleteAllChange"
                title="刪除全部註記"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- index 是雷點，因為並非穩定為一，會讓 Vue 在 diff 時錯把 DOM 元素重用到不同的資料上，導致事件、元件狀態、checkbox、長按 flag 等和資料錯位 -->
        <tr
          v-for="(resultDataVal, index) in resultData"
          :key="resultDataVal.id"
          :class="{ 'bg-red-200': resultDataVal.note }"
          v-longPress="{
            handler: () => onRowLongPress(resultDataVal.id),
            onRelease: () => onRowLongPressRelease(resultDataVal.id),
            duration: 400,
          }"
          @click="onRowClick(resultDataVal.id)"
        >
          <td class="tdStyle no-select" width="30%">
            <span
              :class="{
                invisible: !isShowWords && !isLongPress[resultDataVal.id],
              }"
            >
              {{
                isShowPracticeWords
                  ? swapKana(resultDataVal.text)
                  : resultDataVal.text
              }}
            </span>
          </td>
          <td class="tdStyle no-select" width="20%">
            <span
              :class="{
                invisible:
                  !isShowRomanization && !isLongPress[resultDataVal.id],
              }"
            >
              {{
                isShowHanji ? resultDataVal.kanji : resultDataVal.romanization
              }}
            </span>
          </td>
          <td class="tdStyle no-select">
            <span
              :class="{
                invisible: !isShowMeaning && !isLongPress[resultDataVal.id],
              }"
            >
              {{ resultDataVal.meaning }}
            </span>
          </td>
          <td class="tdStyle no-select">
            <div class="flex justify-center p-1">
              <input
                type="checkbox"
                v-model="wantNoteId[resultDataVal.id]"
                @click.stop
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.thStyle {
  border: 1px solid #d1d5db;
  position: relative;
  font-size: 12px;
  line-height: 16px;
  padding: 2px;
  background-color: #f3f4f6;
  font-weight: 700;
}
.tdStyle {
  border: 1px solid #d1d5db;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  padding: 2px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.tableMaxHeight {
  // 標題32 + title上方margin12
  // table父層容器 border1px*2 +marginTop8 + padding12*2
  // 搜尋列60  儲存32  gap-2*2
  // 186px
  // 版本號高度40
  max-height: calc(100dvh - 196px);
}
</style>
