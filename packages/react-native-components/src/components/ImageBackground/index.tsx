import React from 'react';
import type {ImageBackgroundProps} from 'react-native';
import {Pedestal} from '../../pedestal';
import {useStyle} from '../../use/styles';
import {ErrorBoundaryWrapper} from '../ErrorBoundaryWrapper';

interface IProps extends ImageBackgroundProps {
  src?: string;
}

export function _CustomImageBackground(props: IProps) {
  const style = useStyle(props.style);

  return (
    <Pedestal.ImageBackground
      {...props}
      style={style}
      source={{uri: props.src}}
    />
  );
}

export const CustomImageBackground = ErrorBoundaryWrapper(
  _CustomImageBackground
);
