<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: "none",
    validator: (value) =>
      ["default", "reset", "submit", "disabled", "none"].includes(value),
  },
  isBorderless: {
    type: Boolean,
    default: true,
  },
  // 是否全寬
  fullWidth: {
    type: Boolean,
    default: false,
  },
  // 是否為 active 狀態（選中/當前狀態）
  active: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const activeThemeVariantMap = {
  default: {
    primary: "bg-blue-600 text-white",
    outline: "border border-blue-600",
    active: "",
  },
  reset: {
    primary: "bg-gray-300 text-black",
    outline: "border border-gray-300",
    active: "",
  },
  submit: {
    primary: "bg-black text-white",
    outline: "border border-black",
    active: "",
  },
  disabled: {
    primary: "",
    outline: "",
    active: "",
  },
  none: {
    primary: "",
    outline: "",
    active: "",
  },
};

const btnClass = computed(() => {
  if (props.customClass) {
    return props.customClass;
  }
  return [
    props.fullWidth ? "w-full" : "",
    activeThemeVariantMap[props.theme]
      ? activeThemeVariantMap[props.theme].primary
      : "",
    props.isBorderless ? "" : activeThemeVariantMap[props.theme].outline,
  ];
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-3 py-[6px] rounded-md"
    :class="btnClass"
    @click="$emit('click')"
  >
    <slot name="prefix"></slot>
    <slot name="content">{{ label }}</slot>
    <slot name="suffix"></slot>
  </button>
</template>

<style lang="scss" scoped></style>
