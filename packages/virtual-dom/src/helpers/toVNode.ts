/*
 * @Author: DM
 * @Date: 2021-12-31 19:32:38
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 19:33:43
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/helpers/toVNode.ts
 */
import { vnode, htmlDomApi } from '@lichjs/virtual-dom';
import type { DOMApi, VNode } from '@lichjs/virtual-dom';

// get real array from NamedNodeMap
function getAttrs(map: NamedNodeMap) {
  const attrs = [];
  for (let i = 0; i < map.length; i++) {
    attrs.push(map[i]);
  }
  return attrs;
}

export function toVNode(node: Node, domApi?: DOMApi): VNode {
  const api: DOMApi = domApi !== undefined ? domApi : htmlDomApi;
  let text: string;
  if (api.isElement(node)) {
    const id = node.id ? '#' + node.id : '';
    const cn = node.getAttribute('class');
    const c = cn ? '.' + cn.split(' ').join('.') : '';
    const sel = api.tagName(node).toLowerCase() + id + c;
    const attrs: any = {};
    const children: VNode[] = [];
    let name: string;
    let i: number, n: number;
    const elmAttrs = node.attributes;
    const elmChildren = node.childNodes;

    // get element's datasets
    const datasets: Record<string, string> = {};
    getAttrs(elmAttrs).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        datasets[attr.name.replace('data-', '')] = attr.value;
      }
    });

    // remove attributes from datasets
    getAttrs(elmAttrs).forEach(attr => {
      Object.keys(datasets).includes(attr.name.replace('data-', '')) &&
        elmAttrs.removeNamedItem(attr.name);
    });

    for (i = 0, n = elmAttrs.length; i < n; i++) {
      name = elmAttrs[i].nodeName;
      if (name !== 'id' && name !== 'class') {
        attrs[name] = elmAttrs[i].nodeValue;
      }
    }
    for (i = 0, n = elmChildren.length; i < n; i++) {
      children.push(toVNode(elmChildren[i], domApi));
    }

    const data: Record<string, any> = {};
    if (Object.keys(attrs).length) data.attrs = attrs;
    if (Object.keys(datasets).length) data.datasets = datasets;

    return vnode(sel, data, children, undefined, node);
  } else if (api.isText(node)) {
    text = api.getTextContent(node) as string;
    return vnode(undefined, undefined, undefined, text, node);
  } else if (api.isComment(node)) {
    text = api.getTextContent(node) as string;
    return vnode('!', {}, [], text, node as any);
  } else {
    return vnode('', {}, [], undefined, node as any);
  }
}
