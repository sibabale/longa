import React, { useEffect, useState } from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";
import { useTheme } from "styled-components/native";

import { Text } from "@/components/atoms";

import rideData from "@/components/organisms/location-search/data.json";

import { Container, ContentSection, ImageSection } from "./ride-details.styles";

import WelcomeImage from "@/components/atoms/images/welcome.svg";

const LOADING_DURATION_MS = 3000;
const CONTENT_PADDING = 64;

export type RideDetailsProps = {
  testID?: string;
  screenName?: string;
  pickupLocation?: string;
  destinationName?: string;
  selectedIndex?: number;
};

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
  selectedIndex,
}: RideDetailsProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING;
  const backgroundColor = theme.colors.skeletonBg;
  const foregroundColor = theme.colors.skeletonFg;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const driverName = getDriverName(selectedIndex);

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
      </ContentSection>
    </Container>
  );
}
