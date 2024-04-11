import {Pedestal} from '@svf/mdes-renderer-rn';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

Pedestal.init({
  View: View,
  Image: Image,
  ImageBackground: ImageBackground,
  Text: Text,
  TouchableOpacity: TouchableOpacity,
  LinearGradient: LinearGradient
});
