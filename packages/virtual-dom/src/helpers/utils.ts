/*
 * @Author: DM
 * @Date: 2021-12-31 18:43:40
 * @LastEditors: DM
 * @LastEditTime: 2021-12-31 18:45:34
 * @Descriptions:
 * @FilePath: /lich/packages/virtual-dom/src/core/utils.ts
 */
export const isArray = Array.isArray;
export function isPrimitive(s: any): s is string | number {
  return (
    typeof s === 'string' ||
    typeof s === 'number' ||
    s instanceof String ||
    s instanceof Number
  );
}
