/*
 * @Author: DM
 * @Date: 2021-12-31 20:50:30
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 09:54:05
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/exmples/fragment/index.js
 */

import {
  init,
  classModule,
  styleModule,
  eventListenersModule,
  h,
} from '../../dist/esm/index.js';

const patch = init([classModule, styleModule, eventListenersModule]);
const wrapper = document.createElement('div');
document.body.appendChild(wrapper);

let vnode = h('div.page', 'hello world');
patch(wrapper, vnode);
