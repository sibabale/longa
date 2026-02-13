import { useTheme } from "styled-components/native";

import { Icon, Text } from "@/components/atoms";

import { router } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowButton,
  ContentSection,
  ImageSection,
  TitleBlock,
  WelcomeHeroContainer,
} from "./welcome-hero.styles";

import WelcomeImage from "@/components/atoms/images/welcome.svg";

export function WelcomeHero() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <WelcomeHeroContainer testID="welcome-hero">
      <ImageSection>
        <WelcomeImage
          width={width}
          height={400}
          preserveAspectRatio="xMidYMid slice"
        />
      </ImageSection>
      <ContentSection style={{ paddingTop: insets.top + 24 }}>
        <TitleBlock>
          <Text
            fontSize="40px"
            fontFamily={theme.fonts.semiBold}
          >
            Welcome to
          </Text>
          <Text
            fontSize="40px"
            fontFamily={theme.fonts.bold}
            textAlign="center"
          >
            Longa
          </Text>
        </TitleBlock>
        <Text fontSize="17px" textAlign="center">
          Long trips with a companion
        </Text>
        <ArrowButton
          testID="welcome-hero-cta"
          onPress={() => router.push("/driver-or-rider")}
          accessibilityRole="button"
          accessibilityLabel="Continue to next screen"
        >
          {({ pressed }) => (
            <Icon
              name="arrow-forward"
              size={56}
              color={theme.colors.arrow}
              style={pressed ? { opacity: 0.7 } : undefined}
            />
          )}
        </ArrowButton>
      </ContentSection>
    </WelcomeHeroContainer>
  );
}
