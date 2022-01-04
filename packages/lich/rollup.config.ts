/*
 * @Author: DM
 * @Date: 2022-01-04 15:10:07
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 15:17:20
 * @Descriptions:
 * @FilePath: /lich/packages/lich/rollup.config.ts
 */
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';

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
    json(),
    alias({
      entries: [{ find: '@lichjs/lich', replacement: './src/index.ts' }],
    }),
    nodeResolve(),
    esbuild({
      minify: optimize,
      optimizeDeps: {
        include: optimize ? ['@lichjs/lich'] : [],
      },
    }),
    cjs(),
  ],
};
