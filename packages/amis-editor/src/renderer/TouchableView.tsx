import React from 'react';
import {Renderer} from 'amis-core';
import {CustomTouchableView} from 'react-native-components';

export default class TouchableViewComponent<T> extends React.Component<
  any,
  object
> {
  static propsList: Array<string> = ['body', 'className'];
  static defaultProps = {};

  render() {
    const {style, body, render} = this.props;

    return (
      <CustomTouchableView {...this.props}>
        {render('body', body)}
      </CustomTouchableView>
    );
  }
}

@Renderer({
  type: 'base-touchableview'
})
export class TouchableViewRenderer extends TouchableViewComponent<{}> {}
