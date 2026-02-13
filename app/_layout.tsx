import {
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_700Bold,
} from "@expo-google-fonts/jost";
import { useFonts } from "@expo-google-fonts/jost/useFonts";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { PostHogProviderWrapper } from "@/lib/posthog-provider";
import { initSentry } from "@/lib/sentry";
import { darkTheme, lightTheme } from "@/theme/styled-theme";

initSentry();
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(flow)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const styledTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PostHogProviderWrapper>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <StyledThemeProvider theme={styledTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(flow)" />
            </Stack>
            <StatusBar style="auto" />
          </StyledThemeProvider>
        </ThemeProvider>
      </PostHogProviderWrapper>
    </SafeAreaProvider>
  );
}
