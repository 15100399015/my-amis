import React, {useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import {useStyle} from '../../use/styles';
import {getContextDataByTpl} from '../../use/contextData';
interface IProps extends TextProps {
  tpl?: string;
  placeholder?: string;
  data: any;
}

export function CustomText(props: IProps) {
  const style = useStyle(props.style);

  // 根据 tpl 渲染内容
  const content = useMemo(() => {
    return getContextDataByTpl(props.tpl, {name: '杨立鹏'});
  }, [props.tpl, props.data]);
  return (
    <Text {...props} style={style}>
      {String(content) || props.placeholder}
    </Text>
  );
}
