/*
 * @Author: DM
 * @Date: 2021-12-31 20:50:30
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 20:55:08
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/exmples/fragment/index.js
 */

import {
  init,
  classModule,
  styleModule,
  eventListenersModule,
  h,
} from '../../dist/index.js';

const patch = init([classModule, styleModule, eventListenersModule]);
const wrapper = document.createElement('div');

let vnode = h('div.page', 'hello world');
document.body.append(patch(wrapper, vnode));
