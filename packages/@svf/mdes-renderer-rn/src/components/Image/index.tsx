import React from 'react';
import type {ImageProps} from 'react-native';
import {Pedestal} from '../../pedestal';
import {useStyle} from '../../use/styles';
import {ErrorBoundaryWrapper} from '../ErrorBoundaryWrapper';

interface IProps extends ImageProps {
  src?: string;
}

export function _CustomImage(props: IProps) {
  const style = useStyle(props.style);
  return <Pedestal.Image {...props} style={style} source={{uri: props.src}} />;
}

export const CustomImage = ErrorBoundaryWrapper(_CustomImage);
