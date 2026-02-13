import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NoridePages } from "@/components/molecules/noride-pages";
import { LocationSearchLoading } from "@/components/organisms/location-search/location-search-loading";
import { Text } from "@/components/atoms";
import { useTheme } from "styled-components/native";

import {
  Container,
  ContentArea,
  EmptyStateWrapper,
  TitleSection,
} from "./trips.styles";

const LOADING_DURATION_MS = 2000;
const PICKUP_HREF = "/(flow)/pickup";

export type TripsProps = {
  testID?: string;
  pickupHref?: string;
};

export function Trips({
  testID = "trips",
  pickupHref = PICKUP_HREF,
}: TripsProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleBookTripPress = useCallback(() => {
    router.push(pickupHref as Parameters<typeof router.push>[0]);
  }, [pickupHref, router]);

  if (isLoading) {
    return (
      <Container testID={testID}>
        <TitleSection style={{ paddingTop: insets.top + 24 }}>
          <Text
            testID={`${testID}-title`}
            fontSize="35px"
            textAlign="left"
            fontFamily={theme.fonts.semiBold}
            color={theme.colors.title}
          >
            Your trips
          </Text>
        </TitleSection>
        <ContentArea>
          <LocationSearchLoading testID={`${testID}-loading`} />
        </ContentArea>
      </Container>
    );
  }

  return (
    <Container testID={testID}>
      <TitleSection style={{ paddingTop: insets.top + 24 }}>
        <Text
          testID={`${testID}-title`}
          fontSize="35px"
          textAlign="left"
          fontFamily={theme.fonts.semiBold}
          color={theme.colors.title}
        >
          Your trips
        </Text>
      </TitleSection>
      <EmptyStateWrapper>
        <NoridePages
          header="No upcoming trips yet"
          subheading="Book a trip to get started"
          buttonLabel="Book a trip"
          onButtonPress={handleBookTripPress}
          testID={`${testID}-empty-state`}
          containerStyle={{ paddingBottom: insets.bottom + 24 }}
        />
      </EmptyStateWrapper>
    </Container>
  );
}
