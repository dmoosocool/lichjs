/*
 * @Author: DM
 * @Date: 2021-12-31 20:39:20
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 20:55:50
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/rollup.config.js
 */

import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';

const optimize = process.env.NODE_ENV === 'production';

export default {
  input: path.join(__dirname, 'src', 'index.ts'),
  output: {
    dir: path.join(__dirname, 'dist'),
    format: 'cjs',
  },

  plugins: [
    nodeResolve(),
    esbuild({
      minify: optimize,
      optimizeDeps: {
        include: optimize ? ['@lich/virtual-dom'] : [],
      },
    }),
    cjs(),
  ],
};
