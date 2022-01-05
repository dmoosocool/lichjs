/* eslint-disable @typescript-eslint/no-explicit-any */

/*
 * @Author: DM
 * @Date: 2021-12-31 18:49:51
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 18:53:55
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/core/trunk.ts
 */
import type { VNode, VNodeData } from '@lichjs/virtual-dom';
import { h } from '@lichjs/virtual-dom';

export interface ThunkData extends VNodeData {
  fn: () => VNode;
  args: unknown[];
}

export interface Thunk extends VNode {
  data: ThunkData;
}

export interface ThunkFn {
  (sel: string, fn: (...args: unknown[]) => unknown, args: unknown[]): Thunk;
  (
    sel: string,
    key: unknown,
    fn: (...args: unknown[]) => unknown,
    args: unknown[],
  ): Thunk;
}

function copyToThunk(vnode: VNode, thunk: VNode): void {
  if (vnode.data !== undefined) {
    vnode.data.fn = (thunk.data as VNodeData)?.fn;
    vnode.data.args = (thunk.data as VNodeData)?.args;
  }

  thunk.data = vnode.data;
  thunk.children = vnode.children;
  thunk.text = vnode.text;
  thunk.elm = vnode.elm;
}

function init(thunk: VNode): void {
  const cur = thunk.data as VNodeData;

  if (cur.fn && cur.args) {
    const vnode = cur.fn(cur.args);
    copyToThunk(vnode, thunk);
  }
}

function prepatch(oldVnode: VNode, thunk: VNode): void {
  let i: number;
  const old = oldVnode.data as VNodeData;
  const cur = thunk.data as VNodeData;
  const oldArgs = old.args;
  const args = cur.args;
  if (old.fn !== cur.fn || oldArgs!.length !== args!.length) {
    copyToThunk(cur.fn!(...args!), thunk);
    return;
  }
  for (i = 0; i < args!.length; ++i) {
    if (oldArgs![i] !== args![i]) {
      copyToThunk(cur.fn!(...args!), thunk);
      return;
    }
  }
  copyToThunk(oldVnode, thunk);
}

export const thunk = function thunk(
  sel: string,
  key?: any,
  fn?: any,
  args?: any,
): VNode {
  if (args === undefined) {
    args = fn;
    fn = key;
    key = undefined;
  }
  return h(sel, {
    key: key,
    hook: { init, prepatch },
    fn: fn,
    args: args,
  });
} as ThunkFn;
