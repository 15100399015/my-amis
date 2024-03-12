import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useStyle} from '../../use/styles';

interface IProps extends TouchableOpacityProps {}

export function CustomTouchableView(props: IProps) {
  const style = useStyle(props.style);

  return <TouchableOpacity {...props} style={style} />;
}
