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
  VNodeChildElement,
} from '@lichjs/virtual-dom';
import { vnode, isArray, isPrimitive } from '@lichjs/virtual-dom';

export function addNS(
  data: VNodeData,
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

export function h(
  sel: string,
  b?: (VNodeData | null) | VNodeChildren,
  c?: VNodeChildren,
): VNode {
  let data: VNodeData | null = null;
  let children: VNodeChildElement[] = [];
  let text = '';

  if (c !== undefined) {
    if (b !== null) {
      data = <VNodeData>b;
    }

    if (isArray(c)) {
      children = c;
    } else if (isPrimitive(c)) {
      text = c.toString();
    } else if (c && c.sel) {
      children = [c as VNode];
    }
  } else if (b !== undefined && b !== null) {
    if (isArray(b)) {
      children = b;
    } else if (isPrimitive(b)) {
      text = b.toString();
    } else if (b && b.sel) {
      children = [b as VNode];
    } else {
      data = b;
    }
  }

  if (isArray(children)) {
    children.map(child => {
      if (isPrimitive(child)) {
        child = vnode(
          undefined,
          undefined,
          undefined,
          child.toString(),
          undefined,
        );
      }
      return child;
    });
  }

  if (sel.startsWith('svg')) {
    if (sel.length === 3 || ['.', '#'].includes(sel[4])) {
      addNS(data!, children as VNodes, sel);
    }
  }

  return vnode(
    sel,
    data!,
    children as unknown as (string | VNode)[],
    text,
    undefined,
  );

  // if (b !== undefined && b !== null && c !== undefined) {
  //   data = <VNodeData>b;
  // }

  // if (c !== undefined && Array.isArray(c)) {
  //   children = c;
  // }

  // if (c !== undefined && (typeof c === 'string' || typeof c === 'number')) {
  //   text = c.toString();
  // }

  // if (c !== undefined && (c as VNode).sel) {
  //   children = [c as VNode];
  // }

  // if (b !== undefined && b !== null && Array.isArray(b)) {
  //   children = b;
  // }

  // if (b !== undefined && (typeof b === 'string' || typeof b === 'number')) {
  //   text = b.toString();
  // }

  // if (b !== undefined && (b as VNode).sel) {
  //   children = [b as VNode];
  // }

  // if (b !== undefined && b !== null) {
  //   data = b;
  // }

  // let data: VNodeData = {};
  // let children: any;
  // let text: any;
  // let i: number;
  // if (c !== undefined) {
  //   if (b !== null) {
  //     data = b;
  //   }
  //   if (isArray(c)) {
  //     children = c;
  //   } else if (isPrimitive(c)) {
  //     text = c.toString();
  //   } else if (c && c.sel) {
  //     children = [c];
  //   }
  // } else if (b !== undefined && b !== null) {
  //   if (isArray(b)) {
  //     children = b;
  //   } else if (isPrimitive(b)) {
  //     text = b.toString();
  //   } else if (b && b.sel) {
  //     children = [b];
  //   } else {
  //     data = b;
  //   }
  // }
  // if (children !== undefined) {
  //   for (i = 0; i < children.length; ++i) {
  //     if (isPrimitive(children[i]))
  //       children[i] = vnode(
  //         undefined,
  //         undefined,
  //         undefined,
  //         children[i],
  //         undefined,
  //       );
  //   }
  // }
  // if (
  //   sel[0] === 's' &&
  //   sel[1] === 'v' &&
  //   sel[2] === 'g' &&
  //   (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  // ) {
  //   addNS(data, children, sel);
  // }
  // return vnode(sel, data, children, text, undefined);
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
