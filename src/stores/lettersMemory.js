import { defineStore } from "pinia";
import { ref, computed } from "vue";

const STORAGE_KEY = "JP_Letters_Memory_Record";

export default defineStore("lettersMemory", () => {
  const oldRecord = ref([]);

  function checkArrayObjects(arr, keys = []) {
    return arr.every((obj) =>
      keys.every(
        (key) =>
          obj.originalText.hasOwnProperty(key) && obj.originalText[key] !== undefined && obj.originalText[key] !== null,
      ) && obj.count > 0
    );
  }

  function checkRecordFormat(recordData) {
    return checkArrayObjects(recordData, ["romanization", "hiragana", "katakana"])
  }

  const setRecord = (newRecord) => {
    if (checkRecordFormat(newRecord)) {
      oldRecord.value = newRecord;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecord));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      oldRecord.value.splice(0, oldRecord.value.length);
    }
  }

  function clearRecordAndLocalStorage() {
    localStorage.removeItem(STORAGE_KEY);
    oldRecord.value.splice(0, oldRecord.value.length);
  }

  const setOldRecords = () => {
    const recordData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRecord(recordData);
  }

  const getOldRecord = computed(() => (oldRecord.value));


  return {
    setRecord,
    setOldRecords,
    getOldRecord,
    clearRecordAndLocalStorage
  };
});



