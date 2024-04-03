import isNumber from 'lodash/isNumber';
import {TextStyle, ViewStyle, ImageStyle} from 'react-native';
type TKeySet = keyof ViewStyle | keyof TextStyle | keyof ImageStyle;

const uncoilPxMap = new Set<TKeySet>([
  'width',
  'height',
  'maxWidth',
  'minWidth',
  'maxHeight',
  'minHeight',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'top',
  'bottom',
  'left',
  'right',
  'borderWidth',
  'borderBottomWidth',
  'borderTopWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'flexBasis',
  'lineHeight'
]);

const clearMap = new Set(['fontFamily']);

export function handleStyle(style: Record<TKeySet, any>) {
  const newStyle: Record<string, any> = {};
  Object.keys(style || {}).forEach(key => {
    let val = style[key as TKeySet];
    if (uncoilPxMap.has(key as TKeySet)) {
      val = isNumber(val) ? val : /px$/.test(val) ? parseFloat(val) : val;
    }
    if (clearMap.has(key)) {
      val = val === '' ? void 0 : val;
    }
    newStyle[key] = val;
  });
  return newStyle;
}
