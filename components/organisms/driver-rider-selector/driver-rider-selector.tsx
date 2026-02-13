import { Text } from "@/components/atoms";
import { ChoiceButton } from "@/components/molecules";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import {
  ButtonRow,
  ContentSection,
  DriverRiderContainer,
  ImageSection,
  QuestionBlock,
} from "./driver-rider-selector.styles";

import CabinImage from "@/components/atoms/images/cabin.svg";

export function DriverRiderSelector() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <DriverRiderContainer testID="driver-rider-selector">
      <ImageSection>
        <CabinImage
          width={width}
          height={400}
          preserveAspectRatio="xMidYMid slice"
        />
      </ImageSection>
      <ContentSection style={{ paddingTop: insets.top + 24 }}>
        <QuestionBlock>
          <Text
            fontSize="28px"
            fontFamily={theme.fonts.semiBold}
            textAlign="center"
          >
            Are you a rider
          </Text>
          <Text
            fontSize="20px"
            fontFamily={theme.fonts.regular}
            color={theme.colors.tagline}
            textAlign="center"
            style={{ marginVertical: 4 }}
          >
            or
          </Text>
          <Text
            fontSize="28px"
            fontFamily={theme.fonts.semiBold}
            textAlign="center"
          >
            driver
          </Text>
        </QuestionBlock>
        <ButtonRow testID="driver-rider-selector-buttons">
          <ChoiceButton
            testID="choice-button-driver"
            icon="steering"
            iconSet="material-community"
            label="Driver"
            onPress={() => {}}
            accessibilityLabel="I am a driver"
          />
          <ChoiceButton
            testID="choice-button-rider"
            icon="airline-seat-recline-extra"
            label="Rider"
            onPress={() => {}}
            accessibilityLabel="I am a rider"
          />
        </ButtonRow>
      </ContentSection>
    </DriverRiderContainer>
  );
}
