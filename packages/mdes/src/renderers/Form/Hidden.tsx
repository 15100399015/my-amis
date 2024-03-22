import React from 'react';
import {FormItem, FormControlProps, FormBaseControl} from 'mdes-core';
import {FormBaseControlSchema} from '../../Schema';

/**
 * Hidden 隐藏域。功能性组件
 * 文档：https://aisuda.bce.baidu.com/mdes/zh-CN/components/form/hidden
 */
export interface HiddenControlSchema extends FormBaseControlSchema {
  type: 'hidden';
}

export default class HiddenControl extends React.Component<
  FormControlProps,
  any
> {
  render() {
    return null;
  }
}

@FormItem({
  type: 'hidden',
  wrap: false,
  sizeMutable: false
})
export class HiddenControlRenderer extends HiddenControl {}
