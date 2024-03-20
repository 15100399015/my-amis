import React from 'react';
import LinearGradient, {
  LinearGradientProps
} from 'react-native-linear-gradient';
import {useStyle, useGradient} from '../../use/styles';

interface IProps extends LinearGradientProps {}

export function CustomLinearGradient(props: IProps) {
  const style = useStyle(props.style);
  const gradient = useGradient(props);

  return <LinearGradient {...props} {...gradient} style={style} />;
}
