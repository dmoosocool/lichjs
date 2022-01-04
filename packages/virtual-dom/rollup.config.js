/*
 * @Author: DM
 * @Date: 2021-12-31 20:39:20
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 10:14:18
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/rollup.config.js
 */

import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';

const optimize = process.env.NODE_ENV === 'production';

export default {
  input: path.join(__dirname, 'src', 'index.ts'),
  output: [
    {
      sourcemap: true,
      dir: path.join(__dirname, 'dist/cjs/'),
      format: 'cjs',
    },
    {
      sourcemap: true,
      dir: path.join(__dirname, 'dist/esm/'),
      format: 'esm',
    },
  ],
  plugins: [
    alias({
      entries: [{ find: '@lichjs/virtual-dom', replacement: './src/index.ts' }],
    }),
    nodeResolve(),
    esbuild({
      minify: optimize,
      optimizeDeps: {
        include: optimize ? ['@lichjs/virtual-dom'] : [],
      },
    }),
    cjs(),
  ],
};
