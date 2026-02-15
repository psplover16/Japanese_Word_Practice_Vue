import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { letters, dakutenMap, sokuon, youon, oldLetters } from "@/constants/jpText.js";
import { shuffled } from "@/helper/dealArray.js";

export default defineStore("chooseTestArea", () => {
  // 每個格子的選取狀態，key 使用 `${rowIndex}-${colIndex}`
  const selectedLetters = ref([]);
  const testNum = ref(0);
  const includeHiragana = ref(true);
  const includeKatakana = ref(true);
  const includeDakuten = ref(false);
  const includeSokuon = ref(false);
  const includeYouon = ref(false);
  const includeOldLetters = ref(false);

  const rowSelected = ref([]);
  const colSelected = ref([]);

  const filiterOldLetters = (data) => {
    if (data.length === 0) return [];
    return data.filter((item) => {
      return !oldLetters.some((old) => {
        return (
          (item.hiragana && item.hiragana === old.hiragana) ||
          (item.katakana && item.katakana === old.katakana)
        );
      });
    });
  };

  const getChoosedLettersData = computed(() => {
    // 轉成陣列處理後再轉回成物件
    const textIndex = selectedLetters.value.map((k) => k.split("-"));
    let getAllTextData = textIndex.reduce((acc, cur) => {
      acc.push(letters[cur[0]]?.cells[cur[1]]);
      return acc;
    }, []);
    // 剔除古字
    if (!includeOldLetters.value) {
      getAllTextData = filiterOldLetters(getAllTextData);
    }

    return getAllTextData || [];
  });

  // 情況下的資料：選取的基本字 + 濁音 + 促音 (單字選取)
  const kanaWithDakutenAndSokuonData = computed(() => {
    let tmpData = getChoosedLettersData.value;
    if (includeDakuten.value) {
      tmpData = tmpData.concat(dakutenMap.flat());
    }

    if (includeSokuon.value) {
      tmpData.push(sokuon);
    }

    if (includeYouon.value) {
      const tmp = youon.map((item) => item.data);
      tmpData = tmpData.concat(tmp.flat());
    }
    return tmpData;
  });

  const dealAllTextDataComputed = computed(() => {
    let filtered = [];
    if (includeHiragana.value && includeKatakana.value) {
      getChoosedLettersData.value.forEach((item) => {
        if (item) {
          filtered.push({
            romanization: item.romanization,
            hiragana: item.hiragana,
          });
          filtered.push({
            romanization: item.romanization,
            katakana: item.katakana,
          });
        }
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
    selectedLetters.value = [];

    rowSelected.value = [];
    colSelected.value = [];
  };

  watch(
    [getChoosedLettersData, includeHiragana, includeKatakana],
    ([getChoosedLettersDataVal, includeHiraganaVal, includeKatakanaVal]) => {
      let textNumLength = getChoosedLettersDataVal.length || 0;
      if (!includeHiraganaVal && !includeKatakanaVal) {
        textNumLength = 0;
      } else if (includeHiraganaVal && includeKatakanaVal) {
        textNumLength *= 2;
      }
      testNum.value = textNumLength;
    },
  );

  function addUnique(arr, value) {
    if (!arr.includes(value)) {
      arr.push(value)
    }
  }

  watch(
    rowSelected,
    (newVal = [], oldVal = []) => {
      const added = newVal.filter(x => !oldVal.includes(x));
      const removed = oldVal.filter(x => !newVal.includes(x));

      // 新增列：把該列所有 cell 推進 selectedLetters（去重用 addUnique）
      added.forEach((rowIndex) => {
        letters[rowIndex].cells.forEach((cell, colIndex) => {
          if (cell) addUnique(selectedLetters.value, `${rowIndex}-${colIndex}`);
        });
      });

      // 移除列：把 selectedLetters 中以該列為前綴的項目過濾掉
      removed.forEach((rowIndex) => {
        selectedLetters.value = selectedLetters.value.filter(
          (s) => !s.startsWith(`${rowIndex}-`)
        );
      });
    },
    { deep: true }
  );




  watch(
    colSelected,
    (newVal = [], oldVal = []) => {
      const added = newVal.filter(x => !oldVal.includes(x));
      const removed = oldVal.filter(x => !newVal.includes(x));

      // 新增列：把該列所有 cell 推進 selectedLetters（去重用 addUnique）
      letters.forEach((rowData, rowIndex) => {
        added.forEach((colIndex) => {
          if (rowData.cells[colIndex]) {
            addUnique(selectedLetters.value, `${rowIndex}-${colIndex}`);
          }

        });
      })

      // 移除列：把 selectedLetters 中以該列為前綴的項目過濾掉
      removed.forEach((rowIndex) => {
        selectedLetters.value = selectedLetters.value.filter(
          (s) => !s.endsWith(`-${rowIndex}`)
        );
      });
    },
    { deep: true }
  );

  return {
    selectedLetters,
    testNum,
    includeHiragana,
    includeKatakana,
    includeDakuten,
    includeSokuon,
    includeYouon,
    includeOldLetters,
    rowSelected,
    colSelected,
    shuffled,
    resetForm,
    getChoosedLettersData,
    dealAllTextDataComputed,
    kanaWithDakutenAndSokuonData,
  };
});
