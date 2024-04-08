import React from 'react';
import type {ViewProps} from 'react-native';
import {Pedestal} from '../../pedestal';
import {useStyle, useGradient} from '../../use/styles';
import {ErrorBoundaryWrapper} from '../ErrorBoundaryWrapper';

interface IProps extends ViewProps {
  gradient: any;
}

export function _CustomLinearGradient(props: IProps) {
  const style = useStyle(props.style);
  const gradient = useGradient(props);

  return <Pedestal.LinearGradient {...props} {...gradient} style={style} />;
}

export const CustomLinearGradient = ErrorBoundaryWrapper(_CustomLinearGradient);
