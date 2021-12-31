/*
 * @Author: DM
 * @Date: 2021-12-29 19:10:42
 * @LastEditors: DM
 * @LastEditTime: 2021-12-30 10:11:50
 * @Descriptions:
 * @FilePath: /lich/src/Fragment.ts
 */
import type { VNode, Key, ArrayOrElement } from "snabbdom";
import { vnode, fragment } from "snabbdom";

export type JsxVNodeChild =
  | VNode
  | string
  | number
  | boolean
  | undefined
  | null;

export type JsxVNodeChildren = ArrayOrElement<JsxVNodeChild>;

export function flattenAndFilter(
  children: JsxVNodeChildren[],
  flattened: VNode[]
) {
  for (const child of children) {
    if ((typeof child === "number" && !isNaN(child)) || !!child) {
      if (Array.isArray(child)) {
        flattenAndFilter(child, flattened);
      } else {
        typeof child === "object"
          ? flattened.push(child as VNode)
          : flattened.push(
              vnode(undefined, undefined, undefined, String(child), undefined)
            );
      }
    }
  }
  return flattened;
}

export function isPlainText(nodes: VNode[]) {
  return (
    nodes.length === 1 && nodes[0].sel === undefined && nodes[0].text !== ""
  );
}

export function Fragment(
  data: { key: Key } | null,
  ...children: JsxVNodeChildren[]
): VNode {
  const flatChildren = flattenAndFilter(children, []);
  const plainText = vnode(
    undefined,
    undefined,
    undefined,
    flatChildren[0].text,
    undefined
  );

  const normalVNode = vnode(
    undefined,
    data ?? undefined,
    flatChildren,
    undefined,
    undefined
  );

  if (isPlainText(flatChildren)) {
    console.log("plainText", plainText);
    return plainText;
  } else {
    console.log("normalVNode", normalVNode);
    return normalVNode;
  }
}
