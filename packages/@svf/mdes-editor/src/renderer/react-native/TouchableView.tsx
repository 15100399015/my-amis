import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomTouchableView} from '@svf/mdes-renderer-rn';

export default class TouchableViewComponent extends React.Component<any, any> {
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
