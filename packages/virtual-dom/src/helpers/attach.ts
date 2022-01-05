/*
 * @Author: DM
 * @Date: 2021-12-31 19:09:31
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 19:31:26
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/helpers/attach.ts
 */
import type { VNode, VNodeData, Hooks } from '@lichjs/virtual-dom';

const attachHook: Hooks = {
  pre: function pre(vnode: VNodeData, newVnode: VNodeData): void {
    const attachData = vnode.data.attachData;
    // Copy created placeholder and real element from old vnode
    newVnode.data.attachData.placeholder = attachData.placeholder;
    newVnode.data.attachData.real = attachData.real;
    // Mount real element in vnode so the patch process operates on it
    vnode.elm = vnode.data.attachData.real;
  },

  create: function create(_: VNodeData, vnode: VNodeData): void {
    const real = vnode.elm;
    const attachData = vnode.data.attachData;
    const placeholder = document.createElement('span');
    // Replace actual element with dummy placeholder
    // Snabbdom will then insert placeholder instead
    vnode.elm = placeholder;
    attachData.target.appendChild(real);
    attachData.real = real;
    attachData.placeholder = placeholder;
  },

  post: function post(_: never, vnode: VNodeData): void {
    // Mount dummy placeholder in vnode so potential reorders use it
    vnode.elm = vnode.data.attachData.placeholder;
  },

  destroy: function destory(vnode: VNodeData): void {
    // Remove placeholder
    if (vnode.elm !== undefined) {
      (vnode.elm.parentNode as HTMLElement).removeChild(vnode.elm);
    }
    // Remove real element from where it was inserted
    vnode.elm = vnode.data.attachData.real;
  },
};

export function attachTo(target: Element, vnode: VNode): VNode {
  if (vnode.data === undefined) vnode.data = {};
  if (vnode.data.hook === undefined) vnode.data.hook = {};
  const data = vnode.data;
  data.attachData = { target: target, placeholder: undefined, real: undefined };
  vnode.data.hook = attachHook;
  return vnode;
}
