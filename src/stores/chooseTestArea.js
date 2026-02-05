import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { letters, dakutenMap, sokuon, youon } from "@/constants/jpText.js";
import { shuffled } from "@/helper/dealArray.js";

export default defineStore("chooseTestArea", () => {
  // 每個格子的選取狀態，key 使用 `${rowIndex}-${colIndex}`
  const selectedLetters = reactive({});
  const testNum = ref(5);
  const includeHiragana = ref(true);
  const includeKatakana = ref(true);
  const includeDakuten = ref(false);
  const includeSokuon = ref(false);
  const includeYouon = ref(false);

  const getChoosedLettersData = computed(() => {
    // 轉成陣列處理後再轉回成物件
    const result = Object.fromEntries(
      Object.entries(selectedLetters).filter(([, v]) => v === true),
    );
    const textIndex = Object.keys(result).map((k) => k.split("-"));
    const getAllTextData = textIndex.reduce((acc, cur) => {
      acc.push(letters[cur[0]].cells[cur[1]]);
      return acc;
    }, []);
    return getAllTextData || [];
  });

  // 情況下的資料：選取的基本字 + 濁音 + 促音
  const kanaWithDakutenAndSokuonData = computed(() => {
    let tmpData = getChoosedLettersData.value;
    if (includeDakuten.value) {
      tmpData = tmpData.concat(dakutenMap.flat());
    }

    if (includeSokuon.value) {
      tmpData.push(sokuon);
    }

    if (includeYouon.value) {
      const tmp = youon.map((item) => (item.data));
      tmpData = tmpData.concat(tmp.flat());
    }
    return tmpData;
  });

  const dealAllTextDataComputed = computed(() => {
    let filtered = [];
    if (includeHiragana.value && includeKatakana.value) {
      getChoosedLettersData.value.forEach((item) => {
        filtered.push({
          romanization: item.romanization,
          hiragana: item.hiragana,
        });
        filtered.push({
          romanization: item.romanization,
          katakana: item.katakana,
        });
      });
    } else if (includeHiragana.value) {
      getChoosedLettersData.value.forEach((item) => {
        filtered.push({
          romanization: item.romanization,
          hiragana: item.hiragana,
        });
      });
    } else if (includeKatakana.value) {
      getChoosedLettersData.value.forEach((item) => {
        filtered.push({
          romanization: item.romanization,
          katakana: item.katakana,
        });
      });
    }

    // 如果沒有選擇平假名和片假名，則不顯示任何題目
    if (filtered.length === 0) return [];

    // base = 原始候選，不再被 mutate
    const base = filtered.slice();
    const result = [];

    // 題目數量大於篩選後的資料長度時，添加打亂順序的資料
    while (result.length < testNum.value) {
      result.push(...shuffled(base));
    }

    // 截取恰好需要的數量，再打散
    return shuffled(result.slice(0, testNum.value));
  });

  const resetForm = () => {
    includeHiragana.value = true;
    includeKatakana.value = true;
    includeDakuten.value = false;
    includeSokuon.value = false;
    includeYouon.value = false;
    testNum.value = 5;
    Object.keys(selectedLetters).forEach((k) => (selectedLetters[k] = false));
  };

  return {
    selectedLetters,
    testNum,
    includeHiragana,
    includeKatakana,
    includeDakuten,
    includeSokuon,
    includeYouon,
    shuffled,
    resetForm,
    getChoosedLettersData,
    dealAllTextDataComputed,
    kanaWithDakutenAndSokuonData,
  };
});
