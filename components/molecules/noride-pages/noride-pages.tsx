import type { StyleProp, ViewStyle } from "react-native";

import { Text } from "@/components/atoms";
import { useTheme } from "styled-components/native";

import {
  Container,
  ContentWrapper,
  NotifyButton,
  NotifyButtonLabel,
} from "./noride-pages.styles";

export type NoridePagesProps = {
  header: string;
  subheading: string;
  buttonLabel: string;
  onButtonPress: () => void;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function NoridePages({
  header,
  subheading,
  buttonLabel,
  onButtonPress,
  testID = "noride-pages",
  containerStyle,
}: NoridePagesProps) {
  const theme = useTheme();

  return (
    <Container testID={testID} style={containerStyle}>
      <ContentWrapper testID={`${testID}-content`}>
        <Text
          testID={`${testID}-header`}
          fontSize="22px"
          textAlign="center"
          fontFamily={theme.fonts.semiBold}
          color={theme.colors.title}
        >
          {header}
        </Text>
        <Text
          testID={`${testID}-subheading`}
          fontSize="15px"
          textAlign="center"
          fontFamily={theme.fonts.regular}
          color={theme.colors.tagline}
          style={{ marginTop: 8 }}
        >
          {subheading}
        </Text>
      </ContentWrapper>
      <NotifyButton
        testID={`${testID}-button`}
        onPress={onButtonPress}
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
        style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}
      >
        <NotifyButtonLabel>{buttonLabel}</NotifyButtonLabel>
      </NotifyButton>
    </Container>
  );
}
