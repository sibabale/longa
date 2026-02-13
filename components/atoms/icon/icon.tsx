import type { ComponentProps } from 'react';
import { View } from 'react-native';

import MaterialIconsSharp from './material-icons-sharp';

type MaterialIconName = ComponentProps<typeof MaterialIconsSharp>['name'];

export type IconProps = {
  name: MaterialIconName;
  size?: number;
  color?: string;
  style?: ComponentProps<typeof MaterialIconsSharp>['style'];
  testID?: string;
};

export function Icon({ name, size = 24, color, style, testID = 'icon' }: IconProps) {
  return (
    <View testID={testID}>
      <MaterialIconsSharp name={name} size={size} color={color} style={style} />
    </View>
  );
}
