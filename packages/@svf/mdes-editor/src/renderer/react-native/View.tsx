import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomView} from '@svf/mdes-renderer-rn';

export default class ViewComponent<T> extends React.Component<any, any> {
  static defaultProps = {};

  render() {
    const {style, body, render} = this.props;
    return <CustomView style={style}>{render('body', body)}</CustomView>;
  }
}

@Renderer({
  type: 'base-view'
})
export class ViewRenderer extends ViewComponent<{}> {}
