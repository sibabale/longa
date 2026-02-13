import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { WelcomeHero } from "./welcome-hero";
import { lightTheme } from "@/theme/styled-theme";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe("WelcomeHero", () => {
  it("renders welcome copy", () => {
    renderWithTheme(<WelcomeHero />);
    expect(screen.getByText("Welcome to")).toBeOnTheScreen();
    expect(screen.getByText("Longa")).toBeOnTheScreen();
    expect(screen.getByText("Long trips with a companion")).toBeOnTheScreen();
  });

  it("renders continue button with accessible label", () => {
    renderWithTheme(<WelcomeHero />);
    expect(
      screen.getByRole("button", { name: "Continue to next screen" })
    ).toBeOnTheScreen();
  });

  it("navigates to driver-or-rider when user presses continue", () => {
    const router = require("expo-router").router;
    renderWithTheme(<WelcomeHero />);
    fireEvent.press(
      screen.getByRole("button", { name: "Continue to next screen" })
    );
    expect(router.push).toHaveBeenCalledWith("/driver-or-rider");
  });
});
