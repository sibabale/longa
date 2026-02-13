import * as Notifications from "expo-notifications";
import { Icon, Text } from "@/components/atoms";
import { NoridePages } from "@/components/molecules";
import { useCaptureEvent } from "@/hooks/use-capture-event";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import type { RideItem } from "@/components/organisms/location-search-content";
import { LocationSearchContent } from "@/components/organisms/location-search-content";

import { SelectRideLoading } from "./select-ride-loading";

import {
  ActionContainer,
  BackButton,
  Container,
  ContentSection,
  HeaderRow,
  PrimaryActionButton,
  PrimaryActionLabel,
  TitleSection,
} from "@/components/organisms/select-ride/select-ride.styles";

import rideData from "@/components/organisms/location-search/data.json";

export type SelectRideProps = {
  testID: string;
  screenName: string;
  title?: string;
  pickupLocation?: string;
  destinationName?: string;
  selectedDateTime?: string;
  items?: RideItem[];
  primaryActionLabel?: string;
  isLoading?: boolean;
};

function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  const date = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${date} • ${time}`;
}

const LOADING_DURATION_MS = 2000;

export function SelectRide({
  testID,
  screenName,
  title = "Select ride",
  pickupLocation,
  destinationName,
  selectedDateTime,
  items = rideData as RideItem[],
  primaryActionLabel = "Confirm ride",
  isLoading: isLoadingProp,
}: SelectRideProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const capture = useCaptureEvent();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    if (isLoadingProp !== undefined) return;
    const timer = setTimeout(() => setInternalLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isLoadingProp]);

  const isLoading =
    isLoadingProp !== undefined ? isLoadingProp : internalLoading;

  const handleItemPress = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleNotifyPress = useCallback(async () => {
    capture(`${screenName.toLowerCase()}_notify_me_pressed`, {
      screen: screenName,
    });
    await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
  }, [capture, screenName]);

  const handleBackPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_back_pressed`, { screen: screenName });
    router.back();
  }, [capture, router, screenName]);

  const handleConfirmPress = useCallback(() => {
    if (selectedIndex === null) return;
    capture(`${screenName.toLowerCase()}_confirm_ride_pressed`, {
      screen: screenName,
      selectedIndex,
    });
    router.push({
      pathname: "/(flow)/terms",
      params: {
        ...(pickupLocation && { pickupLocation }),
        ...(destinationName && { destinationName }),
        ...(selectedDateTime && { selectedDateTime }),
        selectedIndex: String(selectedIndex),
      },
    } as Parameters<typeof router.push>[0]);
  }, [
    capture,
    destinationName,
    pickupLocation,
    router,
    screenName,
    selectedDateTime,
    selectedIndex,
  ]);

  return (
    <Container testID={testID}>
      <HeaderRow style={{ paddingTop: insets.top + 8 }}>
        <BackButton
          testID={`${testID}-back-button`}
          onPress={handleBackPress}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.title} />
        </BackButton>
      </HeaderRow>
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
      <ContentSection testID={`${testID}-content`}>
        {(pickupLocation || destinationName || selectedDateTime) && (
          <View testID={`${testID}-trip-summary`} style={{ marginBottom: 16 }}>
            <Text
              textAlign="left"
              fontSize="15px"
              fontFamily={theme.fonts.regular}
              color={theme.colors.tagline}
            >
              {pickupLocation && `From ${pickupLocation}`}
            </Text>

            <Text
              textAlign="left"
              fontSize="15px"
              fontFamily={theme.fonts.regular}
              color={theme.colors.tagline}
            >
              {destinationName && `To ${destinationName}`}
            </Text>
            <Text
              textAlign="left"
              fontSize="15px"
              fontFamily={theme.fonts.regular}
              color={theme.colors.tagline}
            >
              {selectedDateTime && formatDateTime(selectedDateTime)}
            </Text>
          </View>
        )}
        {isLoading ? (
          <SelectRideLoading testID={`${testID}-loading`} />
        ) : items.length === 0 ? (
          <NoridePages
            header="No matching rides for now"
            subheading="Should we notify you when there is a match"
            buttonLabel="Notify me"
            onButtonPress={handleNotifyPress}
            testID={`${testID}-noride-pages`}
            containerStyle={{ paddingBottom: insets.bottom + 24 }}
          />
        ) : (
          <LocationSearchContent
            items={items}
            testID={`${testID}-location-search-content`}
            selectedIndex={selectedIndex ?? undefined}
            onItemPress={handleItemPress}
          />
        )}
      </ContentSection>
      {!isLoading && items.length > 0 && (
        <ActionContainer style={{ paddingBottom: insets.bottom + 24 }}>
          <PrimaryActionButton
          testID={`${testID}-confirm-button`}
          onPress={handleConfirmPress}
          disabled={selectedIndex === null}
          accessibilityRole="button"
          accessibilityLabel={primaryActionLabel}
          accessibilityState={{ disabled: selectedIndex === null }}
          style={({ pressed }) =>
            pressed && selectedIndex !== null ? { opacity: 0.8 } : undefined
          }
        >
          <PrimaryActionLabel>{primaryActionLabel}</PrimaryActionLabel>
        </PrimaryActionButton>
        </ActionContainer>
      )}
    </Container>
  );
}
