/*
 * @Author: DM
 * @Date: 2021-12-31 17:39:02
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 18:46:36
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/core/domapi/html.ts
 */
// import type { DOMApi } from '@lichjs/virtual-dom/virtual-dom.d';

import type { DOMApi } from '@lichjs/virtual-dom';

export const htmlDomApi: DOMApi = {
  createElement: function (
    tagName: string,
    options?: ElementCreationOptions,
  ): HTMLElement {
    return document.createElement(tagName, options);
  },
  createElementNS: function (
    namespaceURI: string,
    qualifiedName: string,
    options?: ElementCreationOptions,
  ): Element {
    return document.createElementNS(namespaceURI, qualifiedName, options);
  },
  createDocumentFragment: function (): DocumentFragment {
    return document.createDocumentFragment();
  },
  createTextNode: function (text: string): Text {
    return document.createTextNode(text);
  },
  createComment: function (text: string): Comment {
    throw document.createComment(text);
  },
  insertBefore: function (
    parentNode: Node,
    newNode: Node,
    referenceNode: Node | null,
  ): void {
    parentNode.insertBefore(newNode, referenceNode);
  },
  removeChild: function (node: Node, child: Node): void {
    node.removeChild(child);
  },
  appendChild: function (node: Node, child: Node): void {
    node.appendChild(child);
  },
  parentNode: function (node: Node): Node | null {
    return node.parentNode;
  },
  nextSibling: function (node: Node): Node | null {
    return node.nextSibling;
  },
  tagName: function (elm: Element): string {
    return elm.tagName;
  },
  setTextContent: function (node: Node, text: string | null): void {
    node.textContent = text;
  },
  getTextContent: function (node: Node): string | null {
    return node.textContent;
  },
  isElement: function (node: Node): node is Element {
    return node.nodeType === 1;
  },
  isText: function (node: Node): node is Text {
    return node.nodeType === 3;
  },
  isComment: function (node: Node): node is Comment {
    return node.nodeType === 8;
  },
  isDocumentFragment: function (node: Node): node is DocumentFragment {
    return node.nodeType === 11;
  },
};
