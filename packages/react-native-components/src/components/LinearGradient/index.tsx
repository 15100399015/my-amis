import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useStyle, useGradient} from '../../use/styles';
import {ViewProps} from 'react-native';

interface IProps extends ViewProps {
  gradient: any;
}

export function CustomLinearGradient(props: IProps) {
  const style = useStyle(props.style);
  const gradient = useGradient(props);

  return <LinearGradient {...props} {...gradient} style={style} />;
}
