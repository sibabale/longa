import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ComponentProps } from 'react';
import { useTheme } from 'styled-components/native';

import MaterialIconsSharp from '@/components/atoms/icon/material-icons-sharp';
import { Button, Label } from './choice-button.styles';

type MaterialIconName = ComponentProps<typeof MaterialIconsSharp>['name'];
type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type ChoiceButtonProps = {
  icon: MaterialIconName | MaterialCommunityIconName;
  iconSet?: 'material-sharp' | 'material-community';
  label: string;
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
};

export function ChoiceButton({
  icon,
  iconSet = 'material-sharp',
  label,
  onPress,
  accessibilityLabel,
  testID = 'choice-button',
}: ChoiceButtonProps) {
  const theme = useTheme();

  return (
    <Button
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}>
      {iconSet === 'material-community' ? (
        <MaterialCommunityIcons
          name={icon as MaterialCommunityIconName}
          size={24}
          color={theme.colors.title}
        />
      ) : (
        <MaterialIconsSharp
          name={icon as MaterialIconName}
          size={24}
          color={theme.colors.title}
        />
      )}
      <Label testID={`${testID}-label`}>{label}</Label>
    </Button>
  );
}
