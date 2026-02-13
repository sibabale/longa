import type { RideItem } from "@/components/organisms/location-search-content";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";

import { SelectRidePage } from "./select-ride-page";
import { lightTheme } from "@/theme/styled-theme";

import rideData from "@/components/organisms/location-search/data.json";

const mockRideItems = rideData as RideItem[];

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

function renderWithRides(props?: Parameters<typeof SelectRidePage>[0]) {
  return renderWithTheme(
    <SelectRidePage
      isLoading={false}
      items={mockRideItems}
      {...props}
    />
  );
}

describe("SelectRidePage", () => {
  it("renders the page title", () => {
    renderWithTheme(<SelectRidePage />);
    expect(screen.getByText("Select ride")).toBeOnTheScreen();
  });

  it("renders the back button", () => {
    renderWithTheme(<SelectRidePage />);
    expect(
      screen.getByRole("button", { name: "Go back" })
    ).toBeOnTheScreen();
  });

  it("renders loading state initially", () => {
    renderWithTheme(<SelectRidePage />);
    expect(screen.getByTestId("select-ride-page-loading")).toBeOnTheScreen();
  });

  it("renders the Confirm ride button when rides are loaded", () => {
    renderWithRides();
    expect(
      screen.getByRole("button", { name: "Confirm ride" })
    ).toBeOnTheScreen();
  });

  it("renders ride options from LocationSearchContent", () => {
    renderWithRides();
    expect(screen.getByText("John M. • R 245")).toBeOnTheScreen();
    expect(screen.getByText("Sept 7 • 7:34 PM")).toBeOnTheScreen();
  });

  it("back button is pressable", () => {
    renderWithTheme(<SelectRidePage />);
    fireEvent.press(screen.getByRole("button", { name: "Go back" }));
  });

  it("Confirm ride button is disabled until a ride is selected", () => {
    renderWithRides();
    const confirmButton = screen.getByRole("button", {
      name: "Confirm ride",
    }) as React.ReactElement<{ accessibilityState?: { disabled?: boolean } }>;
    expect(confirmButton.props.accessibilityState?.disabled).toBe(true);
  });

  it("Confirm ride button is enabled after selecting a ride", () => {
    renderWithRides();
    fireEvent.press(
      screen.getByTestId(
        "select-ride-page-location-search-content-item-0"
      )
    );
    const confirmButton = screen.getByRole("button", {
      name: "Confirm ride",
    }) as React.ReactElement<{ accessibilityState?: { disabled?: boolean } }>;
    expect(confirmButton.props.accessibilityState?.disabled).toBe(false);
  });

  it("Confirm ride button is pressable when ride is selected", () => {
    renderWithRides();
    fireEvent.press(
      screen.getByTestId(
        "select-ride-page-location-search-content-item-0"
      )
    );
    fireEvent.press(screen.getByRole("button", { name: "Confirm ride" }));
  });

  it("renders empty state when no rides available", () => {
    renderWithTheme(
      <SelectRidePage isLoading={false} items={[]} />
    );
    expect(screen.getByText("No matching rides for now")).toBeOnTheScreen();
    expect(
      screen.getByText("Should we notify you when there is a match")
    ).toBeOnTheScreen();
    expect(
      screen.getByRole("button", { name: "Notify me" })
    ).toBeOnTheScreen();
  });

  it("Notify me button is pressable in empty state", () => {
    renderWithTheme(
      <SelectRidePage isLoading={false} items={[]} />
    );
    fireEvent.press(screen.getByRole("button", { name: "Notify me" }));
  });

  it("renders trip summary when pickup, destination and datetime provided", () => {
    renderWithRides({
      pickupLocation: "Sandton",
      destinationName: "San Francisco International Airport",
      selectedDateTime: "2026-02-13T21:12:00.000Z",
    });
    expect(screen.getByText("From Sandton")).toBeOnTheScreen();
    expect(
      screen.getByText("To San Francisco International Airport")
    ).toBeOnTheScreen();
    expect(screen.getByText(/Fri, Feb 13/)).toBeOnTheScreen();
  });

  it("renders only pickup when only pickupLocation provided", () => {
    renderWithRides({ pickupLocation: "Home" });
    expect(screen.getByText("From Home")).toBeOnTheScreen();
    expect(screen.getByTestId("select-ride-page-trip-summary")).toBeOnTheScreen();
  });

  it("renders only destination when only destinationName provided", () => {
    renderWithRides({ destinationName: "Airport" });
    expect(screen.getByText("To Airport")).toBeOnTheScreen();
    expect(screen.getByTestId("select-ride-page-trip-summary")).toBeOnTheScreen();
  });

  it("renders only datetime when only selectedDateTime provided", () => {
    renderWithRides({ selectedDateTime: "2026-02-13T10:00:00.000Z" });
    expect(screen.getByText(/Fri, Feb 13/)).toBeOnTheScreen();
    expect(screen.getByTestId("select-ride-page-trip-summary")).toBeOnTheScreen();
  });

  it("does not render trip summary when no params provided", () => {
    renderWithRides();
    expect(screen.queryByTestId("select-ride-page-trip-summary")).not.toBeOnTheScreen();
  });

  it("has stable test IDs for key interactive elements", () => {
    renderWithRides();
    expect(
      screen.getByTestId("select-ride-page-back-button")
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId("select-ride-page-confirm-button")
    ).toBeOnTheScreen();
    expect(screen.getByTestId("select-ride-page-title")).toBeOnTheScreen();
    expect(screen.getByTestId("select-ride-page-content")).toBeOnTheScreen();
  });
});
