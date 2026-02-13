import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { LocationSearchLoading } from "./location-search-loading";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe("LocationSearchLoading", () => {
  it("renders with default testID", () => {
    renderWithTheme(<LocationSearchLoading />);
    expect(screen.getByTestId("location-search-loading")).toBeOnTheScreen();
  });

  it("renders with custom testID", () => {
    renderWithTheme(<LocationSearchLoading testID="custom-loading" />);
    expect(screen.getByTestId("custom-loading")).toBeOnTheScreen();
  });
});
