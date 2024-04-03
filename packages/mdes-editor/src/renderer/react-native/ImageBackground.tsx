import React from 'react';
import {Renderer} from 'mdes-core';
import {CustomImageBackground} from 'react-native-components';

export default class ImageBackgroundComponent<T> extends React.Component<
  any,
  object
> {
  static defaultProps = {};

  render() {
    const {style, src, render, body, resizeMode} = this.props;

    return (
      <CustomImageBackground style={style} src={src} resizeMode={resizeMode}>
        {render('body', body)}
      </CustomImageBackground>
    );
  }
}

@Renderer({
  type: 'base-imagebackground'
})
export class ImageRenderer extends ImageBackgroundComponent<{}> {}
