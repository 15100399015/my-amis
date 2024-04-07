import {filter} from 'mdes-core';

/**
 * 根据条件表达式获取context数据
 * @param props
 * @returns
 */
export function getContextDataByTpl(tpl?: string, data?: any): string {
  return tpl ? filter(tpl, data) : '';
}
