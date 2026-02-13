import { Icon, Text } from "@/components/atoms";
import { useCaptureEvent } from "@/hooks/use-capture-event";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Linking, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import {
  ActionContainer,
  AgreementText,
  BackButton,
  CheckboxBox,
  CheckboxRow,
  Container,
  HeaderRow,
  LinksSection,
  PrimaryActionButton,
  PrimaryActionLabel,
  ScrollContent,
  TitleRow,
} from "./terms.styles";

export type TermsProps = {
  testID: string;
  screenName: string;
  title?: string;
  onConfirm?: () => void;
};

export function Terms({
  testID,
  screenName,
  title = "We've updated our terms",
  onConfirm,
}: TermsProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const capture = useCaptureEvent();
  const [accepted, setAccepted] = useState(false);

  const handleBackPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_back_pressed`, { screen: screenName });
    router.back();
  }, [capture, router, screenName]);

  const handleCheckboxPress = useCallback(() => {
    setAccepted((prev) => !prev);
  }, []);

  const handleConfirmPress = useCallback(() => {
    if (!accepted) return;
    capture(`${screenName.toLowerCase()}_confirm_pressed`, {
      screen: screenName,
    });
    if (onConfirm) {
      onConfirm();
    }
  }, [accepted, capture, onConfirm, screenName]);

  const handleTermsLinkPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_terms_link_pressed`, {
      screen: screenName,
    });
    Linking.openURL("https://example.com/terms");
  }, [capture, screenName]);

  const handlePrivacyLinkPress = useCallback(() => {
    capture(`${screenName.toLowerCase()}_privacy_link_pressed`, {
      screen: screenName,
    });
    Linking.openURL("https://example.com/privacy");
  }, [capture, screenName]);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <ScrollContent testID={`${testID}-content`}>
          <TitleRow>
            <Icon
              name="description"
              size={40}
              color={theme.colors.tagline}
              testID={`${testID}-icon`}
            />
            <Text
              testID={`${testID}-title`}
              fontSize="22px"
              textAlign="left"
              fontFamily={theme.fonts.semiBold}
              color={theme.colors.title}
              style={{ flex: 1 }}
            >
              {title}
            </Text>
          </TitleRow>
          <Text
            fontSize="15px"
            textAlign="left"
            fontFamily={theme.fonts.regular}
            color={theme.colors.title}
            style={{ marginBottom: 16 }}
          >
            We encourage you to read our updated Terms in full
          </Text>
          <LinksSection>
            <Pressable
              onPress={handleTermsLinkPress}
              accessibilityRole="link"
              accessibilityLabel="Terms of Use"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              <Text
                fontSize="15px"
                textAlign="left"
                fontFamily={theme.fonts.regular}
                color="#007AFF"
                style={{ textDecorationLine: "underline" }}
              >
                Terms of Use
              </Text>
            </Pressable>
            <Pressable
              onPress={handlePrivacyLinkPress}
              accessibilityRole="link"
              accessibilityLabel="Privacy Notice"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              <Text
                fontSize="15px"
                fontFamily={theme.fonts.regular}
                color="#007AFF"
                textAlign="left"
                style={{ textDecorationLine: "underline", marginTop: 4 }}
              >
                Privacy Notice
              </Text>
            </Pressable>
          </LinksSection>
          <Pressable
            onPress={handleCheckboxPress}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: accepted }}
            accessibilityLabel="I have reviewed and agree to the Terms of Use and acknowledge the Privacy Notice. I confirm that I am at least 18 years of age."
          >
            <CheckboxRow>
              <CheckboxBox
                testID={`${testID}-checkbox`}
                style={[
                  accepted && {
                    backgroundColor: theme.colors.title,
                  },
                ]}
              >
                {accepted && (
                  <Icon
                    name="check"
                    size={16}
                    color="#FFFFFF"
                    testID={`${testID}-checkbox-check`}
                  />
                )}
              </CheckboxBox>
              <AgreementText>
                By checking the box, I have reviewed and agree to the Terms of
                Use and acknowledge the Privacy Notice. I confirm that I am at
                least 18 years of age.
              </AgreementText>
            </CheckboxRow>
          </Pressable>
        </ScrollContent>
      </ScrollView>
      <ActionContainer style={{ paddingBottom: insets.bottom + 24 }}>
        <PrimaryActionButton
          testID={`${testID}-confirm-button`}
          onPress={handleConfirmPress}
          disabled={!accepted}
          accessibilityRole="button"
          accessibilityLabel="Confirm"
          accessibilityState={{ disabled: !accepted }}
          style={({ pressed }) =>
            pressed && accepted ? { opacity: 0.8 } : undefined
          }
        >
          <PrimaryActionLabel>Accept Terms</PrimaryActionLabel>
        </PrimaryActionButton>
      </ActionContainer>
    </Container>
  );
}
