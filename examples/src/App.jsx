/*
 * @Author: DM
 * @Date: 2021-12-29 18:22:39
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 13:13:32
 * @Descriptions:
 * @FilePath: /lich/examples/src/App.jsx
 */

import { jsx, Fragment } from "@lichjs/virtual-dom";

const node = (
  <div>
    <h1 onClick={(e)=> console.log(e,'hello lich')}>hello</h1>
  </div>
);

export default node;
