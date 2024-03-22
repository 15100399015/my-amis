import {
  Renderer,
  RendererProps,
  SchemaClassName,
  getPropValue
} from 'mdes-core';
import React from 'react';
import {
  BaseSchema,
  SchemaObject,
  SchemaCollection,
  SchemaIcon
} from '../Schema';
import {isPureVariable, resolveVariableAndFilter} from 'mdes-core';

/**
 * 渲染数据里的 mdes schema
 * 文档：https://aisuda.bce.baidu.com/mdes/zh-CN/components/mdes
 */
export interface AIMSRenderSchema extends BaseSchema {
  /**
   * 指定类型
   */
  type: 'mdes';

  /**
   * 类名
   */
  className?: SchemaClassName;
}

@Renderer({
  type: 'mdes'
})
export class MDESRenderer extends React.Component<RendererProps> {
  render() {
    const {render, props, schema} = this.props;
    let value = getPropValue(this.props) || schema;
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch (e) {
        console.warn('mdes value must be json string', e);
        value = null;
      }
    }

    return render('mdes', value, props);
  }
}
