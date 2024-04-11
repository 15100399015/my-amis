import {useMemo} from 'react';
import {handleStyle} from '../util/styles';
import {StyleProp} from 'react-native';

export function useStyle(style: StyleProp<any> = {}) {
  return useMemo(() => handleStyle(style), [style]);
}

export type TGradientParams = {
  colors?: {color: string; position: number}[];
  range?: number;
};
export function useGradient(gradient: TGradientParams = {}) {
  return useMemo(() => {
    const colors = [];
    const locations = [];
    for (let i = 0; i < (gradient.colors || []).length; i++) {
      const element = gradient.colors![i];
      colors.push(element.color);
      locations.push(element.position / 100);
    }
    return {
      colors: colors,
      locations: locations,
      useAngle: true,
      angleCenter: {x: 0.5, y: 0.5},
      angle: gradient.range || 0
    };
  }, [gradient]);
}
