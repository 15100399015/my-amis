import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomText} from 'react-native-components';

export default class ViewComponent<T> extends React.Component<any, any> {
  static defaultProps = {};

  render() {
    const {style, tpl, placeholder} = this.props;
    return (
      <CustomText style={style} tpl={tpl} data={{}} placeholder={placeholder} />
    );
  }
}

@Renderer({
  type: 'base-text'
})
export class ViewRenderer extends ViewComponent<{}> {}
