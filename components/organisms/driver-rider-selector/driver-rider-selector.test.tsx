import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { DriverRiderSelector } from "./driver-rider-selector";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe("DriverRiderSelector", () => {
  it("renders question copy", () => {
    renderWithTheme(<DriverRiderSelector />);
    expect(screen.getByText("Are you a rider")).toBeOnTheScreen();
    expect(screen.getByText("or")).toBeOnTheScreen();
    expect(screen.getByText("driver")).toBeOnTheScreen();
  });

  it("renders Driver and Rider choice buttons with accessible labels", () => {
    renderWithTheme(<DriverRiderSelector />);
    expect(
      screen.getByRole("button", { name: "I am a driver" })
    ).toBeOnTheScreen();
    expect(
      screen.getByRole("button", { name: "I am a rider" })
    ).toBeOnTheScreen();
  });

  it("Driver and Rider buttons respond to press", () => {
    renderWithTheme(<DriverRiderSelector />);
    fireEvent.press(screen.getByRole("button", { name: "I am a driver" }));
    fireEvent.press(screen.getByRole("button", { name: "I am a rider" }));
  });

  it("Rider button navigates to pickup page", () => {
    const expoRouter = require("expo-router");
    renderWithTheme(<DriverRiderSelector />);
    fireEvent.press(screen.getByRole("button", { name: "I am a rider" }));
    expect(expoRouter.useRouter().push).toHaveBeenCalledWith("/pickup");
  });
});
