import createIconSet from '@expo/vector-icons/createIconSet';
import glyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json';

const MaterialIconsSharp = createIconSet(
  glyphMap,
  'Material Icons Sharp',
  require('../../../assets/fonts/MaterialIconsSharp-Regular.otf')
);

export default MaterialIconsSharp;
export type MaterialIconsSharpName = keyof typeof glyphMap;
