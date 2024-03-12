import React from 'react';
import {ImageBackground, ImageBackgroundProps} from 'react-native';
import {useStyle} from '../../use/styles';

interface IProps extends ImageBackgroundProps {
  src?: string;
}

export function CustomImageBackground(props: IProps) {
  const style = useStyle(props.style);

  return <ImageBackground {...props} style={style} source={{uri: props.src}} />;
}
