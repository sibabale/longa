import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";

import { TermsPage } from "./terms-page";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

describe("TermsPage", () => {
  it("renders the title", () => {
    renderWithTheme(<TermsPage />);
    expect(screen.getByText("Our terms")).toBeOnTheScreen();
  });

  it("renders the agreement text", () => {
    renderWithTheme(<TermsPage />);
    expect(
      screen.getByText(
        "We encourage you to read our updated Terms in full"
      )
    ).toBeOnTheScreen();
  });

  it("renders Confirm button disabled until checkbox is checked", () => {
    renderWithTheme(<TermsPage />);
    const confirmButton = screen.getByRole("button", {
      name: "Confirm",
    }) as React.ReactElement<{ accessibilityState?: { disabled?: boolean } }>;
    expect(confirmButton.props.accessibilityState?.disabled).toBe(true);
  });

  it("enables Confirm button when checkbox is checked", () => {
    renderWithTheme(<TermsPage />);
    fireEvent.press(screen.getByRole("checkbox"));
    const confirmButton = screen.getByRole("button", {
      name: "Confirm",
    }) as React.ReactElement<{ accessibilityState?: { disabled?: boolean } }>;
    expect(confirmButton.props.accessibilityState?.disabled).toBe(false);
  });
});
