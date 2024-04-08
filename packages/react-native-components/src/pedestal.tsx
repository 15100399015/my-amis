import type {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

export type PedestalComponent = {
  View: typeof View;
  Image: typeof Image;
  ImageBackground: typeof ImageBackground;
  Text: typeof Text;
  TouchableOpacity: typeof TouchableOpacity;
  LinearGradient: any;
};

class PedestalComponentPool {
  private _view: typeof View = null!;
  private _image: typeof Image = null!;
  private _imageBackground: typeof ImageBackground = null!;
  private _text: typeof Text = null!;
  private _touchableOpacity: typeof TouchableOpacity = null!;
  private _linearGradient: any = null!;
  get View() {
    if (!this._view) {
      const error = new Error('View 组件未注册');
      console.log(error);
      throw error;
    }
    return this._view;
  }
  get Image() {
    if (!this._image) {
      const error = new Error('Image 组件未注册');
      console.log(error);
      throw error;
    }
    return this._image;
  }
  get ImageBackground() {
    if (!this._imageBackground) {
      const error = new Error('ImageBackground 组件未注册');
      console.log(error);
      throw error;
    }
    return this._imageBackground;
  }
  get Text() {
    if (!this._text) {
      const error = new Error('Text 组件未注册');
      console.log(error);
      throw error;
    }
    return this._text;
  }
  get TouchableOpacity() {
    if (!this._touchableOpacity) {
      const error = new Error('TouchableOpacity 组件未注册');
      console.log(error);
      throw error;
    }
    return this._touchableOpacity;
  }
  get LinearGradient() {
    if (!this._linearGradient) {
      const error = new Error('LinearGradient 组件未注册');
      console.log(error);
      throw error;
    }
    return this._linearGradient;
  }
  public init(data: PedestalComponent): void {
    this._view = data.View;
    this._text = data.Text;
    this._image = data.Image;
    this._imageBackground = data.ImageBackground;
    this._touchableOpacity = data.TouchableOpacity;
    this._linearGradient = data.LinearGradient;
  }
}

export const Pedestal = new PedestalComponentPool();
