import { Image } from "expo-image";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

import { Text } from "@/components/atoms";

import {
  ResultDetails,
  ResultDivider,
  ResultItem,
  ResultRow,
} from "./location-search-content.styles";

export type RideItem = {
  driver: string;
  date: string;
  time: string;
  price: string;
};

export type LocationSearchContentProps = {
  items: RideItem[];
  testID?: string;
};

const carImage = require("@/components/atoms/images/car.png");

export function LocationSearchContent({
  items,
  testID = "location-search-content",
}: LocationSearchContentProps) {
  const theme = useTheme();

  return (
    <View testID={testID}>
      {items.map((item, index) => (
        <View key={index}>
          <ResultItem testID={`${testID}-item-${index}`}>
            <ResultRow>
              <View testID={`${testID}-car-${index}`}>
                <Image
                  source={carImage}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: theme.colors.surface,
                  }}
                  contentFit="contain"
                />
              </View>
              <ResultDetails>
                <Text
                  fontSize="17px"
                  textAlign="left"
                  fontFamily={theme.fonts.semiBold}
                  color={theme.colors.title}
                  testID={`${testID}-driver-${index}`}
                >
                  {item.driver} • {item.price}
                </Text>
                <Text
                  fontSize="14px"
                  textAlign="left"
                  fontFamily={theme.fonts.regular}
                  color={theme.colors.tagline}
                  testID={`${testID}-datetime-${index}`}
                >
                  {item.date} • {item.time}
                </Text>
              </ResultDetails>
            </ResultRow>
          </ResultItem>
          {index < items.length - 1 && (
            <ResultDivider testID={`${testID}-divider-${index}`} />
          )}
        </View>
      ))}
    </View>
  );
}
