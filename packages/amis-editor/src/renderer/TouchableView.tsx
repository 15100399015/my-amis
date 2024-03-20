import React from 'react';
import {Renderer} from 'amis-core';
import {CustomTouchableView} from 'react-native-components';

export default class TouchableViewComponent extends React.Component<
  any,
  object
> {
  static propsList: Array<string> = ['body'];
  static defaultProps = {};

  render() {
    const {style, body, render} = this.props;

    return (
      <CustomTouchableView style={style}>
        {render('body', body)}
      </CustomTouchableView>
    );
  }
}

@Renderer({
  type: 'base-touchableview'
})
export class TouchableViewRenderer extends TouchableViewComponent {}
