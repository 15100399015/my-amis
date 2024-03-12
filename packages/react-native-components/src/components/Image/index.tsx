import React from 'react';
import {Image, ImageProps} from 'react-native';
import {useStyle} from '../../use/styles';

interface IProps extends ImageProps {
  src?: string;
}

export function CustomImage(props: IProps) {
  const style = useStyle(props.style);
  return <Image {...props} style={style} source={{uri: props.src}} />;
}
