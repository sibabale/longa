import { Icon, Text } from "@/components/atoms";
import { useTheme } from "styled-components/native";

import { InfoRowContainer, InfoRowContent } from "./info-row.styles";

export type InfoRowProps = {
  iconName: "event" | "schedule" | "format-list-bulleted";
  text: string;
  testID?: string;
};

export function InfoRow({ iconName, text, testID = "info-row" }: InfoRowProps) {
  const theme = useTheme();

  return (
    <InfoRowContainer testID={testID}>
      <Icon
        name={iconName}
        size={24}
        color={theme.colors.tagline}
        testID={`${testID}-icon`}
      />
      <InfoRowContent testID={`${testID}-text`}>
        <Text
          fontSize="15px"
          textAlign="left"
          fontFamily={theme.fonts.regular}
          color={theme.colors.title}
        >
          {text}
        </Text>
      </InfoRowContent>
    </InfoRowContainer>
  );
}
