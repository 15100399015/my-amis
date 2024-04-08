import React, {useMemo} from 'react';
import type {TextProps} from 'react-native';
import {Pedestal} from '../../pedestal';
import {useStyle} from '../../use/styles';
import {getContextDataByTpl} from '../../util/contextData';
import {ErrorBoundaryWrapper} from '../ErrorBoundaryWrapper';
interface IProps extends TextProps {
  tpl?: string;
  placeholder?: string;
  data: any;
}

export function _CustomText(props: IProps) {
  const style = useStyle(props.style);

  // 根据 tpl 渲染内容
  const content = useMemo(() => {
    return getContextDataByTpl(props.tpl, {
      name: [1, 2, 3]
    });
  }, [props.tpl, props.data]);

  return (
    <Pedestal.Text {...props} style={style}>
      {String(content) || props.placeholder}
    </Pedestal.Text>
  );
}

export const CustomText = ErrorBoundaryWrapper(_CustomText);
