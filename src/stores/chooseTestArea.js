import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { letters } from "@/constants/jpText.js";

export default defineStore("chooseTestArea", () => {
  // 每個格子的選取狀態，key 使用 `${rowIndex}-${colIndex}`
  const selectedLetters = reactive({});
  const testNum = ref(5);
  const includeHiragana = ref(true);
  const includeKatakana = ref(false);

  // 洗牌陣列（Fisher-Yates 演算法）
  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function shuffled(arr) {
    return shuffleInPlace([...arr]);
  }

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
    return getAllTextData;
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
    shuffled,
    resetForm,
    getChoosedLettersData,
    dealAllTextDataComputed,
  };
});



