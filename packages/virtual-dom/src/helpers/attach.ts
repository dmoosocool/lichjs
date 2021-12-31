/*
 * @Author: DM
 * @Date: 2021-12-31 19:09:31
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 19:31:26
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/helpers/attach.ts
 */
import type { VNode, VNodeWithAttachData, Hooks } from '@lich/virtual-dom';

const attachHook = {
  pre: function pre(
    vnode: VNodeWithAttachData,
    newVnode: VNodeWithAttachData,
  ): void {
    const attachData = vnode.data.attachData;
    // Copy created placeholder and real element from old vnode
    newVnode.data.attachData.placeholder = attachData.placeholder;
    newVnode.data.attachData.real = attachData.real;
    // Mount real element in vnode so the patch process operates on it
    vnode.elm = vnode.data.attachData.real;
  },
  create: function create(_: any, vnode: VNodeWithAttachData): void {
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

  destory: function destroy(vnode: VNodeWithAttachData): void {
    // Remove placeholder
    if (vnode.elm !== undefined) {
      (vnode.elm.parentNode as HTMLElement).removeChild(vnode.elm);
    }
    // Remove real element from where it was inserted
    vnode.elm = vnode.data.attachData.real;
  },

  post: function post(_: any, vnode: VNodeWithAttachData): void {
    // Mount dummy placeholder in vnode so potential reorders use it
    vnode.elm = vnode.data.attachData.placeholder;
  },
};

export function attachTo(target: Element, vnode: VNode): VNode {
  if (vnode.data === undefined) vnode.data = {};
  if (vnode.data.hook === undefined) vnode.data.hook = {};
  const data = vnode.data;
  let hook = vnode.data.hook;
  data.attachData = { target: target, placeholder: undefined, real: undefined };
  hook = attachHook as unknown as Hooks;
  return vnode;
}
