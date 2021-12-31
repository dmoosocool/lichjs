/*
 * @Author: DM
 * @Date: 2021-12-31 19:35:33
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 19:38:16
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/modules/attributes.ts
 */

import type { VNode, VNodeData, Module } from '@lich/virtual-dom';

const xlinkNS = 'http://www.w3.org/1999/xlink';
const xmlNS = 'http://www.w3.org/XML/1998/namespace';
const colonChar = 58;
const xChar = 120;

function updateAttrs(oldVnode: VNode, vnode: VNode): void {
  let key: string;
  const elm: Element = vnode.elm as Element;
  let oldAttrs = (oldVnode.data as VNodeData)?.attrs;
  let attrs = (vnode.data as VNodeData)?.attrs;

  if (!oldAttrs && !attrs) return;
  if (oldAttrs === attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  // update modified attributes, add new attributes
  for (key in attrs) {
    const cur = attrs[key];
    const old = oldAttrs[key];
    if (old !== cur) {
      if (cur === true) {
        elm.setAttribute(key, '');
      } else if (cur === false) {
        elm.removeAttribute(key);
      } else {
        if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur.toString());
        } else if (key.charCodeAt(3) === colonChar) {
          // Assume xml namespace
          elm.setAttributeNS(xmlNS, key, cur.toString());
        } else if (key.charCodeAt(5) === colonChar) {
          // Assume xlink namespace
          elm.setAttributeNS(xlinkNS, key, cur.toString());
        } else {
          elm.setAttribute(key, cur.toString());
        }
      }
    }
  }
  // remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

export const attributesModule: Module = {
  create: updateAttrs,
  update: updateAttrs,
};
