import { Icon, Text } from "@/components/atoms";
import { useCaptureEvent } from "@/hooks/use-capture-event";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Modal, Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import { InfoRow } from "@/components/molecules/info-row";

import {
  BackButton,
  Container,
  ContentSection,
  DateDivider,
  DateSection,
  DateSectionWrapper,
  DateTimePressable,
  HeaderRow,
  InfoSection,
  PrimaryActionButton,
  PrimaryActionLabel,
  SubtitleText,
  TermsLink,
  TitleSection,
} from "@/components/organisms/datetime-pick/datetime-pick.styles";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export type DateTimePickProps = {
  testID: string;
  screenName: string;
  title: string;
  subtitle?: string;
  primaryActionLabel?: string;
  primaryActionHref?: Href;
  primaryActionGetParams?: (selectedDate: Date) => Record<string, string>;
  defaultDate?: Date;
};

export function DateTimePick({
  testID,
  screenName,
  title,
  subtitle,
  primaryActionLabel = "Confirm",
  primaryActionHref,
  primaryActionGetParams,
  defaultDate = new Date(),
}: DateTimePickProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const capture = useCaptureEvent();

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date(defaultDate);
    d.setSeconds(0, 0);
    return d;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const handleBackPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_back_pressed`, { screen: screenName });
    router.back();
  }, [capture, router, screenName]);

  const handleDatePress = useCallback(() => {
    setPickerMode("date");
    setShowDatePicker(true);
    capture(`${screenName.toLowerCase()}_date_pressed`, { screen: screenName });
  }, [capture, screenName]);

  const handleTimePress = useCallback(() => {
    setPickerMode("time");
    setShowTimePicker(true);
    capture(`${screenName.toLowerCase()}_time_pressed`, { screen: screenName });
  }, [capture, screenName]);

  const handleDateChange = useCallback(
    (_: unknown, date?: Date) => {
      if (Platform.OS === "android") {
        setShowDatePicker(false);
      }
      if (date) {
        const newDate = new Date(selectedDate);
        newDate.setFullYear(date.getFullYear());
        newDate.setMonth(date.getMonth());
        newDate.setDate(date.getDate());
        setSelectedDate(newDate);
      }
    },
    [selectedDate],
  );

  const handleTimeChange = useCallback(
    (_: unknown, date?: Date) => {
      if (Platform.OS === "android") {
        setShowTimePicker(false);
      }
      if (date) {
        const newDate = new Date(selectedDate);
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        setSelectedDate(newDate);
      }
    },
    [selectedDate],
  );

  const handleConfirmPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_confirm_pressed`, {
      screen: screenName,
      date: selectedDate.toISOString(),
    });
    if (primaryActionHref) {
      const params = primaryActionGetParams?.(selectedDate);
      if (params && Object.keys(params).length > 0) {
        router.push({
          pathname: primaryActionHref,
          params,
        } as Parameters<typeof router.push>[0]);
      } else {
        router.push(primaryActionHref);
      }
    }
  }, [
    capture,
    primaryActionGetParams,
    primaryActionHref,
    router,
    screenName,
    selectedDate,
  ]);

  const handleTermsPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_terms_pressed`, {
      screen: screenName,
    });
  }, [capture, screenName]);

  const renderPicker = () => {
    if (pickerMode === "date") {
      return (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        />
      );
    }
    return (
      <DateTimePicker
        value={selectedDate}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={handleTimeChange}
      />
    );
  };

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
        {subtitle && (
          <SubtitleText testID={`${testID}-subtitle`}>{subtitle}</SubtitleText>
        )}
      </TitleSection>
      <ContentSection>
        <DateSectionWrapper testID={`${testID}-date-section-wrapper`}>
          <DateSection>
            <DateTimePressable
              testID={`${testID}-date-display`}
              onPress={handleDatePress}
              accessibilityRole="button"
              accessibilityLabel={`Date: ${formatDate(selectedDate)}`}
            >
              <Text
                fontSize="20px"
                fontFamily={theme.fonts.semiBold}
                color={theme.colors.title}
              >
                {formatDate(selectedDate)}
              </Text>
            </DateTimePressable>
            <DateDivider testID={`${testID}-divider`} />
            <DateTimePressable
              testID={`${testID}-time-display`}
              onPress={handleTimePress}
              accessibilityRole="button"
              accessibilityLabel={`Time: ${formatTime(selectedDate)}`}
            >
              <Text
                fontSize="20px"
                fontFamily={theme.fonts.semiBold}
                color={theme.colors.title}
              >
                {formatTime(selectedDate)}
              </Text>
            </DateTimePressable>
          </DateSection>
        </DateSectionWrapper>
        <InfoSection>
          <InfoRow
            iconName="event"
            text="Choose your exact pickup time up to 30 days in advance"
            testID={`${testID}-info-pickup-time`}
          />
          <InfoRow
            iconName="schedule"
            text="Extra wait time included to meet your ride"
            testID={`${testID}-info-wait-time`}
          />
          <InfoRow
            iconName="format-list-bulleted"
            text="Cancel at no charge up to 60 minutes in advance"
            testID={`${testID}-info-cancellation`}
          />
          <TermsLink
            testID={`${testID}-terms-link`}
            onPress={handleTermsPress}
            accessibilityRole="link"
            accessibilityLabel="See terms"
          >
            <Text
              fontSize="15px"
              fontFamily={theme.fonts.regular}
              color={theme.colors.tagline}
              style={{ textDecorationLine: "underline" }}
            >
              See terms
            </Text>
          </TermsLink>
        </InfoSection>
      </ContentSection>
      <View
        style={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
      >
        <PrimaryActionButton
          testID={`${testID}-confirm-button`}
          onPress={handleConfirmPress}
          accessibilityRole="button"
          accessibilityLabel={primaryActionLabel}
          style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}
        >
          <PrimaryActionLabel>{primaryActionLabel}</PrimaryActionLabel>
        </PrimaryActionButton>
      </View>
      {Platform.OS === "android" && (showDatePicker || showTimePicker) && (
        <DateTimePicker
          value={selectedDate}
          mode={pickerMode}
          display="default"
          onChange={(e, date) => {
            pickerMode === "date"
              ? handleDateChange(e, date)
              : handleTimeChange(e, date);
            setShowDatePicker(false);
            setShowTimePicker(false);
          }}
          minimumDate={pickerMode === "date" ? new Date() : undefined}
          maximumDate={
            pickerMode === "date"
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              : undefined
          }
        />
      )}
      {(Platform.OS === "ios" || Platform.OS === "web") &&
        (showDatePicker || showTimePicker) && (
          <Modal transparent animationType="slide">
            <Pressable
              style={{ flex: 1, justifyContent: "flex-end" }}
              onPress={() => {
                setShowDatePicker(false);
                setShowTimePicker(false);
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {renderPicker()}
              </View>
            </Pressable>
          </Modal>
        )}
    </Container>
  );
}
