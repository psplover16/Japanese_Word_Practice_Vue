<script setup>
defineProps({
  title: {
    type: String,
  },
  rules: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table class="w-full border-separate border-spacing-0">
    <thead>
      <tr>
        <td colspan="6">{{ title }}</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th
          class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
        >
          行 / 段
        </th>
        <th
          v-for="(value, index) in letters[0].cells"
          :key="index"
          class="bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300 text-center"
        >
          {{}}
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in letters" :key="rowIndex">
        <th
          class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
        >
          <div
            class="min-h-[60px] flex flex-col items-center justify-center gap-0.5 text-sm"
          >
            <label class="font-bold text-muted">
              <div class="font-extrabold text-primary">
                {{ row?.rowLabel?.jp }}
              </div>
              <label
                class="flex gap-1.5 items-center text-sm cursor-pointer text-nowrap"
              >
                <input
                  type="checkbox"
                  v-model="rowSelected"
                  :value="rowIndex"
                />
                {{ row?.rowLabel?.romanization }}
              </label>
            </label>
          </div>
        </th>
        <td
          v-for="(detailData, colIndex) in excludeOldLetters(row.cells)"
          :key="colIndex"
          class="border border-gray-300 p-0.5 relative bg-white no-select"
        >
          <label
            v-if="detailData?.hiragana && detailData?.katakana"
            class="flex flex-col gap-0.5"
          >
            <input
              type="checkbox"
              v-model="chooseTestAreaStore.selectedLetters"
              :value="`${rowIndex}-${colIndex}`"
            />
            <div class="flex flex-col justify-center items-center">
              <div class="font-bold text-nowrap sm:text-xl text-lg">
                {{ `${detailData?.hiragana} / ${detailData?.katakana}` }}
              </div>
              <div class="font-semibold text-xs text-muted">
                {{ detailData?.romanization }}
              </div>
            </div>
          </label>
          <div class="text-center" v-else>—</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss"></style>
