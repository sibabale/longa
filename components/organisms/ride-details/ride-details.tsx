import React, { useCallback, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import { Text } from "@/components/atoms";

import rideData from "@/components/organisms/location-search/data.json";

import {
  ButtonContainer,
  Container,
  ContentSection,
  DoneButton,
  DoneButtonLabel,
  ImageSection,
} from "./ride-details.styles";

import WelcomeImage from "@/components/atoms/images/welcome.svg";

const LOADING_DURATION_MS = 3000;
const CONTENT_PADDING = 64;

export type RideDetailsProps = {
  testID?: string;
  screenName?: string;
  pickupLocation?: string;
  destinationName?: string;
  selectedDateTime?: string;
  selectedIndex?: number;
};

function formatDateTime(isoString?: string): string | null {
  if (!isoString) return null;
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return null;
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} at ${timeStr}`;
  } catch {
    return null;
  }
}

const rides = rideData as Array<{ driver: string }>;

function getDriverName(selectedIndex?: number): string {
  if (selectedIndex == null || selectedIndex < 0 || selectedIndex >= rides.length) {
    return "Your driver";
  }
  return rides[selectedIndex].driver;
}

export function RideDetails({
  testID = "ride-details",
  screenName = "ride_details",
  pickupLocation = "your pickup",
  destinationName = "your destination",
  selectedDateTime,
  selectedIndex,
}: RideDetailsProps) {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING;
  const backgroundColor = theme.colors.skeletonBg;
  const foregroundColor = theme.colors.skeletonFg;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleDonePress = useCallback(() => {
    router.replace("/(flow)/(tabs)" as Parameters<typeof router.replace>[0]);
  }, [router]);

  const driverName = getDriverName(selectedIndex);
  const formattedDateTime = formatDateTime(selectedDateTime);

  if (isLoading) {
    return (
      <Container testID={testID}>
        <ContentLoader
          testID={`${testID}-skeleton`}
          speed={1}
          width={width}
          height={500}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        >
          <Rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width={width}
            height={400}
          />
          <Rect
            x="32"
            y="432"
            rx="4"
            ry="4"
            width={contentWidth}
            height={14}
          />
          <Rect
            x="32"
            y="458"
            rx="4"
            ry="4"
            width={contentWidth * 0.9}
            height={14}
          />
          <Rect
            x="32"
            y="484"
            rx="4"
            ry="4"
            width={contentWidth * 0.65}
            height={14}
          />
          <Rect
            x="32"
            y="520"
            rx="4"
            ry="4"
            width={contentWidth * 0.5}
            height={14}
          />
        </ContentLoader>
      </Container>
    );
  }

  return (
    <Container testID={testID}>
      <ImageSection testID={`${testID}-image`}>
        <WelcomeImage
          width={width}
          height={400}
          preserveAspectRatio="xMidYMid slice"
        />
      </ImageSection>
      <ContentSection testID={`${testID}-content`}>
        <Text
          testID={`${testID}-message`}
          fontSize="22px"
          textAlign="center"
          fontFamily={theme.fonts.semiBold}
          color={theme.colors.title}
        >
          {driverName} will pick you up at {pickupLocation} for your trip to{" "}
          {destinationName}
        </Text>
        {formattedDateTime && (
          <Text
            testID={`${testID}-datetime`}
            fontSize="18px"
            textAlign="center"
            fontFamily={theme.fonts.regular}
            color={theme.colors.tagline}
            style={{ marginTop: 16 }}
          >
            {formattedDateTime}
          </Text>
        )}
      </ContentSection>
      <ButtonContainer style={{ paddingBottom: insets.bottom + 24 }}>
        <DoneButton
          testID={`${testID}-done-button`}
          onPress={handleDonePress}
          accessibilityRole="button"
          accessibilityLabel="Done"
          style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}
        >
          <DoneButtonLabel>Done</DoneButtonLabel>
        </DoneButton>
      </ButtonContainer>
    </Container>
  );
}
