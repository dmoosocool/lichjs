/*
 * @Author: DM
 * @Date: 2021-12-31 17:55:57
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 13:49:15
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/global.d.ts
 */

export type PreHook = () => any;
export type InitHook = (vNode: VNode) => any;
export type CreateHook = (emptyVNode: VNode, vNode: VNode) => any;
export type InsertHook = (vNode: VNode) => any;
export type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any;
export type UpdateHook = (oldVNode: VNode, vNode: VNode) => any;
export type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any;
export type DestroyHook = (vNode: VNode) => any;
export type RemoveHook = (vNode: VNode, removeCallback: () => void) => any;
export type PostHook = () => any;

export interface VNodeDataWithAttach extends VNodeData {
  attachData: AttachData;
}
export interface VNodeWithAttachData extends VNode {
  data: VNodeDataWithAttach;
}

export type Module = Partial<{
  pre: PreHook;
  create: CreateHook;
  update: UpdateHook;
  destroy: DestroyHook;
  remove: RemoveHook;
  post: PostHook;
}>;

export interface Hooks {
  pre?: PreHook;
  init?: InitHook;
  create?: CreateHook;
  insert?: InsertHook;
  prepatch?: PrePatchHook;
  update?: UpdateHook;
  postpatch?: PostPatchHook;
  destroy?: DestroyHook;
  remove?: RemoveHook;
  post?: PostHook;
}

export interface AttachData {
  [key: string]: any;
  [i: number]: any;
  placeholder?: any;
  real?: Node;
}

export type Props = Record<string, any>;
export type Attrs = Record<string, string | number | boolean>;
export type Classes = Record<string, boolean>;

export type VNodes = VNode[];
export type VNodeChildElement =
  | VNode
  | string
  | number
  | String
  | Number
  | undefined
  | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

export type VNodeStyle = Record<string, string> & {
  delayed?: Record<string, string>;
  remove?: Record<string, string>;
};

export type Dataset = Record<string, string>;
export type Listener<T> = (this: VNode, ev: T, vnode: VNode) => void;

export type HTMLEvents = {
  [N in keyof HTMLElementEventMap]?:
    | Listener<HTMLElementEventMap[N]>
    | Array<Listener<HTMLElementEventMap[N]>>;
};
// export type CustomerEvents = {
//   [event: string]: Listener<Event> | Array<Listener<Event>>;
// };

export type CustomerEvents = Record<
  string,
  Listener<Event> | Listener<Event>[]
>;

export type On = HTMLEvents | CustomerEvents;

export type Key = string | number | symbol;

export interface VNode {
  sel: string | undefined;
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined;
  elm: Node | undefined;
  text: string | undefined;
  key: Key | undefined;
}

export interface VNodeData {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On | never[];
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  is?: string; // for custom elements v1
  [key: string]: any; // for any other 3rd party module
}

export interface DOMApi {
  createElement: (
    tagName: any,
    options?: ElementCreationOptions,
  ) => HTMLElement;
  createElementNS: (
    namespaceURI: string,
    qualifiedName: string,
    options?: ElementCreationOptions,
  ) => Element;
  createDocumentFragment: () => DocumentFragment;
  createTextNode: (text: string) => Text;
  createComment: (text: string) => Comment;
  insertBefore: (
    parentNode: Node,
    newNode: Node,
    referenceNode: Node | null,
  ) => void;
  removeChild: (node: Node, child: Node) => void;
  appendChild: (node: Node, child: Node) => void;
  parentNode: (node: Node) => Node | null;
  nextSibling: (node: Node) => Node | null;
  tagName: (elm: Element) => string;
  setTextContent: (node: Node, text: string | null) => void;
  getTextContent: (node: Node) => string | null;
  isElement: (node: Node) => node is Element;
  isText: (node: Node) => node is Text;
  isComment: (node: Node) => node is Comment;
  isDocumentFragment: (node: Node) => node is DocumentFragment;
}
