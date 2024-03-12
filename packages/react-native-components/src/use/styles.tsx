import {useMemo} from 'react';
import {handleStyle} from '../util/styles';
import {ImageProps, StyleProp, TextProps, ViewProps} from 'react-native';

export function useStyle(style: StyleProp<any> = {}) {
  return useMemo(() => handleStyle(style), [style]);
}
