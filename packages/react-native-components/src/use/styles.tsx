import {useMemo} from 'react';
import {handleStyle} from '../util/styles';
import {StyleProp} from 'react-native';

export function useStyle(style: StyleProp<any> = {}) {
  return useMemo(() => handleStyle(style), [style]);
}

export function useGradient(props: any) {
  return useMemo(() => {
    const colors: {color: string; position: number}[] =
      props.gradient?.colors || [];
    return {
      colors: colors.map(({color}) => color),
      locations: colors.map(({position}) => position / 100),
      start: props.gradient?.range?.start || {},
      end: props.gradient?.range?.end || {}
    };
  }, [props.gradient]);
}
