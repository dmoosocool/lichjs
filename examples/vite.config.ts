/*
 * @Author: DM
 * @Date: 2021-12-29 18:12:49
 * @LastEditors: DM
 * @LastEditTime: 2021-12-29 20:42:31
 * @Descriptions:
 * @FilePath: /lich/vite.config.ts
 */

import { resolve } from "path/posix";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
      },
    },
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxFragment: "Fragment",
  },
});
