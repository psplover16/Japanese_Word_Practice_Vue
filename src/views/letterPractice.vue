<script setup></script>

<template>
  <div class="panel">
    <div class="controls">
      <div class="group">
        <label class="chk">
          <input id="toggleHira" type="checkbox" checked />
          題目包含：平假名
        </label>
        <label class="chk">
          <input id="toggleKata" type="checkbox" checked />
          題目包含：片假名
        </label>
      </div>

      <div class="group">
        <label class="chk">
          <input id="toggleAll" type="checkbox" checked />
          全選 / 全不選（音節）
        </label>
      </div>

      <div class="numWrap">
        <span
          style="
            font-size: 14px;
            color: var(--muted);
            font-weight: 700;
            text-wrap: nowrap;
          "
          >題數</span
        >
        <input
          id="countInput"
          type="number"
          min="1"
          step="1"
          value="5"
          inputmode="numeric"
        />
        <button id="startBtn">送出</button>
        <button class="ghost" id="clearResultBtn" title="清除底部結果">
          清除結果
        </button>
      </div>
    </div>

    <div class="hint">
      ✅ 每個音節左上角可勾選要不要出題。<br />
      ✅
      題目會「盡量讓每個你勾的音節都至少出現一次」，不足再隨機補齊到指定題數。<br />
      <span class="danger">⚠️ 若平/片兩個都取消，將無法開始出題。</span>
    </div>

    <div class="stickyFooter">
      <div class="stats" id="statsText">已選音節：0</div>
      <div class="stats" id="scriptText">目前題目腳本：平假名＋片假名</div>
    </div>

    <div class="tableWrap" id="tableWrap"></div>
  </div>
</template>

<style lang="scss" scoped></style>
