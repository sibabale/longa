import { View } from "react-native";
import { useTheme } from "styled-components/native";

import { Icon, Text } from "@/components/atoms";

import {
  IconContainer,
  ResultDetails,
  ResultDivider,
  ResultItemTouchable,
  ResultRow,
} from "./location-suggestions-content.styles";

export type LocationSuggestionItem = {
  location: string;
  fullAddress: string;
};

export type LocationSuggestionsContentProps = {
  items: LocationSuggestionItem[];
  selectedItem?: LocationSuggestionItem | null;
  onItemPress?: (item: LocationSuggestionItem) => void;
  testID?: string;
};

function isSameItem(a: LocationSuggestionItem, b: LocationSuggestionItem) {
  return a.location === b.location && a.fullAddress === b.fullAddress;
}

export function LocationSuggestionsContent({
  items,
  selectedItem,
  onItemPress,
  testID = "location-suggestions-content",
}: LocationSuggestionsContentProps) {
  const theme = useTheme();

  return (
    <View testID={testID}>
      {items.map((item, index) => {
        const isActive = selectedItem != null && isSameItem(item, selectedItem);
        return (
          <View key={index}>
            <ResultItemTouchable
              testID={`${testID}-item-${index}`}
              $active={isActive}
              onPress={() => onItemPress?.(item)}
              accessibilityRole="button"
              accessibilityLabel={`Select ${item.location}, ${item.fullAddress}`}
              accessibilityState={{ selected: isActive }}
            >
              <ResultRow>
                <IconContainer testID={`${testID}-pin-${index}`}>
                  <Icon
                  name="place"
                  size={24}
                  color="#ffffff"
                  testID={`${testID}-pin-icon-${index}`}
                  />
                </IconContainer>
                <ResultDetails>
                  <Text
                  fontSize="17px"
                  textAlign="left"
                  fontFamily={theme.fonts.semiBold}
                  color={theme.colors.title}
                  testID={`${testID}-location-${index}`}
                  >
                    {item.location}
                  </Text>
                  <Text
                  fontSize="14px"
                  textAlign="left"
                  fontFamily={theme.fonts.regular}
                  color={theme.colors.tagline}
                  testID={`${testID}-address-${index}`}
                  >
                    {item.fullAddress}
                  </Text>
                </ResultDetails>
              </ResultRow>
            </ResultItemTouchable>
            {index < items.length - 1 && (
              <ResultDivider testID={`${testID}-divider-${index}`} />
            )}
          </View>
        );
      })}
    </View>
  );
}
