// usage:
// v-longPress="handler" or v-longPress="{ handler: fn, duration: 600 }"

export default {
  beforeMount(el, binding) {
    const isFunction = typeof binding.value === "function";
    const handler = isFunction
      ? binding.value
      : binding.value && binding.value.handler;
    const releaseHandler = isFunction
      ? undefined
      : binding.value && (binding.value.onRelease || binding.value.release);
    const duration = isFunction
      ? 600
      : (binding.value && binding.value.duration) || 600;

    if (typeof handler !== "function") {
      console.warn(
        "[v-longPress] provided expression must be a function or an object with { handler, onRelease? }",
      );
      return;
    }

    let timer = null;

    const start = (e) => {
      // don't start if already started
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // mark triggered so we can block the immediate next click
        el.__longPress_triggered = true;
        timer = null; // timer finished
        try {
          handler(e);
        } catch (err) {
          console.error(err);
        }
      }, duration);
    };

    const cancel = (e) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
        return;
      }

      // if a longpress was already triggered, call the release handler (if any)
      if (el.__longPress_triggered) {
        try {
          if (typeof releaseHandler === "function") releaseHandler(e);
        } catch (err) {
          console.error(err);
        }
        // keep the triggered flag for clickCapture to intercept the following click
        // but ensure it will be cleared eventually in case no click event follows
        setTimeout(() => {
          el.__longPress_triggered = false;
        }, 300);
      }
    };

    // capture-phase click listener to prevent the click that follows a longPress
    const clickCapture = (e) => {
      if (el.__longPress_triggered) {
        e.stopImmediatePropagation();
        e.preventDefault();
        el.__longPress_triggered = false;
      }
    };

    // store refs for cleanup
    el.__vLongpress = {
      start,
      cancel,
      clickCapture,
    };

    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);

    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);

    el.addEventListener("click", clickCapture, true); // capture = true
    // prevent context menu (right-click / long-press menu) while longpress is pending or triggered
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
