<script setup>
import { toRef } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// toRef(source, 'key') 會回傳一個指向原物件某屬性的 ref
const checked = toRef(props, "modelValue");
</script>

<template>
  <label class="flex gap-2 items-center text-sm cursor-pointer text-nowrap">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    {{ label }}
  </label>
</template>

<style lang="scss" scoped></style>
