import React from 'react';
import {View, ViewProps} from 'react-native';
import {useStyle} from '../../use/styles';

interface IProps extends ViewProps {}

export function CustomView(props: IProps) {
  const style = useStyle(props.style);

  return <View {...props} style={style} />;
}
