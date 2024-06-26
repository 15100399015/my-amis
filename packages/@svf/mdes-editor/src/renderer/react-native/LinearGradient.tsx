import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomLinearGradient} from '@svf/mdes-renderer-rn';

export default class LinearGradientComponent<T> extends React.Component<
  any,
  any
> {
  static defaultProps = {};

  render() {
    const {style, render, body, gradient} = this.props;

    return (
      <CustomLinearGradient style={style} gradient={gradient}>
        {render('body', body)}
      </CustomLinearGradient>
    );
  }
}

@Renderer({
  type: 'base-lineargradient'
})
export class LinearGradientRenderer extends LinearGradientComponent<{}> {}
