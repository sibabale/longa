import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { NoridePages } from "./noride-pages";
import { lightTheme } from "@/theme/styled-theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe("NoridePages", () => {
  it("renders header and subheading", () => {
    renderWithTheme(
      <NoridePages
        header="No matching rides"
        subheading="Try again later"
        buttonLabel="Notify me"
        onButtonPress={() => {}}
      />
    );
    expect(screen.getByText("No matching rides")).toBeOnTheScreen();
    expect(screen.getByText("Try again later")).toBeOnTheScreen();
  });

  it("renders button with label", () => {
    renderWithTheme(
      <NoridePages
        header="Header"
        subheading="Sub"
        buttonLabel="Notify me"
        onButtonPress={() => {}}
      />
    );
    expect(
      screen.getByRole("button", { name: "Notify me" })
    ).toBeOnTheScreen();
  });

  it("calls onButtonPress when button is pressed", () => {
    const onPress = jest.fn();
    renderWithTheme(
      <NoridePages
        header="Header"
        subheading="Sub"
        buttonLabel="Notify me"
        onButtonPress={onPress}
      />
    );
    fireEvent.press(screen.getByRole("button", { name: "Notify me" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
