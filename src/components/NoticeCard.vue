<script setup>
import { ref, watch, computed } from "vue";
import Mask from "@/components/Mask.vue";
import BaseBtn from "./BaseBtn.vue";
import { letters } from "@/constants/jpText.js";
import useLettersMemoryStore from "@/stores/lettersMemory.js";
import useChooseTestAreaStore from "@/stores/chooseTestArea.js";
import { storeToRefs } from "pinia";

const lettersMemory = useLettersMemoryStore();
const chooseTestAreaStore = useChooseTestAreaStore();
const { setRecord, setOldRecords } = lettersMemory;
const { getOldRecord } = storeToRefs(lettersMemory);
const { dealAllTextDataComputed, testNum } = storeToRefs(chooseTestAreaStore);

const noticeCardVisible = ref(false);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const nowTextIndex = ref(0);
const wrongText = ref([]);

const dealAllTextData = ref([]);
watch(
  () => [dealAllTextDataComputed.value, props.modelValue],
  ([val1, val2]) => {
    dealAllTextData.value = val1;
  },
  { immediate: true },
);

const isShowAnswer = ref(false);
const flatLetters = computed(() => letters.map((v) => v.cells).flat());

const nextStep = () => {
  if (isShowAnswer.value) {
    if (testNum.value - 1 === nowTextIndex.value) {
      closeCard(false);
      return;
    }
    nowTextIndex.value = nowTextIndex.value + 1;
    isAlreadyClickIdk.value = false;
    if (nowTextIndex.value > dealAllTextData.value.length - 1) {
      // 再打亂一次
      dealAllTextData.value.push(...shuffled(dealAllTextDataComputed.value));
    }
  }
  isShowAnswer.value = !isShowAnswer.value;
};
const isAlreadyClickIdk = ref(false);
const idk = () => {
  if (!isAlreadyClickIdk.value) {
    const originalText = flatLetters.value.find(
      (val) =>
        val?.romanization ===
        dealAllTextData.value[nowTextIndex.value]?.romanization,
    );

    const isAlreadyInWrongList = wrongText.value?.findIndex(
      (v) => JSON.stringify(v.originalText) === JSON.stringify(originalText),
    );
    if (isAlreadyInWrongList > -1) {
      wrongText.value[isAlreadyInWrongList] = {
        originalText,
        count: wrongText.value[isAlreadyInWrongList].count + 1,
      };
    } else {
      wrongText.value.push({
        count: 1,
        originalText,
      });
    }

    isAlreadyClickIdk.value = true;
  }

  nextStep();
};

function close() {
  noticeCardVisible.value = false;
  setRecord(
    // 依平假名排序一次（方便閱讀）
    wrongText.value.sort((a, b) =>
      a.originalText.hiragana.localeCompare(b.originalText.hiragana, "ja"),
    ),
  );
}

const closeCard = (isNeedQuestion = true) => {
  if (isNeedQuestion) {
    if (confirm("確定要結束練習嗎？目前的進度不會被記錄。")) {
      close();
    }
  } else {
    close();
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    noticeCardVisible.value = newVal;

    if (!newVal) {
      nowTextIndex.value = 0;
      wrongText.value = [];
      isShowAnswer.value = false;
      dealAllTextData.value = [];
    }
  },
  { immediate: true },
);

// 當內部可見性改變時，回傳給父元件（v-model 的雙向綁定）
watch(noticeCardVisible, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <Mask v-model="noticeCardVisible">
    <div class="size-full flex justify-center items-center">
      <div
        class="relative w-[90%] max-w-[520px] border border-black-100 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-gray-300 font-bold text-lg no-select"
        >
          <div>{{ nowTextIndex + 1 }} / {{ testNum }}</div>
          <div @click="closeCard" class="cursor-pointer">X</div>
        </div>

        <div class="px-4 text-center flex flex-col items-center pb-2">
          <div class="font-black text-[88px]">
            {{
              dealAllTextData[nowTextIndex]?.hiragana ||
              dealAllTextData[nowTextIndex]?.katakana
            }}
          </div>
          <div
            class="min-w-8 text-2xl font-extrabold"
            :class="{ invisible: !isShowAnswer }"
          >
            {{ dealAllTextData[nowTextIndex]?.romanization
            }}{{
              dealAllTextData[nowTextIndex]?.hiragana
                ? " (平假名)"
                : " (片假名)"
            }}
          </div>
          <div class="text-xs text-muted mt-1">
            <span v-if="!isShowAnswer">按「下一步」顯示羅馬拼音</span>
            <span v-else>再按「下一步」進入下一題</span>
          </div>
        </div>

        <div class="flex gap-2 px-4 py-3 border-t border-gray-300">
          <BaseBtn
            label="下一步"
            theme="submit"
            class="py-3"
            fullWidth
            @click="nextStep"
          />
          <BaseBtn
            label="我不清楚"
            theme="unknown"
            class="py-3"
            fullWidth
            @click="idk"
          />
        </div>
      </div>
    </div>
  </Mask>
</template>

<style lang="scss" scoped></style>
