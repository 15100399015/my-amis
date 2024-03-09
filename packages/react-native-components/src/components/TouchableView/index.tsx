import React from 'react';
import {TouchableOpacity} from 'react-native';

interface IProps {}

export function CustomTouchableView(props: IProps) {
  return <TouchableOpacity {...props} />;
}
