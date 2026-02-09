import { defineStore } from "pinia";
import { ref, reactive, computed, watch } from "vue";
import { letters, dakutenMap, sokuon, youon } from "@/constants/jpText.js";
import { shuffled } from "@/helper/dealArray.js";

export default defineStore("chooseTestArea", () => {
  // 每個格子的選取狀態，key 使用 `${rowIndex}-${colIndex}`
  const selectedLetters = reactive({});
  const testNum = ref(0);
  const includeHiragana = ref(true);
  const includeKatakana = ref(true);
  const includeDakuten = ref(false);
  const includeSokuon = ref(false);
  const includeYouon = ref(false);

  const rowSelected = reactive({});
  const colSelected = reactive({});

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
    testNum.value = 5;
    Object.keys(selectedLetters).forEach((k) => (selectedLetters[k] = false));
    Object.keys(rowSelected).forEach((k) => (rowSelected[k] = false));
    Object.keys(colSelected).forEach((k) => (colSelected[k] = false));
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

  watch(rowSelected, (newVal) => {
    const trueRow = Object.entries(newVal).filter(([, v]) => v === true);
    const falseRow = Object.entries(newVal).filter(([, v]) => v === false);

    function mapRow(rowData) {
      return rowData.map((item) => item[0]);
    }
    console.log("rowSelected", newVal);
    function checkLetterInRow(rowData, bool) {
      letters[rowData].cells.forEach((cellVal, index) => {
        const key = `${rowData}-${index}`;
        if (cellVal) {
          selectedLetters[key] = bool;
        }
      });
    }

    mapRow(trueRow).forEach((item) => {
      checkLetterInRow(item, true);
    });
    mapRow(falseRow).forEach((item) => {
      checkLetterInRow(item, false);
    });
  });

  watch(
    colSelected,
    (newVal) => {
      const trueCol = Object.entries(newVal).filter(([, v]) => v === true);
      const falseCol = Object.entries(newVal).filter(([, v]) => v === false);
      function mapCol(colData) {
        return colData.map((item) => item[0]);
      }

      console.log("colSelected", newVal);

      function checkLetterInCol(colSelectedStatus, bool) {
        letters.forEach((rowVal, rowIndex) => {
          //
          if (!!rowVal.cells?.[colSelectedStatus]) {
            const key = `${rowIndex}-${colSelectedStatus}`;
            selectedLetters[key] = bool;
          }
        });
      }

      mapCol(trueCol).forEach((item) => {
        checkLetterInCol(item, true);
      });
      mapCol(falseCol).forEach((item) => {
        checkLetterInCol(item, false);
      });
    },
    { deep: true },
  );

  return {
    selectedLetters,
    testNum,
    includeHiragana,
    includeKatakana,
    includeDakuten,
    includeSokuon,
    includeYouon,
    rowSelected,
    colSelected,
    shuffled,
    resetForm,
    getChoosedLettersData,
    dealAllTextDataComputed,
    kanaWithDakutenAndSokuonData,
  };
});
