import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { LocationSuggestionsContent } from "./location-suggestions-content";
import type { LocationSuggestionItem } from "./location-suggestions-content";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

const mockItems: LocationSuggestionItem[] = [
  {
    location: "Giants",
    fullAddress: "Giants Dugout - Oracle Park",
  },
  {
    location: "San Francisco International Airport",
    fullAddress: "San Francisco, CA",
  },
];

describe("LocationSuggestionsContent", () => {
  it("renders with default testID", () => {
    renderWithTheme(<LocationSuggestionsContent items={mockItems} />);
    expect(
      screen.getByTestId("location-suggestions-content")
    ).toBeOnTheScreen();
  });

  it("renders with custom testID", () => {
    renderWithTheme(
      <LocationSuggestionsContent items={mockItems} testID="custom-suggestions" />
    );
    expect(screen.getByTestId("custom-suggestions")).toBeOnTheScreen();
  });

  it("renders location name for each item", () => {
    renderWithTheme(<LocationSuggestionsContent items={mockItems} />);
    expect(screen.getByText("Giants")).toBeOnTheScreen();
    expect(
      screen.getByText("San Francisco International Airport")
    ).toBeOnTheScreen();
  });

  it("renders full address for each item", () => {
    renderWithTheme(<LocationSuggestionsContent items={mockItems} />);
    expect(screen.getByText("Giants Dugout - Oracle Park")).toBeOnTheScreen();
    expect(screen.getByText("San Francisco, CA")).toBeOnTheScreen();
  });

  it("renders item containers with stable testIDs", () => {
    renderWithTheme(<LocationSuggestionsContent items={mockItems} />);
    expect(
      screen.getByTestId("location-suggestions-content-item-0")
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId("location-suggestions-content-item-1")
    ).toBeOnTheScreen();
  });

  it("renders pin icon container for each item", () => {
    renderWithTheme(<LocationSuggestionsContent items={mockItems} />);
    expect(
      screen.getByTestId("location-suggestions-content-pin-0")
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId("location-suggestions-content-pin-1")
    ).toBeOnTheScreen();
  });

  it("renders divider between items", () => {
    renderWithTheme(<LocationSuggestionsContent items={mockItems} />);
    expect(
      screen.getByTestId("location-suggestions-content-divider-0")
    ).toBeOnTheScreen();
  });

  it("renders empty when items array is empty", () => {
    renderWithTheme(<LocationSuggestionsContent items={[]} />);
    expect(
      screen.getByTestId("location-suggestions-content")
    ).toBeOnTheScreen();
    expect(
      screen.queryByTestId("location-suggestions-content-item-0")
    ).not.toBeOnTheScreen();
  });

  it("renders no dividers for single item", () => {
    renderWithTheme(
      <LocationSuggestionsContent items={[mockItems[0]]} />
    );
    expect(
      screen.queryByTestId("location-suggestions-content-divider-0")
    ).not.toBeOnTheScreen();
  });

  it("calls onItemPress when item is pressed", () => {
    const onItemPress = jest.fn();
    renderWithTheme(
      <LocationSuggestionsContent
        items={mockItems}
        onItemPress={onItemPress}
      />
    );

    fireEvent.press(
      screen.getByRole("button", {
        name: "Select Giants, Giants Dugout - Oracle Park",
      })
    );

    expect(onItemPress).toHaveBeenCalledWith(mockItems[0]);
  });

  it("shows active state for selected item", () => {
    renderWithTheme(
      <LocationSuggestionsContent
        items={mockItems}
        selectedItem={mockItems[1]}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "Select San Francisco International Airport, San Francisco, CA",
        selected: true,
      })
    ).toBeOnTheScreen();
  });
});
