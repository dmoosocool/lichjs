/*
 * @Author: DM
 * @Date: 2022-01-04 14:28:19
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 15:07:33
 * @Descriptions:
 * @FilePath: /lich/packages/lich/core/runtime-dom.ts
 */

import {
  eventListenersModule,
  styleModule,
  classModule,
  init,
  toVNode,
} from '@lichjs/virtual-dom';
import type { VNode } from '@lichjs/virtual-dom/src/global';
import * as pkg from '../../package.json';

export function createApp(App: VNode) {
  const patch = init([eventListenersModule, styleModule, classModule]);
  let diffVNode: VNode | Element | DocumentFragment;
  function render() {
    diffVNode = patch(diffVNode, App);
  }
  // window.addEventListener('DOMContentLoaded', () => {
  //   const container = document.getElementById('app');
  //   diffVNode = patch(toVNode(container), App);
  //   console.log(diffVNode);
  //   render();
  // });

  return {
    version: pkg.version,
    mount(container: string) {
      const containerElm = document.querySelector(container);

      if (!containerElm)
        return console.error(`container element is not found:${container}`);

      document.addEventListener('DOMContentLoaded', () => {
        diffVNode = patch(toVNode(containerElm), App);
        render();
      });
    },
  };
}
