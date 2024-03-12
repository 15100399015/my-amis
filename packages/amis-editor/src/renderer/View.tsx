import React from 'react';
import {Renderer} from 'amis-core';
import {CustomView} from 'react-native-components';

export default class ViewComponent<T> extends React.Component<any, object> {
  static propsList: Array<string> = ['body', 'className'];
  static defaultProps = {};

  render() {
    const {style, body, render} = this.props;
    return <CustomView style={style}>{render('body', body)}</CustomView>;
  }
}

@Renderer({
  type: 'base-view',
  isolateScope: true
})
export class ViewRenderer extends ViewComponent<{}> {}
