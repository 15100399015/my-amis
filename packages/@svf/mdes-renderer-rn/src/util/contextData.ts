import {Evaluator, parse} from 'mdes-formula';

const AST_CACHE: {[key: string]: any} = {};

export function memoParse(str: string, options?: any) {
  const key = [
    str,
    options?.evalMode ? '-eval' : '',
    options?.allowFilter ? '-filter' : '',
    options?.variableMode ? '-variable' : ''
  ].join(' ');

  const ast = AST_CACHE[key] || parse(str, options);
  AST_CACHE[key] = ast;
  return ast;
}

export const tokenize = (
  str: string,
  data: object,
  defaultFilter: string = ''
) => {
  if (!str || typeof str !== 'string') {
    return str;
  }

  try {
    const ast = memoParse(str, {
      evalMode: false,
      allowFilter: true
    });

    const result = new Evaluator(data, {
      defaultFilter
    }).evalute(ast);

    return `${result == null ? '' : result}`;
  } catch (e) {
    console.warn(e);
    return str;
  }
};

/**
 * 根据条件表达式获取context数据
 * @param props
 * @returns string
 */
export function getContextDataByTpl(tpl?: string, data?: any): string {
  return tpl ? tokenize(tpl, data) : '';
}
