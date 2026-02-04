import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { letters, dakutenMap, sokuon, youon } from "@/constants/jpText.js";
import { shuffled } from "@/helper/dealArray.js";

export default defineStore("chooseTestArea", () => {
  // 每個格子的選取狀態，key 使用 `${rowIndex}-${colIndex}`
  const selectedLetters = reactive({});
  const testNum = ref(5);
  const includeHiragana = ref(true);
  const includeKatakana = ref(false);
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
      tmpData = tmpData.concat(youon);
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
    return shuffled(filtered);
  });

  const resetForm = () => {
    includeHiragana.value = true;
    includeKatakana.value = true;
    includeDakuten.value = false;
    includeSokuon.value = false;
    includeYouon.value = false;
    testNum.value = 5;
    Object.keys(selectedLetters).forEach(
      (k) => (selectedLetters[k] = false),
    );
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
    kanaWithDakutenAndSokuonData
  };
});



