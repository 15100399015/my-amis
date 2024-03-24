import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomImage} from 'react-native-components';

export default class ImageComponent<T> extends React.Component<any, object> {
  static propsList: Array<string> = ['body', 'className'];
  static defaultProps = {};

  render() {
    const {style, src, resizeMode} = this.props;

    return (
      <CustomImage
        src={src}
        style={style}
        resizeMode={resizeMode}
      ></CustomImage>
    );
  }
}

@Renderer({
  type: 'base-image'
})
export class ImageRenderer extends ImageComponent<{}> {}
