import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomText} from '@svf/mdes-renderer-rn';

export default class TextComponent<T> extends React.Component<any, any> {
  static defaultProps = {};

  render() {
    const {style, tpl, placeholder, data} = this.props;
    return (
      <CustomText
        style={style}
        tpl={tpl}
        data={data || {}}
        placeholder={placeholder || '文本内容'}
      />
    );
  }
}

@Renderer({
  type: 'base-text'
})
export class TextRenderer extends TextComponent<{}> {}
