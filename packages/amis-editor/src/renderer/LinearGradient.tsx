import React from 'react';
import {Renderer} from 'amis-core';
import {CustomLinearGradient} from 'react-native-components';

export default class LinearGradientComponent<T> extends React.Component<
  any,
  object
> {
  static propsList: Array<string> = ['body', 'content'];
  static defaultProps = {};

  render() {
    const {style, render, body} = this.props;

    return (
      <CustomLinearGradient style={style}>
        {render('body', body)}
      </CustomLinearGradient>
    );
  }
}

@Renderer({
  type: 'base-lineargradient'
})
export class LinearGradientRenderer extends LinearGradientComponent<{}> {}
