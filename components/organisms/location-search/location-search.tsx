import { Icon, Text } from "@/components/atoms";
import { useCaptureEvent } from "@/hooks/use-capture-event";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import { LocationSearchContent } from "@/components/organisms/location-search-content";
import type { LocationSuggestionItem } from "@/components/organisms/location-suggestions-content";
import { LocationSuggestionsContent } from "@/components/organisms/location-suggestions-content";
import data from "./data.json";
import { LocationSearchLoading } from "./location-search-loading";
import {
  ContentArea,
  HeaderRow,
  LocationSearchContainer,
  PrimaryActionButton,
  PrimaryActionContainer,
  PrimaryActionLabel,
  SearchInput,
  SearchInputWrapper,
  SearchSection,
  TitleSection,
} from "./location-search.styles";

export type PrimaryActionContext = {
  selected: LocationSuggestionItem | null;
  searchText: string;
};

export type PrimaryAction = {
  label: string;
  href: Href;
  getParams?: (context: PrimaryActionContext) => Record<string, string>;
};

export type LocationSearchProps = {
  title: string;
  testID: string;
  screenName: string;
  placeholder: string;
  primaryAction?: PrimaryAction;
  suggestionsData?: LocationSuggestionItem[];
};

export function LocationSearch({
  title,
  testID,
  screenName,
  placeholder,
  primaryAction,
  suggestionsData,
}: LocationSearchProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const capture = useCaptureEvent();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<
    LocationSuggestionItem | null
  >(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_back_pressed`, { screen: screenName });
    router.back();
  }, [capture, router, screenName]);

  const handleSearchFocus = useCallback(() => {
    capture(`${screenName.toLowerCase()}_search_focused`, {
      screen: screenName,
    });
  }, [capture, screenName]);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      setSelectedSuggestion(null);
      if (text.length > 0) {
        capture(`${screenName.toLowerCase()}_search_typed`, {
          screen: screenName,
          length: text.length,
        });
      }
    },
    [capture, screenName],
  );

  const handleSuggestionPress = useCallback(
    (item: LocationSuggestionItem) => {
      setSelectedSuggestion(item);
      capture(`${screenName.toLowerCase()}_suggestion_selected`, {
        screen: screenName,
        location: item.location,
      });
    },
    [capture, screenName],
  );

  const handlePrimaryActionPress = useCallback(() => {
    if (suggestionsData) {
      if (!primaryAction || !selectedSuggestion) return;
    } else {
      if (!primaryAction || searchText.length < 2) return;
    }
    capture(`${screenName.toLowerCase()}_primary_action_pressed`, {
      screen: screenName,
    });
    const params = primaryAction.getParams?.({
      selected: selectedSuggestion ?? null,
      searchText,
    });
    if (params && Object.keys(params).length > 0) {
      router.push({
        pathname: primaryAction.href,
        params,
      } as Parameters<typeof router.push>[0]);
    } else {
      router.push(primaryAction.href);
    }
  }, [
    capture,
    primaryAction,
    router,
    screenName,
    searchText.length,
    selectedSuggestion,
    suggestionsData,
  ]);

  const isPrimaryActionDisabled = suggestionsData
    ? !primaryAction || !selectedSuggestion
    : !primaryAction || searchText.length < 2;

  const filteredSuggestions = useMemo(() => {
    if (!suggestionsData) return [];
    const query = searchText.trim().toLowerCase();
    if (!query) return [];
    return suggestionsData.filter(
      (item) =>
        item.location.toLowerCase().includes(query) ||
        item.fullAddress.toLowerCase().includes(query)
    );
  }, [suggestionsData, searchText]);

  return (
    <LocationSearchContainer testID={testID}>
      <HeaderRow style={{ paddingTop: insets.top + 8 }}>
        <Pressable
          testID={`${testID}-back-button`}
          onPress={handleBackPress}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={({ pressed }) => ({
            padding: 8,
            marginRight: 8,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.title} />
        </Pressable>
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
      <SearchSection>
        <SearchInputWrapper testID={`${testID}-search-wrapper`}>
          <Icon
            name="search"
            size={24}
            color={theme.colors.tagline}
            testID={`${testID}-search-icon`}
          />
          <SearchInput
            testID={`${testID}-search-input`}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.tagline}
            value={searchText}
            onChangeText={handleSearchChange}
            onFocus={handleSearchFocus}
            editable={!isLoading}
            accessibilityLabel={placeholder}
            accessibilityHint={`Search for ${placeholder.toLowerCase()}`}
          />
        </SearchInputWrapper>
      </SearchSection>
      <ContentArea>
        {isLoading ? (
          <LocationSearchLoading testID={`${testID}-loading`} />
        ) : suggestionsData ? (
          <LocationSuggestionsContent
            items={filteredSuggestions}
            selectedItem={selectedSuggestion}
            onItemPress={handleSuggestionPress}
            testID={`${testID}-suggestions`}
          />
        ) : primaryAction ? null : (
          <LocationSearchContent items={data} testID={`${testID}-content`} />
        )}
      </ContentArea>
      {primaryAction && !isLoading && (
        <PrimaryActionContainer
          style={{ paddingBottom: insets.bottom + 24 }}
          testID={`${testID}-primary-action-container`}
        >
          <PrimaryActionButton
            testID={`${testID}-primary-action-button`}
            disabled={isPrimaryActionDisabled}
            onPress={handlePrimaryActionPress}
            accessibilityRole="button"
            accessibilityLabel={primaryAction.label}
            accessibilityState={{ disabled: isPrimaryActionDisabled }}
          >
            <PrimaryActionLabel>{primaryAction.label}</PrimaryActionLabel>
          </PrimaryActionButton>
        </PrimaryActionContainer>
      )}
    </LocationSearchContainer>
  );
}
