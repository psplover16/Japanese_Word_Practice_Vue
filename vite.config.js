import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    base: mode === "prod" ? "/" : "/Japanese_Word_Practice_Vue/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
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
