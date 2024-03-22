import {theme, ClassNamesFn, makeClassnames} from 'mdes-core';
export const classPrefix: string = 'a-';
export const classnames: ClassNamesFn = makeClassnames(classPrefix);

theme('ang', {
  classPrefix,
  classnames
});
