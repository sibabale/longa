import { Icon, Text } from "@/components/atoms";
import { useCaptureEvent } from "@/hooks/use-capture-event";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import {
  Container,
  HeaderRow,
  SearchButtonWrapper,
  SearchSection,
  TitleSection,
} from "./home.styles";

export type HomeProps = {
  testID?: string;
  screenName?: string;
  title?: string;
  searchPlaceholder?: string;
  pickupHref?: string;
};

export function Home({
  testID = "home",
  screenName = "home",
  title = "Longa",
  searchPlaceholder = "Where to?",
  pickupHref = "/(flow)/pickup",
}: HomeProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const capture = useCaptureEvent();

  const handleSearchPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_search_pressed`, {
      screen: screenName,
    });
    router.push(pickupHref as Parameters<typeof router.push>[0]);
  }, [capture, pickupHref, router, screenName]);

  return (
    <Container testID={testID}>
      <HeaderRow style={{ paddingTop: insets.top + 8 }} />
      <TitleSection>
        <Text
          testID={`${testID}-title`}
          fontSize="35px"
          textAlign="left"
          fontFamily={theme.fonts.semiBold}
          color={theme.colors.title}
        >
          {title}
        </Text>
      </TitleSection>
      <SearchSection>
        <Pressable
          onPress={handleSearchPress}
          accessibilityRole="button"
          accessibilityLabel={`Go to ${searchPlaceholder}`}
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <SearchButtonWrapper testID={`${testID}-search-button`}>
            <Icon
              name="search"
              size={24}
              color={theme.colors.tagline}
              testID={`${testID}-search-icon`}
            />
            <Text
              fontSize="16px"
              textAlign="left"
              fontFamily={theme.fonts.regular}
              color={theme.colors.tagline}
              style={{ flex: 1 }}
            >
              {searchPlaceholder}
            </Text>
          </SearchButtonWrapper>
        </Pressable>
      </SearchSection>
    </Container>
  );
}
