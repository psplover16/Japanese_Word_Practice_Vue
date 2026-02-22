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
  iAdjuctiveConjugationRules,
  naiAdjuctiveConjugationRules,
  baAuxiliaryVerbsRules,
} from "@/constants/changeRules.js";

const theadTitleType1 = computed(() => {
  const tmp = Object.values(grammarParts);
  tmp[0] = "形態";
  return tmp;
});

const theadTitleType2 = computed(() => {
  const tmp = Object.values(grammarParts);
  const sendData = ["形態", ...tmp];
  return sendData;
});

const theadTitleType3 = computed(() => {
  const tmp = Object.values(grammarParts);
  const sendData = ["形態", ...tmp];
  sendData.splice(2, 1);
  return sendData;
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
  />
  <GodanVerbsTable
    title="五段動詞表(詞尾母音變化)"
    subTitle="音便 (詞尾接尾一起改變)"
    verbs="飲む"
  />
  <VerbTable
    title="一段動詞 (所有辭書形母音為「る」的動詞)"
    verbs="見"
    :theadTitle="theadTitleType1"
    :values="ichidabVerbConjugationRules"
    :subValues="ichidabVerbPaiSenRules"
  />
  <VerbTable
    title="サ變動詞 (する動詞為結尾的動詞)"
    verbs="散歩"
    :theadTitle="theadTitleType1"
    :values="saVerbConjugationRules"
  />
  <VerbTable
    :title="'カ變動詞 (只有来る)\n(漢字發音會變動，標註在詞尾)'"
    verbs="来"
    :theadTitle="theadTitleType1"
    :values="kaVerbConjugationRules"
  />
  <VerbTable
    :title="'い形容詞'"
    verbs="優し"
    :theadTitle="theadTitleType1"
    :values="iAdjuctiveConjugationRules"
  />
  <VerbTable
    :title="'ない形容詞'"
    prefix="優しく"
    verbs="な"
    :theadTitle="theadTitleType2"
    :values="naiAdjuctiveConjugationRules"
  />

  <VerbTable
    :title="'だ助動詞\n名詞＋だ (是...名詞)\n2類形容詞＋だ'"
    prefix="好き"
    :theadTitle="theadTitleType3"
    :values="baAuxiliaryVerbsRules"
  />
</template>

<style lang="scss"></style>
