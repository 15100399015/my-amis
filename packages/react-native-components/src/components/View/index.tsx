import React from 'react';
import type {ViewProps} from 'react-native';
import {Pedestal} from '../../pedestal';
import {useStyle} from '../../use/styles';
import {ErrorBoundaryWrapper} from '../ErrorBoundaryWrapper';

interface IProps extends ViewProps {}

export function _CustomView(props: IProps) {
  const style = useStyle(props.style);
  return <Pedestal.View {...props} style={style} />;
}

export const CustomView = ErrorBoundaryWrapper(_CustomView);
