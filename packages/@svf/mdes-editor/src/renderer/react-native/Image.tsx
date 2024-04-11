import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomImage} from '@svf/mdes-renderer-rn';

export default class ImageComponent<T> extends React.Component<any, any> {
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
