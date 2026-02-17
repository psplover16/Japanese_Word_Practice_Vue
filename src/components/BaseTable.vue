<script setup>
defineProps({
  tableData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <table class="w-full border-separate border-spacing-0 mt-3">
    <thead>
      <tr>
        <th
          class="bg-neutral-100 font-bold text-base p-1 border border-gray-30 whitespace-pre-wrap text-left"
          colspan="4"
        >
          {{ tableData.base }}: {{ tableData.rule }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th
          class="w-[80px] bg-neutral-100 font-bold text-xs p-0.5 border border-gray-300"
        >
          <div
            class="min-h-[60px] flex flex-col items-center justify-center gap-0.5 text-sm"
          >
            <div class="flex flex-col justify-center items-center text-primary">
              <div class="font-bold text-nowrap sm:text-xl text-lg">
                {{
                  `${tableData?.hiragana} ${tableData?.katakana && "/"} ${tableData?.katakana}`
                }}
              </div>
              <div class="font-semibold text-xs text-muted">
                {{ tableData?.romanization }}
              </div>
            </div>
          </div>
        </th>
        <td class="border border-gray-300 p-0.5 relative bg-white no-select">
          <div
            v-for="(item, index) in tableData.example"
            :key="index"
            class="text-base font-medium"
          >
            {{ item.word }}: {{ item.meaning }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
