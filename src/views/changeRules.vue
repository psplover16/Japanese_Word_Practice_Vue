<script setup>
import { computed } from "vue";
import { verbDistinctionRules } from "@/constants/changeRules.js";
import DistinguishVerbForms from "@/components/DistinguishVerbForms.vue";
import GodanVerbsTable from "@/components/GodanVerbsTable.vue";
import VerbTable from "@/components/VerbTable.vue";
import {
  grammarParts,
  soundChangeRules,
  ichidabVerbConjugationRules,
  ichidabVerbPaiSenRules,
  saVerbConjugationRules,
  kaVerbConjugationRules,
} from "@/constants/changeRules.js";

const theadTitleType1 = computed(() => {
  const tmp = Object.values(grammarParts);
  tmp[0] = "形態";
  return tmp;
});

defineProps({
  title: {
    type: String,
  },
  letters: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <DistinguishVerbForms
    :rules="verbDistinctionRules"
    title="動詞型態分辨: 一段/五段/不規則"
    v-if="false"
  />
  <GodanVerbsTable
    title="五段動詞表(詞尾母音變化)"
    subTitle="音便"
    verbs="飲む"
    v-if="false"
  />
  <VerbTable
    title="一段動詞 (所有辭書形母音為「る」的動詞)"
    verbs="見"
    :theadTitle="theadTitleType1"
    :values="ichidabVerbConjugationRules"
    :subValues="ichidabVerbPaiSenRules"
    v-if="false"
  />
  <VerbTable
    title="サ變動詞 (する動詞為結尾的動詞)"
    verbs="散歩"
    :theadTitle="theadTitleType1"
    :values="saVerbConjugationRules"
    v-if="false"
  />
  <VerbTable
    :title="'カ變動詞 (只有来る)\n(漢字發音會變動，標註在詞尾)'"
    verbs="来"
    :theadTitle="theadTitleType1"
    :values="kaVerbConjugationRules"
    v-if="false"
  />
</template>

<style lang="scss"></style>
