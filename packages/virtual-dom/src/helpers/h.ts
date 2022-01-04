/*
 * @Author: DM
 * @Date: 2021-12-31 18:50:41
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 20:03:16
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/helpers/h.ts
 */
import type {
  VNode,
  VNodeData,
  VNodes,
  VNodeChildren,
} from '@lichjs/virtual-dom';
import { vnode, isArray, isPrimitive } from '@lichjs/virtual-dom';

function addNS(
  data: any,
  children: VNodes | undefined,
  sel: string | undefined,
): void {
  data.ns = 'http://www.w3.org/2000/svg';
  if (sel !== 'foreignObject' && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data;
      if (childData !== undefined) {
        addNS(childData, children[i].children as VNodes, children[i].sel);
      }
    }
  }
}

export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren,
): VNode;
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;
  if (c !== undefined) {
    if (b !== null) {
      data = b;
    }
    if (isArray(c)) {
      children = c;
    } else if (isPrimitive(c)) {
      text = c.toString();
    } else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    if (isArray(b)) {
      children = b;
    } else if (isPrimitive(b)) {
      text = b.toString();
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (isPrimitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined,
        );
    }
  }
  if (
    sel[0] === 's' &&
    sel[1] === 'v' &&
    sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    addNS(data, children, sel);
  }
  return vnode(sel, data, children, text, undefined);
}

/**
 * @experimental
 */
export function fragment(children: VNodeChildren): VNode {
  let c: any;
  let text: any;

  if (isArray(children)) {
    c = children;
  } else if (isPrimitive(c)) {
    text = children;
  } else if (c && c.sel) {
    c = [children];
  }

  if (c !== undefined) {
    for (let i = 0; i < c.length; ++i) {
      if (isPrimitive(c[i]))
        c[i] = vnode(undefined, undefined, undefined, c[i], undefined);
    }
  }

  return vnode(undefined, {}, c, text, undefined);
}
