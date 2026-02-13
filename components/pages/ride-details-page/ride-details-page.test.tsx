import React from "react";
import { act, render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";

import { RideDetailsPage } from "./ride-details-page";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

describe("RideDetailsPage", () => {
  it("renders loading skeleton initially", () => {
    renderWithTheme(
      <RideDetailsPage
        pickupLocation="Sandton"
        destinationName="Airport"
        selectedIndex="0"
      />
    );
    expect(screen.getByTestId("ride-details-page-skeleton")).toBeOnTheScreen();
  });

  it("renders the driver message after loading", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <RideDetailsPage
        pickupLocation="Sandton"
        destinationName="Airport"
        selectedIndex="0"
      />
    );
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(
      screen.getByText(
        "John M. will pick you up at Sandton for your trip to Airport"
      )
    ).toBeOnTheScreen();
    jest.useRealTimers();
  });

  it("renders date time when selectedDateTime is provided", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <RideDetailsPage
        pickupLocation="Sandton"
        destinationName="Airport"
        selectedDateTime="2025-02-14T15:30:00.000Z"
        selectedIndex="0"
      />
    );
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    const datetimeEl = screen.getByTestId("ride-details-page-datetime");
    expect(datetimeEl).toBeOnTheScreen();
    expect(datetimeEl.props.children).toMatch(/Fri, Feb 14/);
    jest.useRealTimers();
  });
});
