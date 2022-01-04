/*
 * @Author: DM
 * @Date: 2021-12-31 18:41:23
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 18:53:47
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/core/vnode.ts
 */
import type { VNode, VNodeData } from '@lichjs/virtual-dom';

export function vnode(
  sel: string | undefined,
  data: VNodeData | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | DocumentFragment | Text | undefined,
): VNode {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}
