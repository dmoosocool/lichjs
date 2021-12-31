/*
 * @Author: DM
 * @Date: 2021-12-29 18:21:41
 * @LastEditors: DM
 * @LastEditTime: 2021-12-30 10:14:36
 * @Descriptions:
 * @FilePath: /lich/src/main.js
 */

import {
  eventListenersModule,
  styleModule,
  classModule,
  init,
  h,
  vnode,
  toVNode,
  // patch,
} from "snabbdom";

import App from "./App";

let diffVNode;
const patch = init([classModule, styleModule, eventListenersModule]);

function render() {
  diffVNode = patch(diffVNode, App);
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");

  diffVNode = patch(toVNode(container), App);
  console.log(diffVNode);
  render();
});
