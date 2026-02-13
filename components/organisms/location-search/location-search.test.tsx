import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { LocationSearch } from "./location-search";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

const defaultProps = {
  title: "Where would you like to go?",
  testID: "location-search",
  screenName: "destination",
  placeholder: "Destination",
};

describe("LocationSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the title", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);
    expect(
      screen.getByText("Where would you like to go?")
    ).toBeOnTheScreen();
  });

  it("renders the search input with placeholder", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("Destination")
    ).toBeOnTheScreen();
  });

  it("renders the back button", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "Go back" })
    ).toBeOnTheScreen();
  });

  it("renders loading state initially", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);
    expect(screen.getByTestId("location-search-loading")).toBeOnTheScreen();
  });

  it("renders content after loading completes", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);
    expect(screen.getByTestId("location-search-loading")).toBeOnTheScreen();

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(screen.queryByTestId("location-search-loading")).toBeNull();
    expect(screen.getByTestId("location-search-content")).toBeOnTheScreen();
  });

  it("back button calls router.back", () => {
    const expoRouter = require("expo-router");
    renderWithTheme(<LocationSearch {...defaultProps} />);
    fireEvent.press(screen.getByRole("button", { name: "Go back" }));
    expect(expoRouter.useRouter().back).toHaveBeenCalled();
  });

  it("search input does not accept text while loading", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText("Destination");
    fireEvent.changeText(input, "test");
    expect(screen.queryByDisplayValue("test")).not.toBeOnTheScreen();

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    fireEvent.changeText(screen.getByPlaceholderText("Destination"), "test");
    expect(screen.getByDisplayValue("test")).toBeOnTheScreen();
  });

  it("renders ride items after loading", () => {
    renderWithTheme(<LocationSearch {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(screen.getByText("John M. • R 245")).toBeOnTheScreen();
  });

  describe("with primaryAction (pickup variant)", () => {
    const pickupProps = {
      ...defaultProps,
      title: "Where would you like to be picked up?",
      placeholder: "Pickup location",
      screenName: "pickup",
      primaryAction: { label: "Continue", href: "/(flow)/destination" as const },
    };

    it("does not render LocationSearchContent after loading", () => {
      renderWithTheme(<LocationSearch {...pickupProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      expect(screen.queryByTestId("location-search-content")).toBeNull();
    });

    it("renders primary action button after loading", () => {
      renderWithTheme(<LocationSearch {...pickupProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      expect(
        screen.getByRole("button", { name: "Continue" })
      ).toBeOnTheScreen();
    });

    it("navigates to destination when primary action is pressed and input has 2+ chars", () => {
      const expoRouter = require("expo-router");
      renderWithTheme(<LocationSearch {...pickupProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      const input = screen.getByPlaceholderText("Pickup location");
      fireEvent.changeText(input, "ab");

      fireEvent.press(screen.getByRole("button", { name: "Continue" }));

      expect(expoRouter.useRouter().push).toHaveBeenCalledWith(
        "/(flow)/destination"
      );
    });
  });

  describe("with suggestionsData (destination variant)", () => {
    const destinationProps = {
      ...defaultProps,
      title: "Where would you like to go?",
      placeholder: "Destination",
      screenName: "destination",
      primaryAction: { label: "Next", href: "/(flow)" as const },
      suggestionsData: [
        { location: "Giants", fullAddress: "Giants Dugout - Oracle Park" },
        {
          location: "San Francisco International Airport",
          fullAddress: "San Francisco, CA",
        },
        {
          location: "San Francisco Marriott Marquis",
          fullAddress: "780 Mission St, San Francisco, CA",
        },
      ],
    };

    it("renders no suggestions when search is empty", () => {
      renderWithTheme(<LocationSearch {...destinationProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      expect(screen.queryByText("Giants")).not.toBeOnTheScreen();
      expect(
        screen.queryByText("San Francisco International Airport")
      ).not.toBeOnTheScreen();
    });

    it("filters suggestions by wildcard search on location", () => {
      renderWithTheme(<LocationSearch {...destinationProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      const input = screen.getByPlaceholderText("Destination");
      fireEvent.changeText(input, "francisco");

      expect(
        screen.getByText("San Francisco International Airport")
      ).toBeOnTheScreen();
      expect(
        screen.getByText("San Francisco Marriott Marquis")
      ).toBeOnTheScreen();
      expect(screen.queryByText("Giants")).not.toBeOnTheScreen();
    });

    it("filters suggestions by wildcard search on full address", () => {
      renderWithTheme(<LocationSearch {...destinationProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      const input = screen.getByPlaceholderText("Destination");
      fireEvent.changeText(input, "oracle");

      expect(screen.getByText("Giants")).toBeOnTheScreen();
      expect(
        screen.getByText("Giants Dugout - Oracle Park")
      ).toBeOnTheScreen();
      expect(
        screen.queryByText("San Francisco International Airport")
      ).not.toBeOnTheScreen();
    });

    it("Next button enabled only when suggestion is selected", () => {
      const expoRouter = require("expo-router");
      renderWithTheme(<LocationSearch {...destinationProps} />);

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      const input = screen.getByPlaceholderText("Destination");
      fireEvent.changeText(input, "Giants");

      expect(
        screen.getByRole("button", { name: "Next" }).props.accessibilityState
          ?.disabled
      ).toBe(true);

      fireEvent.press(
        screen.getByRole("button", {
          name: "Select Giants, Giants Dugout - Oracle Park",
        })
      );

      expect(
        screen.getByRole("button", { name: "Next" }).props.accessibilityState
          ?.disabled
      ).toBe(false);

      fireEvent.press(screen.getByRole("button", { name: "Next" }));
      expect(expoRouter.useRouter().push).toHaveBeenCalledWith("/(flow)");
    });
  });
});
