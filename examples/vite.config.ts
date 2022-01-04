/*
 * @Author: DM
 * @Date: 2021-12-29 18:12:49
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 14:06:37
 * @Descriptions:
 * @FilePath: /lich/examples/vite.config.ts
 */

import { resolve } from 'path/posix';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
    },
  },
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
    jsxInject: `import {jsx, Fragment} from '@lichjs/virtual-dom'`,
  },
});
