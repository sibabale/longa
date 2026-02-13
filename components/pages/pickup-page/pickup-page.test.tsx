import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';

import { PickupPage } from './pickup-page';
import { lightTheme } from '@/theme/styled-theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

describe('PickupPage', () => {
  it('renders the page title', () => {
    renderWithTheme(<PickupPage />);
    expect(
      screen.getByText('Where would you like to be picked up?')
    ).toBeOnTheScreen();
  });

  it('renders the search input with placeholder', () => {
    renderWithTheme(<PickupPage />);
    expect(
      screen.getByPlaceholderText('Pickup location')
    ).toBeOnTheScreen();
  });

  it('renders the back button', () => {
    renderWithTheme(<PickupPage />);
    expect(
      screen.getByRole('button', { name: 'Go back' })
    ).toBeOnTheScreen();
  });

  it('renders loading state', () => {
    renderWithTheme(<PickupPage />);
    expect(screen.getByTestId('pickup-page-loading')).toBeOnTheScreen();
  });

  it('back button is pressable', () => {
    renderWithTheme(<PickupPage />);
    fireEvent.press(screen.getByRole('button', { name: 'Go back' }));
  });

  it('search input accepts text after loading', () => {
    jest.useFakeTimers();
    renderWithTheme(<PickupPage />);
    act(() => {
      jest.advanceTimersByTime(6000);
    });
    const input = screen.getByPlaceholderText('Pickup location');
    fireEvent.changeText(input, 'Airport');
    expect(screen.getByDisplayValue('Airport')).toBeOnTheScreen();
    jest.useRealTimers();
  });
});
