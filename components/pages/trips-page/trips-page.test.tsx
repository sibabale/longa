import React from "react";
import { act, render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";

import { TripsPage } from "./trips-page";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

describe("TripsPage", () => {
  it("renders loading skeleton initially", () => {
    renderWithTheme(<TripsPage />);
    expect(screen.getByTestId("trips-page-loading")).toBeOnTheScreen();
  });

  it("renders empty state with Book a trip button after loading", () => {
    jest.useFakeTimers();
    renderWithTheme(<TripsPage />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText("No upcoming trips yet")).toBeOnTheScreen();
    expect(
      screen.getByRole("button", { name: "Book a trip" })
    ).toBeOnTheScreen();
    jest.useRealTimers();
  });
});
