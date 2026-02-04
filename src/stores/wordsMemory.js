import { defineStore } from "pinia";
import { ref, computed } from "vue";

const STORAGE_KEY = "JP_Words_Memory_Record";

export default defineStore("wordsMemory", () => {
    // 需要提醒的文字，記住陣列序號即可
    const noticeWords = ref([]);


    function arrToJsonString(arr) {
        return JSON.stringify(arr);
    }

    function jsonStringToArr(jsonStr = "[]") {
        return JSON.parse(jsonStr);
    }


    const setWordsStorage = (newRecord) => {
        noticeWords.value = newRecord;
        localStorage.setItem(STORAGE_KEY, arrToJsonString(newRecord));
    }

    function clearWordsStorage() {
        localStorage.removeItem(STORAGE_KEY);
        noticeWords.value.splice(0, noticeWords.value.length);
    }

    const setOldStorageData = async () => {
        const recordData = await jsonStringToArr(localStorage.getItem(STORAGE_KEY));
        setWordsStorage(recordData || []);
    }

    const getNoticeWords = computed(() => (noticeWords.value));


    return {
        setWordsStorage,
        clearWordsStorage,
        setOldStorageData,
        noticeWords,
        getNoticeWords
    };
});



