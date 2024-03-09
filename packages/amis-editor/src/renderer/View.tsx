import React from 'react';
import {Renderer} from 'amis-core';
import pick from 'lodash/pick';
import {CustomView} from 'react-native-components';

function formatRnStyles(styles: any): any {
  let transform: any[] = [];
  if (Reflect.has(styles, 'transform')) {
    transform = Object.entries(
      pick(styles.transform, [
        'translateX',
        'translateY',
        'scale',
        'scaleX',
        'scaleY',
        'rotate',
        'skewX',
        'skewY'
      ])
    ).map(([key, value]) => ({
      [key]: value
    }));
  }

  return {...styles, transform};
}

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
