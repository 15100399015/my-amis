import React from 'react';
import {Text, TextProps} from 'react-native';
import {useStyle} from '../../use/styles';

interface IProps extends TextProps {}

export function CustomText(props: IProps) {
  const style = useStyle(props.style);
  return <Text {...props} style={style} />;
}
