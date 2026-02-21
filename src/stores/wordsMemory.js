import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import wordPracticeText from "@/constants/jpWords.js";

const STORAGE_KEY = "JP_Words_Memory_Record";

export default defineStore("wordsMemory", () => {
    // 需要提醒的文字，記住陣列序號即可
    const noticeWords = ref([]);
    const isHydrated = ref(false);


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
        noticeWords.value = [];
    }

    const setOldStorageData = async () => {
        if (isHydrated.value) return;
        const recordData = await jsonStringToArr(localStorage.getItem(STORAGE_KEY));
        setWordsStorage(recordData || []);
        isHydrated.value = true;
    }

    const getNoticeWords = computed(() => (noticeWords.value));



    // 替wordPracticeText 加上 id 欄位，localStorage用
    // note欄位 若localStorage有id，則特別註記true
    const addIdwordPracticeText = ref(
        wordPracticeText.map((item, index) => ({
            id: index,
            note: false,
            ...item,
        }))
    );

    const syncNoteFlags = (noticeIds) => {
        const noticeSet = new Set(noticeIds || []);
        addIdwordPracticeText.value.forEach((item) => {
            item.note = noticeSet.has(item.id);
        });
    };

    watch(
        noticeWords,
        (newVal) => {
            syncNoteFlags(newVal);
        },
        // { immediate: true, deep: true } // 避免store建立時跑以及避免靠 deep 才監聽得到
    );


    return {
        setWordsStorage,
        clearWordsStorage,
        setOldStorageData,
        noticeWords,
        getNoticeWords,
        addIdwordPracticeText
    };
});



