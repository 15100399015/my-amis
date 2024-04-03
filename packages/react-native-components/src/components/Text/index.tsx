import React, {useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import {getPropValue, filter} from 'mdes-core';
import {useStyle} from '../../use/styles';

function getContent(props: any) {
  const {tpl = '', data = {}, placeholder = ''} = props;
  const value = getPropValue(props);
  if (tpl) {
    return filter(tpl, data);
  } else {
    return value == null || value === ''
      ? placeholder
      : typeof value === 'string'
      ? value
      : JSON.stringify(value);
  }
}

interface IProps extends TextProps {
  tpl?: string;
  placeholder?: string;
  data: any;
}

export function CustomText(props: IProps) {
  const style = useStyle(props.style);

  const context = useMemo(() => {
    return getContent(props);
  }, [props.tpl, props.data]);
  return (
    <Text {...props} style={style}>
      {String(context) || props.placeholder}
    </Text>
  );
}
