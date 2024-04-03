import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomLinearGradient} from 'react-native-components';

export default class LinearGradientComponent<T> extends React.Component<
  any,
  object
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
