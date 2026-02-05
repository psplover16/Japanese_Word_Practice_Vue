/*
  v-longPress 指令

  功能介紹：
  - 在元素上偵測「長按」互動（支援滑鼠與觸控）。
  - 當使用者按住超過設定的 threshold（預設 600ms）時，會執行提供的 handler。
  - 若長按已觸發，接著放開時會呼叫 onRelease（若有提供）。
  - 為避免同時觸發 click 與長按，指令會攔截長按後緊接的 click 事件（capture 階段）。
  - 長按進行中或已觸發時，會阻止系統的 contextmenu（右鍵或行動裝置的長按選單），以避免原生選單干擾。

  函數與行為詳解：
  - start(e)：
      * 在 mousedown / touchstart 時啟動計時器（或重設），等待 threshold 到達。
      * 若計時器到達，標記 el.__longPress_triggered = true 並呼叫 handler(e)。
      * 注意：timer 使用 setTimeout，當 handler 被呼叫後會將 timer 清為 null。

  - cancel(e)：
      * 在 mouseup / touchend / touchcancel 或 mouseleave 時呼叫。
      * 若 timer 尚存在（代表使用者尚未達到 threshold），則清除 timer（代表未觸發長按）。
      * 若 timer 不存在但 el.__longPress_triggered 為 true（代表已觸發長按），則會呼叫可選的 releaseHandler(e)，
        並在短延遲後清除 internal flag，避免長時間保留狀態。

  - clickCapture(e)：
      * 在 capture 階段監聽 click，若內部 flag 表示剛觸發過長按，則停止事件並 preventDefault。
      * 這可避免同一個互動同時觸發長按與 click 的情況。

  - contextMenuHandler(evt)：
      * 在 long-press 計時中或已觸發後，攔截 contextmenu 事件（右鍵或行動裝置的長按選單），
        以免系統選單顯示並干擾應用行為。

  實作注意：
  - 所有 listener 會記錄在 el.__vLongpress，並在 unmounted 時移除，確保不會造成記憶體或事件洩漏。
  - binding.value 支援簡單函數或物件形式（可帶 handler、onRelease、duration）。
*/

export default {
  beforeMount(el, binding) {
    // Binding can be a function or an object
    const isFunction = typeof binding.value === "function";
    const handler = isFunction
      ? binding.value
      : binding.value && binding.value.handler;
    const releaseHandler = isFunction
      ? undefined
      : binding.value && (binding.value.onRelease || binding.value.release);
    const duration = isFunction
      ? 600
      : (binding.value && binding.value.duration) || 600; // 預設長按時間（毫秒），預設為 600ms

    if (typeof handler !== "function") {
      console.warn(
        "[v-longPress] provided expression must be a function or an object with { handler, onRelease? }",
      );
      return;
    }

    // timer holds the timeout id if waiting for threshold
    let timer = null;

    // start: 使用者按下（mousedown / touchstart）時啟動計時器
    // 中文註解：此函式會啟動或重設計時器；當計時器到達 duration 時，視為發生長按，會設定 flag 並呼叫 handler
    // 注意：handler 的呼叫在計時器 callback 中執行，並會把 timer 清為 null，代表已完成觸發
    const start = (e) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // 添加一個 flag 在元素上，表示長按已被觸發
        el.__longPress_triggered = true;
        timer = null; // clear timer id
        try {
          handler(e);
        } catch (err) {
          console.error(err);
        }
      }, duration);
    };

    // cancel/release: 使用者放開或移開（mouseup / touchend / touchcancel / mouseleave）
    // 中文註解：
    // - 若 timer 尚存在：表示使用者放開時尚未達到 threshold，取消 timer 即代表沒有觸發長按
    // - 若 timer 不存在且 el.__longPress_triggered 為 true：表示長按已觸發，這時會呼叫可選的 releaseHandler
    //   （例如你希望在放開時執行某個動作），並在短時間後清除 triggered flag
    const cancel = (e) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
        return;
      }

      if (el.__longPress_triggered) {
        try {
          if (typeof releaseHandler === "function") releaseHandler(e);
        } catch (err) {
          console.error(err);
        }
        // 長按已觸發，放開後呼叫 releaseHandler（若有提供），然後
        // 在短時間後清除 internal flag，避免長時間保留狀態
        // 注意：這裡不立即清除 flag 是為了讓接下來的 clickCapture 能檢測到它，
        setTimeout(() => {
          el.__longPress_triggered = false;
        }, 300);
      }
    };

    // clickCapture：攔截長按後緊接而來的 click
    // 中文註解：在 capture 階段判斷內部 flag，若為真則阻止 click 的傳播與預設行為，並重置 flag
    const clickCapture = (e) => {
      if (el.__longPress_triggered) {
        e.stopImmediatePropagation();
        e.preventDefault();
        el.__longPress_triggered = false;
      }
    };

    // store these references on the element so we can remove them on unmount
    el.__vLongpress = { start, cancel, clickCapture };

    // attach the pointer/touch listeners
    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);

    // touch listeners: passive true for performance; we only use touchend/touchcancel
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);

    // intercept click in capture phase to avoid double actions
    el.addEventListener("click", clickCapture, true);

    // contextMenuHandler：在長按期間或長按已觸發時，阻止系統 context menu（右鍵選單或行動裝置長按菜單）
    // 中文註解：這可避免系統選單出現干擾應用預期的長按行為。該 listener 在 capture 階段註冊，並於 unmounted 時移除。
    const contextMenuHandler = (evt) => {
      if (timer || el.__longPress_triggered) {
        if (evt && typeof evt.preventDefault === "function")
          evt.preventDefault();
        if (evt && typeof evt.stopPropagation === "function")
          evt.stopPropagation();
        return false;
      }
    };
    el.__vLongpress.contextMenuHandler = contextMenuHandler;
    el.addEventListener("contextmenu", contextMenuHandler, true);
  },

  unmounted(el) {
    if (!el.__vLongpress) return;
    const { start, cancel, clickCapture } = el.__vLongpress;
    el.removeEventListener("mousedown", start);
    el.removeEventListener("mouseup", cancel);
    el.removeEventListener("mouseleave", cancel);

    el.removeEventListener("touchstart", start);
    el.removeEventListener("touchend", cancel);
    el.removeEventListener("touchcancel", cancel);

    el.removeEventListener("click", clickCapture, true);
    if (el.__vLongpress && el.__vLongpress.contextMenuHandler) {
      el.removeEventListener(
        "contextmenu",
        el.__vLongpress.contextMenuHandler,
        true,
      );
    }

    delete el.__vLongpress;
    delete el.__longPress_triggered;
  },
};
