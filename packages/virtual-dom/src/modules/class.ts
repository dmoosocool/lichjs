/*
 * @Author: DM
 * @Date: 2021-12-31 19:38:49
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 19:41:17
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/modules/class.ts
 */
import type { VNode, VNodeData, Module } from '@lichjs/virtual-dom';
function updateClass(oldVnode: VNode, vnode: VNode): void {
  let cur: boolean;
  let name: string;
  const elm: Element = vnode.elm as Element;
  let oldClass = (oldVnode.data as VNodeData)?.class;
  let klass = (vnode.data as VNodeData)?.class;

  if (!oldClass && !klass) return;
  if (oldClass === klass) return;
  oldClass = oldClass || {};
  klass = klass || {};

  for (name in oldClass) {
    if (oldClass[name] && !Object.prototype.hasOwnProperty.call(klass, name)) {
      // was `true` and now not provided
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

export const classModule: Module = { create: updateClass, update: updateClass };
