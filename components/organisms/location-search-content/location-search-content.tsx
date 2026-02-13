import { Image } from "expo-image";
import { Pressable, View } from "react-native";
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
  selectedIndex?: number;
  onItemPress?: (index: number) => void;
};

const carImage = require("@/components/atoms/images/car.png");

export function LocationSearchContent({
  items,
  testID = "location-search-content",
  selectedIndex,
  onItemPress,
}: LocationSearchContentProps) {
  const theme = useTheme();
  const isSelectable = onItemPress !== undefined;

  return (
    <View testID={testID}>
      {items.map((item, index) => {
        const content = (
          <ResultItem
            testID={`${testID}-item-${index}`}
            $selectable={isSelectable}
            $selected={isSelectable && selectedIndex === index}
          >
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
        );

        return (
          <View key={index}>
            {isSelectable ? (
              <Pressable
                onPress={() => onItemPress?.(index)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${item.driver}, ${item.date} ${item.time}, ${item.price}`}
                accessibilityState={{ selected: selectedIndex === index }}
                style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
              >
                {content}
              </Pressable>
            ) : (
              content
            )}
            {index < items.length - 1 && (
              <ResultDivider testID={`${testID}-divider-${index}`} />
            )}
          </View>
        );
      })}
    </View>
  );
}
