import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "fs";
import { VitePWA } from "vite-plugin-pwa";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig(({ mode }) => {
  let basePath = "/";
  if (mode === "githubPages") {
    basePath = "/Japanese_Word_Practice_Vue/";
  }

  return {
    plugins: [
      vue(),
      VitePWA({
        // 使用 GenerateSW 模式，自動產生 service worker
        // injectManifest 模式需要你自己撰寫 sw.js，並在 build 時注入 precache 清單
        strategies: "generateSW",
        // 如何更新? 但此處不會自動更新，需在 app 中呼叫 update() 來觸發更新流程
        // prompt：當有新版本可用時，Service Worker 會進入 waiting 狀態，並等待你手動呼叫 skipWaiting() 來啟用新版本。這種方式讓你可以控制何時更新，通常會在使用者同意後才進行更新。
        // autoUpdate：Service Worker 會自動在背景中檢查更新，並在有新版本時自動下載和安裝。
        // manual : 完全客製
        // registerType: "autoUpdate",

        // 你原本的 manifest 已經放在 public
        manifest: {
          name: "Japanese Word Practice",
          short_name: "JP Practice",
          start_url: ".",
          scope: ".",
          display: "standalone",
          background_color: "#d7d7d7",
          theme_color: "#d7d7d7",
          icons: [
            {
              src: "icons/192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "icons/180.png",
              sizes: "180x180",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "icons/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          // 常見靜態資源都快取
          globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
          cleanupOutdatedCaches: true,
        },
      }),
    ],
    base: basePath,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          // 將第三方庫打包到單獨的 chunk 中
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
  };
});
