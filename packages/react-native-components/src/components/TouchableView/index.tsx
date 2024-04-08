import React from 'react';
import type {TouchableOpacityProps} from 'react-native';
import {Pedestal} from '../../pedestal';
import {useStyle} from '../../use/styles';
import {ErrorBoundaryWrapper} from '../ErrorBoundaryWrapper';

interface IProps extends TouchableOpacityProps {}

export function _CustomTouchableView(props: IProps) {
  const style = useStyle(props.style);

  return <Pedestal.TouchableOpacity {...props} style={style} />;
}

export const CustomTouchableView = ErrorBoundaryWrapper(_CustomTouchableView);
