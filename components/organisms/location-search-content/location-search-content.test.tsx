import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { LocationSearchContent } from "./location-search-content";
import type { RideItem } from "./location-search-content";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

const mockItems: RideItem[] = [
  {
    driver: "John M.",
    date: "Sept 7",
    time: "7:34 PM",
    price: "R 245",
  },
  {
    driver: "Sarah K.",
    date: "Sept 8",
    time: "8:15 AM",
    price: "R 220",
  },
];

describe("LocationSearchContent", () => {
  it("renders with default testID", () => {
    renderWithTheme(<LocationSearchContent items={mockItems} />);
    expect(screen.getByTestId("location-search-content")).toBeOnTheScreen();
  });

  it("renders with custom testID", () => {
    renderWithTheme(
      <LocationSearchContent items={mockItems} testID="custom-content" />
    );
    expect(screen.getByTestId("custom-content")).toBeOnTheScreen();
  });

  it("renders driver name and price for each item", () => {
    renderWithTheme(<LocationSearchContent items={mockItems} />);
    expect(screen.getByText("John M. • R 245")).toBeOnTheScreen();
    expect(screen.getByText("Sarah K. • R 220")).toBeOnTheScreen();
  });

  it("renders date and time for each item", () => {
    renderWithTheme(<LocationSearchContent items={mockItems} />);
    expect(screen.getByText("Sept 7 • 7:34 PM")).toBeOnTheScreen();
    expect(screen.getByText("Sept 8 • 8:15 AM")).toBeOnTheScreen();
  });

  it("renders item containers with stable testIDs", () => {
    renderWithTheme(<LocationSearchContent items={mockItems} />);
    expect(screen.getByTestId("location-search-content-item-0")).toBeOnTheScreen();
    expect(screen.getByTestId("location-search-content-item-1")).toBeOnTheScreen();
  });

  it("renders car image container for each item", () => {
    renderWithTheme(<LocationSearchContent items={mockItems} />);
    expect(screen.getByTestId("location-search-content-car-0")).toBeOnTheScreen();
    expect(screen.getByTestId("location-search-content-car-1")).toBeOnTheScreen();
  });

  it("renders divider between items", () => {
    renderWithTheme(<LocationSearchContent items={mockItems} />);
    expect(
      screen.getByTestId("location-search-content-divider-0")
    ).toBeOnTheScreen();
  });

  it("renders empty when items array is empty", () => {
    renderWithTheme(<LocationSearchContent items={[]} />);
    expect(screen.getByTestId("location-search-content")).toBeOnTheScreen();
    expect(screen.queryByTestId("location-search-content-item-0")).not.toBeOnTheScreen();
  });

  it("renders no dividers for single item", () => {
    renderWithTheme(<LocationSearchContent items={[mockItems[0]]} />);
    expect(
      screen.queryByTestId("location-search-content-divider-0")
    ).not.toBeOnTheScreen();
  });
});
