import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomText} from 'react-native-components';

export default class ViewComponent<T> extends React.Component<any, object> {
  static propsList: Array<string> = ['body', 'content'];
  static defaultProps = {};

  render() {
    const {style} = this.props;

    return (
      <CustomText style={style}>{this.props.content || '内容'}</CustomText>
    );
  }
}

@Renderer({
  type: 'base-text'
})
export class ViewRenderer extends ViewComponent<{}> {}
